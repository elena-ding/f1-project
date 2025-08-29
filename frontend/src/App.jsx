import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import MenuPage from './pages/menuPage.jsx';
import About from './pages/about.jsx'
import Teams from './pages/teams.jsx';
import Drivers from './pages/drivers.jsx';
import TeamInfoPage from './pages/teamInfoPage.jsx';
import DriverInfoPage from './pages/driverInfoPage.jsx';
import Calendar from './pages/calendar.jsx';
import RaceInfoPage from './pages/raceInfoPage.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} /> {/*set default page to Home page*/}
        <Route path='/home' element={<Home />} /> 
        <Route path='/menu' element={<MenuPage />} /> 
        <Route path='/about formula 1' element={<About />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/teamInfo/:teamName' element={<TeamInfoPage/>} />
        <Route path='/drivers' element={<Drivers />} />
        <Route path='/driverInfo/:driverName' element={<DriverInfoPage />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/calendar/:raceName' element={<RaceInfoPage />} />
      </Routes>
    </Router>
  )
}

