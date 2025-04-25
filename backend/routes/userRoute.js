import express from "express";
import {
  LoginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router(); // this will create one user router and using this router we will get and post method
// this is the path / register
userRouter.post("/register", registerUser); // whenever is post we will call register user
userRouter.post("/login", LoginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
