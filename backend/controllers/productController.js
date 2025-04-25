import imagekit from '../config/ImageKit.js';
import multer from '../middleware/multer.js'; // Import updated multer setup
import productModel from '../models/productModel.js'  // <-- Make sure the path is correct

  // ------------function for add product----------------
const addProduct = async (req, res) => {
   /* to add a product we will create a middleware using multer so that if we send any files as form data
      then that file will be passed using multer 
   */

   try {
     // we request the details of those var from the body request
     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
 
     // we check if the images are available in the request, and if they are, we store them in variables
     const image1 = req.files.image1 && req.files.image1[0];
     const image2 = req.files.image2 && req.files.image2[0];
     const image3 = req.files.image3 && req.files.image3[0];
     const image4 = req.files.image4 && req.files.image4[0];
 

     const imageFiles = [image1, image2, image3, image4].filter((item)=> item !== undefined); // we collect all images in an array and this filter to remove undifiend and store even if 1 image in the mongo db  
     const uploadedImageUrls = []; // to store the urls after upload

     console.log(name, description, price, category, subCategory, sizes, bestseller); // to check those var
     console.log(imageFiles); // to check the images before uploading

     // we loop through the image array and upload them to ImageKit
     for (const file of imageFiles) {
       if (file) {
         const result = await imagekit.upload({
           file: file.buffer, // binary buffer (file saved in memory by multer)
           fileName: file.originalname, // original file name
         });
 
         uploadedImageUrls.push(result.url); // after upload we push the url in the array
       }
     }
 
     //we create the productdata to save the url of images and the data (names,..) in the mongodb--------------------------------------
     const productData= { 
       name,
       description,
       category,
       price : Number(price), // price in form data input well took as string so we convertet as number 
       subCategory,
       bestseller: bestseller === "true" ? true : false, // same for bestseller  because the form data will took a string we will covert the string into true or false if its true so true if not so false 
       sizes: sizes.split(","), // because we cannot send the array directly as form data so from the frontend we will send the sizes and it will be convertet as array 
       image: uploadedImageUrls, // to store the images url in the mongo db 
       date: Date.now(), // that shhould return the date of now
     };
         const product = new productModel(productData); // we put our proudct data in productmodel for mongodb 
         await product.save(); // we save the product to the database
 
         res.status(201).json({
          success: true,
          message: "Product added successfully!", // This message will show in the frontend
          productAdded: product,
        }); 
 
   } catch (error) {
     console.log(error); // to debug error in the terminal
     res.status(500).json({ success: false, message: error.message }); // to respond error in thunderclient
   }
 }
 

// This function is used to fetch (list) or show  all products from the MongoDB database 
const listProducts = async(req,res) => {

    try { // aham shi ltry la tekshof lerror l3ena
      
      const products = await productModel.find({}); // to find the all data
      res.json({success:true,products}); // we put products to see if its work 

    } catch (error) {
       console.log(error) 
       res.json({success:false,message:error.message});
    }

}

// function for removing product
const removeProduct = async(req,res) => {
    try {
      
      await  productModel.findByIdAndDelete(req.body.id) // so this function ecplain her self it will findby id and delete then we request from body the id to delete the product
      res.json({success:true,message:"Product Removed"});

    } catch (error) {

       console.log(error) 
       res.json({success:false,message:error.message});

    }
}

// function for single product info
const  singleProduct = async(req,res) => {
   try {
      

    const {productId} = req.body // we will get the product id from request so we create this to type it in the request and we will get the id men khilelu
    const product = await productModel.findById(productId) // this function to get the single product id info
    res.json({success:true,product})

 } catch (error){

       console.log(error) 
       res.json({success:false,message:error.message});
   }
}

export {listProducts,addProduct,removeProduct,singleProduct}