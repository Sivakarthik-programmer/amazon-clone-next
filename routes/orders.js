const express = require('express')
const Order = require('../models/Order')
const { protect } = require('../middleware/auth')
const router = express.Router()

// @route POST /api/orders
// @desc  Create new order
router.post('/', protect, async (req, res) => {
    try {
        const { items, shippingAddress, totalPrice, paymentResult } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' })
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            totalPrice,
            isPaid: true,
            paidAt: Date.now(),
            paymentResult
        })

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @route GET /api/orders
// @desc  Get logged in user orders
router.get('/', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @route GET /api/orders/:id
// @desc  Get order by id
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router