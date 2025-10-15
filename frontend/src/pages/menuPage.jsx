import PageTitle from '../components/PageTitle.jsx';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuPage.css'

export default function MenuPage() {
    return (
        <>
            <img className='menu-img-container' src='/f1-project/assets/misc. images/menu_img.jpg' style={{opacity: 0.5}} />
            <p className='menu-img-desc'>Jackie Stewart wins the 1968 German Grand Prix.</p>
            <PageTitle title='MENU.' slideDist='-170px' />
            <MenuItems />
        </>
    )
}

function MenuItems() {
    const navigate = useNavigate();
    const menuItems = ['about formula 1', 'teams', 'drivers', 'calendar'];
    const [hovering, setHovering] = useState([false, false, false, false]);
    const handleHover = ((i) => {
        const temp = [...hovering]
        if (hovering[i]) {
            temp[i] = false;
        } else {
            temp[i] = true;
        }
        setHovering(temp)
    })

    return (
        <div className='menu-text-container'>
            {menuItems.map((item, i) => (
                <div className='menu-item-container'>
                    <motion.h2 
                        key={item} 
                        className='menu-text' 
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: 0.7, delay: 0.5*i + 1.5}}
                        onMouseEnter={() => handleHover(i)}
                        onMouseLeave={() => handleHover(i)}
                        onClick={() => navigate('/' + item)}
                    >
                        {item}
                    </motion.h2>
                    <motion.div className='menu-items-underline' initial={{scaleX: 0}} animate={hovering[i] ? {scaleX: 1} : {scaleX: 0}} />
                </div>
            ))}
        </div>
    )
}