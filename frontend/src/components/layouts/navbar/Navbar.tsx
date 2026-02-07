import { useUserDetails } from "@/api/userDetails";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"



export const Navbar = () => {
    const { data: users, isLoading, isError } = useUserDetails();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (isLoading || isError || !users || users.length === 0) {
        return null;
    }

    const currentUser = users[0];

    return (
        <header className="flex justify-between items-center sticky top-0 z-50 shadow-md px-8 py-3 bg-black text-white h-[8vh]">
            <h1 className="text-3xl md:text-4xl font-title font-bold tracking-wider">
                <Link to="/hotels" className="tracking-wider">
                    Hotel Management System
                </Link>
            </h1>

            <div className="flex gap-3 justify-between items-center">
                <nav>
                    {currentUser.full_name}
                </nav>
                <nav>
                    <Button onClick={handleLogout}>Logout</Button>
                </nav>
            </div>
        </header>
    )
}


