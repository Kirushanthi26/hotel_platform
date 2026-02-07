import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar/Navbar"

export const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className=" bg-gray-50 p-8 max-h-[92vh] overflow-y-scroll scrollbar-hide">
                <Outlet />
            </main>
        </div>
    )
}


