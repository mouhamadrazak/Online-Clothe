import express from "express"; // use this express package to create one router
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router(); // using this router we can create multiple routes

productRouter.post('/add',adminAuth, // here the token to protect the add 
  upload.fields([ // -->> this upload.fields([]) is a Multer function that allows uploading multiple files under different field names.
    { name: 'image1', maxCount: 1 }, // Allows uploading 1 file for "image1"
    { name: 'image2', maxCount: 1 }, // Allows uploading 1 file for "image2"
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct // Calls the addProduct function after images are uploaded
);

productRouter.post('/remove',adminAuth, removeProduct); // here also we send the token to protect the remove 
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;

/* ----- explain the difference between get and post method

1️⃣ GET Request (productRouter.get("/list", listProducts))
Purpose: Used to retrieve data from the server.
Example: Fetching a list of products from the database.
Does NOT change the server data—just reads and returns data.
---------------------------------------------------------------
2️⃣ POST Request (productRouter.post("/add", addProduct))
Purpose: Used to send data to the server (e.g., creating, updating, or deleting something).
Example: Adding a new product to the database.
Modifies the database
-----------------------------------------------------------------------
📌 Summary
✅ Use GET for fetching data (listProducts, singleProduct).
✅ Use POST for creating, updating, or deleting (addProduct, removeProduct).
🔄 If your singleProduct route is retrieving data, change it from POST to GET. */
