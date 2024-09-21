const AdminTokenVerification = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader){ 
        // TODO 
        console.log(authHeader);
    } else {
        return req.status(401);
    }
};

module.exports = AdminTokenVerification;