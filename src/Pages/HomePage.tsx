import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomePage = () => {
    return ( 
        <div className="w-full bg-gray-900">
        <Navbar/>
        <Outlet/>
        </div>
     );
}
 
export default HomePage;