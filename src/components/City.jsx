import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams()
  const navigator = useNavigate()
  const { currentCity, getCity, isLoading } = useCities();
  useEffect(
    () => {
      getCity(id)
    }
    , [id]
  )
  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading) return <Spinner/>
  return (
    <main className={styles.city}>
      <header className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </header>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <footer className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </footer>
      <div>
      <Button type="back" onClick={(e) => { 
          navigator(-1);
          }}>&larr; Back</Button>
      </div>
    </main>
  );
}

export default City;
