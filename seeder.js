require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')
const connectDB = require('./config/db')

const products = [
    {
        name: 'iPhone 15 Pro',
        description: 'Latest Apple iPhone with A17 Pro chip',
        price: 134900,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        category: 'Electronics',
        stock: 50,
        rating: 4.8,
        numReviews: 120
    },
    {
        name: 'Samsung 65" 4K TV',
        description: 'Crystal clear 4K display with smart features',
        price: 89999,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
        category: 'Electronics',
        stock: 20,
        rating: 4.5,
        numReviews: 85
    },
    {
        name: 'Nike Air Max',
        description: 'Comfortable running shoes with air cushioning',
        price: 12999,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category: 'Footwear',
        stock: 100,
        rating: 4.6,
        numReviews: 200
    },
    {
        name: 'MacBook Air M2',
        description: 'Supercharged by M2 chip, ultra thin design',
        price: 114900,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        category: 'Electronics',
        stock: 30,
        rating: 4.9,
        numReviews: 150
    },
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry leading noise cancelling headphones',
        price: 29990,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
        category: 'Electronics',
        stock: 45,
        rating: 4.7,
        numReviews: 95
    },
    {
        name: 'Levi\'s 501 Jeans',
        description: 'Classic straight fit jeans — timeless style',
        price: 3999,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        category: 'Clothing',
        stock: 200,
        rating: 4.4,
        numReviews: 310
    },
    {
        name: 'Kindle Paperwhite',
        description: 'Waterproof e-reader with 6.8" display',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
        category: 'Electronics',
        stock: 60,
        rating: 4.6,
        numReviews: 175
    },
    {
        name: 'Instant Pot Duo',
        description: '7-in-1 electric pressure cooker',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
        category: 'Kitchen',
        stock: 80,
        rating: 4.5,
        numReviews: 420
    }
]

const seedProducts = async () => {
    try {
        await connectDB()
        await Product.deleteMany()  // clear existing products
        await Product.insertMany(products)
        console.log('Products seeded successfully!')
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

seedProducts()