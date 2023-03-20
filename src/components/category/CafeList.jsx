import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { SearchPost, AllPost } from "../../api/category";
import { useNavigate } from "react-router-dom";

const CafeList = () => {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [sort, setSort] = useState();
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const { data } = useQuery(
    [
      "AllPost",
      {
        category: "카페",
        sort: "DISTANCE",
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 10,
      },
    ],
    () =>
      AllPost({
        category: "카페",
        sort: "DISTANCE",
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 10,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
        queryclient.invalidateQueries("getPost");
      },
    }
  );

  const onSearchHandler = async (e) => {
    setIsSearchMode(true);
    e.preventDefault();
    // console.log(searchTitle);
    const { data } = await SearchPost({
      category: "카페",
      sort: "DISTANCE",
      keyword: searchkeyword,
      lat: 37.53502829566887,
      lng: 126.96471596469242,
      page: 0,
      size: 10,
    });
    console.log(data.response);
    setSearchData(data.response);
  };

  const onSelectHandler = (e) => {
    e.preventDefault();
    setSort(e.target.value);
    document.getElementById("sorting");
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
            value={searchkeyword || ""}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button onClick={onSearchHandler}>
            <GoSearch />
          </button>
        </div>
        <select id="sorting" onChange={onSelectHandler}>
          <option value="DISTANCE"> 근거리순 </option>
          <option value="STAR"> 평점순</option>
          <option value="REVIEW"> 후기순</option>
        </select>
      </StPlace>
      {!isSearchMode ? (
        <StCards>
          {cards?.map((item) => {
            return (
              <StCard
                key={item.id}
                onClick={() => {
                  navigate(`/cafe/${item.id}`);
                }}
              >
                <div>별점 : {"⭐".repeat(item.star)}</div>
                <div>카페 이름 : {item.title}</div>
                <div>주소 : {item.address}</div>
                {parseInt(item.distance) > 999 && (
                  <div>{((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음</div>
                )}
                {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                <img src={item.reSizeImage} />
              </StCard>
            );
          })}
        </StCards>
      ) : (
        <StCards>
          {searchData.length > 0 &&
            searchData?.map((item) => {
              return (
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/cafe/${item.id}`);
                  }}
                >
                  <div>별점 : {item.star}</div>
                  <div>카페 이름 : {item.title}</div>
                  <div>주소 : {item.address}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>{((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음</div>
                  )}
                  {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                  <img src={item.reSizeImage} />
                </StCard>
              );
            })}
        </StCards>
      )}
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
