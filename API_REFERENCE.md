# API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication Headers
All protected endpoints require:
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Authentication Endpoints

### Register User
Create a new user account.

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exists"
}
```

---

### Login User
Authenticate user and receive JWT token.

```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Invalid email or password"
}
```

---

### Get User Profile
Retrieve current user profile and cart.

```
GET /auth/profile
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "cart": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "productId": {
          "_id": "507f1f77bcf86cd799439013",
          "name": "Laptop",
          "price": 1200,
          "image": "..."
        },
        "quantity": 2
      }
    ]
  }
}
```

---

## Product Endpoints

### Get All Products
Retrieve all products with optional filtering.

```
GET /products
GET /products?category=Electronics
GET /products?search=laptop
GET /products?category=Electronics&search=gaming
```

**Success Response (200):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "MacBook Pro",
      "description": "High performance laptop",
      "price": 1999,
      "category": "Electronics",
      "stock": 10,
      "image": "https://...",
      "rating": 4.5,
      "reviews": 128,
      "createdAt": "2024-01-09T10:00:00Z",
      "updatedAt": "2024-01-09T10:00:00Z"
    }
  ]
}
```

---

### Get Single Product
Retrieve details for a specific product.

```
GET /products/:id
```

**Parameters:**
- `id` (string, required) - Product ID

**Success Response (200):**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "MacBook Pro",
    "description": "High performance laptop",
    "price": 1999,
    "category": "Electronics",
    "stock": 10,
    "image": "https://...",
    "rating": 4.5,
    "reviews": 128,
    "createdAt": "2024-01-09T10:00:00Z",
    "updatedAt": "2024-01-09T10:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "message": "Product not found"
}
```

---

### Create Product (Admin Only)
Create a new product.

```
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "image": "https://..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "image": "https://...",
    "rating": 0,
    "reviews": 0,
    "createdAt": "2024-01-09T10:00:00Z"
  }
}
```

**Error Response (403):**
```json
{
  "message": "Admin access required"
}
```

---

### Update Product (Admin Only)
Update product details.

```
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Product",
  "price": 89.99,
  "stock": 100
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": { ... }
}
```

---

### Delete Product (Admin Only)
Delete a product.

```
DELETE /products/:id
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Cart Endpoints

### Add to Cart
Add a product to user's cart.

```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Added to cart",
  "cart": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ]
}
```

---

### Remove from Cart
Remove a product from cart.

```
POST /cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Removed from cart",
  "cart": [...]
}
```

---

### Update Cart Quantity
Update quantity of a product in cart.

```
PUT /cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart updated",
  "cart": [...]
}
```

---

### Get Cart
Retrieve user's cart with populated product details.

```
GET /cart
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "cart": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "productId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "MacBook Pro",
        "price": 1999,
        "image": "https://..."
      },
      "quantity": 2
    }
  ]
}
```

---

### Clear Cart
Remove all items from cart.

```
DELETE /cart/clear
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## Order Endpoints

### Create Order
Create an order from current cart.

```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": "123 Main St, New York, NY 10001"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439013",
        "productName": "MacBook Pro",
        "price": 1999,
        "quantity": 1
      }
    ],
    "totalPrice": 1999,
    "status": "pending",
    "paymentStatus": "pending",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "createdAt": "2024-01-09T10:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Insufficient stock for MacBook Pro"
}
```

---

### Get User Orders
Retrieve all orders for current user.

```
GET /orders
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "items": [...],
      "totalPrice": 1999,
      "status": "pending",
      "paymentStatus": "pending",
      "shippingAddress": "123 Main St, New York, NY 10001",
      "createdAt": "2024-01-09T10:00:00Z"
    }
  ]
}
```

---

### Get Order Details
Retrieve details for a specific order.

```
GET /orders/:id
Authorization: Bearer <token>
```

**Parameters:**
- `id` (string, required) - Order ID

**Success Response (200):**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "productId": { ... },
        "productName": "MacBook Pro",
        "price": 1999,
        "quantity": 1
      }
    ],
    "totalPrice": 1999,
    "status": "pending",
    "paymentStatus": "pending",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "createdAt": "2024-01-09T10:00:00Z"
  }
}
```

---

### Update Order Status (Admin Only)
Update the status of an order.

```
PUT /orders/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped"
}
```

**Parameters:**
- `status` (string, required) - One of: pending, confirmed, shipped, delivered, cancelled

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order status updated",
  "order": { ... }
}
```

---

### Get All Orders (Admin Only)
Retrieve all orders from all users.

```
GET /orders/all
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [...],
      "totalPrice": 1999,
      "status": "pending",
      "paymentStatus": "pending",
      "shippingAddress": "...",
      "createdAt": "2024-01-09T10:00:00Z"
    }
  ]
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Not authorized (admin access required) |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error |

---

## Token Usage

### JWT Token Format
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA0ODMwMDAwLCJleHAiOjE3MDU0MzQ4MDB9.
abc123...
```

### Using Token in Requests

**JavaScript/Axios:**
```javascript
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

axios.get('/api/orders', { headers });
```

**cURL:**
```bash
curl -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     http://localhost:5000/api/orders
```

**Postman:**
1. Go to "Authorization" tab
2. Select "Bearer Token"
3. Paste token in the token field

---

## Error Handling

### Example Error Response
```json
{
  "message": "Product not found",
  "error": "Specific error details"
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "No token provided" | Missing Authorization header | Add Authorization header |
| "Invalid token" | Token expired or malformed | Login again to get new token |
| "Admin access required" | Non-admin user accessing admin endpoint | Login as admin user |
| "User already exists" | Email already registered | Use different email |
| "Insufficient stock" | Not enough product stock | Request lower quantity |

---

## Rate Limiting (Optional Future Feature)

Currently not implemented but recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user
- Implement using express-rate-limit middleware

---

## Example Request/Response Flow

### 1. Register
```bash
POST /api/auth/register
→ Get token
→ Store in localStorage
```

### 2. Get Products
```bash
GET /api/products
→ Display product list
```

### 3. Add to Cart
```bash
POST /api/cart/add
→ Product added to backend cart
→ Get updated cart
```

### 4. Checkout
```bash
POST /api/orders
→ Order created
→ Stock decreased
→ Cart cleared
→ Get order confirmation
```

### 5. View Orders
```bash
GET /api/orders
→ Display user's orders
→ Click order to get details
```
