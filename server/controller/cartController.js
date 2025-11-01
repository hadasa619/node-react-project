const Cart = require("../models/cartSchema")
const createCart = async (req,res)=>{
    const {prodId, qty, size} = req.body
    if(!prodId || !size)
        return res.status(400).json({ message: 'fields are required'})
    const cart = await Cart.create({prodId, qty, userId:req.user._id, size})
    res.json(cart)       
}
const getAllCarts = async (req,res)=>{
    const carts = await Cart.find().lean()    
    if(!carts.length)
        return res.status(400).json({ message: 'no cart found'})
    res.json(carts)
}
const getUserCart = async (req, res)=>{
    const products = await Cart.find({userId:req.user._id}).lean()
    res.json(products)
}
const getCartById = async (req,res)=>{
    const {id} = req.params
    const cart = await Cart.findById(id).lean()
    if(!cart)
        return res.status(400).json({ message: 'cart not found'})
    res.json(cart)
}
const updateCart = async (req, res) => {
const {_id,prodId,qty,userId, size}= req.body
if (!_id ) {
return res.status(400).json({ message: 'fields are required' })
}
const cart = await Cart.findById(_id).exec() 
if (!Cart) {
return res.status(400).json({ message: 'cart not found' })
}

cart.prodId = prodId
cart.qty = qty
cart.userId = userId
cart.size = size

const updateCart = await cart.save()

res.json(`'${updateCart.prodId}' updated`)
}
const deleteById = async (req,res)=>{
    const {id} = req.params
    const cart = await Cart.findById(id).exec()
    if(!cart)
        return res.status(400).json({ message: 'cart not found'})
    const result = await cart.deleteOne()    
    const reply=`cart '${result.prodId}' ID ${result._id} deleted`
    res.json(reply)
}


module.exports = {createCart, getAllCarts, getCartById, updateCart,deleteById,getUserCart}