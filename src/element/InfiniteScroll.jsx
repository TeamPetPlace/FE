import React, { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../api/axios";
import { AllPost } from "../api/category";

export default function InfiniteScroll() {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);
  const [scrollpage, setScrollPage] = useState([]);
  // const [searchkeyword, setSearchKeyword] = useState();
  // const [searchData, setSearchData] = useState([]);
  // const [isSearchMode, setIsSearchMode] = useState();
  const [page, setPage] = useState(0);
  const [lat, setLat] = useState("37.51826171600231");
  const [lng, setLng] = useState("127.02335537579637");
  const [sort, setSort] = useState("DISTANCE");
  const queryclient = useQueryClient();
  const navigate = useNavigate();

  // const [randomImageList, setRandomImageList] = useState([]);

  const { data } = useQuery(
    [
      "AllPost",
      {
        category: "병원",
        sort: sort,
        lat: lat,
        lng: lng,
        page: page,
        size: 2,
      },
    ],
    () =>
      AllPost({
        category: "병원",
        sort: sort,
        lat: lat,
        lng: lng,
        page: page,
        size: 2,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
        setPage(item.data.pageable.pageNumber);
        // setLat(cards.lat);
        // setLng(item.data.content);

        queryclient.invalidateQueries("getPost");
      },
    }
  );

  const ScrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    console.log("스크롤이벤트 발생");

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("마지막스크롤");
      setPage((page) => page + 1);
    }
  };

  const getData = async (sort, page) => {
    console.log("fetching 호출");
    try {
      const { data } = await instance.get(
        `category=병원&sort=${sort}&lat=37.51826171600231&lng=127.02335537579637&page=${page}&size=2`
      );
      console.log(data);
      setLists(cards.concat(data));
    } catch {
      console.log("fetching error");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", ScrollHandler);
    return () => {
      window.removeEventListener("scroll", ScrollHandler);
    };
  }, []);

  return (
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
              <div>병원 이름 : {item.title}</div>
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
  );
}

const StCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: #f7f7de;
`;

const StCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #e3def7;
`;
