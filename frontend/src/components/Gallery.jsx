import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import './Gallery.css'

export default function Gallery({ photos, photoPath, top, left, translateX, width, height, descs, numImgs }) {
    const [currentImgInd, setCurrentImgInd] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const direction = useRef('prev');

    function nextImg() {
        direction.current = 'next'
        setIsAnimating(true);

        if (currentImgInd === numImgs - 1) {
            setCurrentImgInd(0)
        }
        else{
            setCurrentImgInd(currentImgInd + 1)
        }
    }

    function prevImg() {
        direction.current = 'prev'
        setIsAnimating(true);

        if (currentImgInd === 0) {
            setCurrentImgInd(numImgs - 1)
        }
        else{
            setCurrentImgInd(currentImgInd - 1)
        }
    }

    const variants = {
        slideIn: (direction) => ({
            translateX: direction === 'prev' ? -1 * width + 'px' : width + 'px',
            opacity: 0
        }),
        regPos: () => ({
            translateX: '0px',
            opacity: 1
        }),
        slideOut: (direction) => ({
            translateX: direction === 'prev' ? width + 'px' : -1 * width + 'px',
            opacity: 0
        })
    }

    return (
        <>
            <motion.div 
                className='gallery-container'
                style={{ position: 'relative', '--topPos': top, '--leftPos': left, '--moveX': translateX, zIndex: 1 }}
                initial={{ opacity: 0, translateY: '50px' }}
                whileInView={{ opacity: 1, translateY: '0px' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1 }}
            >
                <motion.h3 
                    style={{fontSize: '35px', color: '#f2e9e5', cursor: 'pointer', margin: 0, transform: 'scaleX(-1)'}}
                    onTap={() => {
                        isAnimating === false ? prevImg() : null;
                    }}                
                >
                    &#10148;
                </motion.h3>
                <motion.div className='image-container' style={{'--imgWidth': width + 'px', '--imgHeight': height}}>
                    <AnimatePresence mode='sync' custom={direction.current}>
                        <motion.img 
                            key={photos[currentImgInd]}
                            custom={direction.current}
                            src={'/f1-project/assets/' + photoPath + '/' + photos[currentImgInd]} 
                            style={{width: width + 'px', height: height, position: 'absolute', top: 0, left: 0}}
                            variants={variants}
                            initial="slideIn"                         
                            animate="regPos"
                            exit="slideOut"                         
                            transition={{ duration: 1 }}
                            onAnimationComplete={() => setIsAnimating(false)}
                        />
                        {descs ? 
                            <motion.p 
                                key={currentImgInd}
                                custom={direction.current}
                                className='gallery-caption'
                                variants={variants}
                                initial="slideIn"                         
                                animate="regPos"
                                exit="slideOut"                         
                                transition={{ duration: 1 }}
                                onAnimationComplete={() => setIsAnimating(false)}
                            >
                                {descs[currentImgInd]}
                            </motion.p>
                        : null}
                    </AnimatePresence>
                </motion.div>
                <motion.h3 
                    style={{fontSize: '35px', color: '#f2e9e5', cursor: 'pointer', margin: 0}}
                    onTap={() => {
                        isAnimating === false ? nextImg() : null;
                    }}
                >
                    &#10148;
                </motion.h3>
            </motion.div>
        </>
    )
}
