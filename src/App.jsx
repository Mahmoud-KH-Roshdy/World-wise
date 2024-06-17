import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
const BASE_URL = "http://localhost:9000"
function App() {
  const [cities ,setCities] = useState([])
  const [isLoading ,setIsLoading] = useState(false)
    useEffect(
      function () {
        async function fetchData() {
        try{setIsLoading(true)
          const res =  await fetch(`${BASE_URL}/cities`);
          const data = await res.json()
          setCities(data)
        }
        catch(err){
          console.error(err.message)
        }
        finally{
          setIsLoading(false)
        }

        }
        fetchData()
      },
      []
    )
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="app" element={<AppLayout/>}>  
        <Route index element={<Navigate replace to="cities"/>}/>
        <Route path="cities" element={<CityList cities={cities} isLoading = {isLoading}/>}/>
        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="form" element={<Form/>}/>
        </Route>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
