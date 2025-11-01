const express = require("express")
const router = express.Router()
const cartController = require("../controller/cartController")
const verifyJWT = require("../middleware/verifyJWT")
// router.get("/",verifyJWT, cartController.getAllCarts)
router.get("/",verifyJWT, cartController.getUserCart)
router.get("/:id",verifyJWT, cartController.getCartById)
router.put("/", verifyJWT,cartController.updateCart)
router.post("/",verifyJWT, cartController.createCart)
router.delete("/:id",verifyJWT, cartController.deleteById)

module.exports = router
