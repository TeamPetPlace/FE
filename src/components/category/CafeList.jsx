import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { ALLCafePost, ALLHospitalPost, ALLShopPost, getTitles } from "../../api/category";
import { useNavigate } from "react-router-dom";

const CafeList = () => {
  const [cards, setCards] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  const { data } = useQuery("ALLCafePost", ALLCafePost, {
    onSuccess: (item) => {
      setCards(item.data.content); // setCards에 data를 넣어준다
    },
  });
  console.log(cards);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <StPlace>
        <h2>카페</h2>
        <div>
          <input
            style={{ width: "300px" }}
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            // value={searchData}
          />
          <button onClick={handleClick}>
            <GoSearch />
          </button>
        </div>
        <select>
          <option value="lang"> 근거리순 </option>
          <option> 평점순</option>
          <option> 후기순</option>
        </select>
      </StPlace>
      <StCards>
        {cards?.map((item) => {
          return (
            <StCard
              key={item.id}
              onClick={() => {
                navigate(`/cafe/${item.id}`);
              }}
            >
              <div>{item.id}</div>
              <div>{item.ceo}</div>
              <div>{item.title}</div>
              <div>{item.address}</div>
            </StCard>
          );
        })}
      </StCards>
    </>
  );
};

export default CafeList;

const StPlace = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: skyblue;
`;

const StCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: #f7f7de;
`;

const StCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #e3def7;
`;