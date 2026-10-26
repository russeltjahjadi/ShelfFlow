// Description: register new user
// Route: POST /api/users
// acccess type: public
export const registerUser = (req, res) => {
  res.json({ message: "Register User" });
};

// Description: register new user
// Route: POST /api/users/login
// acccess type: public
export const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

// Description: Get user data
// Route: GET /api/users/me
// acccess type: public
export const getMe = (req, res) => {
  res.json({ message: "User data display" });
};
