import Slider from 'react-slick';
import styled from 'styled-components';

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    rtl: true,
  };
  return (
    <Wrapper className='container_my'>
      <Slider
        {...settings}
        className='w-full h-72 md:h-96 sliders overflow-hidden'
      >
        <img src='1.jpg' alt='1' className='w-full h-fit' />
        <img src='2.jpg' alt='2' className='w-full h-fit' />
        <img src='3.jpg' alt='3' className='w-full h-fit' />
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sliders {
    .slick-dots {
      margin-bottom: 30px;
    }
  }
`;

export default Hero;
