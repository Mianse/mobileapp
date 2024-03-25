import express from "express"
import {createCategoryController,getCategoryController,updateCategoryController,deleteCategoryController} from "../controllers/categoryController.js"
import { isAuth,isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()
// careate category
router.post("/create-category",isAuth,createCategoryController)

// get all categories
router.get("/get-categories",getCategoryController)

//delete category
router.delete("/delete/:id",deleteCategoryController)

// UPDATE ALL CATEGORY
router.put("/update/:id", isAuth, isAdmin, updateCategoryController);
export default router