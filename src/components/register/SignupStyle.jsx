import styled from "styled-components";
import animal_illust_back from "../../style/img/animal_illust_back.png";

export {
  StSignupFormDiv,
  StSignupDiv,
  StTitle,
  StSignupBtn,
  StCheckBtn,
  StInput,
  StDescDiv,
  StInputDiv,
};

const StSignupFormDiv = styled.div`
  width: 1920px;
  height: 1080px;
  margin: auto;
  background-color: #fffcec;
  display: flex;
  background-image: url(${animal_illust_back});
  display: flex;
`;

const StSignupDiv = styled.div`
  width: 660px;
  height: 580px;
  margin: 120px auto;
  display: flex;
  padding-top: 73px;
  background-color: white;
  border: 1px solid #d9d9d9;
  /* box-shadow: 1px 1px 15px 0px #d9d9d9; */
  flex-direction: column;
`;

const StTitle = styled.div`
  width: 210px;
  height: 44px;
  margin: 54px auto;
  text-align: center;
  line-height: 44px;
`;

const StDescDiv = styled.div`
  font-size: 12px;
  margin: 0px 5px 10px 72px;
`;

const StSignupBtn = styled.button`
  /* background-color: ${(props) => props.BackColor}; */
  background-color: white;
  border: 1px solid #d9d9d9;
  width: 410px;
  height: 52px;
  margin: 15px 124px 0px 124px;
  font-size: 22px;
  /* border: none; */
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #6d6d6d;
  }
`;

const StCheckBtn = styled.button`
  background-color: #ffd53f;
  /* width: ${(props) => props.Width}; */
  width: 145px;
  height: 52px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
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
`;

const StInputDiv = styled.div`
  margin-bottom: ${(props) => props.Margin_B};
`;
