import MenuButton from '../components/MenuButton.jsx';
import DropdownButton from '../components/DropdownButton.jsx';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { InstagramEmbed } from 'react-social-media-embed';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useInView } from "react-intersection-observer";
import './driverInfoPage.css';


export default function DriverInfoPage() {
    const { driverName } = useParams();
    const location = useLocation();
    const colour = location.state.colour;
    const number = location.state.number;
    const top = location.state.top;
    const [drivers, setDrivers] = useState([]);
    const blackNumLogos=["GR63.png", "KA12.png", "CL16.png", "LH44.png", "CS55.png", "AA23.png", "GB5.png", "NH27.png", "FA14.png", "LS18.png", "PG10.png", "FC43.png"]
    
        useEffect(() => {
            fetch('https://f1-project-backend.onrender.com/drivers')
            .then((response) => {return response.json()})
            .then((data) => {
                setDrivers(data);
            })
        }, [])
        
        if (drivers.length === 0) {
            return(
                <>
                    <motion.div 
                        className='transition-rect'
                        style={{'--bgCol': colour, zIndex: 1}}
                    />
                    <motion.img 
                        className='transition-num-img'
                        style={{'--topPos': top.top ,filter: blackNumLogos.includes(number) ? 'invert(1)' : 'auto'}}
                        src={'/f1-project/assets/logos/drivers/' + number}
                    />
                </>
            )
        }

    return (
        <>
            <MenuButton />
            <DriverHeader driver={drivers.find(d => d.name === driverName)} top={top.top} />
            <DriverInfo driver={drivers.find(d => d.name === driverName)} />
            <div style={{opacity: 0, position: 'relative', top: '1680px'}}>spacing filler</div>
        </>
    )
}

function DriverHeader({ driver, top }) {
    const blackNumLogos=["GR63.png", "KA12.png", "CL16.png", "LH44.png", "CS55.png", "AA23.png", "GB5.png", "NH27.png", "FA14.png", "LS18.png", "PG10.png", "FC43.png"];

    return (
        <> 
            <motion.div 
                className='transition-rect slide-up-rect'
                style={{'--bgCol': driver.colour, zIndex: 1}}
            />
            <motion.img 
                className='transition-num-img slide-up-num'
                style={{'--topPos': top, filter: blackNumLogos.includes(driver.number) ? 'invert(1)' : 'auto'}}
                src={'/f1-project/assets/logos/drivers/' + driver.number}
            />
            <motion.div className='driver-header'>
                <motion.h1 
                    className='slide-up driver-name-text'
                    style={{position: 'relative', left: '100px'}}
                >
                    {driver.name}
                </motion.h1>
                <motion.div className='flag-number-container'>
                     <motion.img 
                        className='slide-up'
                        style={{margin: 0, padding: 0, height: '100px'}}
                        src={'/f1-project/assets/flags/' + driver.flag}
                    />
                    <motion.img 
                        className='slide-up'
                        style={{margin: 0, padding: 0, height: '100px', filter: blackNumLogos.includes(driver.number) ? 'invert(1)' : 'auto'}}
                        src={'/f1-project/assets/logos/drivers/' + driver.number}
                    />
                </motion.div>
            </motion.div>
            <LineSlide colour={driver.colour} />
        </> 
    )
}

function LineSlide({ colour }) {
    return (
        <div 
            className='driver-line slide-up-line'
            style={{'--lineColour': colour, zIndex: -2}}
        ></div>
    )
}

function LabelLine({ driver, label, currTeamTopPos, index }) {
    const driverLabel = label.driverLabelName
    return (
        <motion.div 
            className='slide-up-labels' 
            style={{position: 'absolute', top: label.labelName === 'Current Team' ? currTeamTopPos : label.topPosLabel, left: label.leftPosLabel, pointerEvents: 'none'}}
            initial='rest'
            whileHover='hover'
        >
            <motion.div 
                className='circle' 
                variants={{
                    rest: {scale: 1},
                    hover: {scale: 1.3}
                }}
                style={{pointerEvents: 'auto'}}
            />
            <motion.div 
                className='label-line' 
                style={{'--deg': label.degDiag, '--topPos': label.topPosDiag, '--leftPos': label.leftPosDiag, '--len': label.lenDiag, pointerEvents: 'auto'}}
                variants={{
                    rest: {scaleY: 1},
                    hover: {scaleY: 1.5}
                }}
            />
            <motion.div 
                className='label-line' 
                style={{'--deg': '0deg', '--topPos': label.topPosStr, '--leftPos': label.leftPosStr, '--len': label.lenStr, pointerEvents: 'auto'}}
                variants={{
                    rest: {scaleY: 1},
                    hover: {scaleY: 1.5}
                }}
            />
            <motion.div 
                className='label-text' 
                style={{position: 'absolute', top: label.topPosText, left: label.leftPosText, fontWeight: 600, display: 'inline-block', whiteSpace: 'nowrap', transformOrigin: index % 2 === 0 ? 'right' : 'left', pointerEvents: 'auto', textAlign: index % 2 === 0 ? 'right' : 'left'}}
                variants={{
                    rest:  {scale: 1, translateY: 0},
                    hover: {scale: 1.2, translateY: '-28%'}
                }}
                transition={{ type: 'tween' }}
            >
                {label.labelName}
                <motion.div 
                    className='label-underline'
                    variants={{
                        rest: {scaleX: 0},
                        hover: {scaleX: 1}
                    }}
                    transition={{ type: 'tween' }}
                />
                <motion.div 
                    className='driver-info-text'
                    variants={{
                        rest: {scaleX: 1, opacity: 0, translateY: '-30px'},
                        hover: {scaleX: 1, opacity: 1, translateY: '0px'}
                    }}
                    transition={{ type: 'tween' }}
                >
                    {driver[driverLabel]}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

function DriverStatsGraph({ driver }) {
    const [qualiSessionKeys, setQualiSessionKeys] = useState([]);
    const [raceSessionKeys, setRaceSessionKeys] = useState([]);
    const [sprintQualiSessionKeys, setSprintQualiSessionKeys] = useState([]);
    const [sprintRaceSessionKeys, setSprintRaceSessionKeys] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const {ref: graph1, inView: inView1} = useInView({ threshold: 0.2, triggerOnce: true });
    const {ref: graph2, inView: inView2} = useInView({ threshold: 0.2, triggerOnce: true });
    const sprints = ['Shanghai', 'Miami', 'Spa-Francorchamps', 'Austin', 'Sao Paulo', 'Lusail']

    const setStatesArray = [setQualiSessionKeys, setRaceSessionKeys, setSprintQualiSessionKeys, setSprintRaceSessionKeys, setDriverResults];
    const linksArray = ['https://api.openf1.org/v1/sessions?year=2025&session_name=Qualifying', 'https://api.openf1.org/v1/sessions?year=2025&session_name=Race', 'https://api.openf1.org/v1/sessions?year=2025&session_name=Sprint%20Qualifying', 'https://api.openf1.org/v1/sessions?year=2025&session_name=Sprint', 'https://api.openf1.org/v1/session_result?driver_number=' + driver.numberInt]

    useEffect(() => {
        async function fetchInfo() {
            const results = [];
            for (const [index, link] of linksArray.entries()) {
                const response = await fetch(link);
                const data = await response.json();
                results.push(data);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            results.map((item, index) => {
                setStatesArray[index](item)
            })
        }
        fetchInfo();
    }, [])

    if (!qualiSessionKeys.length || !raceSessionKeys.length || !sprintQualiSessionKeys.length || !sprintRaceSessionKeys.length){
        return <h2 style={{position: 'absolute', top: '2700px', left: '50%', transform: 'translateX(-50%)'}}>loading</h2>
    }

    const regData = qualiSessionKeys.map((item, i) => {
        const qualiResult = driverResults.find(result => result.session_key === item.session_key);

        const raceObj = raceSessionKeys.find(result => result.meeting_key === item.meeting_key); //get the right race weekend object
        const raceSessionKey = raceObj ? raceObj.session_key : null; //get the session key for the race itself
        const raceResult = driverResults.find(result => result.session_key === raceSessionKey); //get the driver's session info from the session key

        return {
            name: item.country_code,
            quali: qualiResult ? qualiResult.position : null,
            race: raceResult ? raceResult.position : null //get the driver's position from the raceResult object
        }
    })

    const sprintData = sprintQualiSessionKeys.map((item, i) => {
        const sprintQualiResult = driverResults.find(result => result.session_key === item.session_key);

        const sprintRaceObj = sprintRaceSessionKeys.find(result => result.meeting_key === item.meeting_key)
        const sprintRaceSessionKey = sprintRaceObj ? sprintRaceObj.session_key : null
        const sprintRaceResult = driverResults.find(result => result.session_key === sprintRaceSessionKey)

        return {
            name: item.country_code,
            place: item.circuit_short_name,
            sprintQuali:  sprints.includes(item.circuit_short_name) ? (sprintQualiResult ? sprintQualiResult.position : null) : null,
            sprintRace:  sprints.includes(item.circuit_short_name) ? (sprintRaceResult ? sprintRaceResult.position : null) : null,
        }
    })

    return (
        <div style={{position: 'relative', top: '1400px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: '140px'}}>
            <div ref={graph1} style={{minHeight: '700px'}}>
                <h2>{driver.name}'s Qualifying Positions vs. Race Finishes</h2>
                {inView1 ? 
                    <div className='fade-in-graph' style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                        <LineChart
                            width={1150}
                            height={700}
                            data={regData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 40
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff81" />
                            <XAxis 
                                dataKey={"name"} 
                                label={{value: "Race", position: "insideTop", offset: 70, fill: "#ffffffbd"}} 
                                tick={{fill: "#ffffffbd"}} 
                                angle={-90} 
                                tickMargin={23} 
                            />
                            <YAxis 
                                label={{value: "Position", angle: -90, position: "insideLeft", offset: 5, fill: "#ffffffbd"}} 
                                reversed={true} 
                                domain={[1, 20]} 
                                tick={{fill: "#ffffffbd"}} 
                                tickCount={20} 
                                interval={0}
                            />
                            <Tooltip />
                            <Legend align="right" wrapperStyle={{position: "absolute", top: -10, right: 9}} />
                            <Line 
                                name="Qualifying Result" 
                                type="monotone" 
                                dataKey="quali" 
                                stroke="#007AFF" 
                                fill="#007AFF" 
                                strokeWidth="1.5" 
                                animationDuration={2500}
                                animationEasing="ease-out"
                            />
                            <Line 
                                name="Race Result" 
                                type="monotone" 
                                dataKey="race" 
                                stroke="#D20000" 
                                fill="#D20000" 
                                strokeWidth="1.5" 
                                animationDuration={2500}
                                animationEasing="ease-out"
                            />
                        </LineChart> 
                    </div>
                : null} 
            </div>
            <div ref={graph2} style={{minHeight: '700px'}}>
                <h2>{driver.name}'s Sprint Qualifying Positions vs. Sprint Race Finishes</h2>
                {inView2 ? 
                    <div className='fade-in-graph' style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
                        <LineChart
                            width={1150}
                            height={700}
                            data={sprintData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 40
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff81" />
                            <XAxis 
                                dataKey={"name"} 
                                label={{value: "Race", position: "insideTop", offset: 70, fill: "#ffffffbd"}} 
                                tick={{fill: "#ffffffbd"}} 
                                angle={-90} 
                                tickMargin={23} 
                            />
                            <YAxis 
                                label={{value: "Position", angle: -90, position: "insideLeft", offset: 5, fill: "#ffffffbd"}} 
                                reversed={true} 
                                domain={[1, 20]} 
                                tick={{fill: "#ffffffbd"}} 
                                tickCount={20} 
                                interval={0}/>
                            <Tooltip />
                            <Legend align="right" wrapperStyle={{position: "absolute", top: -10, right: 9}} />
                            <Line 
                                name="Sprint Qualifying Result" 
                                type="monotone" 
                                dataKey="sprintQuali" 
                                stroke="#007AFF" 
                                fill="#007AFF" 
                                strokeWidth="1.5" 
                                animationDuration={1500}
                                animationEasing="ease-out"
                            />
                            <Line 
                                name="Sprint Race Result" 
                                type="monotone" 
                                dataKey="sprintRace" 
                                stroke="#D20000" 
                                fill="#D20000" 
                                strokeWidth="1.5" 
                                animationDuration={1500}
                                animationEasing="ease-out"
                            />
                        </LineChart>
                    </div>
                : null}
            </div>
        </div>
    )
}

function CompareDriversGraph({ driver }) {
    const [inputtedDriverNum, setInputtedDriverNum] = useState();
    const [inputtedDriverName, setInputtedDriverName] = useState();
    const [raceSessionKeys, setRaceSessionKeys] = useState([]);
    const [driver1Results, setDriver1Results] = useState([]);
    const [driver2Results, setDriver2Results] = useState([]);
    const {ref, inView} = useInView({ threshold: 0.2, triggerOnce: true});

    const linksArray = ['https://api.openf1.org/v1/sessions?year=2025&session_name=Race', 'https://api.openf1.org/v1/session_result?driver_number=' + driver.numberInt]

    useEffect(() => {
        async function fetchStuff() {
            const results = [];
            for (const link of linksArray) {
                const response = await fetch(link);
                const result = await response.json();
                results.push(result);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setRaceSessionKeys(results[0]);
            setDriver1Results(results[1])
        }

        fetchStuff();

    }, [])

    useEffect(() => {
        inputtedDriverNum ?
            fetch('https://api.openf1.org/v1/session_result?driver_number=' + inputtedDriverNum)
            .then((response) => {return response.json()})
            .then((data) => {
                setDriver2Results(data);
            })
        : null;
    }, [inputtedDriverNum])
    

    const data = raceSessionKeys.map((item, i) => {
        const driver1Pos = driver1Results.find(result => result.session_key === item.session_key) ? driver1Results.find(result => result.session_key === item.session_key).position : null
        const driver2Pos = driver2Results.find(result => result.session_key === item.session_key) ? driver2Results.find(result => result.session_key === item.session_key).position : null
        return {
            name: item.country_code,
            driver1: driver1Pos,
            driver2: driver2Pos ? driver2Pos : null
        }
    })

    return (
        <>
            <div ref={ref} style={{minHeight: '700px', position: 'relative', top: '1550px', left: '50%', transform: 'translateX(-50%)'}}>
                <div style={{position: 'absolute', left: '50%',  transform: 'translateX(-50%)', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
                    <h2 style={{color: '#f2e9e5', fontFamily: 'Helvetica, sans-serif', margin: 0}}>Compare {driver.name}'s Race Results with </h2>
                    <div>
                        <DropdownButton inputDriverNum={setInputtedDriverNum} inputDriverName={setInputtedDriverName} />
                    </div>
                </div>
                {inView ? 
                    <div className ='fade-in-graph' style={{position: 'absolute', left: '50%', top: '60px', transform: 'translateX(-50%)'}}>
                        <LineChart
                            width={1150}
                            height={700}
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 40
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff81" />
                            <XAxis 
                                dataKey={"name"} 
                                label={{value: "Race", position: "insideTop", offset: 70, fill: "#ffffffbd"}} 
                                tick={{fill: "#ffffffbd"}} 
                                angle={-90} 
                                tickMargin={23} 
                            />
                            <YAxis 
                                label={{value: "Position", angle: -90, position: "insideLeft", offset: 5, fill: "#ffffffbd"}} 
                                reversed={true} 
                                domain={[1, 20]} 
                                tick={{fill: "#ffffffbd"}} 
                                tickCount={20} 
                                interval={0}
                            />
                            <Tooltip />
                            <Legend align="right" wrapperStyle={{position: "absolute", top: -10, right: 9}} />
                            <Line 
                                name={driver.name}
                                type="monotone" 
                                dataKey="driver1" 
                                stroke="#007AFF" 
                                fill="#007AFF" 
                                strokeWidth="1.5" 
                                animationDuration={2500}
                                animationEasing="ease-out"
                            />
                            <Line 
                                name={inputtedDriverName ? inputtedDriverName : ' '} 
                                type="monotone" 
                                dataKey="driver2" 
                                stroke={inputtedDriverName ? "#D20000" : "#18191A"}
                                fill={inputtedDriverName ? "#D20000" : "#18191A"}
                                strokeWidth="1.5" 
                                animationDuration={2500}
                                animationEasing="ease-out"
                            />
                        </LineChart> 
                    </div>
                : null}
            </div>
        </>
    )
}

function DriverInfo({ driver }) {
    const [labels, setLabels] = useState([]);
    const [recentPostUrl, setRecentPostUrl] = useState("");
    
    useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/labels')
        .then((response) => {return response.json()})
        .then((data) => {
            setLabels(data);
        })
    }, [])

    useEffect(() => {
        fetch('https://api.apify.com/v2/datasets/jeKvXMg1EM6APi7qv/items?token=apify_api_YXfuAeV3e8bvAU7PXBq5mx4Qtdm3th0AvKYb')
        .then((response) => {return response.json()})
        .then((data) => {
            const driverProfile=data.find(d => d.inputUrl === driver.igLink)
            setRecentPostUrl(driverProfile.url)
        })
    }, [])
    
    return (
        <>
            <motion.img 
                className='driver-img slide-up-centered' 
                src={'/f1-project/assets/people/' + driver.image}
            />
            {labels.map((item, i) => (
                <LabelLine 
                    driver={driver} 
                    label={item} 
                    currTeamTopPos={driver.customLabelPos} 
                    index={i}
                    key={item.labelName}
                />
            ))}

            <div style={{display: 'flex', justifyContent: 'center', position: 'relative', top: '1300px' }}>
                <InstagramEmbed url={recentPostUrl} width={750} captioned/>
            </div>

            <DriverStatsGraph driver={driver}/>
            <CompareDriversGraph driver={driver} />
        </>
    )
}
