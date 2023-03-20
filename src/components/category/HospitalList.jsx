import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { ALLHospitalPost, getTitles, HospitalSearch } from "../../api/category";
import { useNavigate } from "react-router-dom";

export default function HospitalList() {
  const [cards, setCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const navigate = useNavigate();

  const { data } = useQuery("ALLHospitalPost", ALLHospitalPost, {
    onSuccess: (item) => {
      setCards(item.data.content); // setCards에 data를 넣어준다
    },
  });
  // console.log(cards);

  const onSearchHandler = async (e) => {
    // e.preventDefault();
    // console.log(searchTitle);
    const response = await HospitalSearch({
      keyword: "병원",
      keyword2: searchTitle,
    });
    console.log(response);
    // setCards(data.response);
    setSearchTitle("");
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
            style={{ width: "300px" }}
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            value={searchTitle || ""}
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
          />
          <button onClick={onSearchHandler}>
            <GoSearch />
          </button>
        </div>
        <select>
          <option> 근거리순 </option>
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
                navigate(`/hospital/${item.id}`);
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
