import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

function Toast(props) {
  useEffect(() => {
    let timer2;
    let timer = setTimeout(() => {
      props.setToastAnimation("toast-alert closeAnimation");
      timer2 = setTimeout(() => {
        props.setToastState(false);
      }, 1000);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const toastClickHandler = () => {
    props.setToastState(false);
  };

  return (
    <ToastBox
      className={props.toastAnimation}
      onClick={() => {
        toastClickHandler();
      }}
    >
      <p>알림이 왔습니다.</p>
    </ToastBox>
  );
}

export default Toast;

const slideIn = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-300%);
  }
`;
const slideOut = keyframes`
 from {
    transform: translateY(-300%);
  }
  to {
    transform: translateY(0%);
  }
`;

const ToastBox = styled.div`
  background-color: rgba(255, 127, 80, 0.4);
  border: 1px solid rgba(255, 127, 80, 0.1);
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  height: 80px;
  width: 250px;
  padding: 5px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 20px;

  &.openAnimation {
    animation: ${slideIn} 0.5s ease-in-out 0s 1 normal forwards;
  }

  &.closeAnimation {
    animation: ${slideOut} 0.5s ease-in-out 0s 1 normal forwards;
  }
`;
