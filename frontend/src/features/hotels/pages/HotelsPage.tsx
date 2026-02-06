import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const HotelsPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <h1>Hotels Page</h1>
            <p>Welcome to the hotels page!</p>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}