import React, { useState } from "react";
import styled from "styled-components";
import img1 from "../../style/img/1.jpg";
import img2 from "../../style/img/2.jpg";
import img3 from "../../style/img/3.JPG";

function Banner() {
  const [slide, setSlide] = useState([img1, img2, img3]);
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slide.length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === slide.length - 1 ? 0 : current + 1);
  };

  const translateValue = -5 * current;

  return (
    <STContainer>
      <StWrap translateValue={translateValue}>
        {slide.map((item, index) => (
          <StSlide
            key={index}
            style={{ display: index === current ? "block" : "none" }}
          >
            <img src={item} alt={`image${index}`} />
          </StSlide>
        ))}
        <StBtns>
          <StBtn onClick={prevSlide}>{"<"}</StBtn>
          <StBtn onClick={nextSlide}>{">"}</StBtn>
        </StBtns>
      </StWrap>
    </STContainer>
  );
}

export default Banner;

const STContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const StWrap = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => props.translateValue}px);
  width: 100%;
`;

const StSlide = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const StBtns = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-5%);
  z-index: 999;
  left: 40%;
  justify-content: space-between;
`;

const StBtn = styled.button`
  top: 50%;
  margin-left: 100px;
  transform: translateY(-5%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-color: white;
  font-size: 2rem;
`;
