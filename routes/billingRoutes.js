const keys = require ('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey); 
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => { 
    // tells express whenever a user makes a reference to this route, heres a reference to the requireLogin function
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500, 
            currency: 'usd', 
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // accessing current user model by req.user - passport assigns user model to request
        req.user.credits += 5; // doesn't save the user 
        const user = await req.user.save(); // saving the user, assigning to user object to ensure we have the latest copy of the user

        res.send(user); // sending user back to browser
    }); 
}; 