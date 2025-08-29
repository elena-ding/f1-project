import PageTitle from '../components/PageTitle.jsx';
import MenuButton from '../components/MenuButton.jsx';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './teams.css'

export default function Teams() {
    return <TeamsPage />
}

function TeamsPage() {
    return (
        <div>
            <MenuButton />
            <PageTitle title='TEAMS' slideDist='-300px' />
            <TeamsTable />
        </div>
    )
}

function TeamsTable() {
    const teamNames1 = ['Alpine', 'Aston Martin', 'Ferrari', 'Haas', 'Kick Sauber']
    const teamNames2 = ['McLaren', 'Mercedes', 'Racing Bulls', 'Red Bull Racing', 'Williams']

    const teamImgs1 = [
        {path: 'alpine_logo.png', width: '170px', colour: '0, 162, 228'},
        {path: 'aston_martin_logo.png', width: '220px', colour: '0, 153, 115'},
        {path: 'ferrari_logo.png', width: '110px', colour: '247, 6, 54'},
        {path: 'haas_logo.png', width: '150px', colour: '156, 159, 162'},
        {path: 'kick_sauber_logo.png', width: '160px', colour: '0, 192, 50'}
    ]

    const teamImgs2 = [
        {path: 'mclaren_logo.png', width: '150px', colour: '252, 117, 35'},
        {path: 'mercedes_logo.png', width: '130px', colour: '0, 216, 183'},
        {path: 'racing_bulls_logo.png', width: '140px', colour: '105, 153, 250'},
        {path: 'red_bull_logo.png', width: '200px', colour: '65, 130, 211'},
        {path: 'williams_logo.png', width: '140px', colour: '8, 105, 214'}
    ]

    const teamColours = ['0, 162, 228', '0, 153, 115', '247, 6, 54', '156, 159, 162', '0, 192, 50', '252, 117, 35', '0, 216, 183', '105, 153, 250', '65, 130, 211', '8, 105, 214']
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(
        Array(10).fill(true)
    )
    function handleAnimationEnd (index) {
        const tempArr = disableButton.map((state, i) => {
            if (i === index) {
                return false
            } else {
                return state
            }
        });
        setDisableButton(tempArr);
    }
    return (
        <>
            <div className='teams-grid' style={{'--topPos': '290px', zIndex: '-2'}}>
                {teamImgs1.map((item, i) => (
                    <button
                        key={i}
                        className='fade-in'
                        style={{'--delay': 3 + 0.4*i + 's', opacity: 0}}
                        disabled={disableButton[i]}
                        onAnimationEnd={() => handleAnimationEnd(i)}
                        onClick={() => navigate('/teamInfo/' + teamNames1[i])}
                    >
                        <motion.img 
                            animate={hoveredIndex === i ? {
                                filter: 'drop-shadow(0 0 40px rgb(' + teamColours[i] + ')', scale: 1.1
                            } : {filter: 'drop-shadow(0 0 0px transparent', scale: 1}}
                            src={'assets/logos/teams/' + item.path} 
                            style={{width: item.width}}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    </button>
                ))}
            </div>
            <div className='teams-grid' style={{'--topPos': '460px', zIndex: '-2'}}>
                {teamNames1.map((item, i) => (
                    <motion.button 
                        key={i+5}
                        className='thin-text fade-in'
                        animate={hoveredIndex === i ? {
                            color: 'rgb(' + teamColours[i] + ')', scale: 1.1
                        } : {}}
                        style={{width: 'fit-content', justifySelf: 'center', '--delay': 3 + 0.4*i + 's', opacity: 0}}
                        disabled={disableButton[i]}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => navigate('/teamInfo/' + item)}
                    >
                        {item}
                    </motion.button>
                ))}
            </div>

            <div className='teams-grid' style={{'--topPos': '575px', zIndex: '-2'}}>
                {teamImgs2.map((item, i) => (
                    <button 
                        key={i + 10} 
                        className='fade-in' 
                        disabled={disableButton[i + 5]}
                        onAnimationEnd={() => handleAnimationEnd(i + 5)}
                        style={{'--delay': 5 + 0.4*i + 's', opacity: 0}}
                        onClick={() => navigate('/teamInfo/' + teamNames2[i])}
                    >
                        <motion.img 
                            animate={hoveredIndex === i + 5 ? {
                                filter: 'drop-shadow(0 0 40px rgb(' + teamColours[i + 5] + ')', scale: 1.1
                            } : {filter: 'drop-shadow(0 0 0px transparent', scale: 1}}
                            src={'assets/logos/teams/' + item.path} 
                            style={{width: item.width}}
                            onMouseEnter={() => setHoveredIndex(i + 5)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    </button>
                ))}
            </div>
            <div className='teams-grid' style={{'--topPos': '730px', zIndex: '-2'}}>
                {teamNames2.map((item, i) => (
                    <motion.button 
                        key={i+15}
                        className='thin-text fade-in'
                        disabled={disableButton[i + 5]}
                        animate={hoveredIndex === i + 5 ? {
                            color: 'rgb(' + teamColours[i + 5] + ')', scale: 1.1
                        } : {}}
                        style={{width: 'fit-content', justifySelf: 'center', '--delay': 5 + 0.4*i + 's', opacity: 0}}
                        onMouseEnter={() => setHoveredIndex(i + 5)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => navigate('/teamInfo/' + item)}
                    >
                        {item}
                    </motion.button>
                ))}
            </div>
        </>
    )
}