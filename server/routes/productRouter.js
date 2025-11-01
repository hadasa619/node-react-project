const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")
const verifyJWT = require("../middleware/verifyJWT")

router.get("/", productController.getAllProduct)
router.post("/byName", productController.getProductByName)
router.post("/",verifyJWT, productController.createProduct)
router.get("/:id", productController.getProductById)
router.put("/",verifyJWT, productController.updateProduct)
router.delete("/:id",verifyJWT, productController.deleteById)


module.exports = router