# Application Flow & Navigation Map

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                      USER JOURNEY FLOWS                             │
└─────────────────────────────────────────────────────────────────────┘

FIRST-TIME USER FLOW:
─────────────────────

   Landing Page (/)
        ↓
   Can't access protected pages
        ↓
   Clicks "Register"
        ↓
   Registration Form (/register)
   - Name
   - Email
   - Password
        ↓
   Submit → Backend validates & creates user
        ↓
   Auto-login with JWT token
        ↓
   Redirected to Home ✅
        ↓
   User stored in localStorage
   Token stored in localStorage

─────────────────────────────────────────────────────────────────────

RETURNING USER FLOW:
────────────────────

   Page loads
        ↓
   Check localStorage for token
        ↓
   Token found → AuthContext updated
        ↓
   Show authenticated navbar
        ↓
   User can access all features
        ↓
   Click "Logout" → Clear token & redirect to login

─────────────────────────────────────────────────────────────────────

SHOPPING FLOW:
──────────────

   Home (/)
   [Navbar: Home | Cart(0) | Login | Register]
        ↓
   Login or Register
        ↓
   Home (authenticated)
   [Navbar: Home | Cart(0) | Orders | Logout]
        ↓
   Search/Filter Products
        ↓
   Click Product → ProductDetail (/product/:id)
        ↓
   View Details & Reviews
        ↓
   Select Quantity
        ↓
   "Add to Cart" → localStorage updated
   [Navbar: Cart(1) - updated badge]
        ↓
   Continue Shopping OR Click "Cart"
        ↓
   Cart Page (/cart)
   - See all items with prices
   - Adjust quantities
   - Remove items
   - View total
        ↓
   Enter Shipping Address
        ↓
   "Checkout" → Create Order
        ↓
   Order Created ✅
   [Status: pending]
   Cart cleared
        ↓
   OrderDetail (/orders/:id)
        ↓
   Can go to Orders list to see history

─────────────────────────────────────────────────────────────────────

ADMIN FLOW:
───────────

   Login as admin@test.com
        ↓
   Home Page
   [Navbar shows "Admin" link]
        ↓
   Click "Admin"
        ↓
   AdminProducts (/admin/products)
        ↓
   Click "+ Add Product"
        ↓
   Form expands:
   - Product Name
   - Description
   - Price
   - Category
   - Stock
   - Image URL
        ↓
   Submit → Product added to DB
        ↓
   Product appears in table
        ↓
   Can Delete from table
   [Confirms before deletion]
        ↓
   New product visible in home page

```

---

## Navigation Map

```
┌──────────────────────────────────────────────────────────────┐
│                   NAVIGATION STRUCTURE                       │
└──────────────────────────────────────────────────────────────┘

Public Routes (Anyone can access):
──────────────────────────────────
  /                     → Home Page (Products)
  /login                → Login Page
  /register             → Register Page
  /product/:id          → Product Details

Protected Routes (Must be logged in):
──────────────────────────────────────
  /cart                 → Shopping Cart
  /orders               → User Orders List
  /orders/:id           → Order Details

Admin Routes (Must be logged in as admin):
───────────────────────────────────────────
  /admin/products       → Product Management

Authentication Flow:
───────────────────
  1. User on public page
  2. Click "Register" or "Login"
  3. Submit credentials
  4. Backend validates & returns token
  5. Frontend stores token in localStorage
  6. AuthContext updated with user data
  7. User can now access protected routes
  8. Token included in all API requests via Axios interceptor

Token Flow:
──────────
  1. User logs in/registers
  2. Backend returns JWT token
  3. Frontend stores in localStorage
  4. On page refresh: Check localStorage for token
  5. If found: AuthContext loads user data
  6. Axios interceptor adds token to all requests
  7. Backend middleware validates token
  8. If valid: Allow request
  9. If invalid: Return 401 → Frontend redirects to login
```

---

## API Call Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   API CALL FLOW                              │
└──────────────────────────────────────────────────────────────┘

FRONTEND REQUEST FLOW:
──────────────────────

  User Action
     ↓
  Component calls API function (from apiCalls.js)
     ↓
  Axios instance (api.js) intercepts request
     ↓
  Add Authorization header with token from localStorage
     ↓
  POST/GET/PUT/DELETE request to backend
     ↓
  HTTP Request to http://localhost:5000/api/*

BACKEND REQUEST FLOW:
─────────────────────

  Backend receives request
     ↓
  Route matches (e.g., POST /api/auth/login)
     ↓
  If route needs auth: authMiddleware
     └─ Check Authorization header
     └─ Verify JWT token
     └─ Extract user ID & role
     └─ Set req.userId & req.userRole
     └─ Pass to controller
     ↓
  If route needs admin: adminMiddleware
     └─ Check req.userRole === 'admin'
     └─ If not admin: Return 403 Forbidden
     └─ If admin: Pass to controller
     ↓
  Controller executes business logic
     └─ Validate input
     └─ Query database
     └─ Process data
     └─ Return response
     ↓
  If error: errorHandler middleware
     └─ Format error response
     └─ Return error to frontend
     ↓
  Success Response to Frontend
  {
    "success": true,
    "message": "...",
    "data": {...}
  }

FRONTEND RESPONSE HANDLING:
───────────────────────────

  Receive response
     ↓
  Check response.status (200, 201, 400, 401, 403, 404, 500)
     ↓
  Success (200-201):
     └─ Update component state
     └─ Update Context state
     └─ Show success message
     └─ Redirect if needed
     ↓
  Error (400, 404, 500):
     └─ Show error message to user
     └─ Stay on same page
     └─ Allow retry
     ↓
  Authentication Error (401):
     └─ Clear token from localStorage
     └─ Update AuthContext
     └─ Redirect to login
     ↓
  Authorization Error (403):
     └─ Show "Access Denied" message
     └─ Redirect to home

ERROR HANDLING FLOW:
────────────────────

  Frontend Error
     ↓
  Catch in try-catch
     ↓
  Check error.response
     ↓
  Extract error message
     ↓
  If 401: Logout & redirect
  If 403: Show access denied
  If 4xx: Show validation error
  If 5xx: Show server error
     ↓
  Display ErrorMessage component
     ↓
  User can dismiss or retry
```

---

## State Management Flow

```
┌──────────────────────────────────────────────────────────────┐
│            STATE MANAGEMENT (Context API)                    │
└──────────────────────────────────────────────────────────────┘

AUTHENTICATION STATE (AuthContext):
──────────────────────────────────

  Initial State:
  ┌─────────────────────────────┐
  │ user: null                  │
  │ token: null                 │
  │ loading: false              │
  └─────────────────────────────┘
       ↓
  User loads app
       ↓
  Check localStorage for token
       ↓
  If found:
     └─ Set token
     └─ Set user data
     └─ Show authenticated UI
  If not found:
     └─ Show login/register buttons
       ↓
  User logs in/registers
       ↓
  Backend returns token & user data
       ↓
  login() function called:
  ┌─────────────────────────────┐
  │ setUser(userData)           │
  │ setToken(token)             │
  │ localStorage.setItem()      │
  └─────────────────────────────┘
       ↓
  Navbar updates (shows username, Logout button)
  Protected routes now accessible
       ↓
  User clicks Logout
       ↓
  logout() function called:
  ┌─────────────────────────────┐
  │ setUser(null)               │
  │ setToken(null)              │
  │ localStorage.removeItem()   │
  └─────────────────────────────┘
       ↓
  Authenticated UI hidden
  Redirect to login page


CART STATE (CartContext):
────────────────────────

  Initial State:
  ┌─────────────────────────────┐
  │ cart: []                    │
  │ cartCount: 0                │
  └─────────────────────────────┘
       ↓
  User adds product to cart
       ↓
  addToCart() called:
  ┌─────────────────────────────┐
  │ Check if in cart            │
  │ If yes: increase quantity   │
  │ If no: add new item         │
  │ Calculate cartCount         │
  │ Save to localStorage        │
  │ Update state                │
  └─────────────────────────────┘
       ↓
  Navbar badge updates to show count
       ↓
  User adjusts quantity
       ↓
  updateQuantity() called:
  ┌─────────────────────────────┐
  │ Update item quantity        │
  │ Recalculate cartCount       │
  │ Save to localStorage        │
  │ Update state                │
  └─────────────────────────────┘
       ↓
  User removes item
       ↓
  removeFromCart() called:
  ┌─────────────────────────────┐
  │ Filter out item             │
  │ Recalculate cartCount       │
  │ Save to localStorage        │
  │ Update state                │
  └─────────────────────────────┘
       ↓
  User completes checkout
       ↓
  clearCart() called:
  ┌─────────────────────────────┐
  │ cart = []                   │
  │ cartCount = 0               │
  │ localStorage cleared        │
  │ Update state                │
  └─────────────────────────────┘
       ↓
  Cart badge disappears
  Cart page shows "Cart is empty"

CONTEXT AVAILABILITY:
─────────────────────

  All Components
        ↓
  Wrapped in AuthProvider (App.jsx)
        ↓
  Can use useAuth() hook
        ↓
  Get { user, token, login, logout }
        ↓
  Update navbar based on auth state
        ↓
  Protect routes based on token

  All Components
        ↓
  Wrapped in CartProvider (App.jsx)
        ↓
  Can use useCart() hook
        ↓
  Get { cart, cartCount, addToCart, removeFromCart, ... }
        ↓
  Update cart count badge
        ↓
  Sync cart with localStorage
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    DATA FLOW                                 │
└──────────────────────────────────────────────────────────────┘

PRODUCT FLOW:
─────────────

  Home Page Loads
     ↓
  GET /api/products (with optional filters)
     ↓
  Backend queries MongoDB
     ↓
  Returns array of products
     ↓
  Frontend displays in grid
     ↓
  User clicks product card
     ↓
  GET /api/products/:id
     ↓
  Display full details
     ↓
  User adds to cart
     ↓
  Add to localStorage (frontend)
  + POST /api/cart/add (backend - optional, for sync)


CART & CHECKOUT FLOW:
─────────────────────

  User adds products
     ↓
  Cart stored in localStorage (frontend)
  CartContext state updated
     ↓
  User navigates to /cart
     ↓
  Display cart items from CartContext
     ↓
  User adjusts quantities
     ↓
  CartContext updated
     ↓
  User enters shipping address
     ↓
  Clicks "Checkout"
     ↓
  POST /api/orders
     ↓
  Backend receives:
     - userId (from JWT)
     - shippingAddress
     - uses cart from user in database
     ↓
  Backend validates:
     - Each product exists
     - Stock available
     ↓
  Deduct stock from each product
     ↓
  Create Order document
     ↓
  Clear user.cart in database
     ↓
  Return order details
     ↓
  Frontend clears localStorage cart
     ↓
  Update CartContext (cart = [])
     ↓
  Display order confirmation


ORDER FLOW:
──────────

  User clicks "Orders" in navbar
     ↓
  GET /api/orders (for current user)
     ↓
  Backend queries Order collection
     └─ Filter by userId
     └─ Populate product details
     ↓
  Display orders list
     ↓
  User clicks order
     ↓
  GET /api/orders/:id
     ↓
  Backend validates user owns order
     ↓
  Return order with full details
     ↓
  Display order information
  - Order ID
  - Date
  - Status
  - Items with prices
  - Total amount
  - Shipping address


ADMIN PRODUCT FLOW:
───────────────────

  Admin clicks "Admin" link
     ↓
  Navigate to /admin/products
     ↓
  GET /api/products
     ↓
  Display all products in table
     ↓
  Admin clicks "+ Add Product"
     ↓
  Form appears with fields:
  - Name
  - Description
  - Price
  - Category
  - Stock
  - Image URL
     ↓
  Admin fills form & submits
     ↓
  POST /api/products
     └─ Includes authMiddleware
     └─ Includes adminMiddleware
     ↓
  Backend validates input
     ↓
  Create Product document
     ↓
  Return success response
     ↓
  Frontend updates table
     ↓
  New product visible
     ↓
  Admin can delete:
     └─ Click "Delete" button
     └─ Confirm dialog
     └─ DELETE /api/products/:id
     └─ Backend validates admin
     └─ Remove from database
     └─ Return success
     └─ Frontend removes from table
```

---

## Component Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│              COMPONENT STRUCTURE                             │
└──────────────────────────────────────────────────────────────┘

App
├── AuthProvider
│   └── CartProvider
│       ├── Navbar
│       │   ├── Links (Home, Cart, Orders, Admin)
│       │   └── Auth Status (Login/Register or Username/Logout)
│       │
│       ├── Routes
│       │   ├── / (Home)
│       │   │   ├── Search Bar
│       │   │   ├── Category Filter
│       │   │   └── ProductCard (grid)
│       │   │       ├── Image
│       │   │       ├── Name
│       │   │       ├── Price
│       │   │       └── Buttons (View, Add Cart)
│       │   │
│       │   ├── /login
│       │   │   └── LoginForm
│       │   │
│       │   ├── /register
│       │   │   └── RegisterForm
│       │   │
│       │   ├── /product/:id
│       │   │   ├── Image
│       │   │   ├── Details
│       │   │   ├── Price
│       │   │   ├── Quantity Selector
│       │   │   └── Add to Cart Button
│       │   │
│       │   ├── /cart (Protected)
│       │   │   ├── Cart Items List
│       │   │   │   ├── Item Card (with quantity controls)
│       │   │   │   └── Remove Button
│       │   │   └── Order Summary
│       │   │       ├── Subtotal
│       │   │       ├── Shipping
│       │   │       ├── Total
│       │   │       ├── Shipping Address Input
│       │   │       └── Checkout Button
│       │   │
│       │   ├── /orders (Protected)
│       │   │   └── Order Cards
│       │   │       ├── Order ID
│       │   │       ├── Date
│       │   │       ├── Status Badge
│       │   │       ├── Item Count
│       │   │       ├── Total
│       │   │       └── View Link
│       │   │
│       │   ├── /orders/:id (Protected)
│       │   │   ├── Order Header (ID, Date, Status)
│       │   │   ├── Shipping Address
│       │   │   ├── Items Table
│       │   │   └── Total Summary
│       │   │
│       │   └── /admin/products (Protected + Admin)
│       │       ├── Add Product Form (toggleable)
│       │       │   ├── Name Input
│       │       │   ├── Description Input
│       │       │   ├── Price Input
│       │       │   ├── Category Input
│       │       │   ├── Stock Input
│       │       │   ├── Image URL Input
│       │       │   └── Submit Button
│       │       │
│       │       └── Products Table
│       │           ├── Name Column
│       │           ├── Category Column
│       │           ├── Price Column
│       │           ├── Stock Column
│       │           └── Delete Button Column
│       │
│       ├── Loading (Loading Spinner)
│       │   └── Animated Spinner
│       │
│       └── ErrorMessage
│           ├── Error Text
│           └── Dismiss Button

Hooks Used:
───────────
- useAuth() → Access AuthContext
- useCart() → Access CartContext
- useNavigate() → Navigation
- useState() → Component state
- useEffect() → Side effects
- useParams() → Route parameters
```

---

## Authentication & Authorization Flow

```
┌──────────────────────────────────────────────────────────────┐
│         SECURITY: Authentication & Authorization             │
└──────────────────────────────────────────────────────────────┘

REGISTRATION:
─────────────

User fills form → POST /api/auth/register
     ↓
Backend:
  1. Validate all fields present
  2. Check password === confirmPassword
  3. Check email not already registered
  4. Hash password with bcrypt
  5. Create User in MongoDB
  6. Generate JWT token (valid 7 days)
  7. Return token + user data
     ↓
Frontend:
  1. Store token in localStorage
  2. Store user data in localStorage
  3. Update AuthContext
  4. Redirect to home
     ↓
Auto-login complete


LOGIN:
──────

User fills form → POST /api/auth/login
     ↓
Backend:
  1. Find user by email
  2. Compare password with bcrypt
  3. If match:
     └─ Generate JWT token
     └─ Return token + user data
  4. If no match:
     └─ Return error
     ↓
Frontend:
  1. Store token + user data
  2. Update AuthContext
  3. Redirect to home
     ↓
Login complete


PROTECTED ROUTES (Frontend):
────────────────────────────

Component renders
     ↓
Check useAuth()
     ↓
If no token:
  └─ ProtectedRoute redirects to /login
     ↓
If token exists:
  └─ Render component


PROTECTED API (Backend):
────────────────────────

Frontend makes request:
  POST /api/orders
  Headers: Authorization: Bearer <token>
     ↓
Backend authMiddleware:
  1. Extract token from headers
  2. Verify JWT signature
  3. Check token not expired
  4. Extract user ID & role
  5. Set req.userId & req.userRole
  6. Pass to controller
     ↓
If token invalid:
  └─ Return 401 Unauthorized
  └─ Frontend clears token
  └─ Frontend redirects to login
     ↓
If token valid:
  └─ Controller receives request with user info
  └─ Execute business logic


ADMIN AUTHORIZATION:
──────────────────

User tries to POST /api/products
     ↓
Backend authMiddleware:
  1. Validate token
  2. Set req.userId & req.userRole
  3. Pass to adminMiddleware
     ↓
Backend adminMiddleware:
  1. Check req.userRole === 'admin'
  2. If not:
     └─ Return 403 Forbidden
  3. If yes:
     └─ Pass to controller
     ↓
Controller executes
(only if user is admin)


TOKEN STRUCTURE (JWT):
──────────────────────

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "id": "507f1f77bcf86cd799439011",  // User ID
  "role": "admin",                    // user or admin
  "iat": 1704830000,                 // issued at
  "exp": 1705434800                  // expiration
}

Signature:
HMACSHA256(
  base64url(header) + "." +
  base64url(payload),
  JWT_SECRET
)


PASSWORD SECURITY:
──────────────────

User password: "password123"
     ↓
Hash with bcrypt (10 rounds):
$2a$10$randomSaltAndHash...
     ↓
Store in database
     ↓
Password never stored in plain text
     ↓
On login:
  1. User enters "password123"
  2. Backend hashes it
  3. Compare with stored hash
  4. Bcrypt handles comparison safely
```

---

## Summary

This map shows:
- ✅ How users navigate through the app
- ✅ How data flows between frontend and backend
- ✅ How state is managed
- ✅ How authentication works
- ✅ How authorization is enforced
- ✅ Component structure and hierarchy
- ✅ API request/response flow

All flows are implemented and fully functional.
