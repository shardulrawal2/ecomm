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
        name: 'MacBook Pro 14"',
        description:
          'Powerful laptop with M2 Pro chip, 16GB RAM, perfect for professionals and developers',
        price: 1999,
        category: 'Electronics',
        stock: 10,
        image:
          'https://via.placeholder.com/300x300?text=MacBook+Pro',
        rating: 4.5,
        reviews: 128,
      },
      {
        name: 'Dell XPS 13',
        description:
          'Ultra-thin and portable laptop with Intel Core i7, great for business and content creation',
        price: 1299,
        category: 'Electronics',
        stock: 15,
        image:
          'https://via.placeholder.com/300x300?text=Dell+XPS',
        rating: 4.3,
        reviews: 95,
      },
      {
        name: 'Wireless Bluetooth Mouse',
        description:
          'Ergonomic wireless mouse with 24-month battery life and precision tracking',
        price: 35.99,
        category: 'Accessories',
        stock: 50,
        image:
          'https://via.placeholder.com/300x300?text=Wireless+Mouse',
        rating: 4.2,
        reviews: 340,
      },
      {
        name: 'USB-C Hub',
        description:
          '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and charging support',
        price: 49.99,
        category: 'Accessories',
        stock: 30,
        image:
          'https://via.placeholder.com/300x300?text=USB+Hub',
        rating: 4.1,
        reviews: 210,
      },
      {
        name: 'Mechanical Keyboard RGB',
        description:
          'Gaming mechanical keyboard with customizable RGB lighting and Cherry MX switches',
        price: 149.99,
        category: 'Gaming',
        stock: 20,
        image:
          'https://via.placeholder.com/300x300?text=Mechanical+Keyboard',
        rating: 4.6,
        reviews: 520,
      },
      {
        name: 'Gaming Mouse Pad XL',
        description:
          'Large gaming mouse pad with non-slip rubber base, perfect for FPS games',
        price: 29.99,
        category: 'Gaming',
        stock: 40,
        image:
          'https://via.placeholder.com/300x300?text=Mouse+Pad',
        rating: 4.4,
        reviews: 180,
      },
      {
        name: '4K Webcam',
        description:
          'Professional 4K USB webcam with auto-focus and built-in microphone for streaming',
        price: 199.99,
        category: 'Electronics',
        stock: 12,
        image:
          'https://via.placeholder.com/300x300?text=4K+Webcam',
        rating: 4.5,
        reviews: 270,
      },
      {
        name: 'Portable SSD 1TB',
        description:
          'Fast 1TB portable SSD with USB-C, read speeds up to 1050MB/s',
        price: 129.99,
        category: 'Storage',
        stock: 25,
        image:
          'https://via.placeholder.com/300x300?text=Portable+SSD',
        rating: 4.7,
        reviews: 450,
      },
      {
        name: 'Laptop Stand Aluminum',
        description:
          'Adjustable aluminum laptop stand for better ergonomics and airflow',
        price: 59.99,
        category: 'Accessories',
        stock: 35,
        image:
          'https://via.placeholder.com/300x300?text=Laptop+Stand',
        rating: 4.3,
        reviews: 290,
      },
      {
        name: 'USB-C Cable (3 Pack)',
        description:
          'Durable USB-C cables with fast charging and data transfer, 10ft length',
        price: 19.99,
        category: 'Accessories',
        stock: 100,
        image:
          'https://via.placeholder.com/300x300?text=USB+Cables',
        rating: 4.2,
        reviews: 380,
      },
      {
        name: 'Desk Lamp LED',
        description:
          'Eye-caring LED desk lamp with adjustable brightness and color temperature',
        price: 44.99,
        category: 'Office',
        stock: 18,
        image:
          'https://via.placeholder.com/300x300?text=Desk+Lamp',
        rating: 4.4,
        reviews: 165,
      },
      {
        name: 'Monitor Stand with Drawers',
        description:
          'Sturdy monitor stand with storage drawers to save desk space',
        price: 79.99,
        category: 'Office',
        stock: 22,
        image:
          'https://via.placeholder.com/300x300?text=Monitor+Stand',
        rating: 4.5,
        reviews: 220,
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
