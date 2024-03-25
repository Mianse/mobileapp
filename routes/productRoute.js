import express from "express";
import { getAllProductsController,getSingleProductController,getTopProductsController,productReviewController,deleteProductController,deleteProductImageController,updateProductImageController, createProductController,updateProductController} from "../controllers/productController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router()
//get all products
router.get("/get-all",getAllProductsController)

// GET TOP PRODUCTS
router.get("/top", getTopProductsController);
//get single product
router.get("/:id",getSingleProductController)



//create product route
router.post("/create",isAuth,singleUpload,createProductController)

//update product
router.put("/:id",isAuth,singleUpload,updateProductController)

//update product image
router.put("/image/:id",isAuth,singleUpload,updateProductImageController)

//delete product image
router.delete("/delete-productimage/:id",isAuth,deleteProductImageController)

//delete product 
router.delete("/delete/:id",isAuth,deleteProductController)


// REVIEW PRODUCT
router.put("/:id/review", isAuth, productReviewController);

// ====================================================================

export default router