import styles from "./CountryList.module.css";
import Spinner from "./Spinner"
import Message from "./Message"
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";
function CountryList() {
    const {cities , isLoading} = useCities()
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Add your first city bu clicking on a city on the map" />;
    const country =  cities.reduce((arr,city) =>{
        if (!arr.map((el) => el.country).includes(city.country) ) {
            return [...arr ,{country:city.country,emoji:city.emoji,id:city.id}]
        }else return arr
    } ,[]);
    return (
        <ul className={styles.countryList}>
            {country.map(country => <CountryItem key={country.id} country={country} />)}
        </ul>
    )
}

export default CountryList