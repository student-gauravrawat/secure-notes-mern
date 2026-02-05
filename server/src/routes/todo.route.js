import {Router} from "express"
import {addTodo, deleteTodo, updateTodo} from "../controllers/todo.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route('/add-notes').post(verifyJWT, addTodo)
router.route('/update-notes/:notesId').patch(verifyJWT, updateTodo)
router.route('/delete-notes/:notesId').delete(verifyJWT, deleteTodo)

export default router