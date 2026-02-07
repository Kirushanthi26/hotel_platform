import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar/Navbar"

export const MainLayout = () => {
    return (
        <div className="bg-gray-50 h-screen">
            <Navbar />
            <main className="p-8 h-[92vh] overflow-y-scroll scrollbar-hide">
                <Outlet />
            </main>
        </div>
    )
}


