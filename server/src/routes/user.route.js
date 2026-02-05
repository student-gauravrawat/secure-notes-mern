import {Router} from "express"
import {register, verifyEmailOtp, resendEmailOtp, login, logout, deleteAccount, getFreshUser, changePassword, refreshAccessToken} from "../controllers/user.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/email-verify").post(verifyEmailOtp)
router.route("/resend-otp").post(resendEmailOtp)
router.route("/refresh-token").post(refreshAccessToken);
router.route("/login").post(login)
router.route("/logout").get(verifyJWT, logout)
router.route("/get-user").get(verifyJWT, getFreshUser)
router.route("/change-password").patch(verifyJWT, changePassword)
router.route("/delete-account").delete(verifyJWT, deleteAccount)


export default router