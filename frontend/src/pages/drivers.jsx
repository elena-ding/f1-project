import MenuButton from '../components/MenuButton.jsx';
import PageTitle from '../components/PageTitle.jsx';
import './drivers.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Drivers() {
    return (
        <>
            <MenuButton />
            <PageTitle title='DRIVERS' slideDist='-300px'/>
            <DriversTable />
            <div style={{opacity: 0, position: 'relative', top: '375px'}}>spacing filler</div>
        </>
    )
}


function DriversTable() {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/drivers')
        .then((response) => {return response.json()})
        .then((data) => {
            const sortedData = [...data].sort((a, b) =>
                a.image > b.image ? 1 : -1
            );
            setDrivers(sortedData);
        })
    }, [])
    
    if (drivers.length === 0) {
        return <h2>loading</h2>
    }

    return(
        <div>
            <div style={{
                    display: 'flex', 
                    flexDirection: 'vertical', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: 0,
                    position: 'relative', 
                    top: '300px' 
                }}>
                <DriverGrid driversArr={drivers}/>
            </div>
        </div>
    )
}

function DriverGrid({ driversArr }) {
    const delayArr = useMemo(() => Array.from({length: 20}, () => (Math.random() * (3.75 - 2) + 2).toString() + 's'))
    const navigate = useNavigate();
    const [clickedDriver, setClickedDriver] = useState(false);
    const [driverInfo, setDriverInfo] = useState([]);
    const [viewportCentre, setViewportCentre] = useState(0);
    const blackNumLogos=["GR63.png", "KA12.png", "CL16.png", "LH44.png", "CS55.png", "AA23.png", "GB5.png", "NH27.png", "FA14.png", "LS18.png", "PG10.png", "FC43.png"]
    const logoRef = useRef(null);

    return (
        <>
            <AnimatePresence>
                {clickedDriver ? (
                    <>
                        <motion.div 
                            className='rect'
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.75}}
                            style={{'--viewportTop': viewportCentre + 'px', '--bgCol': driverInfo[1]}}
                            onAnimationComplete={() => (
                                navigate('/driverInfo/' + driverInfo[0], {state: {colour: driverInfo[1], number: driverInfo[2], top: logoRef.current.getBoundingClientRect()}})
                            )}
                        />
                        <motion.img 
                            className='num-img'
                            ref={logoRef}
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.75}}
                            style={{'--viewportTop': viewportCentre + 'px', '--bgCol': driverInfo[1], filter: blackNumLogos.includes(driverInfo[2]) ? 'invert(1)' : 'auto'}}
                            src={'/f1-project/assets/logos/drivers/' + driverInfo[2]}
                        />
                    </>
                ) : null}
            </AnimatePresence>

            <div className='driver-grid'>
                {driversArr.map((item, i) => (
                    <>
                        <motion.button
                            key={item.name}
                            className= 'fade-in'
                            style={{opacity: 0, '--delay': delayArr[i]}}
                            whileHover={{scale: 1.1}} 
                            transition={{type: 'spring', stiffness: 20, damping: 1, mass: 0.1, duration: 0.75}}
                            onClick={() => {
                                setViewportCentre(window.scrollY);
                                setDriverInfo([item.name, item.colour, item.number]);
                                setClickedDriver(true);
                            }}
                        >
                            <DriverIcon driver={item}/>
                        </motion.button>
                    </>
                ))}
            </div>
        </>
    )
}


function DriverIcon({ driver}) {
    return (
        <>
            <motion.div className='driver-icon'>
                <motion.img src={'/f1-project/assets/driver profile icons/' + driver.icon} style={{width: '180px'}}/>
                <motion.div className='driver-label'>
                    <motion.p className='thin-text' style={{fontWeight: '600'}}>{driver.name}</motion.p>
                    <motion.p className='thin-text'>{driver.currentTeam}</motion.p>
                </motion.div>
            </motion.div>
        </>
    )
}
