import React, { useState, useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components";
import { MdLocalHospital } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import {
  AllPost,
  AddLikesPost,
  SearchPost,
  DeleteLikePost,
} from "../../api/category";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../api/detail";
import { useCookies } from "react-cookie";
import Skeletons from "../../element/Skeletons";

const HospitalList = () => {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [sort, setSort] = useState("DISTANCE");
  const [cookies] = useCookies(["lat", "lng"]);
  const size = 1;
  const page = 0;
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  //봤던 게시글 조회
  const [history, setHistory] = useState([]);

  const response = useQuery("getHistory", getHistory, {
    onSuccess: (response) => {
      setHistory(response);
    },
  });

  const { data: alldata } = useQuery(
    [
      "AllPost",
      {
        category: "병원",
        sort: sort,
        lat: cookies.lat,
        lng: cookies.lng,
        page: "0",
        size: size,
      },
    ],
    () =>
      AllPost({
        category: "",
        sort,
        // keyword: searchkeyword,
        lat: cookies.lat,
        lng: cookies.lng,
        page,
        size,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
        queryclient.invalidateQueries("");
      },
    }
  );

  //무한스크롤
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      [
        "searchPost",
        {
          category: "병원",
          sort: sort,
          keyword: searchkeyword,
          lat: cookies.lat,
          lng: cookies.lng,
          size: size,
        },
      ],
      ({ pageParam = 0 }) =>
        AllPost({
          category: "병원",
          sort: sort,
          // keyword: searchkeyword,
          lat: cookies.lat,
          lng: cookies.lng,
          page: pageParam,
          size: size,
        }),

      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.data.last) {
            return null;
          }
          // return pages.length;
          return pages.length;
        },
        onSuccess: (newData) => {
          setCards((prevCards) => {
            const newItems = newData.pages.flatMap((page) => page.data.content);
            const uniqueItems = newItems.filter(
              (item) => !prevCards.includes(item)
            );
            return [...prevCards, ...uniqueItems];
          });
        },
      }
    );

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage
      )
        fetchNextPage();
    }
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [fetchNextPage, hasNextPage]);

  const onSearchHandler = async () => {
    setIsSearchMode(true);
    if (searchkeyword.trim() === "") {
      window.location.replace("/hospital");
    }
    try {
      const { data } = await SearchPost({
        category: "병원",
        sort: sort,
        keyword: searchkeyword,
        lat: cookies.lat,
        lng: cookies.lng,
        page: 0,
        size: size,
      });

      // console.log(data.response);
      setSearchData(data.response);
    } catch (error) {
      // console.log(error);
      alert("검색결과가 없습니다!");
      window.location.replace("/hospital");
    }
  };

  const onSortingHandler = async (e) => {
    const updatedSort = e.target.value;
    setSort(updatedSort);
    try {
      const { data } = await SearchPost({
        category: "병원",
        sort: updatedSort || sort,
        keyword: searchkeyword,
        lat: cookies.lat,
        lng: cookies.lng,
        page: 0,
        size: size,
      });
      // console.log(data.response);
      setSearchData(data.response);
    } catch (error) {
      // console.log(error);
      alert("검색결과가 없습니다!");
      window.location.replace("/hospital");
    }
  };

  // const LikeMutation = useMutation(AddLikesPost, {
  //   onSuccess: () => {
  //     queryclient.invalidateQueries("AllPost");
  //     console.log("찜성공");
  //   },
  //   onError: (error) => {
  //     queryclient.invalidateQueries("AllPost");
  //     console.log("찜실패");
  //   },
  // });
  // const DeleteMutation = useMutation(DeleteLikePost, {
  //   onSuccess: () => {
  //     queryclient.invalidateQueries("AllPost");
  //     console.log("삭제성공");
  //   },
  //   onError: (error) => {
  //     queryclient.invalidateQueries("AllPost");
  //     console.log("삭제실패");
  //   },
  // });
  // const LikeBtn = (item) => {
  //   const payload = {
  //     id: item.id,
  //   };
  //   if (item.like === false) {
  //     LikeMutation.mutate(payload);
  //   } else if (item.like === true) {
  //     DeleteMutation.mutate(payload);
  //   }
  //   // console.log(item.id);
  // };

  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      onSearchHandler();
    }
  };

  return (
    <>
      <StPlace>
        <StHistory>
          <div>
            {history.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.reSizeImage} alt="historyImg" />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </StHistory>
        <h2>
          병원
          <MdLocalHospital />
        </h2>
        <div>
          <input
            style={{ width: "300px" }}
            type="text"
            placeholder="검색할 명칭을 입력해주세요"
            value={searchkeyword || ""}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            onKeyPress={onKeyPressHandler}
          />
          <button id="search" onClick={onSearchHandler}>
            <GoSearch />
          </button>
        </div>
        <select id="sort" name="sort" onChange={onSortingHandler}>
          <option value="DISTANCE"> 근거리순 </option>
          <option value="STAR"> 평점순</option>
          <option value="REVIEW"> 후기순</option>
        </select>
      </StPlace>
      {!isSearchMode ? (
        <StCards>
          {cards?.map((item, index) => {
            return (
              <div key={index}>
                <StCard
                  key={item.id}
                  onClick={() => {
                    navigate(`/hospital/${item.id}`);
                  }}
                >
                  <div>별점 : {"⭐".repeat(item.star)}</div>
                  <div>병원 이름 : {item.title}</div>
                  <div>주소 : {item.address.split(" ", 2).join(" ")}</div>
                  {parseInt(item.distance) > 999 && (
                    <div>
                      {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                    </div>
                  )}
                  {parseInt(item.distance) < 999 && (
                    <div>{parseInt(item.distance)}m남음</div>
                  )}
                  <img src={item.reSizeImage} />
                </StCard>
                {/* <button onClick={() => LikeBtn(item)}>
                  {" "}
                  {item.like === false ? "찜하기" : "찜취소"}{" "}
                </button> */}
              </div>
            );
          })}
          {isLoading || isFetching ? (
            <Skeletons style={{ marginTop: "20px" }} />
          ) : null}
        </StCards>
      ) : (
        <StCards>
          {searchData !== [] &&
            searchData?.map((item, index) => {
              return (
                <div key={index}>
                  <StCard
                    onClick={() => {
                      navigate(`/hospital/${item.id}`);
                    }}
                  >
                    <div>별점 : {"⭐".repeat(item.star)}</div>
                    <div>병원 이름 : {item.title}</div>
                    <div>주소 : {item.address}</div>
                    {parseInt(item.distance) > 999 && (
                      <div>
                        {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                        km남음
                      </div>
                    )}
                    {parseInt(item.distance) < 999 && (
                      <div>{parseInt(item.distance)}m남음</div>
                    )}
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

export default HospitalList;

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
  flex-direction: column;

  background-color: #f7f7de;
`;

const StCard = styled.div`
  width: 300px;
  height: 300px;
  background-color: #e3def7;
`;

const StHistory = styled.div`
  width: 200px;
  height: 600px;
  position: fixed;
  background-color: aliceblue;
  left: 80%;
`;
