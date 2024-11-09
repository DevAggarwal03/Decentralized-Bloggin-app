import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomePage = () => {
    return ( 
        <div className="w-full bg-[#212121]">
        <Navbar/>
        <Outlet/>
        </div>
     );
}
 
export default HomePage;