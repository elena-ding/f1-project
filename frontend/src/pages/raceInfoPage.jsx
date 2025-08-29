import MenuButton from '../components/MenuButton.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import './raceInfoPage.css'

export default function RaceInfoPage() {
    const { raceName } = useParams();
    const [raceData, setRaceData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/circuits')
        .then((response) => {return response.json()})
        .then((data) => {
            setRaceData(data.find(d => d.raceName === raceName))
        })
    }, [])

    if (raceData.length === 0) {
        return <h2>loading</h2>
    }

    return (
        <>
            <MenuButton />
            <RaceTitle raceTitle={raceData.raceName} />
            <Circuit circuitImg={raceData.circuitImg} />
            <RaceDetails raceData={raceData} />
            <PopUp />
        </>
        
    );
}

function RaceTitle({ raceTitle }) {
    return <h1 className='race-name-text fade-in-race-title'>{raceTitle}</h1>
}

function Circuit({ circuitImg }) {
    return (
        <motion.div className='circuit-container'>
            <motion.img 
                src={'/assets/circuits/' + circuitImg} 
                className='circuit-img' 
                animate={{translateY: ['700px', '0px', '0px', '0px'], scale: [0.5, 0.5, 1, 1], translateX: ['-25%', '-25%', '-25%', '-50%']}} 
                transition={{duration: 3, ease: 'easeInOut'}}
            />
        </motion.div>
    )
}

function RaceDetails({ raceData }) {
    const dataPoints = ['Round: ', 'Location: ', 'Dates: ', 'Circuit Length: ', 'Race Distance: ']
    const dataLabels = ['raceNum', 'location', 'date', 'circuitLen', 'raceDist']
    return (
        <>
            <motion.div 
                className='race-details-rect'
                animate={{translateX: ['400px', '400px', '400px', '0px']}}
                transition={{duration: 3, ease: 'easeInOut'}}
            >
                <div className='race-details-container'>
                    {dataPoints.map((item, i) => {
                        return (
                            <h3 
                                className='race-details-text'
                            >
                                <span style={{fontWeight: 650}}>{item}</span>
                                {raceData[dataLabels[i]]}
                                {dataLabels[i] === 'circuitLen' || dataLabels[i] === 'raceDist' ? ' km' : null}
                            </h3>
                        )
                    })}
                </div>
            </motion.div>
        </>
    )
}

function PopUp({}) {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <>
            <motion.h4 
                className='pop-up-button-text'
                onClick={() => setIsClicked(true)}
                whileHover={{scale: 1.07}}
                animate={{opacity: 1, transition: {duration: 3}}}
            >
                Click to learn more about the diagram above.
            </motion.h4>
            {isClicked ? 
                <>
                    <motion.div onClick={() => setIsClicked(false)}>
                        <motion.div className='x-button-line' style={{'--rotate': '45deg'}} animate={{opacity: 1}} transition={{duration: 1, ease: 'easeInOut'}} />
                        <motion.div className='x-button-line' style={{'--rotate': '-45deg'}} animate={{opacity: 1}} transition={{duration: 1, ease: 'easeInOut'}} />
                    </motion.div>
                    <motion.div className='bg-damper' animate={{opacity: '70%'}} transition={{duration: 1, ease: 'easeInOut'}} />
                    <motion.div className='pop-up-rect' animate={{opacity: '100%'}} transition={{duration: 1, ease: 'easeInOut'}} >
                        <h3 className='pop-up-text'>
                            The track is divided into 3 sectors to compare lap times (red, blue, and yellow), 
                            with numbered corners marking the sequence of turns and a pink speed trap showing where top speed is measured. 
                            <br /> <br />
                            DRS, or the Drag Reduction System, is shown by the green markers and dashed green lines. At each DRS detection zone, 
                            the system checks if a driver is within one second of the car ahead. 
                            <br /> <br />
                            If they are, they can activate DRS in the following activation zone, marked by the dashed green lines, 
                            where the rear wing opens to reduce drag and increase straight-line speed.
                        </h3>
                    </motion.div>
                </> : null
            }
        </>
    )
}

