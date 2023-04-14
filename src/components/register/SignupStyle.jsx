import styled from "styled-components";

export { StSignupDiv, StSignupBtn, StCheckBtn, StInput, StDescDiv, StInputDiv, StLoginMove };

const StSignupDiv = styled.div`
  width: 660px;
  height: 550px;
  margin: -1px auto;
  display: flex;
  padding-top: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #d9d9d9;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 380px;
    margin: -1px auto;
    padding-top: 40px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 500px;
    height: 500px;
    margin: -1px auto;
    padding-top: 40px;
  }
`;

const StDescDiv = styled.div`
  font-size: 12px;
  margin: 0px 5px 10px 72px;
  @media screen and (max-width: 767px) {
    font-size: 8px;
    margin: 0px 5px 5px 35px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    margin: 5px 0px 15px 70px;
  }
`;

const StSignupBtn = styled.button`
  background-color: white;
  border: 1px solid #d9d9d9;
  width: 410px;
  height: 52px;
  margin: 15px 124px 0px 124px;
  font-size: 22px;
  color: #000000;
  border-radius: 5px;
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

const StCheckBtn = styled.button`
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

const StInput = styled.input`
  width: ${(props) => props.Width};
  border-radius: 5px;
  outline: none;
  height: 48px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  margin: 0px 5px 5px 72px;
  text-indent: 10px;
  @media screen and (max-width: 767px) {
    width: 160px;
    height: 30px;
    font-size: 12px;
    margin: 0px 5px 5px 35px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 250px;
    height: 40px;
    font-size: 13px;
    margin: 0px 5px 5px 70px;
  }
`;

const StInputDiv = styled.div`
  margin-bottom: ${(props) => props.Margin_B};
`;

const StLoginMove = styled.div`
  display: inline-block;
  color: #000;
  width: 300px;
  height: 40px;
  text-align: center;
  margin: 40px 180px;
  /* background-color: pink; */
  @media screen and (max-width: 767px) {
    font-size: 10px;
    width: 130px;
    height: 20px;
    text-align: center;
    margin: 20px 85px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 30px;
    text-align: center;
    margin: 30px 150px;
    font-size: 15px;
  }
`;
