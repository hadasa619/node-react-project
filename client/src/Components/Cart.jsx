import React, { useEffect, useRef, useState } from 'react'
import Axios from "axios"
import { Button } from 'primereact/button';

function Cart() {
    const [userCart, setUserCart] = useState([])
    const [flag, setFlag] = useState(false)
    const [title, setTitle] = useState("!שמחים שבחרת בנו")
    const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
    // const [selected, setSelected] = useState()
    // const [price, setPrice] = useState()
    const fetchData = async () =>{
    // const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    const { data } = await Axios.get("http://localhost:1200/api/carts", {
        headers: {
            'Authorization': `Bearer ${accessToken.current}`
        }})
        if(data.length===0)
        {
            setTitle("...נראה שריק פה")
        }
        setUserCart(data)
        
        setFlag(!flag)
    }
    // useEffect(()=>{
    //    if (selected) {
    //     setPrice(selected.price);
    // }    },[selected])
    const setData = async () =>{
        const all = []        
        for (let index = 0; index < userCart.length; index++) {
            const id = userCart[index].prodId            
            const {data} = await Axios.get(`http://localhost:1200/api/products/${id}`) 
            const {image} = data
            const {category} = data
                const {price} = data.size.find((prc)=>{
                    console.log("option:"+prc.option+" price:"+prc.price +" us:"+ userCart[index].size);           
                return prc.option === userCart[index].size
            })
            // console.log(selected.price);
            all.push({qty: userCart[index].qty, prodName: data.prodName,
                size:userCart[index].size,price:price, image:image, category, _id:userCart[index]._id})
            console.log(all[index])        
        }
        setUserCart(all)
        // console.log(userCart);
    }  
    const removeItem = async (id) =>{
        console.log(accessToken.current);
        console.log(id + "aaa");
        
        const {data} = await Axios.delete(`http://localhost:1200/api/carts/${id}`,
            {
        headers: {
            'Authorization': `Bearer ${accessToken.current}`
        }}
        )
        fetchData()
    }
        useEffect(() => {
            fetchData()
        }, [])

        useEffect(() => {
            setData()
        }, [flag])        
    return (
        <div style={{display:"flex", flexDirection:"column", gap:"30px", marginTop:"20px", alignItems:'center'}}>
            <h1 style={{textAlign:"center", position:"absolute", top:"18px"}}>{title}</h1>
        {userCart.map((prod) =>{
            const mySrc = `/${prod.category}/${prod.image}`
            console.log(mySrc);
            return <div className='inCart'>
                <div style={{width:"55%"}}><div>{prod.prodName}</div><img src={mySrc} width="150px" alt={prod.image}></img></div>
              <div style={{width:"35%", direction:"rtl", marginRight:"20px", display:'flex'
                ,justifyContent:"center", flexDirection:"column", gap:"10px"}}><div>כמות: {prod.qty}</div><div> גודל: {prod.size}</div>
            <div>מחיר: {prod.price * prod.qty} </div>
            <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Cancel"
            style={{size:"2px"}} onClick={()=>removeItem(prod._id)}/>
</div></div>
        })}
        </div>
    )
}

export default Cart