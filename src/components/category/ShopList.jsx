import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { AllPost, SearchPost } from "../../api/category";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../api/detail";

const ShopList = () => {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [sort, setSort] = useState("DISTANCE");

  //봤던 게시글 조회
  const [history, setHistory] = useState([]);

  const response = useQuery("getHistory", getHistory, {
    onSuccess: (response) => {
      setHistory(response);
    },
  });

  //무한스크롤
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "searchPost",
    ({ pageParam = 0 }) =>
      AllPost({
        category: "미용",
        // sort: "REVIEW",
        sort: sort,
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: pageParam,
        size: 2,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.last) {
          return null;
        }
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
      ) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  // const { data } = useQuery(
  //   [
  //     "searchPost",
  //     {
  //       category: "미용",
  //       // sort: "REVIEW",
  //       sort: sort,
  //       lat: 37.53502829566887,
  //       lng: 126.96471596469242,
  //       page: 0,
  //       size: 10,
  //     },
  //   ],
  //   () =>
  //     AllPost({
  //       category: "미용",
  //       // sort: "REVIEW",
  //       sort: sort,
  //       lat: 37.53502829566887,
  //       lng: 126.96471596469242,
  //       page: 0,
  //       size: 10,
  //     }),
  //   {
  //     onSuccess: (item) => {
  //       setCards(item.data.content);
  //       queryclient.invalidateQueries("");
  //     },
  //   }
  // );

  const onSortingHandler = (e) => {
    setSort(e.target.value);
    onSearchHandler(e.target.value);
  };

  const onSearchHandler = async (updatedSort) => {
    setIsSearchMode(true);
    try {
      const { data } = await SearchPost({
        category: "미용",
        sort: updatedSort || sort,
        keyword: searchkeyword,
        lat: 37.53502829566887,
        lng: 126.96471596469242,
        page: 0,
        size: 2,
      });
      console.log(data.response);
      setSearchData(data.response);
    } catch (error) {
      console.log(error);
      alert("검색결과가 없습니다!");
      window.location.replace("/shop");
    }
  };

  //엔터 누르면 검색
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
            {history.map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.reSizeImage} alt="historyImg" />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </StHistory>
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
            onKeyPress={onKeyPressHandler}
          />
          <button onClick={onSearchHandler}>
            <GoSearch />
          </button>
        </div>
        <StFilterBox>
          <select id="sort" name="sort" onChange={onSortingHandler}>
            <option value="DISTANCE"> 근거리순 </option>
            <option value="STAR"> 평점순</option>
            <option value="REVIEW"> 후기순</option>
          </select>
        </StFilterBox>
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
        </StCards>
      ) : (
        <StCards>
          {searchData?.map((item) => {
            return (
              <StCard
                key={item.id}
                onClick={() => {
                  navigate(`/shop/${item.id}`);
                }}
              >
                <div>별점 : {"⭐".repeat(item.star)}</div>
                <div>미용실 이름 : {item.title}</div>
                <div>주소 : {item.address}</div>
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
  flex-direction: column;
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

const StHistory = styled.div`
  width: 200px;
  height: 600px;
  position: fixed;
  background-color: aliceblue;
  left: 80%;
`;

const StFilterBox = styled.div``;
