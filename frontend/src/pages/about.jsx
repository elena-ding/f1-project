import MenuButton from '../components/MenuButton.jsx';
import Gallery from '../components/Gallery.jsx'
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

import './about.css'

export default function About() {
    return (
        <>
            <MenuButton />
            <AboutIntro />
            <OrganizationInfo />
            <RaceWeekendInfo />
            <RaceInfo />
            <ChampionshipInfo />
            <div style={{opacity: 0, position: 'relative', top: '150px'}}>spacing filler</div>
        </>
    )
}

function TitleText() {
    return (
        <div className='about-title-container'>
            <motion.h1 
                className='about-title-text'
                initial={{translateX: '100%'}}
                animate={{translateX: '0%'}}
                transition={{duration: 1.5, ease: 'easeOut'}}
            >
                ABOUT
            </motion.h1>
            <motion.h1 
                className='about-title-text'
                initial={{translateX: '140%'}}
                animate={{translateX: '0%'}}
                transition={{duration: 1.5, ease: 'easeOut'}}
            >
                FORMULA 1
            </motion.h1>
            <motion.h2 
                style={{margin: 0, justifyContent: 'left'}}
                initial={{translateX: '180%'}}
                animate={{translateX: '0%'}}
                transition={{duration: 1.5, ease: 'easeOut'}}
            >
                <em>THE HOME OF RISK TAKERS,<br />LATE BRAKERS AND<br />HISTORY MAKERS.</em>
            </motion.h2>
        </div>
    )
}

function AboutImg() {
    return (
        <>
            <div className='about-img-container'>
                <motion.img 
                    className='about-img' 
                    src='/f1-project/assets/misc. images/monaco_hairpin.jpg' 
                    initial={{translateX: '-101%'}}
                    animate={{translateX: '0%'}}
                    transition={{duration: 1.5, ease: 'easeOut'}}
                />
                <motion.p 
                    className='caption-text text-shadow'
                    initial={{translateX: '-900px'}}
                    animate={{translateX: '0px'}}
                    transition={{duration: 1.5, ease: 'easeOut'}}
                >
                    The Fairmont Hairpin at Circuit de Monaco (2018)
                </motion.p>
            </div>
        </>
    )
}

function AboutText({ text, textWidth, topPos, leftPos }) {
    return (
        <motion.h4 
            className='about-body-text'
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 2}}
            style={{'--width': textWidth, '--top': topPos, '--left': leftPos}}
        >
            {text}
        </motion.h4>
    )
}

function AboutIntro() {
    const introText = `Formula 1 is the fastest, fiercest, and most technologically advanced motorsport on the planet. It’s where cutting-edge engineering meets fearless driving, as elite teams and razor-sharp drivers go wheel-to-wheel at speeds over 370 km/h (230 mph). From pit stops that happen in the blink of an eye to split-second overtakes, every race is a high-stakes blend of strategy, skill, and sheer adrenaline.

    This is racing at its absolute peak.`

    return (
        <>
            <div className='about-intro-container'>
                <TitleText />
                <AboutImg />
                <AboutText text={introText} textWidth={'345px'} topPos={'280px'} left={'0px'} />
            </div>
        </>
    )
}

function OrganizationInfo() {
    const organizationText = `Formula 1 is made up of 10 teams, each with two drivers, meaning 20 of the world’s best compete across the season. Behind every driver is a dedicated crew split into 3 main sections. Mechanics handle the physical upkeep of the car and perform pit stops. Race engineers are the driver’s main point of contact, guiding them with data and feedback throughout a session. Finally, strategists crunch the numbers to make critical calls on pit timing, tyres, and race tactics. Each team is led by a Team Principal, who oversees all operations, decisions, and direction.

    F1 is governed by the FIA (Fédération Internationale de l’Automobile), which sets the rules and ensures safety and fairness across the sport. There are 24 races across 21 countries in a year, 8 of which take place on a street circuit compared to a race track. Permanent race tracks are purpose-built for racing, with wide run-off areas, high-speed corners, and facilities designed for motorsport. Street circuits are temporary tracks laid out on actual city streets. These tend to be narrower, with tight corners, barriers lining the edge of the track, and little room for error.

    Formula 1 sits at the top of a global racing ladder that includes F2, F3, and F4, junior categories that help develop future F1 drivers. There’s also Formula E which consists of all-electric racing and F1 Academy, a series dedicated to nurturing young female talent in motorsport.`

    const [orgInfoImgs, setOrgInfoImges] = useState([]);
    const [orgInfoDescs, setOrgInfoDescs] = useState([]);

    useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/about')
        .then((response) => {return response.json()})
        .then((data) => {
            setOrgInfoImges(data[0].images);
            setOrgInfoDescs(data[0].descriptions);
        })
    }, [])

    return (
        <>
            <AboutText text={organizationText} textWidth={'520px'} topPos={'1200px'} leftPos={'202px'} />
            <Gallery photos={orgInfoImgs} photoPath='misc. images' top='680px' left='760px' width={665} height='507.7161796px' descs={orgInfoDescs} numImgs={9} />
        </>
    )
}

function RaceWeekendInfo() {
    const raceWeekendText = `A standard Formula 1 race weekend runs from Friday to Sunday. On Friday, teams take part in two practice sessions, where drivers get familiar with the track and engineers collect data on tyres, fuel loads, and car setups. Saturday usually features a final practice session followed by qualifying, which decides the starting order for the race. Qualifying is split into three timed sessions: Q1, Q2, and Q3. In Q1, all 20 drivers set lap times, and the 5 slowest are eliminated and they start the race from positions 16 to 20, based on their lap times. The remaining 15 drivers move on to Q2, where another 5 are eliminated and will start in positions 11 to 15. The final 10 compete in Q3, where the fastest lap earns pole position (1st place on the starting grid), and the rest fill out positions 2 to 10, depending on their times. Lap times reset between each round, so in Q1 and Q2, drivers just need to be fast enough to advance, while Q3 is about being as fast as possible. Sunday is race day, where drivers compete for championship points based on their finishing positions. Races are typically around 305 kilometers (190 miles) long and usually last about 1.5 to 2 hours, depending on the circuit and race conditions.

    While most Formula 1 weekends follow the traditional format, six races per season are designated as Sprint weekends, adding an extra competitive element. The Sprint is a short 100 km race, about one-third the distance of a Grand Prix and designed to be flat-out and fast-paced, typically lasting around 30 minutes.

    Sprint weekends still run from Friday to Sunday, but the schedule shifts slightly. Friday features one practice session followed by Sprint Qualifying, which sets the grid for Saturday’s Sprint race. Saturday then hosts the Sprint, replacing the usual third practice session, while Qualifying for Sunday’s Grand Prix takes place later that day. The Sprint doesn’t affect the Grand Prix starting grid and stands as its own event, with championship points awarded to the top 8 finishers. These weekends are held at tracks known for great overtaking opportunities, making the racing more aggressive and action-packed.`

    return (
        <AboutText text={raceWeekendText} textWidth={'1280px'} topPos={'790px'} leftPos={'202px'} />
    )
}

function RaceInfo() {
    const raceInfoText = `On race day, drivers begin with a formation lap, a warm-up lap that allows them to check their car and tyres before lining up on the starting grid in the order decided by qualifying. When the five red lights go out, the race begins.

    During the race, flags are used to communicate important information. Yellow flags mean danger on track, usually due to a crash or debris, so drivers must slow down and cannot overtake. A red flag means the session is stopped, typically for serious incidents or dangerous conditions like heavy rain. Blue flags tell slower drivers to let faster cars (usually those lapping them) through. Green flags signal that the track is clear and normal racing can resume. The chequered flag is waved at the finish line, signaling the end of the race.
    
    If an incident is serious or causes significant debris on the track, a Safety Car may be deployed. This is a car that goes onto the track and leads the pack at a controlled pace while marshals clean up or assist drivers. For smaller or quicker issues, a Virtual Safety Car (VSC) can be used instead, where drivers slow down and follow a set lap time, but continue in position without bunching up behind a physical car.
    
    Drivers can also receive penalties for breaking the rules, like causing collisions, speeding in the pit lane, or track limits violations. Common penalties include 5 or 10 second time penalties that can be served during a pitstop or given after the race. Penalties can even result in starting position grid drops for the next race.
    
    Pit stops are key to race strategy. Drivers change tyres (and occasionally fix damage), and teams aim to do this in under 3 seconds. There’s also a mandatory tyre rule: in dry races, drivers must use at least two different tyre compounds, typically soft, medium, or hard, each offering a trade-off between grip and durability. Softer tyres are faster but wear out quicker, while harder ones last longer but are slower. Wet and intermediate tyres are used in rainy conditions.`

    const [raceInfoImgs, setRaceInfoImges] = useState([]);
    const [raceInfoDescs, setRaceInfoDescs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/about')
        .then((response) => {return response.json()})
        .then((data) => {
            setRaceInfoImges(data[1].images);
            setRaceInfoDescs(data[1].descriptions);
        })
    }, [])

    return (
        <>
            <Gallery photos={raceInfoImgs} photoPath='misc. images' top='900px' left='150px' width={550} height='687.5px' descs={raceInfoDescs} numImgs={7} />
            <AboutText text={raceInfoText} textWidth={'650px'} topPos={'215px'} leftPos={'830px'} />
        </>
    )
}

function ChampionshipInfo() {
    const championsihpInfoText = `In Formula 1, championship points are awarded to the top 10 finishers in each Grand Prix, with 25 points for the winner, 18 for 2nd, then 15, 12, 10, 8, 6, 4 and 2 for drivers in the 3rd to 9th positions and finally a single point for the 10th-placed driver. Sprint races award points to the top 8 finishers (8 points for 1st down to 1 point for 8th).

    These points count toward two different championships: the Drivers’ Championship, awarded to the driver with the most points by season’s end, and the Constructors’ Championship, awarded to the team whose two drivers earn the most combined points. Drivers aim for personal glory and legacy, while teams compete for prestige, funding, and technical dominance.`

    const [champInfoImgs, setChampInfoImges] = useState([]);
    const [champInfoDescs, setChampInfoDescs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/about')
        .then((response) => {return response.json()})
        .then((data) => {
            setChampInfoImges(data[2].images);
            setChampInfoDescs(data[2].descriptions);
        })
    }, [])

    return (
        <>
            <AboutText text={championsihpInfoText} textWidth={'450px'} topPos={'350px'} leftPos={'202px'} />
            <Gallery photos={champInfoImgs} photoPath='misc. images' top='18px' left='675px' width={750} height='334.693877551px' descs={champInfoDescs} numImgs={2} />
        </>
    )
}
