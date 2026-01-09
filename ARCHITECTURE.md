# MERN E-Commerce Architecture & Flow

## Application Overview

This MERN stack e-commerce application is built with:
- **Backend**: Node.js + Express.js + MongoDB
- **Frontend**: React + Vite + Tailwind CSS
- **Authentication**: JWT tokens with bcrypt password hashing
- **State Management**: Context API (Auth & Cart)
- **Database**: MongoDB with Mongoose ODM

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│  ┌───────────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │   Components  │  │  Pages   │  │   Context (Auth,     │ │
│  │  (Navbar,     │  │  (Home,  │  │    Cart)             │ │
│  │   Cart, etc)  │  │  Cart)   │  └──────────────────────┘ │
│  └───────────────┘  └──────────┘  ┌──────────────────────┐ │
│                                    │   Utilities (API)    │ │
│                                    │   (axios, etc)       │ │
│                                    └──────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                  (HTTP REST API)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  BACKEND (Express.js)                       │
│  ┌──────────────┐  ┌─────────────────────────────────────┐ │
│  │   Routes     │  │     Controllers (Logic Layer)       │ │
│  │  - Auth      │  │  - authController.js                │ │
│  │  - Products  │  │  - productController.js             │ │
│  │  - Cart      │  │  - cartController.js                │ │
│  │  - Orders    │  │  - orderController.js               │ │
│  └──────────────┘  └─────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │           Middleware (Authentication)                │ │
│  │  - JWT verification                                  │ │
│  │  - Admin authorization                               │ │
│  │  - Error handling                                    │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              Mongoose Models                          │ │
│  │  - User (with bcrypt password hashing)               │ │
│  │  - Product                                            │ │
│  │  - Order                                              │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                  (MongoDB Protocol)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    MONGODB DATABASE                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ ┌──────────────┐ │
│  │  Users   │  │ Products │  │  Orders  │ │    Carts     │ │
│  │Collection│  │Collection│  │Collection│ │ (in User doc)│ │
│  └──────────┘  └──────────┘  └──────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### User Registration Flow

```
User clicks Register
      ↓
Registration Form (React)
      ↓
POST /api/auth/register
      ↓
Backend validates input
      ↓
Hash password with bcrypt
      ↓
Create User in MongoDB
      ↓
Generate JWT token
      ↓
Return token + user data
      ↓
Frontend stores token in localStorage
      ↓
Redirect to home page
```

### Shopping Flow

```
Browse Products (Home page)
      ↓
GET /api/products (with filters)
      ↓
Display products in grid
      ↓
User clicks "Add to Cart"
      ↓
Add to localStorage (frontend cart)
      ↓
Update cart count in navbar
      ↓
User navigates to Cart page
      ↓
Display all cart items
      ↓
User adjusts quantities or removes items
      ↓
Enter shipping address
      ↓
Click "Checkout"
      ↓
POST /api/orders (with cart items)
      ↓
Backend validates cart items
      ↓
Check stock availability
      ↓
Create Order in MongoDB
      ↓
Deduct stock from Products
      ↓
Clear user cart in database
      ↓
Return order confirmation
      ↓
Frontend clears localStorage cart
      ↓
Redirect to order details
```

## Authentication Flow

```
Login Credentials
      ↓
POST /api/auth/login
      ↓
Backend finds user by email
      ↓
Compare password with bcrypt
      ↓
If match: Generate JWT token
      ↓
Return token + user data
      ↓
Frontend stores token in localStorage
      ↓
Set Authorization header on all API requests
      ↓
Backend validates JWT on protected routes
      ↓
If valid: Allow request
      ↓
If invalid: Return 401 Unauthorized
```

## Protected Routes

```
Navbar/App.jsx checks token in AuthContext
      ↓
If token exists: Show authenticated UI
      ↓
User tries to access protected route (Cart, Orders, Admin)
      ↓
ProtectedRoute component checks if token exists
      ↓
If no token: Redirect to /login
      ↓
If token exists: Show page
      ↓
All API requests include token in Authorization header
      ↓
Backend authMiddleware validates token
      ↓
If valid: Execute controller logic
      ↓
If invalid: Return 401 error
```

## Admin Authorization Flow

```
User with role='admin' logs in
      ↓
Token includes role in JWT payload
      ↓
Frontend stores user.role in localStorage
      ↓
Admin link appears in navbar
      ↓
User navigates to /admin/products
      ↓
API request to add/delete/update product
      ↓
Backend checks authMiddleware
      ↓
Then checks adminMiddleware
      ↓
If user.role === 'admin': Allow
      ↓
If user.role !== 'admin': Return 403 Forbidden
```

## Cart System Flow

### Frontend Cart (localStorage)

```
User adds product to cart
      ↓
updateCart function in CartContext
      ↓
Check if product already in cart
      ↓
If yes: Increase quantity
      ↓
If no: Add new item to cart array
      ↓
Calculate cartCount (sum of quantities)
      ↓
Save to localStorage
      ↓
Update CartContext state
      ↓
Components re-render with new cart data
```

### Backend Cart (Database)

```
After checkout:
      ↓
User cart items become Order items
      ↓
Order stored in MongoDB
      ↓
User.cart array cleared
      ↓
Frontend localStorage cleared
      ↓
Cart page shows "Cart is empty"
```

## Order Management Flow

```
Create Order
      ↓
Validate cart not empty
      ↓
Populate product details from cart items
      ↓
Calculate total price
      ↓
Check stock for each item
      ↓
If stock insufficient: Return error
      ↓
Deduct stock from each product
      ↓
Create Order document
      ↓
Set status to 'pending'
      ↓
Clear user cart
      ↓
Return order details
      ↓
     ↓
View Orders (User)
      ↓
GET /api/orders
      ↓
Fetch orders for current user
      ↓
Display order list with status, date, total
      ↓
User clicks order
      ↓
GET /api/orders/:id
      ↓
Display full order details
      ↓
     ↓
Update Order Status (Admin)
      ↓
PUT /api/orders/:id
      ↓
Update status (pending → confirmed → shipped → delivered)
      ↓
Return updated order
```

## Error Handling

```
Frontend Request Error
      ↓
Axios interceptor catches error
      ↓
Check error.response.status
      ↓
401: Token invalid → Logout user
      ↓
403: Not authorized
      ↓
404: Resource not found
      ↓
500: Server error
      ↓
Display ErrorMessage component
      ↓
User can dismiss or retry
```

## State Management

### AuthContext
```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    role: 'user' | 'admin'
  },
  token: string | null,
  loading: boolean,
  login: (userData, token) => void,
  logout: () => void
}
```

### CartContext
```javascript
{
  cart: [
    {
      _id: string,
      name: string,
      price: number,
      quantity: number,
      image: string,
      ...
    }
  ],
  cartCount: number,
  addToCart: (product, quantity) => void,
  removeFromCart: (productId) => void,
  updateQuantity: (productId, quantity) => void,
  clearCart: () => void
}
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  cart: [{
    productId: ObjectId (ref: Product),
    quantity: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  image: String (default: placeholder URL),
  category: String (required),
  stock: Number (required, default: 0),
  rating: Number (0-5, default: 0),
  reviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  items: [{
    productId: ObjectId (ref: Product),
    productName: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number (required),
  status: String (enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  shippingAddress: String (required),
  paymentStatus: String (enum: ['pending', 'completed', 'failed'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_if_auth_endpoint"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "detailed_error_info"
}
```

## Security Features

1. **Password Hashing**: bcryptjs with 10 salt rounds
2. **JWT Authentication**: Tokens expire in 7 days
3. **Protected Routes**: Middleware validates token on protected endpoints
4. **Admin Authorization**: Role-based access control
5. **Input Validation**: Server-side validation on all endpoints
6. **Error Handling**: Generic error messages (don't expose sensitive info)
7. **CORS**: Configured for frontend origin only

## Scalability Considerations

Future improvements:
1. Add payment gateway (Stripe/PayPal)
2. Implement email notifications
3. Add product reviews and ratings
4. Implement search with Elasticsearch
5. Add caching layer (Redis)
6. Implement API rate limiting
7. Add user profiles and wishlist
8. Implement inventory management
9. Add multi-language support
10. Implement analytics and logging

## Performance Optimizations

Current:
- Lazy loading on frontend
- Mongoose lean queries where applicable
- Indexed database fields
- Client-side caching with localStorage

Future:
- Add Redis for session caching
- Implement pagination for product lists
- Add image optimization
- Implement CDN for static assets
- Add database indexing
- Implement API response caching

## Testing Checklist

- [ ] User registration with validation
- [ ] User login with correct/incorrect credentials
- [ ] JWT token verification
- [ ] Protected route access
- [ ] Cart operations (add/remove/update)
- [ ] Product CRUD operations
- [ ] Order creation and stock management
- [ ] Admin authorization
- [ ] Error handling
- [ ] Data persistence across page refreshes
- [ ] Mobile responsiveness
