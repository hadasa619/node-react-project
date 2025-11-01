import { useParams } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import '../css/Products.css';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Axios from "axios"
import { Image } from 'primereact/image';
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

let code
function UpdateProduct() {
    const { id } = useParams()
    const [selectedSize, setSelectedSize] = useState(null);
    const [value3, setValue3] = useState();
    const [price, setPrice] = useState(0);
    const isFirst = useRef(false)
    const [sizes, setSizes] = useState([])
    const [prices, setPrices] = useState([])
    const [img, setImg] = useState()
    const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [prodName, setProdName] = useState('')
    const fetchData = async () => {
        const { data } = await Axios.get(`http://localhost:1200/api/products/${id}`)
        console.log(data);
        let newSizes = []
        let newPrices = []
        for (let index = 0; index < data.size.length; index++) {
            newSizes.push({ name: data.size[index].option, code: index + 1 })
            newPrices.push(data.size[index].price)
        }
        setSizes(newSizes)
        setPrices(newPrices)
        setImg(`/${data.category}/${data.image}`)
        setProdName(data.prodName)
        console.log(img);

    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateProduct = async (id) => {
        const { data } = await Axios.get(`http://localhost:1200/api/products/${id}`)
        // const findSize = data.size.find((size)=>{
        //     return size.option === value2
        // })
        // if(findSize)
        // { 
        let index
        for (index = 0; index < data.size.length; index++) {
            if (data.size[index].option === value2) {
                data.size[index].price = value3
                break
            }
        }
        if (index === data.size.length) {
            data.size.push({ option: value2, price: value3 })
        }
        const update = { _id: data._id, prodName: data.prodName, size: data.size, category: data.category, image: data.image }
        console.log(update);

        const updated = await Axios.put(`http://localhost:1200/api/products/`, update,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken.current}`
                }
            })
    }
    return (
        <div className="template">
            <div className="main"
                style={{
                    display: "flex", flexDirection: "row-reverse", justifyContent: "center",
                    gap: "200px", flexWrap: "wrap", minHeight: "max-content", alignItems: "center"
                }}>
                <Avatar label="עדכון מוצר" size="large"
                style={{
                    backgroundColor: "#194657", color: '#ffffff', width: "30%",
                    position: "absolute", right: "10%", boxShadow: "10px 10px 20px #194657", top: "0px"
                }} />
    

                <form style={{ height: "400px", display: "flex", position: "relative" }}>
                    <div style={{textAlign:"center"}}>באם קיים הגודל, יעודכן המחיר,<br/>אחרת, יתווסף גודל למוצר.</div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} />
                            <label htmlFor="username">גודל</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value3} onChange={(e) => setValue3(e.target.value)} />
                            <label htmlFor="username">מחיר</label>
                        </FloatLabel>
                    </div>
                    <Button label="עדכן מוצר" className="button" onClick={() => updateProduct(id)}> </Button>
                </form>
                 <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                          <h1>{prodName}</h1>
                           <Image src={img} alt="Image" width="300" preview style={{
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.35)"
                }} />
                 </div>
               
            </div>
        </div>
    )
}

export default UpdateProduct