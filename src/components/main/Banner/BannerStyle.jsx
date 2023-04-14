import styled from "styled-components";

const StContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: auto;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const StWrap = styled.div`
  display: flex;
  width: 100%;
  font-size: 50px;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    /* overflow: hidden; */
  }
`;

const StImg = styled.img`
  width: 100%;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 120%;
    margin: 0 auto;
    height: auto;
  }
`;

export { StContainer, StWrap, StImg };
