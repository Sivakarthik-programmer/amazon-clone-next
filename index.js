require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
// app.use(cors())
app.use(cors({
    origin: 'https://your-netlify-url.netlify.app'
}))
app.use(express.json()) // parse JSON request body

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Amazon clone backend is running!' })
})

// Routes (we'll add these one by one)
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/payment', require('./routes/payment'))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})