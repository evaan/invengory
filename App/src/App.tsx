import { useUser } from "./api/api";
import { Navigate, } from "react-router-dom";

export default function App() {    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, loggedIn } = useUser();
    console.log(loading)
    if (loading) return <></>
    if (!loggedIn) return <Navigate to="/login" replace />
    else return <Navigate to="/browse" replace />
}