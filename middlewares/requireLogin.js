// exporting a function that is the middleware

// next is a function we call when our middleware is complete (like 'done' callback)
// passing request onto 'next' middleware in chain 
module.exports = (req, res, next) => {
    // if user is not logged in end request, otherwise pass onto request handler with next()
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' }); 
    }

    next(); 
}