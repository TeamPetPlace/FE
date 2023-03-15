import React, { useState, useQuery } from "react";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { getCards } from "../../api/category";

export default function HospitalList() {
  const [cards, setCards] = useState();

  // 겟해온 아이들중에 리스폰스에 있는 아이들 중 로딩이랑 에러랑 데이터만 뽑아오겠다
  const { data } = useQuery("cards", getCards, {
    onSuccess: (item) => {
      setCards(item); // setCards에 data를 넣어준다
    },
  });
  console.log(cards);

  return (
    <>
      <StPlace>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <StSearch>
          <input type="text" placeholder="검색할 명칭을 입력해주세요" />
          <button type="button">
            <GoSearch />
          </button>
        </StSearch>
        <select>
          <option value="lang"> 근거리순 </option>
          <option> 평점순</option>
          <option> 후기순</option>
        </select>
      </StPlace>
      <StCards>
        {cards.map((item) => (
          <StCard type="text">
            <div>{item.star}</div>
            <div>{item.title}</div>
            <div>{item.address}</div>
            <div>{item.mapdata}</div>
          </StCard>
        ))}
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

const StSearch = styled.div`
  display: flex;
`;

const StCards = styled.div`
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
