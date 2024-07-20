const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;

const auth = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]; // Extract the token after "Bearer"
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // This will include username, email, and id
        console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { auth };
