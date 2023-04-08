import React from "react";
import styled, { keyframes } from "styled-components";
import ReactLoading from "react-loading";

function Skeletons() {
  return (
    <StSkeleton>
      {/* <ReactLoading type={"spin"} color={color} height={"20%"} width={"20%"} /> */}
      <StImg />
      <StTitle />
      <StContent />
      <StContent />
      <SkeletonItem />
    </StSkeleton>
  );
}

export default Skeletons;

const skeletonAnimation = keyframes`
  0% {
    background-color: rgba(240, 240, 240, 0.7);
    opacity: 1;
  }
  50% {
    background-color: rgba(240, 240, 240, 0.3);
    opacity: 0.7;
  }
  100% {
    background-color: rgba(240, 240, 240, 0.7);
    opacity: 1;
  }
`;

const StSkeleton = styled.div`
  /* width: 200px;
  height: 150px;
  background-color: transparent;
  overflow-x: visible; */
  width: 406px;
  height: 320px;
  margin-bottom: 43px;
  border-radius: 10px;
  display: block;
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 220px;
    margin-bottom: 0px;
    position: relative;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 230px;
    margin-bottom: 0px;
    position: relative;
  }
`;

const StImg = styled.div`
  width: 406px;
  height: 230px;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
  position: cover;
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 120px;
    margin-bottom: 5px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 130px;
    margin-bottom: 10px;
  }
`;

const StTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
  @media screen and (max-width: 767px) {
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StContent = styled.div`
  animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
`;

const SkeletonItem = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;
