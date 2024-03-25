import express from 'express'
import { registerController,loginController ,getUserProfileController,logoutController,passwordResetController,updateUserProfileController,updatePasswordController,updateProfilePicController} from '../controllers/userController.js';
import  {isAuth} from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';
import {rateLimit} from 'express-rate-limit';



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
const router = express.Router()

router.post("/register",limiter,registerController)
//LOGIN
router.post("/login",limiter,loginController)

//getuser router
router.get("/profile",isAuth,getUserProfileController)

//logout
router.get("/logout",isAuth,logoutController)

//update profile 
router.put("/profile-update",isAuth,updateUserProfileController)

//update user password
router.put("/password-update",isAuth,updatePasswordController)

//UPDATE PROFILE PIC
router.put("/update-picture",isAuth,updateProfilePicController)
// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);


export default router;