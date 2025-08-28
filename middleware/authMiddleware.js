import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Protects routes by verifying the JWT token.
 * Adds the user's information (id, role) to the request object.
 */
export const protect = (req, res, next) => {
  let token;

  // Check for the token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user info to the request object
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

/**
 * Authorizes access based on user role.
 * @param {string[]} roles - The roles allowed to access the route.
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role '${req.user.role}' is not authorized to access this route.` });
    }
    next();
  };
};