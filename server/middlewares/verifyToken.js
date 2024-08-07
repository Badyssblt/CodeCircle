const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({message: 'Veuillez vous connectez'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(403).json({message: 'Token invalide'});
            return;
        }

        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;