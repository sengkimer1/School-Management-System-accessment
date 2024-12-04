import express from "express";
import {
    registerUser,
    login,
    getUserAll,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/all", getUserAll);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
