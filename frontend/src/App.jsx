import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Signup from "./components/Signup"
import About from "./components/About"
import Motive from "./components/Motive"
import Campaign from "./components/Campaign"
import Contact from "./components/Contact"
import StartACampaign from "./components/StartACampaign"
import Donate from "./components/Donate"

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Dashboard/>}></Route>
      <Route path = "/login" element={<Login/>}></Route>
      <Route path = "/signup" element={<Signup/>}></Route>
      <Route path = "/about" element={<About/>}></Route>
      <Route path = "/motive" element={<Motive/>}></Route>
      <Route path = "/campaign" element={<Campaign/>}></Route>
      <Route path = "/contact" element={<Contact/>}></Route>
      <Route path = "/startACampaign" element={<StartACampaign/>}></Route>
      <Route path = "/donate" element={<Donate/>}></Route>
    </Routes>
    

  )
}

export default App