import Navbar from "./assets/Navbar"
import { Outlet } from "react-router-dom"

export default function Layout(){
  return (
    <main>
        <Navbar/>
        <Outlet/>
    </main>
  )
}