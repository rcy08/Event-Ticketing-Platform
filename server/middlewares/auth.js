
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({ errors : { token: 'Not Authorized' } });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User
        .findOne({ _id: decoded.id })
        .populate({
            path: 'events.booked events.organized events.saved',
            model: 'event',
            select: 'title start end reg_start reg_end venue description images rating tags'
        });

    if (!user) {
        return res.status(404).json({ errors : { token: 'User not found' } });
    }

    req.user = user;

    next();
    
}

module.exports = { auth };