import { verifyToken } from "../tokens/token.js";

//middleware to verify authentication
const verifyAuthentication = (req, res, next) => {
    const token = req.cookies && req.cookies.access_token; //holding the stored token in the cookies
    if(!token) {
        req.user = null;
        return next();
    }

    try {
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        console.log(`req.user in verifyToken middleware:`, req.user);
    } catch (error) {
        console.error("Token verification error:", error);
        req.user = null;
    }

    return next();
}

export default verifyAuthentication;