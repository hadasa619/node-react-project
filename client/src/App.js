import './css/App.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux"
import roleSlice from "./redux/userRole"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/Shared/Layout';
import HomePage from './Components/HomePage';
import PhotoDevelopment from './Components/PhotoDevelopment';
import Canvas from './Components/Canvas';
import Kappa from './Components/Kappa';
import Special from './Components/Special';
import Cart from './Components/Cart';
import Managment from './Components/Managment';
import { PrimeReactProvider } from 'primereact/api';

// import { PrimeReactProvider } from 'primereact/api';
// import { Button } from 'primereact/button';                             
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Login_Register from './Components/Login_Register';
import SingalProduct from './Components/SingalProduct';
import UpdateProduct from './Components/UpdateProduct';
import AddProduct from './Components/InUpdate/AddProduct';
import Logout from './Components/Shared/Logout';
const myStore = configureStore({
  reducer: {
    roleSlice
  }
})
function App() {


  return (

    <Provider store={myStore}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='Managment' element={<Managment />} />
              <Route path='Managment/:id' element={<UpdateProduct />} />
              <Route path='Managment/AddProduct' element={<AddProduct />} />
              <Route path='PhotoDevelopment' element={<PhotoDevelopment />} />
              <Route path='Canvas' element={<Canvas />} />
              <Route path='Kappa' element={<Kappa />} />
              <Route path='Special' element={<Special />} />
              <Route path='Special/:id' element={<SingalProduct />} />
              <Route path='Login_Register' element={<Login_Register />} />
              <Route path='Cart' element={<Cart />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
