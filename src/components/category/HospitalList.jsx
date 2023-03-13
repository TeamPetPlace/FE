import React, { useState } from "react";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";

export default function HospitalList() {
  const [cards, setCards] = useState([
    {
      id: "1",
      star: "★★★★☆",
      title: "펫 플레이스 병원",
      address: "서울 동파구",
      mapdata: "791m 남음",
    },
    {
      id: "2",
      star: "★★★★☆",
      title: "펫 플레이스 병원",
      address: "서울 동파구",
      mapdata: "791m 남음",
    },
  ]);
  return (
    <>
      <StPlace>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <input />
        <button>
          <GoSearch />
        </button>
        <ul>
          <li>근거리순</li>
          <li>평점순</li>
          <li>후기순</li>
        </ul>
      </StPlace>
      <StCards>
        {cards.map((item) => (
          <StCard>
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
