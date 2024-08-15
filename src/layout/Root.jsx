import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
    return <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        {/* <Login></Login> */}
    </div>;
};
export default Root;