# MERN E-Commerce Setup Instructions

## Quick Start (5 minutes)

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecomm
JWT_SECRET=your_secure_jwt_secret_key_min_32_chars_long
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace in MONGO_URI: `mongodb+srv://username:password@cluster.mongodb.net/ecomm`

**For Local MongoDB:**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use default: `mongodb://localhost:27017/ecomm`

Start backend:
```bash
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

### Step 2: Frontend Setup

In a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Access Application

1. Open http://localhost:5173 in browser
2. You'll see the e-commerce home page
3. Ready to test!

---

## Testing All Features

### Test 1: User Registration

Steps:
1. Click "Register" button in navbar
2. Fill in:
   - Name: "John Doe"
   - Email: "john@test.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Click "Register"

Expected:
- ✅ New user created
- ✅ Auto-logged in
- ✅ Redirected to home page
- ✅ Username shows in navbar

### Test 2: User Login

Steps:
1. Click "Logout" (if logged in) or "Login" button
2. Use demo admin credentials:
   - Email: `admin@test.com`
   - Password: `password123`
3. Click "Login"

Expected:
- ✅ Logged in successfully
- ✅ "Hello, admin" appears in navbar
- ✅ "Admin" link visible for admin role

### Test 3: Browse Products

Prerequisites: Must have at least one product in database

Steps:
1. On home page, scroll to see products
2. Try search: type "laptop" in search box
3. Try category filter: select a category from dropdown
4. Click product card "View" button

Expected:
- ✅ Products display in grid
- ✅ Search filters results
- ✅ Category filter works
- ✅ Product detail page loads

### Test 4: Add to Cart

Steps:
1. On product detail page
2. Adjust quantity using +/- buttons
3. Click "Add to Cart" button
4. Confirm dialog appears

Expected:
- ✅ Product added to cart
- ✅ Cart count in navbar increases
- ✅ Success message appears

### Test 5: View Cart

Steps:
1. Click "Cart" in navbar
2. See all items with prices
3. Adjust quantities
4. Remove items

Expected:
- ✅ All cart items display
- ✅ Total price calculates correctly
- ✅ Quantity changes update total
- ✅ Remove button works

### Test 6: Checkout

Steps:
1. On cart page with items
2. Enter shipping address
3. Click "Checkout"
4. Wait for confirmation

Expected:
- ✅ Order created
- ✅ Cart cleared
- ✅ Redirected to order details
- ✅ Order status is "pending"

### Test 7: View Orders

Steps:
1. Click "Orders" in navbar
2. See list of your orders
3. Click on any order

Expected:
- ✅ Orders list displays
- ✅ Order details page shows:
  - Order ID
  - Order date
  - Status
  - Items with quantities and prices
  - Total amount
  - Shipping address

### Test 8: Admin - Product Management

Prerequisites: Must be logged in as admin

Steps:
1. Click "Admin" in navbar
2. Click "+ Add Product" button
3. Fill in:
   - Name: "Test Product"
   - Description: "This is a test product"
   - Price: "99.99"
   - Category: "Test"
   - Stock: "50"
   - Image URL: (leave empty for placeholder)
4. Click "Add Product"
5. See product in table

Expected:
- ✅ Product form displays
- ✅ Product added successfully
- ✅ Product appears in table
- ✅ Can delete product from table

---

## API Testing (Using Postman or cURL)

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### Login User
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get All Products
```bash
GET http://localhost:5000/api/products
```

With filters:
```bash
GET http://localhost:5000/api/products?category=Electronics&search=laptop
```

### Add Product to Cart
```bash
POST http://localhost:5000/api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Get Cart
```bash
GET http://localhost:5000/api/cart
Authorization: Bearer <token>
```

### Create Order
```bash
POST http://localhost:5000/api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": "123 Main St, New York, NY 10001"
}
```

### Get User Orders
```bash
GET http://localhost:5000/api/orders
Authorization: Bearer <token>
```

---

## Troubleshooting

### Problem: "Cannot find module" errors

Solution:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: MongoDB connection refused

Solution:
- Ensure MongoDB is running
- Check MONGO_URI in .env
- For local: `mongodb://localhost:27017/ecomm`
- For Atlas: Verify username/password in connection string

### Problem: CORS error when calling API

Solution:
- Ensure backend is running on http://localhost:5000
- Ensure frontend is running on http://localhost:5173
- Backend is configured to accept frontend origin

### Problem: Cart not syncing between pages

Solution:
- Clear localStorage: Open DevTools → Application → Local Storage → Clear
- Refresh page

### Problem: Products not appearing on home page

Solution:
1. Ensure backend is running
2. Check browser console for errors
3. Open DevTools → Network tab
4. Check if /api/products request succeeds
5. Check if products exist in MongoDB

### Problem: Login/Register not working

Solution:
1. Check browser console for error messages
2. Ensure backend is running
3. Verify .env variables are correct
4. Try clearing localStorage and refreshing

### Problem: Admin features not visible

Solution:
- Must be logged in with admin account
- Demo admin: email: admin@test.com, password: password123
- Check user.role is "admin" in localStorage

---

## Environment Variables Explanation

### Backend (.env)

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Backend server port | 5000 |
| MONGO_URI | Database connection string | mongodb://localhost:27017/ecomm |
| JWT_SECRET | Secret for signing JWT tokens | your_secret_key_min_32_chars |
| NODE_ENV | Environment type | development |

### Frontend

API base URL is hardcoded in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

To change for production:
1. Open `src/utils/api.js`
2. Change API_BASE_URL to your backend URL
3. Rebuild: `npm run build`

---

## Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string (32+ characters)
- [ ] Set NODE_ENV to "production"
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS for all connections
- [ ] Update frontend API_BASE_URL to production backend
- [ ] Add input validation and sanitization
- [ ] Remove debug logs
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Add request logging/monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Enable database backups

---

## File Structure Overview

### Backend Routes

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/profile         - Get user profile

GET    /api/products             - List all products
GET    /api/products/:id         - Get single product
POST   /api/products             - Create product (admin)
PUT    /api/products/:id         - Update product (admin)
DELETE /api/products/:id         - Delete product (admin)

POST   /api/cart/add             - Add to cart
POST   /api/cart/remove          - Remove from cart
PUT    /api/cart/update          - Update quantity
GET    /api/cart                 - Get cart
DELETE /api/cart/clear           - Clear cart

POST   /api/orders               - Create order
GET    /api/orders               - Get user orders
GET    /api/orders/:id           - Get order details
PUT    /api/orders/:id           - Update status (admin)
GET    /api/orders/all           - Get all orders (admin)
```

### Frontend Routes

```
/                    - Home (product listing)
/login               - Login page
/register            - Register page
/product/:id         - Product details
/cart                - Shopping cart
/orders              - User orders list
/orders/:id          - Order details
/admin/products      - Admin product management
```

---

## Next Steps

1. ✅ Run the application
2. ✅ Test all features as per testing guide
3. ✅ Review code structure
4. ✅ Customize styles if needed
5. ✅ Deploy to production
6. ✅ Set up monitoring and logging
7. ✅ Add payment integration (Stripe/PayPal)
8. ✅ Implement email notifications

---

**Happy coding! 🚀**
