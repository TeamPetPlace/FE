import styled from "styled-components";

const StWrap = styled.div`
  width: 100%;
  min-height: 2116px;
  height: 100%;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
`;

const StBox = styled.div`
  width: 100%;
  margin-top: 120px;
`;

const StTop = styled.div`
  display: flex;
  width: 980px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    width: 340px;
    margin: 0 auto;
  }
`;

const StLeft = styled.div`
  display: flex;
`;

const StNoNotification = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  width: 980px;
  height: 930px;
  margin: 0 auto;
`;

const StMsg = styled.div`
  font-size: 20px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  line-height: 930px;
`;

const StTitle = styled.div`
  font-size: 32px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const StCount = styled.div`
  width: 40px;
  height: 30px;
  border-radius: 15px;
  background-color: #ee4a16;
  text-align: center;
  color: #fff;
  margin: auto 0;
  margin-left: 10px;
  line-height: 30px;
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 20px;
    line-height: 20px;
  }
`;

const StNotificationBox = styled.div`
  width: 980px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 350px;
    margin: 0 auto;
  }
`;

const StNotification = styled.div`
  width: 930px;
  background-color: #fff;
  height: 25px;
  margin-bottom: 24px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 320px;
    margin: 0 auto;
    height: 20px;
    margin-bottom: 12px;
    padding: 12px;
  }
`;

const StMove = styled.div`
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    width: 290px;
  }
`;

const StRight = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    font-size: 10px;
    line-height: 10px;
    gap: 0px;
  }
`;

const StDate = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 10px;
    text-align: center;
  }
`;

const StDeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StWraps = styled.div`
  width: 1920px;
  min-height: 2116px;
  height: 100%;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  flex-direction: column;
`;

const StBoxs = styled.div`
  width: 980px;
  height: 930px;
  border: 1px solid #d9d9d9;

  background-color: #fff;
  margin: 0 auto;
  margin-top: 120px;
`;

export {
  StWrap,
  StBox,
  StTop,
  StLeft,
  StNoNotification,
  StMsg,
  StTitle,
  StCount,
  StNotificationBox,
  StNotification,
  StMove,
  StRight,
  StDate,
  StDeleteBtn,
  StWraps,
  StBoxs,
};
