import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './home.css'


export default function Home() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.div 
                className='intro-container'
                initial={{translateX: '-50%', translateY: '-50%'}}
                animate={clicked ? {translateY: '-350%', translateX: '-50%', opacity: 0} : null}
                transition={{duration: 2, ease: 'easeInOut'}}
            >
                <Title />
                <motion.img 
                    src='/f1-project/frontend/public/assets/logos/f1_logo.png' 
                    style={{width: '205px'}} 
                    animate={{opacity: [0, 1, 1], translateY: ['58px', '58px', '0px']}} 
                    transition={{duration: 2, delay: 3, ease: 'easeInOut'}}
                />
                <MenuButton setClicked={setClicked} />
            </motion.div>
            <motion.img 
                className='menu-img-container'
                src='/assets/misc. images/menu_img.jpg' 
                initial={{translateY: '100%'}}
                animate={clicked ? {translateY: ['100%', '0%', '0%'], opacity: [0.9, 0.9, 0.5]} : null}
                onAnimationComplete={() => navigate('/menu/')}
                transition={{duration: 4, ease: 'easeInOut'}}
            />
            <motion.p className='menu-img-desc' initial={{opacity: 0}} animate={clicked ? {opacity: 1} : null} transition={{duration: 1.3, delay: 2.1}}>Jackie Stewart wins the 1968 German Grand Prix.</motion.p>
        </>
    )
}

function Title() {
    const title = 'FORMULA 1'

    return (
        <motion.div className='f1-title-container' initial={{translateY: '58px'}} animate={{translateY: '0px'}} transition={{duration: 1, delay: 4, ease: 'easeInOut'}}>
            {title.split('').map((item, i) => (
                <motion.h1
                    key={item}
                    className='f1-title-text'
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.3*i}}
                >
                    {item === " " ? "\u00A0" : item}
                </motion.h1>
            ))}
        </motion.div>
    )
}

function MenuButton({ setClicked }) {
    const variants={
        initial: {translateY: '58px'},
        animate: {translateY: '0px', transition: {duration: 1, delay: 4, ease: 'easeInOut'}},
        hover: {backgroundColor: '#f2e9e5', color: '#18191A', transition: { duration: 0.2 }}
    };

    return (
        <motion.button 
            className='button' 
            variants={variants}
            whileHover="hover"
            initial="initial"
            animate="animate"
            onClick={() => setClicked(true)}
        >
            menu.
        </motion.button>
    )
}
