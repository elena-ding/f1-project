import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import './TeamHeader.css';
import data from '../pages/teamData.json';

export default function TeamHeader({ teamId }) {
    const teamData = data.find(team => team.id === teamId);
    return (
        <>
            <TeamNameSlide teamName={teamData.name} />
            <TeamLogoSlide teamLogo={teamData.logo[0]} logoWidth={teamData.logo[1]} logoPos={teamData.logo[3]} />
            <LineSlide height='2px' origin='right' colour={teamData.logo[2]} />
        </>
    )
}

function TeamNameSlide({ teamName }) {
    
    const [width, setWidth] = useState(null);
    let ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
    });

    if (width === null) {
        return (
            <motion.h1
                ref={ref}
                style={{
                    fontFamily: 'Helvetica, sans-serif', 
                    fontSize: 50,
                    textTransform: 'uppercase',
                    visibility: 'hidden'
                }}
            >
                {teamName}
            </motion.h1>
        )
    }

    return (
        <div className= {teamName === 'Visa Cash App Racing Bulls Formula One Team' || teamName === 'Aston Martin Aramco Formula One Team' || teamName === 'Mercedes-AMG PETRONAS Formula One Team' ? 'title-container-2' : 'title-container'}>
            <motion.h1
                ref={ref}
                style={{
                    fontFamily: 'Helvetica, sans-serif', 
                    fontSize: 70,
                    color: '#f2e9e5',
                    textTransform: 'uppercase',
                }}
                initial={{translateX: -width}}
                animate={{translateX: '0px'}}
                transition={{duration: 1.5, type: 'spring', stiffness: 55, damping: 10, mass: 0.9}}
            >
                {teamName}
            </motion.h1>
        </div>  
    )
}

function TeamLogoSlide({ teamLogo, logoWidth, logoPos }) {
    return (
        <div className='logo-container' style={{'--logoWidth': logoWidth, '--logoPos': logoPos}}>
            <motion.img 
                src={'/assets/logos/teams/' + teamLogo}
                style={{width: logoWidth, '--logoPos': logoPos, zIndex: -1}}
                initial={{translateX: logoWidth}}
                animate={{translateX: '0px'}}
                transition={{duration: 1.5, type: 'spring', stiffness: 55, damping: 10, mass: 0.9}}
            ></motion.img>
        </div> 
    )
}

function LineSlide({ height, origin, colour }) {
    return(
        <motion.div 
            className='line' 
            style={{'--lineColour': colour, '--height': height, '--origin': origin, zIndex: -2}}
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{duration: 1.5}}
        ></motion.div>
    )
}