# MERN E-Commerce Application

A complete, production-ready e-commerce application built with MongoDB, Express.js, React, and Node.js.

## Features

### User Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for authenticated users
- Admin role-based access control

### Product Management (Admin)
- Create, read, update, delete products
- Product categories and search
- Stock management
- Product details with ratings and reviews

### Shopping Cart
- Add/remove products from cart
- Update product quantities
- Cart persistence (localStorage)
- Real-time cart count in navbar

### Orders & Checkout
- Create orders from cart items
- Track order status (pending, confirmed, shipped, delivered, cancelled)
- View order history
- Order details with shipping address and items
- Automatic stock management on checkout

### UI/UX
- Responsive design with Tailwind CSS
- Modern component-based architecture
- Loading and error states
- Search and filter functionality
- Mobile-friendly interface

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Project Structure

```
ecomm/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Loading.jsx
    │   │   └── ErrorMessage.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Orders.jsx
    │   │   ├── OrderDetail.jsx
    │   │   └── AdminProducts.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── apiCalls.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas account)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env file:**
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecomm
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

5. **Start MongoDB:**
   
   **On Windows (if using local MongoDB):**
   ```bash
   mongod
   ```

   **Or use MongoDB Atlas (cloud):**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Replace MONGO_URI in .env

6. **Run backend server:**
   ```bash
   npm run dev
   ```

   Server will start on `http://localhost:5000`

### Frontend Setup

1. **In a new terminal, navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend will start on `http://localhost:5173`

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## Testing Guide

### 1. User Registration

1. Click "Register" in navbar
2. Fill in name, email, password, confirm password
3. Submit form
4. You'll be logged in and redirected to home page

### 2. User Login

1. Click "Login" in navbar
2. Use demo credentials:
   - Email: `admin@test.com`
   - Password: `password123`
3. Or use your registered credentials

### 3. Browse Products

1. On home page, view all products
2. Use search box to find products by name/description
3. Filter by category using the dropdown
4. Click "View" button on any product to see details

### 4. Product Details

1. Click on any product card "View" button
2. See full product details
3. Adjust quantity using +/- buttons
4. Click "Add to Cart"
5. Cart count in navbar updates

### 5. Shopping Cart

1. Click "Cart" in navbar
2. See all items in cart with prices
3. Adjust quantities using +/- buttons
4. Click "Remove" to remove items
5. Enter shipping address
6. Click "Checkout"

### 6. Checkout & Orders

1. After checkout, order is created
2. Cart is cleared automatically
3. Click "Orders" in navbar to see your orders
4. Click on any order to see details
5. View order status, items, and total price

### 7. Admin Panel (Product Management)

1. Login with admin account (admin@test.com / password123)
2. Click "Admin" in navbar
3. Click "+ Add Product" button
4. Fill in product details and submit
5. View all products in table
6. Delete products by clicking "Delete" button

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `POST /api/cart/add` - Add product to cart (protected)
- `POST /api/cart/remove` - Remove product from cart (protected)
- `PUT /api/cart/update` - Update cart quantity (protected)
- `GET /api/cart` - Get user's cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id` - Update order status (admin only)
- `GET /api/orders/all` - Get all orders (admin only)

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running locally OR use MongoDB Atlas
- Check MONGO_URI in .env file
- For local: `mongodb://localhost:27017/ecomm`
- For Atlas: `mongodb+srv://username:password@cluster.mongodb.net/ecomm`

### Issue: CORS Error
**Solution:**
- Check that frontend runs on `http://localhost:5173`
- Check that backend CORS is configured for this origin
- Backend is already configured to accept `http://localhost:5173`

### Issue: Port Already in Use
**Solution:**
- Backend: Change PORT in .env file (e.g., 5001)
- Frontend: Vite will prompt to use different port automatically

### Issue: JWT Token Not Working
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again to get new token
- Ensure JWT_SECRET is set in .env

### Issue: Products Not Loading
**Solution:**
- Check that backend is running
- Check browser console for errors
- Ensure MongoDB has products data
- Verify API endpoints are correct in utils/apiCalls.js

## Database Seed (Optional)

To add sample data, create a seed script or use MongoDB Atlas Data Import. Sample product data:

```javascript
db.products.insertMany([
  {
    name: "Laptop",
    description: "High performance laptop for work and gaming",
    price: 1200,
    category: "Electronics",
    stock: 15,
    image: "https://via.placeholder.com/300x300?text=Laptop"
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with excellent battery life",
    price: 35,
    category: "Electronics",
    stock: 50,
    image: "https://via.placeholder.com/300x300?text=Mouse"
  }
  // Add more products...
])
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT (change in production!)
- `NODE_ENV` - Environment (development/production)

### Frontend
- No .env file needed, uses hardcoded API base URL
- To change API URL, edit `frontend/src/utils/api.js`

## Production Deployment

### Backend (using Heroku)
1. Create Heroku account and install Heroku CLI
2. Set environment variables on Heroku dashboard
3. Push code to Heroku
4. Update frontend API URL to Heroku backend URL

### Frontend (using Vercel)
1. Create Vercel account
2. Connect your GitHub repository
3. Set environment variables if needed
4. Deploy with one click

## Code Quality

- Clean, modular code structure
- Proper error handling throughout
- Input validation on forms
- Loading and error states
- Responsive design
- Comments where needed

## Security Notes

⚠️ **Before Production:**
1. Change JWT_SECRET in .env to a strong random string
2. Use HTTPS for all connections
3. Enable MongoDB authentication
4. Remove debug logging
5. Set NODE_ENV to production
6. Use environment variables for sensitive data
7. Implement rate limiting on API endpoints
8. Add input sanitization for production

## Support & Troubleshooting

If you encounter issues:
1. Check error messages in browser console and terminal
2. Ensure all ports are available
3. Verify environment variables are correctly set
4. Restart both frontend and backend servers
5. Clear browser cache and localStorage if needed

## License

MIT License

## Live Demo
🚀 **Live Demo:** [https://acmazon-demo.vercel.app](https://acmazon-demo.vercel.app)

A fully functional e-commerce demo with:
- Product browsing and search
- Shopping cart with localStorage persistence
- One-click checkout with order creation
- Order history and details
- Admin product management
- Modern dark theme with neon accents

## Deployment Instructions

### Backend (Node.js + Express + MongoDB)
1. **Prerequisites**
   - Node.js 14+ or higher
   - MongoDB (local or Atlas)

2. **Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Run Development**
   ```bash
   npm run dev
   # Server runs on http://localhost:5000
   ```

4. **Run Production**
   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

### Frontend (React + Vite)
1. **Prerequisites**
   - Node.js 14+ or higher
   - npm or yarn

2. **Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Run Development**
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

4. **Build for Production**
   ```bash
   npm run build
   # Builds to dist/ folder
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   # Preview production build locally
   ```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecomm
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
```

#### Frontend
No .env file needed - uses hardcoded API base URL

### Production Deployment Options

#### Option 1: Vercel (Recommended)
1. **Backend**
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Auto-deploys on git push

2. **Frontend**
   - Connect GitHub repository to Vercel
   - Configure build settings
   - Auto-deploys on git push

#### Option 2: Netlify
1. **Backend**
   - Deploy as Netlify Function
   - Configure environment variables
   - Static frontend hosting

2. **Frontend**
   - Build and deploy static files
   - Configure redirects for API calls

#### Option 3: Railway/Render
1. **Backend**
   - Connect GitHub repository
   - Set environment variables
   - Auto-deploys on git push

2. **Frontend**
   - Build and deploy static files
   - Configure API base URL

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run with Docker
docker build -t ecomm-backend .
docker run -p 5000:5000 ecomm-backend
```

### Database Setup

#### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Create database
mongosh

# Insert sample data
node seed.js
```

#### MongoDB Atlas
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update .env with `MONGO_URI`
4. Deploy backend with Atlas URI

### Features Demonstrated
- User authentication (register/login)
- Product catalog with search and filtering
- Shopping cart with localStorage persistence
- One-click checkout with order creation
- Order history and detailed views
- Admin product management
- Responsive design with modern UI
- Error handling and loading states
- Dark theme with neon accents

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Authentication**: bcryptjs, jsonwebtoken
- **Styling**: Tailwind CSS with custom noir/neon theme
- **Deployment**: Vercel, Netlify, Railway, Docker

### Support
For issues or questions:
- Check console logs for error messages
- Verify MongoDB connection in backend terminal
- Ensure frontend API base URL matches backend URL
- Clear browser cache and localStorage if needed
