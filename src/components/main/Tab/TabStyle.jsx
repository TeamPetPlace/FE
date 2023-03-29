import styled from "styled-components";
import mainMid from "../../../style/img/mainMid.svg";

const StWrap = styled.div`
  background-image: url(${mainMid});
  background-size: 1900px 990px;
  width: 1900px;
  height: 800px;
  background-position: cover;
  background-repeat: no-repeat;
  z-index: 999;
`;

const StPlace = styled.div`
  display: flex;
  width: 1240px;
  height: 464px;
  margin: 0 auto;
  margin-bottom: 75px;
  gap: 15px;
`;

const StMyPlace = styled.div`
  display: flex;
  width: 470px;
  margin: 0 auto;
  font-size: 46px;
  margin-bottom: 30px;
  font-weight: 900;
  cursor: pointer;
`;

const StTabBox = styled.div`
  display: flex;
  gap: 170px;
  margin: 68px auto;
  width: 485px;
`;

const StTabs = styled.div`
  width: 48px;
  height: 88px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StTabText = styled.p`
  font-size: 20px;
`;

const StTabImg = styled.img`
  width: 44.58px;
  height: 44.58px;
  cursor: pointer;
`;

const StCard = styled.div`
  width: 400px;
  cursor: pointer;
  position: relative;
`;

const StResizeImg = styled.img`
  width: 400px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
`;

const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 10px;
`;

const StTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 5px;
  color: #0d0d0d;
`;

const StText = styled.div`
  font-size: 13px;
  color: #725334;
`;

const StDibBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  right: 6%;
  top: 0%;
  margin-top: -2px;
`;

export {
  StWrap,
  StPlace,
  StMyPlace,
  StTabBox,
  StTabs,
  StTabText,
  StTabImg,
  StCard,
  StResizeImg,
  StTextBox,
  StTitle,
  StText,
  StDibBtn,
};
