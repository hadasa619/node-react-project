import { NavLink } from 'react-router-dom'
import '../../css/Header.css';
import { Button } from 'primereact/button';
import React, { useEffect, useState, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import Axios from "axios"
import Cart from '../Cart';
import Logout from './Logout';

function Header() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const toastCenter = useRef(null);
    // // const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
    // const [accessToken, setAccessToken] = useState(null)

    const showCart = (e) => {
        if (localStorage.getItem("accessToken") != null) {
            setVisibleLeft(true)
        }
        else {
            alert("המשתמש אינו רשום, עבור אל כניסה/הרשמה")
        }
    }

    return (
        <div className='header'>
            <div className='logo'></div>
            <nav>
                <NavLink to="/" className={"innav"}>דף הבית</NavLink>
                <NavLink to="/PhotoDevelopment" className={"innav"}>פיתוח תמונות</NavLink>
                <NavLink to="/Canvas" className={"innav"}>קנבס</NavLink>
                <NavLink to="/Kappa" className={"innav"}>קאפה</NavLink>
                <NavLink to="/Special" className={"innav"}>הדפסה על מוצרים</NavLink>
                <NavLink to="/Login_Register" className={"innav"}>כניסה\הרשמה</NavLink>
                <Logout></Logout>
                <Button icon="pi pi-shopping-cart" onClick={(e) => showCart(e)} className='innav' />
                <Toast ref={toastCenter} position="center" />
                {/* <NavLink to="/Cart"  className={"innav"}>סל קניות</NavLink> */}
                <Sidebar visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <Cart></Cart>
                </Sidebar>
            </nav>
        </div>
    )
}
export default Header