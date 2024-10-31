// ImageSlider.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SliderData } from './Data'; // Update this import with your actual data

const ImageSlider = () => {
  const [current, setCurrent] = useState(1);

  const length = SliderData.length;
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + length) % length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoplayPaused) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [current, autoplayPaused]);

  return (
    <SliderContainer className='container_my'>
      <div className='w-full h-72 md:h-96 slider overflow-hidden'>
        <Image
          src={SliderData[current].image}
          alt='Travel'
          style={{ transform: `translateX(-${current * 100}%)` }}
        />
      </div>

      <DotsContainer>
        {SliderData.map((_, index) => (
          <Dot
            key={index}
            active={index === current}
            onClick={() => setCurrent(index)}
          />
        ))}
      </DotsContainer>

      <AutoplayButton onClick={() => setAutoplayPaused(!autoplayPaused)}>
        {autoplayPaused ? 'Resume Autoplay' : 'Pause Autoplay'}
      </AutoplayButton>
    </SliderContainer>
  );
};

const SliderContainer = styled.section`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  transition: transform 2s ease;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? '#333' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
`;

const AutoplayButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

export default ImageSlider;
