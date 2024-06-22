
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../context/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL=  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigator =useNavigate()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lat ,lng] = useUrlPosition();
  const [emoji,setEmoji] = useState("");
  const [error, setError] = useState("");
  const {createNewCity} = useCities();
  useEffect(
    function () {
      async function fetchCityData() {
        try{
          setIsLoading(true);
          setError("");
          const res = await fetch( `${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode)throw new Error("That doesn't seem to be a city. Click somewhere else 😉");
            if (data.countryCode === "IL") return data.countryCode = "PL"
            
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        }catch(err){
            setError(err.message);
        }finally{
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [lat,lng]
  )
  async function handleSumbit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat:+lat, lng:+lng },
    };
    await createNewCity(newCity);
    navigator("/app/cities")
  }
  if (isLoading) return <Spinner/>
  if (error) return <Message message={error}/>
  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) => { 
          e.preventDefault();
          navigator(-1);
          }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
