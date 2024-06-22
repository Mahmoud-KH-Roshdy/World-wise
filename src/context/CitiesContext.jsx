import { createContext, useContext, useEffect, useState } from "react"
const BASE_URL = "http://localhost:9000"
const CitiesContex = createContext()
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ openSideBar , isOpenSideBar] = useState(false);
    const [currentCity ,setCurrentCity] = useState({})
    useEffect(
        function () {
            async function fetchData() {
                try {
                    setIsLoading(true)
                    const res = await fetch(`${BASE_URL}/cities`);
                    const data = await res.json()
                    setCities(data)
                }
                catch (err) {
                    console.error(err.message)
                }
                finally {
                    setIsLoading(false)
                }
            }
            fetchData()
        },
        []
    )
        async function getCity(id) {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json()
                setCurrentCity(data)
            }
            catch (err) {
                console.error(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }

        async function createNewCity(newCity) {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`,{
                    method:"POST",
                    body: JSON.stringify(newCity),
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json()
                setCities((cities) => [...cities,data])
            }
            catch (err) {
                console.error(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        async function deleteCity(id) {
            try {
                setIsLoading(true)
                await fetch(`${BASE_URL}/${id}`,{
                    method: "DELETE",
                });
                setCities((cities) => cities.filter((city) => city.id !== id))
            }
            catch (err) {
                console.error(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
    return (
        <CitiesContex.Provider value={
            {
                cities,
                isLoading,
                openSideBar,
                isOpenSideBar,
                currentCity,
                getCity,
                createNewCity,
                deleteCity,
            }
        }>
            {children}
        </CitiesContex.Provider>
    )
}

function useCities() {
    const value = useContext(CitiesContex);
    if ( value === undefined) throw Error("Unknown action") 
    return value;
}

export  {CitiesProvider ,useCities}
