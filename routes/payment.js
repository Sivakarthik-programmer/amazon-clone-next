const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const { protect } = require('../middleware/auth')
const router = express.Router()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// @route POST /api/payment/create-order
// @desc  Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
    try {
        const { amount } = req.body

        const options = {
            amount: amount * 100,  // Razorpay expects paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @route POST /api/payment/verify
// @desc  Verify Razorpay payment
router.post('/verify', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex')

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: 'Payment verified successfully' })
        } else {
            res.status(400).json({ success: false, message: 'Payment verification failed' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router