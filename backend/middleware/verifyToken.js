export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    // Silent fail - no error logging
    return res.status(200).json({ 
      success: false,
      isAuthenticated: false,
      message: "No active session" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) {
      return res.status(200).json({ 
        success: false,
        isAuthenticated: false,
        message: "Invalid session" 
      });
    }
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Silent handling of all JWT errors
    return res.status(200).json({ 
      success: false,
      isAuthenticated: false,
      message: "Session expired" 
    });
  }
};