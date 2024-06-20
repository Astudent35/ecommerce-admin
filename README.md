# E-commerce Admin Panel

This project is an admin panel for managing an e-commerce platform. It allows administrators to manage products, categories, and orders. The application is built using Next.js and integrates with MongoDB for data storage and NextAuth for authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- AWS S3 (for image uploads)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd admin

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
Create a .env file in the root directory and add the following:

    ```
    MONGODB_URI=<your-mongodb-uri>
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
    S3_BUCKET_NAME=<your-s3-bucket-name>
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

## Features

### Authentication
- Google OAuth authentication using NextAuth.
- Only specific admin emails are allowed access.

### Product Management
- Add, edit, delete products.
- Upload product images to AWS S3.

### Category Management
- Add, edit, delete categories.
- Nested categories support.

### Order Management
- View orders with details.

## API Routes

### Authentication
- `GET /api/auth/[...nextauth]`: Handles authentication with Google OAuth.

### Products
- `GET /api/products`: Fetch all products or a specific product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products`: Update an existing product.
- `DELETE /api/products`: Delete a product by ID.

### Categories
- `GET /api/categories`: Fetch all categories.
- `POST /api/categories`: Create a new category.
- `PUT /api/categories`: Update an existing category.
- `DELETE /api/categories`: Delete a category by ID.

### Orders
- `GET /api/orders`: Fetch all orders.

### Upload
- `POST /api/upload`: Upload images to AWS S3.