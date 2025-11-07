# Complete Setup Guide

## Step-by-Step Instructions

### Prerequisites
1. Install Node.js from https://nodejs.org/
2. Install MongoDB Community from https://www.mongodb.com/try/download/community
3. Start MongoDB service:
   - **Windows**: MongoDB runs as a service automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Verify MongoDB Connection
\`\`\`bash
mongosh  # or mongo if using older version
\`\`\`
Should connect to localhost:27017

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Edit `.env` (if using MongoDB Atlas):
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
\`\`\`

5. Start backend:
\`\`\`bash
npm run dev
\`\`\`

You should see: `Server running on port 5000` and `MongoDB connected`

### Frontend Setup

1. Open new terminal, navigate to frontend:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

You should see: `VITE v4.x.x  ready in xxx ms`

### Verify Everything Works

1. Open browser: http://localhost:5173
2. Should see "ShopHub" header and 6 products
3. Click "Add to Cart" on any product
4. Click cart icon (should show badge with count)
5. View cart and proceed to checkout
6. Fill in name/email and submit
7. Should see order confirmation

### Using MongoDB Compass (GUI)

1. Download from https://www.mongodb.com/products/compass
2. Open and connect to `mongodb://localhost:27017`
3. Browse collections:
   - `ecommerce.products` - All products
   - `ecommerce.carts` - User carts
   - `ecommerce.orders` - Completed orders

## Common Issues

### "Port 5000 already in use"
\`\`\`bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
\`\`\`

### "MongoDB connection refused"
- Ensure MongoDB service is running
- Check MongoDB is on port 27017: `netstat -an | grep 27017`

### "CORS error in console"
- Restart backend server
- Ensure frontend URL matches CORS config

### "Products not showing"
- Check backend is running
- Check browser Network tab for API errors
- Look for MongoDB error in backend console

## Next Steps

1. Push to GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial e-commerce app"
git remote add origin https://github.com/yourusername/ecommerce-app
git push -u origin main
\`\`\`

2. Deploy backend to Heroku/Railway
3. Deploy frontend to Vercel/Netlify
4. Record demo video showing all features
\`\`\`
