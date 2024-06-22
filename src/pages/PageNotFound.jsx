import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";
export default function PageNotFound() {
  return (
    <div className={styles.pagenotFfound}>
      <PageNav />
      <main>
        <h1>Page not found </h1>
      </main>
    </div>
  );
}
