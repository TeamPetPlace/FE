import React from "react";
import styled, { css } from "styled-components";

function Button(props) {
  return <AllBtn {...props}>{props.children}</AllBtn>;
}

export default Button;

const AllBtn = styled.button`
  cursor: pointer;
  ${({ size }) => {
    switch (size) {
      case "postYellow":
        return css`
          width: 164px;
          height: 45px;
          font-size: 20px;
          margin-top: 40px;
          border: 1px solid #999;
          background-color: white;
          padding: 8px 8px;
          margin-right: 10px;
          text-align: center;
          border-radius: 5px;
          &:hover {
            background-color: #ffd53f;
            border: none;
            color: black;
          }
          @media screen and (max-width: 767px) {
            width: 100px;
            font-size: 15px;
            height: 40px;
            margin-top: -20px;
          }

          @media screen and (min-width: 768px) and (max-width: 1023px) {
            margin-top: -0px;
          }
        `;
      case "postGray":
        return css`
          width: 164px;
          height: 45px;
          font-size: 20px;
          border: 1px solid #999;
          background-color: white;
          padding: 8px 8px;
          margin-right: 10px;
          text-align: center;
          border-radius: 5px;
          &:hover {
            background-color: #999;
            color: white;
          }
          @media screen and (max-width: 767px) {
            width: 100px;
            height: 30px;
            font-size: 10px;
          }

          @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 100px;
            height: 40px;
            font-size: 14px;
          }
        `;
      case "smallGray":
        return css`
          width: 70px;
          height: 30px;
          border: 1px solid #d9d9d9;
          border-radius: 0;

          cursor: pointer;
          font-size: 14px;
          background-color: transparent;
          margin-left: 10px;
          &:hover {
            background-color: #d9d9d9;
          }
          @media screen and (max-width: 767px) {
            font-size: 3px;
            width: 40px;
            height: 20px;
          }

          @media screen and (min-width: 768px) and (max-width: 1023px) {
            font-size: 12px;
            width: 40px;
          }
        `;
      case "tab":
        return css`
          width: 150px;
          height: 45px;
          font-size: 20px;
          background-color: #fff;
          border: 1px solid #d9d9d9;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          margin-top: 60px;
          cursor: pointer;
          &:hover {
            background-color: #ffd53f;
            border: 1px solid #d9d9d9;
          }
          &.selected {
            background-color: #ffd53f;
          }
          @media screen and (max-width: 767px) {
            font-size: 14px;
            width: 90px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            font-size: 16px;
            width: 160px;
          }
        `;
      case "mypageTab":
        return css`
          width: 490px;
          height: 54px;
          font-size: 22px;
          background-color: #fff;
          border: 1px solid #d9d9d9;
          border-radius: 10px 10px 0 0;
          text-align: center;
          color: #000000;
          cursor: pointer;
          &:hover {
            background-color: #ffd53f;
            border: 1px solid #d9d9d9;
            font-weight: bold;
          }
          &.selected {
            background-color: #ffd53f;
            border: 1px solid #ffd53f;
            font-weight: bold;
          }
          @media screen and (max-width: 767px) {
            width: 151px;
            height: 35px;
            font-size: 13px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 330px;
            height: 45px;
            font-size: 18px;
          }
        `;
      case "dibTab":
        return css`
          border: none;
          font-size: 20px;
          color: #595959;
          background-color: transparent;
          height: 27px;
          margin-left: 12px;
          cursor: pointer;
          &:hover {
            color: black;
            font-weight: bold;
          }
          &.selected {
            color: black;
            font-weight: bold;
          }
          @media screen and (max-width: 767px) {
            height: 18px;
            font-size: 13px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            height: 30px;
            margin-left: 10px;
            font-size: 20px;
          }
        `;
      case "dib":
        return css`
          border: none;
          background-color: transparent;
          cursor: pointer;
          position: absolute;
          z-index: 99;
          margin-top: -2px;
          &:hover {
            transform: scale(1.1);
          }
          @media screen and (max-width: 767px) {
            left: 75%;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            left: 70%;
          }
          @media screen and (min-width: 1024px) {
            margin-left: 340px;
          }
        `;
      case "mainDib":
        return css`
          border: none;
          background-color: transparent;
          cursor: pointer;
          position: absolute;
          z-index: 99;
          right: 6%;
          top: 0%;
          margin-top: -2px;
          &:hover {
            transform: scale(1.1);
          }
        `;
      case "mypageDib":
        return css`
          border: none;
          background-color: transparent;
          cursor: pointer;
          position: absolute;
          z-index: 999;
          margin-left: 230px;
          margin-top: -2px;
          &:hover {
            transform: scale(1.1);
          }
          @media screen and (max-width: 767px) {
            margin-left: 60%;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            margin-left: 65%;
          }
        `;
      case "notification":
        return css`
          width: 90px;
          height: 28px;
          border: 1px solid #d9d9d9;
          background-color: #fff;
          margin: auto 0;
          cursor: pointer;
          &:hover {
            background-color: #d9d9d9;
          }
          @media screen and (max-width: 768px) {
            width: 80px;
            height: 20px;
            font-size: 12px;
          }
        `;
      case "user":
        return css`
          border-radius: 5px;
          border: 1px solid #6d6d6d;
          background-color: white;
          font-size: 18px;
          width: 64px;
          height: 30px;
          color: #000000;
          cursor: pointer;
          margin: 0 0 0 300px;
          &:hover {
            background-color: #6d6d6d;
          }
          @media screen and (max-width: 767px) {
            font-size: 8px;
            height: auto;
            width: 40px;
            margin: 0 10px 0 130px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            font-size: 14px;
            height: 30px;
            width: 60px;
            margin: 0 10px 0 200px;
          }
        `;
      case "postList":
        return css`
          font-size: 12px;
          width: 75px;
          height: 30px;
          text-align: center;
          background-color: #ffff;
          border: 1px solid #cccccc;
          margin-left: 5px;
          color: #000000;
          cursor: pointer;
          &:hover {
            font-weight: bold;
            background-color: #eee;
          }
          @media screen and (max-width: 767px) {
            font-size: 10px;
            width: 60px;
            height: 18px;
          }
        `;
      case "review":
        return css`
          width: 200px;
          height: 50px;
          border: 1px solid #d9d9d9;
          background-color: transparent;
          margin-right: 10px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            background-color: #ffd53f;
          }
          @media screen and (max-width: 767px) {
            width: 100px;
            font-size: 12px;
            height: 30px;
          }
        `;
      case "reviewGray":
        return css`
          font-size: 14px;
          width: 68px;
          height: 30px;
          border: 1px solid #cccccc;
          background-color: #ffffff;
          margin-right: 10px;
          margin-left: 10px;
          color: #000000;
          cursor: pointer;
          &:hover {
            background-color: #ccc;
          }
          @media screen and (max-width: 767px) {
            font-size: 8px;
            width: 40px;
            height: 22px;
            margin-left: 5px;
            margin-top: 5px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            font-size: 14px;
            width: 60px;
            margin-top: 10px;
            margin-left: 10px;
          }
        `;
      case "reviewPost":
        return css`
          width: 200px;
          height: 50px;
          border: 1px solid #d9d9d9;
          background-color: transparent;
          margin-right: 10px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            background-color: #ffd53f;
          }
          @media screen and (max-width: 767px) {
            width: 100px;
            font-size: 12px;
            height: 30px;
          }
        `;
      case "signup":
        return css`
          background-color: #ffd53f;
          width: 145px;
          height: 52px;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          &:hover {
            cursor: pointer;
            font-weight: bold;
          }
          @media screen and (max-width: 767px) {
            width: 60px;
            height: 30px;
            font-size: 7px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 100px;
            height: 40px;
            font-size: 13px;
          }
        `;
      case "login":
        return css`
          background-color: white;
          border: 1px solid #d9d9d9;
          width: 410px;
          height: 52px;
          margin: 15px 124px 0px 124px;
          font-size: 22px;
          color: #000000;
          border-radius: 5px;
          border: ${(props) => props.Border};
          &:hover {
            cursor: pointer;
            font-weight: bold;
            border: 1px solid #6d6d6d;
          }
          @media screen and (max-width: 767px) {
            width: 150px;
            height: 30px;
            font-size: 10px;
            margin: 10px 75px 0px 75px;
          }
          @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 300px;
            height: 40px;
            font-size: 13px;
            margin: 10px 100px 0px 100px;
          }
        `;
      default:
        return css`
          margin-top: 10px;
        `;
    }
  }}
`;
