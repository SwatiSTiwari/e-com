# E-Commerce Shopping Cart Application

A full-stack e-commerce application built with React, Express.js, and MongoDB. Features a modern UI for browsing products, managing a shopping cart, and processing mock checkouts with order persistence.


## Tech Stack

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **API**: RESTful API with CORS
- **Styling**: Responsive CSS with modern gradients

## Features

✓ Product grid with 6 mock products (Unsplash images)
✓ Add/remove items from cart with quantity controls
✓ Cart persistence per user (session-based)
✓ Order checkout with customer details capture
✓ Mock receipt generation with order confirmation
✓ Responsive design (mobile, tablet, desktop)
✓ MongoDB persistence for products, carts, and orders
✓ Error handling and form validation
✓ Smooth animations and transitions

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas URI)
- npm

## Installation

### 1. Clone and Setup Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file from `.env.example`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
\`\`\`

If using MongoDB Atlas, use your connection string:
\`\`\`
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
\`\`\`

### 2. Setup Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

## Running the Application

### Terminal 1: Start Backend Server

\`\`\`bash
cd backend
npm run dev
\`\`\`

The API will be available at `http://localhost:5000`

### Terminal 2: Start Frontend Dev Server

\`\`\`bash
cd frontend
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

## API Endpoints

### Products
- **GET** `/api/products` - Get all products
  - Returns: Array of products with id, name, price, description, image, category

### Cart
- **GET** `/api/cart` - Get cart items and total
  - Headers: `user-id` (optional)
  - Returns: { userId, items, total }

- **POST** `/api/cart` - Add item to cart
  - Body: `{ productId: number, qty: number }`
  - Returns: Updated cart

- **DELETE** `/api/cart/:id` - Remove item from cart
  - Returns: Updated cart

### Checkout
- **POST** `/api/checkout` - Process checkout
  - Body: `{ customerName, customerEmail, cartItems }`
  - Returns: Order receipt with orderId, total, timestamp

## Database Schema

### Products Collection
\`\`\`javascript
{
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  createdAt: Date
}
\`\`\`

### Carts Collection
\`\`\`javascript
{
  userId: String (unique),
  items: [
    {
      productId: Number,
      quantity: Number,
      price: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Orders Collection
\`\`\`javascript
{
  customerName: String,
  customerEmail: String,
  items: [...],
  total: Number,
  createdAt: Date
}
\`\`\`

## Features Explanation

### Product Management
- 6 pre-loaded products with Unsplash images
- Auto-seeds database on first run
- Category badges for organization
- Real-time price display

### Cart Operations
- Session-based user identification (default-user)
- Add/remove items with quantity controls
- Automatic price calculations
- Real-time updates

### Checkout Process
1. Click "Proceed to Checkout" from cart
2. Enter name and email
3. Review order summary
4. Submit to get order confirmation
5. Cart clears after successful checkout
6. Orders persisted in MongoDB

### Responsive Design
- Mobile: Single column layout
- Tablet: 2-column product grid
- Desktop: 3-column product grid with sticky cart summary

## Bonus Features Implemented

✓ Full database persistence with MongoDB
✓ Error handling and validation on all endpoints
✓ Professional UI/UX with smooth animations
✓ Order history storage
✓ Cart persistence per session
✓ Real product images from Unsplash
✓ Responsive mobile-first design

## Building for Production

### Frontend Build
\`\`\`bash
cd frontend
npm run build
\`\`\`

### Deployment Notes
- Backend can be deployed to Heroku, Railway, or Vercel
- Frontend can be deployed to Vercel, Netlify, or GitHub Pages
- Set `MONGODB_URI` as environment variable in hosting platform
- Update `API_BASE_URL` in frontend for production domain

## Testing the App

1. **Browse Products**: View the product grid on home page
2. **Add Items**: Use quantity controls and "Add to Cart" button
3. **View Cart**: Click cart icon in header
4. **Remove Items**: Click "Remove" button on cart items
5. **Checkout**: Fill in customer info and submit
6. **Verify Order**: Check MongoDB for persisted orders

## Troubleshooting

**"Cannot POST /api/cart"**
- Ensure backend is running on port 5000
- Check CORS is enabled in backend

**"MongoDB connection error"**
- Verify MongoDB is running locally or Atlas URI is correct
- Check `.env` has correct `MONGODB_URI`

**"Products not loading"**
- Check browser console for API errors
- Verify backend is running
- Ensure MongoDB has database access

## License

MIT

## Author

Created as a full-stack e-commerce demonstration project.
