import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import '../css/Products.css';
import { Avatar } from 'primereact/avatar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Axios from "axios"
let sizes = [
    // { name: '', code: '1' },
    // { name: '', code: '2' },
    // { name: '', code: '3' },
    // { name: '', code: '4' }
];
let prices = []
let code
function Kappa() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [value3, setValue3] = useState(1);
    const [price, setPrice] = useState(0);
    const isFirst = useRef(false)
    const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
    const [id, setId] = useState()

    const fetchData = async () => {
        let { data } = await Axios.get("http://localhost:1200/api/products/")

        data = data.filter((prod) => {
            return prod.prodName == "kappa"
        })
        console.log(data[0].size);
        setId(data[0]._id)

        for (let index = 0; index < data[0].size.length; index++) {
            sizes.push({ name: data[0].size[index].option, code: index + 1 })
            prices.push(data[0].size[index].price)
        }
    }
    useEffect(() => {
        if (!isFirst.current) {
            fetchData()
            isFirst.current = true
        }
    }, [])
    useEffect(() => {
        console.log(value3);
        if (code != null)
            setPrice(prices[Number(code) - 1] * value3)
    }, [value3]);
    const changePrice = (e) => {
        console.log(e.value);
        setSelectedSize(e.value)
        code = e.value.code
        setPrice(prices[Number(code) - 1] * value3)
        console.log(price);
    }

    const changeVal = (e) => {
        setValue3(e.value)
        setPrice(prices[Number(code) - 1] * value3)
    }
    const isExist = async () => {
        if (selectedSize === null) {
            alert("יש לבחור גודל")
            return
        }
        try {
            const { data } = await Axios.get("http://localhost:1200/api/carts", {
                headers: {
                    'Authorization': `Bearer ${accessToken.current}`
                }
            })
            const product = data.find((prod) => {
                console.log(prod);

                return prod.prodId === id && prod.size === selectedSize.name
            })
            if (product) {
                const obj =
                {
                    _id: product._id,
                    prodId: product.prodId,
                    qty: product.qty + value3,
                    userId: product.userId,
                    size: product.size
                }
                const { data } = await Axios.put("http://localhost:1200/api/carts", obj, {
                    headers: {
                        'Authorization': `Bearer ${accessToken.current}`
                    }
                })
                return
            }
        }
        catch (err) {
            console.log(err.response);
            alert("המשתמש אינו רשום, עבור אל כניסה/הרשמה")
            return
        }

        addToCart()
    }
    const addToCart = async () => {
        if (selectedSize === null) {
            alert("יש לבחור גודל")
            return
        }
        const { data } = await Axios.post(`http://localhost:1200/api/products/byName`, { prodName: "kappa" })
        console.log(data);

        const obj = {
            prodId: data[0]._id,
            qty: value3,
            size: selectedSize.name
        }
        try {
            console.log(obj);
            const { data } = await Axios.post(`http://localhost:1200/api/carts/`, obj,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken.current}`
                    },
                }
            )
            console.log(data);
        }
        catch (err) {
            console.log(err);
            alert("המשתמש אינו רשום, עבור אל כניסה/הרשמה")

        }
    }
    return (
        <div className="template">
            <div className="main">
                <Avatar label="מאפיינים" size="large"
                    style={{
                        backgroundColor: "#194657", color: '#ffffff', width: "30%",
                        position: "absolute", right: "10%", boxShadow: "10px 10px 20px #194657", top: "0px"
                    }} />
                <div className="all">
                    <div className="in">
                        <div className="lable">בחר גודל</div>
                        <Dropdown value={selectedSize} onChange={(e) => changePrice(e)} options={sizes} optionLabel="name"
                            placeholder="Select a Size" className="w-full md:w-14rem" style={{ width: "180px" }} />
                    </div>
                    <div className="in">
                        <div className="lable">בחר כמות</div>
                        <div className="card flex flex-wrap gap-3 p-fluid">
                            <div className="flex-auto">
                                <InputNumber inputId="minmax-buttons"
                                    value={value3} onValueChange={(e) => changeVal(e)} mode="decimal"
                                    showButtons min={1} max={100} style={{ width: "100px" }} className="kamut" />
                            </div>
                        </div>
                    </div>
                    <div className="in" style={{ color: "rgb(212, 0, 81)" }}>
                        <div className="lable">מחיר</div>
                        <div style={{ fontSize: "30px" }}>{price}</div>
                    </div>
                    <Button label="הוסף לסל" className="button" onClick={() => isExist()}> </Button>
                </div>
            </div>
            <div className="image2"></div>
        </div>
    )
}

export default Kappa