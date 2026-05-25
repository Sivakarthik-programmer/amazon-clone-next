const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            image: String,
            price: Number,
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    paymentResult: {
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String
    },
    status: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)