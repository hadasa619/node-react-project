import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
// const jwt = require("jsonwebtoken")
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { Image } from 'primereact/image';

function HomePage() {
  const accessToken = useRef(JSON.parse(localStorage.getItem("accessToken")))
  // const decoded = jwt.decode(accessToken)
  // console.log(decoded);
  console.log(accessToken);
  

  const dispatch = useDispatch()
  const role = useSelector((myStore) => myStore.roleSlice.role)
  console.log(role);
  

  return (
    <div style={{
      position: "relative", top: "0", display: "flex", justifyContent: "center", flexDirection:"column",
      alignItems:"center"

    }}>
      <img src="homePage/1.jpg" width={"80%"} style={{ boxShadow: "0 0 10px" }}></img>
      {accessToken.current!=null?<Link to={`/Managment`}>
        <Button label="ניהול מוצרים" className="button"></Button></Link>:<></>}
    </div>
  )
}

export default HomePage