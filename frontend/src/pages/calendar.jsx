import MenuButton from '../components/MenuButton.jsx';
import PageTitle from '../components/PageTitle.jsx';
import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import './calendar.css';

export default function Calendar() {

    return (
        <>
            <MenuButton />
            <PageTitle title='FORMULA 1 2025 CALENDAR' slideDist='-300px' />
            <RaceList />
            <div className='globe-pos fade-in-globe' >
                <GlobeOfRaces />
            </div>
            <div style={{opacity: 0, position: 'absolute', top: '2325px'}}>spacing filler</div>
        </>
    )
}

function RaceList() {
    const [circuits, setCircuits] = useState([]);

    useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/circuits')
        .then((response) => {return response.json()})
        .then((data) => {
            setCircuits(data);
        })
    }, [])

    if (circuits.length === 0) {
       return <h2>loading</h2>
    }

    return (
        <div className='race-list'>
            {circuits.map((item, i) => {
                return ( 
                    <motion.div 
                        key={item.raceName}
                        className='race-text'
                        initial={{ translateX: '800px' }}
                        animate={{ translateX: '0px' }}
                        transition={{ duration: 1, delay: 2 + 0.12*i, ease: 'easeOut' }}
                    >
                        <Race round={item.raceNum} name={item.raceName} date={item.date} index={i} />
                    </motion.div>
                )
            })}
        </div>
    )
}

function Race({ round, name, date, index }) {
    const navigate = useNavigate();
    const [hoveringIndex, setHoveringIndex] = useState(null);
    const text=['ROUND ' + round, name, date]
    return (
        <>
            {text.map((item, i) => (
                <motion.h3
                    key={item} 
                    style={{fontWeight: '350', margin: 0, padding: 0, cursor: 'pointer'}}
                    onMouseEnter={() => setHoveringIndex(index)}
                    onMouseLeave={() => setHoveringIndex(null)}
                    onClick={() => navigate('/calendar/' + name)}
                    animate={hoveringIndex === index ? {scale: 1.1, color: '#D40000'} : {scale: 1}}
                    transition={{duration: 0.17}}
                >
                    {item}
                </motion.h3>
            ))} 
        </>
    )
}

function GlobeOfRaces() {
    const navigate = useNavigate();
    const [globeData, setGlobeData] = useState([])

    useEffect(() => {
        fetch('hhttps://f1-project-backend.onrender.com/globe')
        .then((response) => {return response.json()})
        .then((data) => {
            setGlobeData(data);
        })
    }, [])

    const gData = globeData.map((item, i) => ({
        lat: item.lat,
        lng: item.long,
        icon: item.flag,
        name: item.raceName,
        maxR: 5.5,
        propagationSpeed: 0.6,
        repeatPeriod: 1400
    }));

    const colorInterpolator = t => `rgba(255, 255, 255,${Math.sqrt(1-t)})`;

    return (
        <Globe
            htmlElementsData={gData}
            globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl={"//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"}
            backgroundColor="#18191A"
            ringsData={gData}
            ringColor={() => colorInterpolator}
            ringMaxRadius="maxR"
            ringPropagationSpeed="propagationSpeed"
            ringRepeatPeriod="repeatPeriod"
            height={[750]}
            htmlElement={d => {
                const el = document.createElement('img');
                el.src = '/f1-project/assets/flags/' + d.icon;
                el.style.width='45px'
                el.style['pointer-events'] = 'auto';
                el.style.cursor = 'pointer';
                el.onclick = () => navigate('/calendar/' + d.name);
                return el;
            }}
        />
    )
}
