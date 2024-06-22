import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { useCities } from "../context/CitiesContext";

function SideBar() {
    const {openSideBar,isOpenSideBar} = useCities()
    return (
        <>
        <div  onClick={() => isOpenSideBar(!openSideBar)} 
        className=" hidden max-[768px]:flex  w-8 h-8 fixed  top-8 right-5 justify-around flex-col cursor-pointer z-[10000000]">
            <span className={`w-8 h-1 rounded-xl origin-[1px] transition-all duration-500 ${openSideBar ? " bg-white rotate-[45deg] " : " bg-black"}`}></span>
            <span className={`w-8 h-1 rounded-xl origin-[1px] transition-all duration-500 ${openSideBar ? "  bg-white translate-x-[100%] opacity-0" : " bg-black "}`}></span>
            <span className={`w-8 h-1 rounded-xl  origin-[1px] transition-all duration-500 ${openSideBar ? " bg-white rotate-[-45deg] " : " bg-black"}`}></span>
        </div>
        <div className={`${styles.sidebar}  max-[768px]:fixed  max-[768px]:top-0 left-[-1000px]  max-[768px]:z-[10000] transition-all duration-500   ${openSideBar ? "max-[768px]:left-0" :""}`} >
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; copyright {new Date().getFullYear()}
                </p>
            </footer>
        </div>
        </>
    )
}

export default SideBar
