# Project Name

## Overview

This project is a Node.js application with a MongoDB database, built using TypeScript. It provides an API for managing simple products which have name, price and description.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker version 25.0.3
- Docker Compose version v2.24.5

## Installation

To install and run the application, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd problem5
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose -f docker-compose.prod.yml up -d --build
    ```

## Usage

After successfully running the Docker containers, you can access the API at the following URL:

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Troubleshooting

- If you encounter any issues during installation or while running the application, please check the Docker logs for any error messages.
- Ensure that the required Docker and Docker Compose versions are installed correctly on your system.