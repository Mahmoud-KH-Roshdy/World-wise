import { NavLink } from "react-router-dom";
import styles from "./NavPage.module.css";
function NavPage() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/">Homepage</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
                <li><NavLink to="/pricing">pricing</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavPage
