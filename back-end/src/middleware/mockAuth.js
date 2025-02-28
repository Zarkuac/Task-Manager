// This middleware bypasses real authentication and sets a mock user
// ONLY FOR DEVELOPMENT/TESTING - REMOVE IN PRODUCTION

export const mockProtect = async (req, res, next) => {
    // Set a mock user ID - this would normally come from JWT verification
    req.user = {
      id: '67c177461b2da30acec034f3', // This should be a valid MongoDB ObjectId format
      username: 'testuser',
      email: 'test@example.com'
    };
    
    next();
  };