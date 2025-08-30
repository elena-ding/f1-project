import MenuButton from '../components/MenuButton.jsx';
import TeamHeader from '../components/TeamHeader.jsx'
import Gallery from '../components/Gallery.jsx'
import data from '../pages/teamData.json';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import './teamInfoPage.css';

export default function TeamInfoPage() {
    const { teamName } = useParams();
    const teamData = data.find(team => team.id === teamName);

    return (
        <>
            <MenuButton />
            <TeamHeader teamId={ teamName } />
            <CarInfo teamInfo={ teamData } />
            <TeamMembers teamData={teamData} />
            <GalleryHeader team={teamData.id.toUpperCase()} chassis={teamData.chassis} />
            <Gallery photos={teamData.gallery} photoPath='car galleries' top='900px' left='50%' translateX='-50%' width={1100} height='734px' numImgs={6}/>
            <div style={{opacity: 0, position: 'relative', top: '1000px'}}>spacing filler</div>
        </>
    )
}

function CarInfo({ teamInfo }) {
    return (
        <>
            <motion.div 
                className='car-position' 
                initial='rest'
                animate='slide'
            >
                <div className='thin-text'>
                    <motion.span className='car-info-text'>
                        <motion.p
                            variants={{
                                rest: { translateX: '-1300px',},
                                slide: { translateX: '0px' }
                            }}
                            transition={{duration: 1.5, ease: 'easeOut'}}
                        >
                            <span style={{fontWeight: '700'}}>Championships: </span>{teamInfo.championships}
                        </motion.p>
                        <motion.p
                            variants={{
                                rest: { translateX: '-1500px',},
                                slide: { translateX: '0px' }
                            }}
                            transition={{duration: 1.7, ease: 'easeOut'}}
                        >
                            <span style={{fontWeight: '700'}}>Chassis: </span> {teamInfo.chassis}
                        </motion.p>
                        <motion.p
                            variants={{
                                rest: { translateX: '-1700px',},
                                slide: { translateX: '0px' }
                            }}
                            transition={{duration: 1.9, ease: 'easeOut'}}
                        >
                            <span style={{fontWeight: '700'}}>Power Unit: </span>{teamInfo.powerUnit}
                        </motion.p>
                        <motion.p
                            variants={{
                                rest: { translateX: '-1900px',},
                                slide: { translateX: '0px' }
                            }}
                            transition={{duration: 2.1, ease: 'easeOut'}}
                        >
                            <span style={{fontWeight: '700'}}>Championship Points: </span>{teamInfo.constructorPoints}
                        </motion.p>
                    </motion.span>
                </div>
                <motion.img
                    src={'/f1-project/assets/cars/' + teamInfo.car}
                    style={{width: '600px'}}
                    variants={{
                        rest: { translateX: '-1300px',},
                        slide: { translateX: '0px' }
                    }}
                    transition={{duration: 1.5, ease: 'easeOut'}}
                />
            </motion.div>

            <motion.span 
                className='car-bg-rect'
                style={{'--rectColour': teamInfo.logo[2], opacity: 0.5, zIndex: -5}}
                initial={{translateX: '-2000px'}}
                animate={{translateX: '0px'}}
                transition={{duration: 1.5, ease: 'easeInOut'}}
            ></motion.span>
        </>
    )
}

function TeamLeadIcon({ teamLead, teamLeadStart, teamLeadLabel, slideDist }) {
    return (
        <>
            <div className='indv-team-lead-container'>
                <motion.h2
                    initial={{ opacity: 0, translateX: slideDist}}
                    animate={{ opacity: 1, translateX: '0px' }}
                    transition={{ duration: 1.5 }}
                >
                    {teamLeadLabel}
                </motion.h2>

                <motion.img 
                    src={'/f1-project/assets/people/' + teamLead[1]} style={{width: 600}} 
                    initial={{ opacity: 0, translateX: slideDist }}
                    animate={{ opacity: 1, translateX: '0px' }}
                    transition={{ duration: 1.5 }}                        
                />

                <motion.div 
                    className='team-lead-info'
                    initial={{ opacity: 0, translateX: slideDist }}
                    animate={{ opacity: 1, translateX: '0px' }}
                    transition={{ duration: 1.5 }}                        
                >
                    <motion.h3 style={{fontSize: '18px', fontWeight: '550', margin: 0}}>{teamLead[0]}</motion.h3>
                    <motion.h3 style={{fontSize: '18px', fontWeight: '550', margin: 0}}>(since {teamLeadStart})</motion.h3>
                </motion.div>
            </div>
        </>
    )
}

function DriverIcon({ driverData, teamData, driver }) {
    const blackNumLogos=[63, 12, 16, 44, 55, 23, 5, 27, 14, 18, 10, 43];
    const navigate = useNavigate();
    const [clickedDriver, setClickedDriver] = useState(false);
    const [viewportCentre, setViewportCentre] = useState(0);
    const logoRef = useRef(null);

    return (
        <>
            <AnimatePresence>
                {clickedDriver ? (
                    <>
                        <motion.div 
                            className='rect-team'
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.75}}
                            style={{'--viewportTop': viewportCentre + 'px', '--bgCol': driver.colour}}
                            onAnimationComplete={() => (
                                navigate('/driverInfo/' + driverData[0], {state: {colour: driver.colour, number: teamData.logo[0], top: logoRef.current.getBoundingClientRect()}})
                            )}
                        />
                        <motion.img 
                            className='num-img-team'
                            ref={logoRef}
                            initial={{opacity: 0, scale: 0, translateX: '-50%'}}
                            animate={{opacity: 1, scale: 1, translateX: '-50%'}}
                            transition={{duration: 0.75}}
                            style={{'--viewportTop': viewportCentre + 'px', '--bgCol': teamData.logo[2], filter: blackNumLogos.includes(driverData[1]) ? 'invert(1)' : 'auto'}}
                            src={'/f1-project/assets/logos/drivers/' + driverData[3]}
                        />
                    </>
                ) : null}
            </AnimatePresence>

            <div className='indv-driver-container'>
                <motion.img
                    src={'/f1-project/assets/people/' + driverData[2]}
                    style={{width: 600}} 
                    initial={{ opacity: 0, translateY: '100px'}}
                    whileInView={{ opacity: 1, translateY: '0px' }}
                    transition={{ duration: 1 }}
                    viewport={{once: true}}
                    onClick={() => {
                        setViewportCentre(window.scrollY);
                        setClickedDriver(true);
                    }}
                />
                <div className='driver-info'>
                    <motion.img 
                        src={'/f1-project/assets/logos/drivers/' + driverData[3]} 
                        style={{height: '70px', aspectRatio: 'auto', objectFit: 'contain', objectPosition: 'left center', filter: blackNumLogos.includes(driverData[1]) ? 'invert(1)' : 'auto'}} 
                        initial={{ opacity: 0, translateY: '100px'}}
                        whileInView={{ opacity: 1, translateY: '0px' }}
                        transition={{ duration: 1.5 }}
                        viewport={{once: true, margin: '-70px'}}
                    />
                    <motion.h3 
                        style={{fontSize: '18px', fontWeight: '550', margin: 0}}
                        initial={{ opacity: 0, translateY: '100px'}}
                        whileInView={{ opacity: 1, translateY: '0px' }}
                        transition={{ duration: 1.5 }}
                        viewport={{once: true, margin: '-70px'}}
                    >
                        {driverData[0]}
                    </motion.h3>
                    <motion.h3 
                        style={{fontSize: '18px', fontWeight: '550', margin: 0}}
                        initial={{ opacity: 0, translateY: '100px'}}
                        whileInView={{ opacity: 1, translateY: '0px' }}
                        transition={{ duration: 1.5 }}
                        viewport={{once: true, margin: '-70px'}}
                    >
                        ({driverData[4]} - )
                    </motion.h3>
                    <motion.img 
                        src={'/f1-project/assets/flags/' + driverData[5]}
                        style={{width: '100px'}}
                        initial={{ opacity: 0, translateY: '100px'}}
                        whileInView={{ opacity: 1, translateY: '0px' }}
                        transition={{ duration: 1.5 }}
                        viewport={{once: true, margin: '-70px'}}
                    />
                </div>
            </div>
        </>
    )
}

function TeamMembers({ teamData }) {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/drivers')
        .then((response) => {return response.json()})
        .then((data) => {
            setDrivers(data);
        })
    }, [])

    return (
        <>
            <div className='team-lead-container'>
                <TeamLeadIcon teamLead={ teamData.teamPrincipal } teamLeadStart={ teamData.teamPrincipal[2]} teamLeadLabel="TEAM PRINCIPAL" slideDist='-900px'/>
                <TeamLeadIcon teamLead={ teamData.techChief } teamLeadStart={ teamData.techChief[2]} teamLeadLabel="TECHNICAL CHIEF" slideDist='900px'/>
            </div>
            <motion.h2
                style={{ position: 'relative', top: '775px' }}
                initial={{ opacity: 0, translateY: '-50px' }}
                whileInView={{ opacity: 1, translateY: '0px' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1 }}
            >
                DRIVERS
            </motion.h2>
            <div className='drivers-container' style={{zIndex: 10}}>
                <DriverIcon driverData={teamData.driver1} teamData={teamData} driver={drivers.find(d => d.name === teamData.driver1[0])}/>
                <DriverIcon driverData={teamData.driver2} teamData={teamData} driver={drivers.find(d => d.name === teamData.driver2[0])}/>
            </div>
        </>
    )
}

function GalleryHeader({ team, chassis}) {
    return(
        <motion.h2
            style={{ position: 'relative', top: '900px', zIndex: 1 }}
            initial={{ opacity: 0, translateY: '-50px' }}
            whileInView={{ opacity: 1, translateY: '0px' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1 }}
        >
            THE 2025 {team} {chassis}
        </motion.h2>
    )
 }
