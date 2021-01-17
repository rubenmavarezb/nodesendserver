const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader) {
        //Get token
        const token = authHeader.split(' ')[1];

        try {
            //Verify JWT
            const user = jwt.verify(token, process.env.SECRETWORD);
            req.user = user;
        } catch (error) {
            console.log(error);
            res.status(401).json({msg: "Wrong JWT"});
            return next();
        }

    }

    return next();
}