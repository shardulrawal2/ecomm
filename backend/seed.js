require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecomm';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    const users = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@test.com',
        password: 'password123',
        role: 'user',
      },
    ];

    for (let user of users) {
      await User.create(user);
    }

    console.log('✅ Users seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding users:', error.message);
    return false;
  }
};

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    const products = [
      {
        name: 'Noise-Cancelling Headphones',
        description: 'Block out hostel noise and focus on debugging.',
        price: 5999,
        category: 'Electronics',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 342,
      },
      {
        name: 'Smart Desk Lamp',
        description: 'Adjustable brightness for late-night coding.',
        price: 2499,
        category: 'Electronics',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 128,
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Tactile keys for maximum typing satisfaction.',
        price: 7499,
        category: 'Developer Gear',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1587829741300-ba550f3e8ea0?w=300&h=300&fit=crop',
        rating: 4.8,
        reviews: 256,
      },
      {
        name: 'Programmer Hoodie',
        description: 'Looks cool, feels warm, boosts confidence by +10.',
        price: 1999,
        category: 'Developer Gear',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
        rating: 4.4,
        reviews: 189,
      },
      {
        name: 'Laptop Backpack',
        description: 'Carries your laptop, charger, and academic stress.',
        price: 2999,
        category: 'Campus Essentials',
        stock: 18,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 203,
      },
      {
        name: 'Reusable Water Bottle',
        description: 'Stay hydrated during long ACM meetings.',
        price: 799,
        category: 'Campus Essentials',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1602143407151-74815457e721?w=300&h=300&fit=crop',
        rating: 4.3,
        reviews: 145,
      },
      {
        name: 'Debugging Duck',
        description: 'Explain your code to it. Works surprisingly well.',
        price: 499,
        category: 'Fun Tech',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        rating: 4.9,
        reviews: 412,
      },
      {
        name: '404 Error Mug',
        description: 'Coffee not found? Try again.',
        price: 599,
        category: 'Fun Tech',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fc0d63?w=300&h=300&fit=crop',
        rating: 4.7,
        reviews: 267,
      },
    ];

    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding products:', error.message);
    return false;
  }
};

const seed = async () => {
  console.log('🌱 Starting database seeding...\n');

  await connectDB();

  const usersSeeded = await seedUsers();
  const productsSeeded = await seedProducts();

  if (usersSeeded && productsSeeded) {
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('   Email: admin@test.com');
    console.log('   Password: password123');
    console.log('   Role: Admin');
    console.log('\n   Email: john@test.com');
    console.log('   Password: password123');
    console.log('   Role: User');
  } else {
    console.log('\n❌ Database seeding failed');
  }

  await mongoose.disconnect();
  console.log('\n✅ MongoDB disconnected');
};

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
