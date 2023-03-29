import React from "react";
import styled, { keyframes } from "styled-components";
import ReactLoading from "react-loading";

function Skeletons({ type, color }) {
  return (
    <StSkeleton>
      {/* <ReactLoading type={"spin"} color={color} height={"20%"} width={"20%"} /> */}
      <SkeletonItem />
    </StSkeleton>
  );
}

export default Skeletons;

const StSkeleton = styled.div`
  width: 300px;
  height: 300px;
  background-color: transparent;
  /* overflow-x: visible; */
`;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

const SkeletonItem = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const SkeletonItems = styled.div`
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
