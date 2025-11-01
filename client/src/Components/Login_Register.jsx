import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
// import '../css/Products.css';
import '../css/LogReg.css';
import { Button } from 'primereact/button';

function Login_Register() {
  const [status, setStatus] = useState(false)
  const [textL, setTextL] = useState("עוד לא נרשמת? לחץ כאן")
  const [textR, setTextR] = useState("משתמש רשום? לחץ כאן")
  const event = () => {
    if (status) {
      setStatus(false)
    }
    else
    {
      setStatus(true)
    }
  }
  return (
    <div className='templateLg'>
      <div className='mainLg'>
      {status ? <Register status = {status} event = {event}/> : <Login />}
      <Button label = {status?textR:textL} className="button btnLg" onClick={() => event()} type='submit'> </Button>

      {/* <button onClick={() => event()}>{status?textR:textL}</button> */}
      </div>
      </div>
  )
}

export default Login_Register