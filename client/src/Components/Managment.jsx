import React, { useEffect, useState, useRef } from "react";
import '../css/Products.css';
import Axios from "axios"
import { Image } from 'primereact/image';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import Table from "./InUpdate/Table";
function Managment() {
      const isFirst = useRef(false)
  const [myData, setMyData] = useState([])
  const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))

  const fetchData = async () => {
    let { data } = await Axios.get("http://localhost:1200/api/products")
    console.log(data);
    
    setMyData(data)
  }
  useEffect(() => {
    if (!isFirst.current) {
      fetchData()
      isFirst.current = true
    }
  }, [])
  const removeFromCart = async (id)=>{
        const {data} = await Axios.delete(`http://localhost:1200/api/carts/${id}`,
            {
        headers: {
            'Authorization': `Bearer ${accessToken.current}`
        }})
  }
  const removeItem = async (id)=>{
      console.log(accessToken.current);
        console.log(id + "aaa"); 
        removeFromCart(id)   
        const {data} = await Axios.delete(`http://localhost:1200/api/products/${id}`,
            {
        headers: {
            'Authorization': `Bearer ${accessToken.current}`
        }}
        )
        fetchData()
    }
  return (
        <div className="specialDiv" style={{display:"flex", flexDirection:"column"}}>
          <Link to={`/Managment/AddProduct`}><Button label="הוסף מוצר" className="button"> </Button></Link>
      {myData.map((prod) => {
        const img = `/${prod.category}/${prod.image}`
        return <div  className = "smallManage" style={{ display: "flex", flexDirection: "row", width: "80%", justifyContent: "space-around",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.35)", alignItems:"center",flexWrap:"wrap"
         }}>
          <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <div>{prod.prodName}</div>
          <Image src={img} alt="Image" width="150" preview />
          </div>
          <Avatar label="" size="large"
            style={{display:"flex", flexDirection:"row", gap:"5px",
              backgroundColor: "#194657", color: '#ffffff', minWidth: "60vw",minHeight:"200px", boxShadow: "10px 10px 20px #194657",
            }}>
                <div className="manageRes" style={{display:"flex", alignItems:"center"}}>
                  <div style={{display:"flex", flexDirection:"column"}}>
                    <Link to={`/Managment/${prod._id}`}>
                    <Button label="לעדכון מוצר" className="button" style={{backgroundColor:"#194657"}}> </Button></Link>
                       {prod.category =="special"?<Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Cancel"
                        style={{size:"2px"}} onClick={()=>removeItem(prod._id)}/>:<></>} </div>
                <Table sizes={prod.size} ></Table>  </div>         
            </Avatar>
        </div>
      })}
    </div>
  )
}

export default Managment