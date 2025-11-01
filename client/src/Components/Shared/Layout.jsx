import Header from "./Header"
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}

export default Layout