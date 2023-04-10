import styled from "styled-components";

const StTop = styled.div`
  width: 300px;
  color: #98886b;
  margin: 0 auto;
  font-size: 10px;
  text-align: center;
  background-color: transparent;
  padding-top: 150px;
`;

const StFooter = styled.div`
  width: 100%;
  height: 200px;
  background-color: #0d0d0d;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StWraps = styled.div`
  width: 450px;
  height: 119px;
  display: flex;
  float: right;
  margin-top: 20px;
  margin-right: 300px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    float: center;
    margin-right: 15px;
  }
`;

const StUl = styled.ul`
  color: rgb(127, 132, 135);
  font-weight: 900;
  font-size: 12px;
  @media screen and (max-width: 768px) {
    font-size: 8px;
    float: center;
    margin: 0 auto;
  }
`;

const StLi = styled.li`
  color: rgb(127, 132, 135);
  list-style: none;
  font-weight: 300;
  text-align: center;
  margin-top: 5px;
`;

// ------------------Footer---------------

const StHeader = styled.div`
  width: 100%;
  height: 6.3em;
  background-color: #ffd53f;
  box-shadow: 0px 4px 8px 1px rgba(254, 215, 0, 0.15);
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 99;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    height: 80px;
  }
`;

const StWrap = styled.div`
  width: 1235px;
  height: 37px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    display: flex;
    margin-top: 10px;
  }
`;

const StMenu = styled.div`
  display: flex;
  width: 637px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 300px;
    margin: 0 auto;
    display: flex;
    position: relative;
  }
`;

const StLogo = styled.img`
  cursor: pointer;
  width: 182px;
  height: 37px;
  margin-left: 30px;
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 30px;
    position: absolute;
    top: -25px;
    left: 42%;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 40px;
  }
`;

const StCateogry = styled.div`
  width: 316px;
  display: flex;
  justify-content: space-between;
  margin-left: 140px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 70px;
    width: 250px;
  }
`;

const StTab = styled.div`
  cursor: pointer;
  color: #0d0d0d;
  font-weight: 900;
  font-size: 20px;
  &:hover {
    font-weight: 900;
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StUser = styled.div`
  display: flex;
  width: 200px;
  line-height: 37px;
  font-size: 15px;
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100px;
    font-size: 12px;
  }
`;

const StNotification = styled.div`
  display: flex;
`;

const StPoint = styled.div`
  color: #ee4a16;
  position: absolute;
  top: 18px;
  margin-left: 25px;
  @media screen and (max-width: 768px) {
    top: 15px;
    right: 50px;
  }
`;

const StProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StUserBar = styled.ul`
  position: relative;
  margin: 0px;
  height: 37px;
  &:hover {
    cursor: pointer;
    transition: all ease 2s 0s;
  }
  @media screen and (max-width: 768px) {
    margin-left: -10px;
    width: 10px;
  }
`;

const StUserCategory = styled.div`
  width: 100px;
  height: 110px;
  font-size: 14px;
  color: #999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 5%;

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 12px;
    height: 80px;
  }
`;

const StUserCategorys = styled.div`
  width: 100px;
  height: 75px;
  font-size: 14px;
  color: #999;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 5%;

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 12px;
    height: 50px;
  }
`;

const StUserMenu = styled.li`
  list-style: none;
  width: 100px;
  text-align: center;
  &:hover {
    color: #000;
    font-weight: 900;
  }
  @media screen and (max-width: 768px) {
    height: 60px;
    margin-bottom: -30px;
    margin-top: -5px;
  }
`;

const StPlusDiv = styled.div`
  height: 100px;
  @media screen and (max-width: 768px) {
    height: 80px;
  }
`;

// ---------------------Header-------------------

const StLayoutBox = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
`;

export {
  StTop,
  StFooter,
  StWraps,
  StUl,
  StLi,
  StHeader,
  StWrap,
  StMenu,
  StLogo,
  StCateogry,
  StTab,
  StUser,
  StNotification,
  StPoint,
  StProfile,
  StUserBar,
  StUserCategory,
  StUserCategorys,
  StUserMenu,
  StPlusDiv,
  StLayoutBox,
};
