# E-Commerce Backend

Express.js server with MongoDB integration for e-commerce cart operations.

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file from `.env.example`
3. Ensure MongoDB is running locally or update MONGODB_URI
4. Start server: `npm run dev`

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout

## Database

Uses MongoDB with Mongoose ORM. Collections:
- Products
- Carts
- Orders
