import React, { useState } from 'react';
import './style.css'
import { images } from 'src/resources/images/region'; // images.js에서 가져온 이미지 목록

export default function Carousel () {

        const region1 = '';

        const [currentIndex, setCurrentIndex] = useState<number>(0);
    
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };
    
        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        };
    
        return (
            <div className='carousel-container'>
                <div className='button left' onClick={handlePrev}></div>
                <div className='image-box1'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>{region1}</div>
                </div>
                <div className='image-box1'>
                    <img className='image' src={images[currentIndex+1]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>서울</div>
                </div>
                <div className='image-box1'>
                    <img className='image' src={images[currentIndex+2]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box1'>
                    <img className='image' src={images[currentIndex+3]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box1 image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box1 image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='image-box2'>
                    <img className='image' src={images[currentIndex]} 
                        alt={`Image ${currentIndex}`} />
                    <div className='image-text'>부산</div>
                </div>
                <div className='button right' onClick={handleNext}></div>
            </div>
        );
    

}