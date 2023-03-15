import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { getCards, getTitles } from "../../api/category";

export default function HospitalList() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");

  const { cardsData } = useQuery("cards", getCards, {
    onSuccess: (item) => {
      setCards(item); // setCards에 data를 넣어준다
    },
  });
  console.log(cardsData);

  const { titleData } = useQuery("title", getTitles, {
    onSuccess: (item) => {
      setTitle(item);
    },
  });
  console.log(titleData);

  const handleClick = (e) => {
    e.preventDefault();
    const searched = title.filter((item) => item.title.includes(cards));
  };

  return (
    <>
      <StPlace>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <div>
          <input
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleClick} type="button">
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
        {cards.map((item) => {
          return (
            <StCard type="text">
              <div>{item.star}</div>
              <div>{item.title}</div>
              <div>{item.address}</div>
              <div>{item.mapdata}</div>
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
