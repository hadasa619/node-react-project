const Product = require("../models/productSchema")
const createProduct = async (req,res)=>{
    const {prodName, size, category, image} = req.body
    if(!prodName || !size)
        return res.status(400).json({ message: 'name and size are required'})
    const product = await Product.create({prodName, size, category, image})
    res.json(product)       
}
const getAllProduct = async (req,res)=>{
    const products = await Product.find().lean()
    if(!products.length)
        return res.status(400).json({ message: 'no product found'})
    res.json(products)
}
const getProductById = async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id).lean()
    if(!product)
        return res.status(400).json({ message: 'product not found'})
    res.json(product)
}
const getProductByName = async (req,res)=>{
    const {prodName} = req.body
    const product = await Product.find({prodName}).lean()
    if(!product)
        return res.status(400).json({ message: 'product not found'})
    res.json(product)
}
const updateProduct = async (req, res) => {
const {_id,prodName,size,category,image}= req.body
if (!_id ) {
return res.status(400).json({ message: 'fields are required' })
}
const product = await Product.findById(_id).exec() 
if (!product) {
return res.status(400).json({ message: 'product not found' })
}

product.prodName = prodName
product.size = size
product.category = category
product.image = image

const updateProduct = await product.save()

res.json(`'${updateProduct.prodName}' updated`)
}
const deleteById = async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id).exec()
    if(!product)
        return res.status(400).json({ message: 'product not found'})
    const result = await product.deleteOne()
    const reply=`product '${result.prodName}' ID ${result._id} deleted`
    res.json(reply)
}


module.exports = {createProduct, getAllProduct, getProductById, updateProduct,deleteById, getProductByName}