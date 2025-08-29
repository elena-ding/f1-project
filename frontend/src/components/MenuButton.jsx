import './MenuButton.css';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function MenuButton() {
    return <button className='thin-text' style={{position: 'absolute', top: '39px', right: '34px', zIndex: 10}}><MenuPopOut>menu.</MenuPopOut></button>
}

function MenuPopOut({ children }) {
    const menuItems = ['home', 'about formula 1', 'teams', 'drivers', 'calendar'];
    const navigate = useNavigate();

    return (
        <motion.span
            className='underline-wrapper'
            initial='rest'
            whileHover='hover'
            animate='rest'
            onHoverStart={() => {
                document.body.style.overflow = 'hidden';
            }}
            onHoverEnd={() => {
                document.body.style.overflow = 'auto';
            }}
        >
            {children}
            <motion.div
                className='underline'
                variants={{
                    rest: { scaleX: 0,},
                    hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.4 }}
            />
            <motion.div
                className='rectangle'
                variants={{
                    rest: { translateX: '305px' },
                    hover: { translateX: 0 }
                }}
                transition={{ duration: 0.4 }}
            >
                {menuItems.map((item, i) => (
                    <motion.button 
                        className='thin-text'
                        style={{position: 'absolute', top: 100 + (i * 60) + 'px', right: '34px', opacity: 1}}
                        whileHover={{ color: '#bdb0a4', scale: 1.1 }}
                        onClick={() => {
                            navigate('/' + item);
                            document.body.style.overflow = 'auto';
                        }}
                    >
                        {item}
                    </motion.button>
                ))}
            </motion.div>
        </motion.span>
    )
}