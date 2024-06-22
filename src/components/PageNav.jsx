import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo"
import { useState } from "react";
function PageNav() {
    const [ open , isOpen] = useState(false)
    return (
        <nav className={styles.nav}>
            <Logo/>
            {/* <p onClick={() => isOpen(!open)} style={{zIndex:"100" , position:"fixed" , right:"11px" , top:"18px",fontSize:"13px"}}>{open ? "❌" : "open"}</p> */}
            <div  onClick={() => isOpen(!open)} 
            className=" hidden max-[768px]:flex  w-8 h-8 fixed  top-8 right-5 justify-around flex-col cursor-pointer z-30">
                <span className={`w-8 h-1 rounded-xl bg-white origin-[1px] transition-all duration-700 ${open ? " rotate-[45deg]" : ""}`}></span>
                <span className={`w-8 h-1 rounded-xl  bg-white origin-[1px] transition-all duration-700 ${open ? " translate-x-[100%] opacity-0" : ""}`}></span>
                <span className={`w-8 h-1 rounded-xl  bg-white origin-[1px] transition-all duration-700 ${open ? "rotate-[-45deg]" : ""}`}></span>
            </div>
            <ul style={open ? {right:"0"} :{}}>
                <li><NavLink to="/product">Product</NavLink></li>
                <li><NavLink to="/pricing">pricing</NavLink></li>
                <li><NavLink to="/login" className={styles.ctaLink}>login</NavLink></li>
            </ul>
        </nav>
    )
}

export default PageNav
