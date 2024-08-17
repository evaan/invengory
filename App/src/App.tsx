import { useUser } from "./api/api";
import { Navigate } from "react-router-dom";

export default function App() {
    const { loading, loggedIn } = useUser();
    if (loading) return <></>
    if (!loggedIn) return <Navigate to="/login" replace />
    else return <Navigate to="/browse" replace />
}