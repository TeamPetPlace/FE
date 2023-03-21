import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { AllPost, SearchPost } from "../../api/category";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [sort, setSort] = useState("DISTANCE");

  const { data } = useQuery(
    [
      "AllPost",
      {
        category: "미용",
        // sort: "REVIEW",
        sort: sort,
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 10,
      },
    ],
    () =>
      AllPost({
        category: "미용",
        // sort: "REVIEW",
        sort: sort,
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 10,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
        queryclient.invalidateQueries("");
      },
    }
  );

  const onSearchHandler = async (e) => {
    setIsSearchMode(true);
    e.preventDefault();
    try {
      const { data } = await SearchPost({
        category: "미용",
        sort: sort,
        keyword: searchkeyword,
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 10,
      });
      console.log(data.response);
      setSearchData(data.response);
    } catch (error) {
      console.log(error);
      alert("검색결과가 없습니다!");
      window.location.replace("/shop");
    }
  };

  const onSortingHandler = (e) => {
    setSort(e.target.value);
    // document.getElementById("sort");
    console.log(sort);
  };

  return (
    <>
      <StPlace>
        <h2>미용</h2>
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
        <select id="sort" name="sorting" onChange={onSortingHandler}>
          <option value="DISTANCE"> 근거리순 </option>
          <option value="STAR"> 평점순</option>
          <option value="REVIEW"> 후기순</option>
        </select>
      </StPlace>
      {!isSearchMode ? (
        <StCards>
          {cards?.map((item) => {
            return (
              <div key={item.id}>
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/hospital/${item.id}`);
                  }}
                >
                  <div>별점 : {"⭐".repeat(item.star)}</div>
                  <div>미용실 이름 : {item.title}</div>
                  <div>주소 : {item.address}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>{((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음</div>
                  )}
                  {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                  <img src={item.reSizeImage} />
                </StCard>
                {/* <button onClick={() => LikeBtn(item)}>
                {" "}
                {item.like === false ? "찜하기" : "찜취소"}{" "}
              </button> */}
              </div>
            );
          })}
        </StCards>
      ) : (
        <StCards>
          {searchData?.map((item) => {
            return (
              <div key={item.id}>
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/hospital/${item.id}`);
                  }}
                >
                  <div>별점 : {"⭐".repeat(item.star)}</div>
                  <div>미용실 이름 : {item.title}</div>
                  <div>주소 : {item.address}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>{((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음</div>
                  )}
                  {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                  <img src={item.reSizeImage} />
                </StCard>
                {/* <button onClick={() => LikeBtn(item)}>
                {" "}
                {item.like === false ? "찜하기" : "찜취소"}{" "}
              </button> */}
              </div>
            );
          })}
        </StCards>
      )}
    </>
  );
};

export default ShopList;

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
  position: relative;
`;
