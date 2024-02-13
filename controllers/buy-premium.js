const Razorpay = require('razorpay');

const { createOrder, updateOrder } = require('../services/buy-premium-order');
const { updateUser } = require('../services/user');


exports.createOrder = (req, res, next) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    
        const option = {
            amount: '25000', 
            currency: 'INR',
        };
    
        razorpay.orders.create(option, async (error, order) => {
            if(error) throw error;
            try {

                const orderObj = { 
                    orderId: order.id,
                    status: 'PENDING',
                    userId: req.user.id,
                }

                await createOrder({ orderObj });
                res.json({order, key : razorpay.key_id});

            } catch (error) {
                console.log(error);
                res.status(500).json({message: error.message});
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error creating order'});    
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const {orderId, paymentId} = req.body;
        
        const status = paymentId ? 'SUCCESS' : 'FAILED';
        await updateOrder({ orderId, status, paymentId });

        const isPremium = paymentId ? true : false;
        await updateUser({ userId: req.user.id, isPremium });

        res.json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error updating order'});
    }
}