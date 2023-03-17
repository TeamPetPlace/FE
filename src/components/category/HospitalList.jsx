import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { getCards, getTitles } from "../../api/category";
import { useNavigate } from "react-router-dom";

export default function HospitalList() {
  const [cards, setCards] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  const { data } = useQuery("getCards", getCards, {
    onSuccess: (item) => {
      setCards(item.data); // setCards에 data를 넣어준다
    },
  });
  console.log(cards);

  const response = useQuery("getTitles", getTitles, {
    onSuccess: (item) => {
      setSearchData(item);
    },
  });
  console.log(searchData[0]);

  const handleClick = (e) => {
    e.preventDefault();
    const searched = searchData.filter((item) => item.title.includes(cards));
  };

  return (
    <>
      <StPlace>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <div>
          {/* <input
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            value={searchData}
          />
          <button onClick={handleClick}>
            <GoSearch />
          </button> */}
        </div>
        <select>
          <option value="lang"> 근거리순 </option>
          <option> 평점순</option>
          <option> 후기순</option>
        </select>
      </StPlace>
      <StCards>
        {cards.length > 0 &&
          cards.map((item) => {
            return (
              <StCard
                key={item.id}
                onClick={() => {
                  navigate(`/hostpital/${item.id}`);
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
}

const StPlace = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: aliceblue;
`;

const StCards = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: #f7f7de;
  cursor: pointer;
`;

const StCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #e3def7;
`;
