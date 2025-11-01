import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Navigate, useNavigate } from "react-router-dom"
import Axios from "axios";

function Login() {
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const toastCenter = useRef(null);
    const navigate = useNavigate()

    const showMessage = (event, ref, severity, text) => {
        const label = text;
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };
    const submit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await Axios.post("http://localhost:1200/api/auth/login",
                { userName: value1, password: value2 })
            console.log(data);
            localStorage.setItem("accessToken", JSON.stringify(data.accessToken))            
            navigate("/")
        }
        catch (err) {
            console.log(err.response.data.message);
            showMessage(e, toastCenter, "error", err.response.data.message)
        }
    }
    return (
        <>
        <form>
            <Avatar label="כניסה" size="large"
                style={{
                    backgroundColor: "#194657", color: '#ffffff', width: "50%",
                    position: "absolute", right: "10%", top: "0px", boxShadow: "10px 10px 20px #194657"
                }} />
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="username" value={value1} onChange={(e) => setValue1(e.target.value)} />
                    <label htmlFor="username">שם משתמש</label>
                </FloatLabel>
            </div>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} type="password" />
                    <label htmlFor="username">סיסמא</label>
                </FloatLabel>
            </div>
            <Button label="שליחה" className="button btnLg1" onClick={(e) => submit(e)} type='submit'> </Button>
        </form>
                <Toast ref={toastCenter} position="center" style={{height:"100px"}}/>
        </>
    )
}

export default Login