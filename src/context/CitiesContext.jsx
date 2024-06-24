import { createContext, useContext, useEffect, useReducer, useState } from "react"
const BASE_URL = "https://world-data-2wol.onrender.com"
const CitiesContex = createContext();
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
}
function reducer(state, action) {
    switch (action.type) {
        case "loading": return { ...state, isLoading: true };

        case "cities/loaded": return { ...state, isLoading: false, cities: action.payload };

        case "city/loaded": return { ...state, isLoading: false, currentCity: action.payload };

        case "city/created": return { 
            ...state, 
            isLoading: false, 
            cities:[...state.cities,action.payload],
            currentCity:action.payload,
        };

        case "city/deleted": return { 
            ...state, 
            isLoading: false, 
            cities:state.cities.filter((city) => city.id !== action.payload),
        };

        case "rejected":return {...state , isLoading:false ,error:action.payload};
        default: throw new Error("that action not Known");
    }
}
function CitiesProvider({ children }) {
    const [{ cities, currentCity, isLoading}, dispatch] = useReducer(reducer, initialState)
    const [openSideBar, isOpenSideBar] = useState(false);
    useEffect(
        function () {
            async function fetchData() {
                dispatch({ type: "loading" });
                try {
                    const res = await fetch(`${BASE_URL}/cities`);
                    const data = await res.json()
                    dispatch({ type: "cities/loaded", payload: data });
                }
                catch{
                    dispatch({
                        type:"rejected",
                        payload:"There was an error in loading cities "
                    })
                }
            }
            fetchData()
        },
        []
    )

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json()
            dispatch({type:"city/loaded",payload:data})
        }
        catch{
            dispatch({type:"rejected",payload:"There was an error in loading city "})
        }
    }

    async function createNewCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json()
            dispatch({type: "city/created",payload:data})
        }
        catch {
            dispatch({type:"rejected",payload:"There was an error in add a new city "})
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({type:"city/deleted",payload:id})
        }
        catch{
            dispatch({type:"rejected",payload:"There was an error in add a delete city "})
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
    if (value === undefined) throw Error("Unknown action")
    return value;
}

export { CitiesProvider, useCities }
