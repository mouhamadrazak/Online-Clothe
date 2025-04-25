import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers; // getting the token from the headders

  if (!token) {
    // if the token not available
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    // decoding mean extract the token to see id and expire date and the information
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // jwt.verify() checks if the token is valid (i.e., it hasn’t been tampered with and hasn’t expired).
    req.body.userId = token_decode.id; // getting the user Id from the token and add it into decode using that we can update the cart or place the order
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
