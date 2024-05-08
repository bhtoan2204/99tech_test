// src/controllers/productController.ts

import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model';
import mongoose from 'mongoose';

export class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const name : string = req.query.name as string;
      const page : number = parseInt(req.query.page as string) || 1;
      const limit : number = parseInt(req.query.limit as string) || 10;
      const minPrice: number = parseInt(req.query.minPrice as string);
      const maxPrice: number = parseInt(req.query.maxPrice as string);

      const query = {} as any;
      if (name) {
        query.name = { $regex: new RegExp(name as string, 'i') };
      }
      if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        query.price = { $gte: minPrice };
      } else if (maxPrice) {
        query.price = { $lte: maxPrice };
      }
      
      const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
        
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const product: IProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
