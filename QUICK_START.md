# QUICK START GUIDE

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js v14+ installed
- MongoDB (local or Atlas account)

### Step 1: Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecomm
JWT_SECRET=your_jwt_secret_key_min_32_chars_recommended
NODE_ENV=development
```

**Start backend:**
```bash
npm run dev
```

✅ Backend running on http://localhost:5000

---

### Step 2: Frontend Setup

**In a NEW terminal:**

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

---

### Step 3: Seed Sample Data (Optional but Recommended)

**In backend terminal:**

```bash
npm run seed
```

This creates:
- 3 sample users (admin + 2 regular users)
- 12 sample products in different categories

---

### Step 4: Start Testing

Open http://localhost:5173

**Demo Admin Account:**
```
Email: admin@test.com
Password: password123
```

---

## 📋 Quick Feature Test Checklist

- [ ] **Register**: Click Register, create new account
- [ ] **Login**: Login with demo credentials
- [ ] **Browse**: See products on home page
- [ ] **Search**: Search for products
- [ ] **Filter**: Filter by category
- [ ] **View Details**: Click product to see details
- [ ] **Add Cart**: Add product to cart
- [ ] **Cart Count**: See count in navbar increase
- [ ] **Cart Page**: Click cart, see all items
- [ ] **Adjust Qty**: Change quantities
- [ ] **Checkout**: Add address, place order
- [ ] **Orders**: View orders page
- [ ] **Order Detail**: Click order to see details
- [ ] **Admin Panel** (as admin): Click Admin in navbar
- [ ] **Add Product** (as admin): Add new product from form
- [ ] **Delete Product** (as admin): Remove product

---

## 🔧 Common Commands

### Backend
```bash
cd backend

npm install          # Install dependencies
npm run dev         # Start dev server with auto-reload
npm run seed        # Seed sample data to MongoDB
npm start           # Start production server
```

### Frontend
```bash
cd frontend

npm install         # Install dependencies
npm run dev         # Start dev server on 5173
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## 📁 Project Structure

```
ecomm/
├── backend/                 # Express.js API
│   ├── controllers/         # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, error handling
│   ├── server.js           # Main server file
│   ├── seed.js             # Data seeding script
│   └── .env                # Environment config
│
├── frontend/               # React Vite app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth & Cart state
│   │   ├── utils/          # API calls
│   │   └── App.jsx         # Main app component
│   └── index.html          # HTML entry point
│
├── README.md              # Main documentation
├── SETUP_GUIDE.md         # Detailed setup steps
├── ARCHITECTURE.md        # System architecture
├── API_REFERENCE.md       # API endpoints reference
└── QUICK_START.md         # This file
```

---

## 🔌 API Base URL

```
http://localhost:5000/api
```

All endpoints are prefixed with `/api`

Example:
- `POST http://localhost:5000/api/auth/login`
- `GET http://localhost:5000/api/products`
- `POST http://localhost:5000/api/orders`

---

## 📝 Environment Variables

### Backend (.env)

| Variable | Default | Required | Purpose |
|----------|---------|----------|---------|
| PORT | 5000 | ✅ | Server port |
| MONGO_URI | mongodb://localhost:27017/ecomm | ✅ | Database URL |
| JWT_SECRET | (none) | ✅ | Token signing secret |
| NODE_ENV | development | ❌ | Environment type |

### Frontend

No .env file needed. API URL configured in `src/utils/api.js`

---

## 🔐 User Roles

### Regular User
- Browse products
- View product details
- Manage shopping cart
- Create and view orders
- Cannot access admin features

### Admin User
- All user features +
- Add new products
- Update products
- Delete products
- View all orders
- Update order status

---

## 💾 MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install from: https://www.mongodb.com/try/download/community
# Then start MongoDB service

# Windows: MongoDB runs as service automatically
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

Use connection string:
```
mongodb://localhost:27017/ecomm
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/ecomm`
5. Use in .env MONGO_URI

---

## 🧪 Testing Workflows

### Workflow 1: New User Registration
1. Click "Register"
2. Fill form with new credentials
3. Auto-login occurs
4. See username in navbar

### Workflow 2: Shopping
1. Browse home page
2. Search/filter products
3. Click product for details
4. Add to cart
5. Go to cart, adjust quantities
6. Checkout with shipping address
7. Order created ✓

### Workflow 3: Admin Operations
1. Login as admin@test.com
2. Click "Admin" in navbar
3. Click "+ Add Product"
4. Fill product form
5. Click "Add Product"
6. See in product table ✓
7. Can delete from table

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend: Change PORT in .env file
# Frontend: Vite automatically uses next available port
```

### MongoDB Connection Failed
```bash
# Check MONGO_URI in .env
# Ensure MongoDB service is running
# For Atlas: Verify internet connection and IP whitelist
```

### CORS Error
```bash
# Ensure backend runs on http://localhost:5000
# Ensure frontend runs on http://localhost:5173
# Backend is pre-configured for this
```

### Token Issues
```bash
# Clear localStorage: F12 → Application → Local Storage → Clear
# Login again to get fresh token
```

### Products Not Loading
```bash
# Check browser console for errors
# Ensure backend is running
# Check /api/products returns data
# Run npm run seed if no products exist
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Complete project overview |
| QUICK_START.md | This file - fast setup |
| SETUP_GUIDE.md | Detailed step-by-step setup |
| ARCHITECTURE.md | System design & flows |
| API_REFERENCE.md | All API endpoints |

---

## 🎯 Feature Checklist

### ✅ Completed Features

**User Authentication**
- [x] Register new users
- [x] Login with JWT
- [x] Logout functionality
- [x] Protected routes
- [x] Admin role access

**Product Management**
- [x] View all products
- [x] Search products
- [x] Filter by category
- [x] View product details
- [x] Admin: Create product
- [x] Admin: Delete product
- [x] Stock management

**Shopping Cart**
- [x] Add to cart
- [x] Remove from cart
- [x] Update quantities
- [x] Cart count badge
- [x] Cart persistence

**Checkout & Orders**
- [x] Create order from cart
- [x] Calculate total price
- [x] Automatic stock deduction
- [x] Clear cart after checkout
- [x] View order history
- [x] View order details
- [x] Admin: Update order status

**UI/UX**
- [x] Responsive design
- [x] Tailwind CSS styling
- [x] Loading states
- [x] Error messages
- [x] Navigation bar
- [x] Product cards
- [x] Form validation

---

## 🚀 What's Next?

### Potential Enhancements
1. Payment integration (Stripe)
2. Email notifications
3. Product reviews and ratings
4. User wishlist
5. Search filters
6. Product images upload
7. Order tracking
8. Admin analytics dashboard
9. Inventory management
10. User account settings

### Performance Improvements
1. Add pagination
2. Implement caching
3. Optimize images
4. Code splitting
5. Database indexing

### Security Enhancements
1. Rate limiting
2. Input sanitization
3. HTTPS enforcement
4. Security headers
5. SQL injection prevention

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors (F12)
3. Check terminal for backend errors
4. Verify all environment variables are set
5. Ensure ports 5000 and 5173 are available
6. Clear cache and localStorage if needed

---

## ✨ That's It!

You now have a fully functional MERN e-commerce application!

**Start with:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
cd frontend && npm run dev

# Optional: Seed data
# cd backend && npm run seed
```

Then visit: **http://localhost:5173** 🎉

---

**Happy coding! 🚀**
