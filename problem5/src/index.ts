import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { swaggerUi, specs } from './config/swagger';

import productRoutes from './routes/product.router';

const rootDir = path.resolve(__dirname, '..');
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.join(rootDir, envPath) });

const app: Application = express();
const port = process.env.PORT || 3000;

console.log(path.join(rootDir, envPath))
console.log(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017')
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to database: ' + error.message);
  });
