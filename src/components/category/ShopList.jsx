import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { AddLikesPost, AllPost, DeleteLikePost, SearchPost } from "../../api/category";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../../api/detail";
import { useCookies } from "react-cookie";
import Skeletons from "../../element/Skeletons";
import shop_icon from "../../style/img/shop_icon.svg";
import {
  StHistoryTitle,
  StHistoryCard,
  StHistoryImg,
  StCardImg,
  StPlace,
  StCards,
  StCard,
  StHistory,
  StTitle,
  StContent,
  StListPage,
  StSearchInput,
  StSearchButton,
  StSearchDiv,
  StSearchSortingDiv,
  StSelect,
  StOption,
  StIconimg,
  StDibBtn,
  StStarIcon,
} from "./AllCategoryListStyle";
import dibs from "../../style/img/dibs.svg";
import noDibs from "../../style/img/noDibs.svg";

function ShopList() {
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
        category: "미용",
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
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
    [
      "searchPost",
      {
        category: "미용",
        sort: sort,
        keyword: searchkeyword,
        lat: cookies.lat,
        lng: cookies.lng,
        size: size,
      },
    ],
    ({ pageParam = 0 }) =>
      AllPost({
        category: "미용",
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
        return pages.length;
      },
      onSuccess: (newData) => {
        setCards((prevCards) => {
          const newItems = newData.pages.flatMap((page) => page.data.content);
          const uniqueItems = newItems.filter((item) => !prevCards.includes(item));
          return [...prevCards, ...uniqueItems];
        });
      },
    }
  );

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasNextPage) {
        fetchNextPage();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const onSearchHandler = async () => {
    setIsSearchMode(true);
    // e.preventDefault();
    try {
      const { data } = await SearchPost({
        category: "미용",
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
      window.location.replace("/shop");
    }
  };

  const onSortingHandler = async (e) => {
    const updatedSort = e.target.value;
    setSort(updatedSort);
    try {
      const { data } = await SearchPost({
        category: "미용",
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
      window.location.replace("/shop");
    }
  };

  const LikeMutation = useMutation(AddLikesPost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      console.log("찜성공");
    },
    onError: (error) => {
      queryclient.invalidateQueries("AllPost");
      console.log("찜실패");
    },
  });
  const DeleteMutation = useMutation(DeleteLikePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      console.log("삭제성공");
    },
    onError: (error) => {
      queryclient.invalidateQueries("AllPost");
      console.log("삭제실패");
    },
  });

  const LikeBtn = (item) => {
    const payload = {
      id: item.id,
    };
    if (item.like === false) {
      LikeMutation.mutate(payload);
    } else if (item.like === true) {
      DeleteMutation.mutate(payload);
    }
    // console.log(item.id);
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
        <StTitle fontSize="36px">
          미용
          <StIconimg src={shop_icon} />
        </StTitle>
        <StSearchSortingDiv>
          <StSearchDiv>
            <StSearchInput
              type="text"
              placeholder="검색할 명칭을 입력해주세요"
              value={searchkeyword || ""}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
              onKeyPress={onKeyPressHandler}
            />
            <StSearchButton id="search" onClick={onSearchHandler}>
              <GoSearch />
            </StSearchButton>
          </StSearchDiv>
          <StSelect id="sort" name="sort" onChange={onSortingHandler}>
            <StOption value="DISTANCE"> 근거리순 </StOption>
            <StOption value="STAR"> 평점순</StOption>
            <StOption value="REVIEW"> 후기순</StOption>
          </StSelect>
        </StSearchSortingDiv>
      </StPlace>
      {!isSearchMode ? (
        <StListPage>
          <StCards>
            {cards?.map((item, index) => {
              return (
                <div key={index}>
                  <StCard key={index}>
                    <div>
                      <StDibBtn onClick={() => LikeBtn(item)}>
                        {item.like === false ? (
                          <>
                            <img src={noDibs} />
                          </>
                        ) : (
                          <img src={dibs} />
                        )}
                      </StDibBtn>
                      {item.like === false ? (
                        <StCardImg
                          onClick={() => {
                            navigate(`/shop/${item.id}`);
                          }}
                          src={item.reSizeImage}
                          alt="IMG"
                        />
                      ) : (
                        <StCardImg
                          onClick={() => {
                            navigate(`/shop/${item.id}`);
                          }}
                          src={item.reSizeImage}
                          alt="IMG"
                          style={{ border: "3px solid #FFD53F" }}
                        />
                      )}
                    </div>
                    <StTitle
                      fontSize="24px"
                      onClick={() => {
                        navigate(`/shop/${item.id}`);
                      }}
                    >
                      {item.title}
                      {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                        (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                        (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                        (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                        (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                        (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                    </StTitle>
                    <StContent>{item.address.split(" ", 2).join(" ")}</StContent>
                    {parseInt(item.distance) > 999 && (
                      <StContent>
                        {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                      </StContent>
                    )}
                    {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                  </StCard>
                </div>
              );
            })}
            {isLoading || isFetching ? <Skeletons style={{ marginTop: "20px" }} /> : null}
          </StCards>
          <StHistory>
            <div>
              <StHistoryTitle>내가 봤던 기록</StHistoryTitle>
              {history.map((item, index) => {
                return (
                  <StHistoryCard key={index}>
                    <StHistoryImg src={item.reSizeImage} alt="historyImg" />
                    <StTitle fontSize="18px">{item.title}</StTitle>
                  </StHistoryCard>
                );
              })}
            </div>
          </StHistory>
        </StListPage>
      ) : (
        <StListPage>
          <StCards>
            {searchData !== [] &&
              searchData?.map((item, index) => {
                return (
                  <div key={index}>
                    <StCard key={index}>
                      <div>
                        <StDibBtn onClick={() => LikeBtn(item)}>
                          {item.like === false ? (
                            <>
                              <img src={noDibs} />
                            </>
                          ) : (
                            <img src={dibs} />
                          )}
                        </StDibBtn>
                        {item.like === false ? (
                          <StCardImg
                            onClick={() => {
                              navigate(`/shop/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                          />
                        ) : (
                          <StCardImg
                            onClick={() => {
                              navigate(`/shop/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                            style={{ border: "3px solid #FFD53F" }}
                          />
                        )}
                      </div>
                      <StTitle
                        fontSize="24px"
                        onClick={() => {
                          navigate(`/shop/${item.id}`);
                        }}
                      >
                        {item.title}
                        {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                          (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                          (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                          (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                          (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                          (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                      </StTitle>
                      <StContent>{item.address}</StContent>
                      {parseInt(item.distance) > 999 && (
                        <StContent>
                          {((parseInt(item.distance) * 1) / 1000).toFixed(1)}km남음
                        </StContent>
                      )}
                      {parseInt(item.distance) < 999 && <div>{parseInt(item.distance)}m남음</div>}
                    </StCard>
                  </div>
                );
              })}
            {isLoading || isFetching ? <Skeletons style={{ marginTop: "20px" }} /> : null}
          </StCards>
          <StHistory>
            <div>
              <StHistoryTitle>내가 봤던 기록</StHistoryTitle>
              {history.map((item, index) => {
                return (
                  <StHistoryCard key={index}>
                    <StHistoryImg src={item.reSizeImage} alt="historyImg" />
                    <StTitle fontSize="18px">{item.title}</StTitle>
                  </StHistoryCard>
                );
              })}
            </div>
          </StHistory>
        </StListPage>
      )}
    </>
  );
}

export default ShopList;
