import { useParams } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import '../../css/Products.css';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Axios from "axios"
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import Upload from "./Upload";
import { FileUpload } from 'primereact/fileupload';

function AddProduct() {
    const { id } = useParams()
    const [selectedSize, setSelectedSize] = useState(null);
    const [value3, setValue3] = useState();
    const [value4, setValue4] = useState();
    const [price, setPrice] = useState(0);
    const isFirst = useRef(false)
    const [sizes, setSizes] = useState([])
    const [prices, setPrices] = useState([])
    const [img, setImg] = useState()
    const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const addProduct = async () => {
        const options = value2.split(' ')
        const prices = value3.split(' ')
        let size = []
        for (let index = 0; index < options.length; index++) {
              size.push({option:options[index], price:prices[index]})
        }
        const obj = {prodName: value1, size, image:value4}
        const product = Axios.post(`http://localhost:1200/api/products/`, obj,
            {headers: {
            'Authorization': `Bearer ${accessToken.current}`
             }})
    }
    return (
        <div className="template">
            <div className="main"
                style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: "100px",
                    flexWrap:"wrap", minHeight:"max-content"
                 }}>
                    <div style={{display:"flex", gap:"10px", alignItems:"center", flexDirection:"column"}}>
                <Avatar label="הוספת מוצר" size="large"
                    style={{
                        backgroundColor: "#194657", color: '#ffffff', width: "110%",
                         boxShadow: "10px 10px 20px #194657", padding:"0px",
                        display:"flex", flexDirection:"column", textAlign:"center", justifyContent:"space-around", minHeight:"max-content"
                    }} >
                       <h6>הכנס גדלים ומחירים עם רווח מפריד ובהתאמה</h6>
                    </Avatar>         
                <form style={{ height: "400px", display: "flex", position: "relative" }}>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} />
                            <label htmlFor="username">שם מוצר</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} />
                            <label htmlFor="username">גדלים</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value3} onChange={(e) => setValue3(e.target.value)} />
                            <label htmlFor="username">מחירים</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="username" value={value4} onChange={(e) => setValue4(e.target.value)} />
                            <label htmlFor="username">שם תמונה</label>
                        </FloatLabel>
                    </div>
                    <Button label="הוסף מוצר" className="button" onClick={() => addProduct(id)}> </Button>
                </form>
                </div>
                  <div className="card">
            <FileUpload name="demo[]" url={'/special'} multiple accept="image/*" maxFileSize={10000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
            </div>
        </div>
    )
}

export default AddProduct