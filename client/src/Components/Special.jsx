import React, { useEffect, useState, useRef } from "react";
import '../css/Products.css';
import Axios from "axios"
import { Image } from 'primereact/image';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";

function Special() {
  const isFirst = useRef(false)
  const [myData, setMyData] = useState([])

  const fetchData = async () => {
    let { data } = await Axios.get("http://localhost:1200/api/products")
    data = data.filter((prod) => {
      return prod.category === "special"
    }
    )
    setMyData(data)
  }
  useEffect(() => {
    if (!isFirst.current) {
      fetchData()
      isFirst.current = true
    }
  }, [])

  return (
    <div className="specialDiv">
      {myData.map((prod) => {
        const img = `/special/${prod.image}`
        return <div style={{ display: "flex", flexDirection: "column", width: "200", height: "400px", justifyContent: "space-between",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.35)"
         }}>
          <Image src={img} alt="Image" width="300" preview />
          <Avatar label={prod.prodName} size="large"
            style={{display:"flex", flexDirection:"column", gap:"5px",
              backgroundColor: "#194657", color: '#ffffff', width: "100%",height:"100px", boxShadow: "10px 10px 20px #194657"
            }}> <Link to={`/Special/${prod._id}`}><Button label="לדף המוצר" className="button"> </Button></Link>
            </Avatar>
        </div>
      })}
    </div>

  )
}

export default Special