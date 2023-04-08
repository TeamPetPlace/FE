import React, { useState, useEffect } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { GoSearch } from "react-icons/go";
import {
  AllPost,
  AddLikesPost,
  SearchPost,
  DeleteLikePost,
} from "../../api/category";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Skeletons from "../../element/Skeletons";
import hospital_icon from "../../style/img/clickedHospital.svg";
import {
  StCardImg,
  StPlace,
  StCards,
  StCard,
  StTitle,
  StContent,
  StListPage,
  StSearchInput,
  StSearchButton,
  StSearchDiv,
  StSearchSortingDiv,
  StSelect,
  StOption,
  StDibBtn,
  StIconimg,
  StStarIcon,
  StCardTitle,
} from "./AllCategoryListStyle";
import dibs from "../../style/img/dibs.svg";
import noDibs from "../../style/img/noDibs.svg";
import History from "../../element/History";

function HospitalList() {
  const [cards, setCards] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [sort, setSort] = useState("DISTANCE");
  const [cookies] = useCookies(["lat", "lng"]);
  const size = 12;
  const page = 0;
  const navigate = useNavigate();
  const queryclient = useQueryClient();

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
              (item) => !prevCards.some((prevItem) => prevItem.id === item.id)
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

  //엔터 누르면 검색
  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      onSearchHandler();
    }
  };

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
      console.log(error);
      // alert("검색결과가 없습니다!");
      // window.location.replace("/hospital");
    }
  };

  const LikeMutation = useMutation(AddLikesPost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      alert("찜하기 완료");
    },
    onError: (error) => {
      queryclient.invalidateQueries("AllPost");
      console.log("찜하기 실패");
    },
  });

  const DeleteMutation = useMutation(DeleteLikePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      alert("찜하기 취소");
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
  };

  return (
    <>
      <StPlace>
        <StTitle>
          병원
          <StIconimg src={hospital_icon} />
        </StTitle>
        <StSearchSortingDiv>
          <StSearchDiv>
            <StSearchInput
              type="text"
              placeholder="검색할 키워드를 입력해주세요"
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
      <History />
      {!isSearchMode ? (
        <StListPage>
          <StCards>
            {cards?.map((item, index) => {
              const title = item.title.replace(
                new RegExp(searchkeyword, "gi"),
                (match) =>
                  `<mark style="background-color: #FFD53F">${match}</mark>` // 검색어 글자색 변경
              );
              const address = item.address
                .split(" ", 2)
                .join(" ")
                .replace(
                  new RegExp(searchkeyword, "gi"),
                  (match) =>
                    `<mark style="background-color: #FFD53F">${match}</mark>`
                );
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
                            navigate(`/hospital/${item.id}`);
                          }}
                          src={item.reSizeImage}
                          alt="IMG"
                        />
                      ) : (
                        <StCardImg
                          onClick={() => {
                            navigate(`/hospital/${item.id}`);
                          }}
                          src={item.reSizeImage}
                          alt="IMG"
                          style={{ border: "3px solid #FFD53F" }}
                        />
                      )}
                    </div>
                    <StCardTitle
                      onClick={() => {
                        navigate(`/hospital/${item.id}`);
                      }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: title }} />

                      {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                        (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                        (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                        (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                        (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                        (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                    </StCardTitle>
                    <StContent>
                      <span dangerouslySetInnerHTML={{ __html: address }} />
                    </StContent>
                    {parseInt(item.distance) > 999 && (
                      <StContent>
                        {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                        km남음
                      </StContent>
                    )}
                    {parseInt(item.distance) < 999 && (
                      <div>{parseInt(item.distance)}m남음</div>
                    )}
                  </StCard>
                </div>
              );
            })}

            {isLoading || isFetching ? (
              <Skeletons style={{ marginTop: "20px", color: "transparent" }} />
            ) : null}
          </StCards>
        </StListPage>
      ) : (
        <StListPage>
          <StCards>
            {searchData !== [] &&
              searchData?.map((item, index) => {
                const title = item.title.replace(
                  new RegExp(searchkeyword, "gi"),
                  (match) =>
                    `<mark style="background-color: #FFD53F">${match}</mark>` // 검색어 글자색 변경
                );
                const address = item.address
                  .split(" ", 2)
                  .join(" ")
                  .replace(
                    new RegExp(searchkeyword, "gi"),
                    (match) =>
                      `<mark style="background-color: #FFD53F">${match}</mark>`
                  );
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
                              navigate(`/hospital/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                          />
                        ) : (
                          <StCardImg
                            onClick={() => {
                              navigate(`/hospital/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                          />
                        )}
                      </div>
                      <StCardTitle
                        onClick={() => {
                          navigate(`/hospital/${item.id}`);
                        }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: title }} />

                        {(item.star === 0 && <StStarIcon>☆☆☆☆☆</StStarIcon>) ||
                          (item.star === 1 && <StStarIcon>★☆☆☆☆</StStarIcon>) ||
                          (item.star === 2 && <StStarIcon>★★☆☆☆</StStarIcon>) ||
                          (item.star === 3 && <StStarIcon>★★★☆☆</StStarIcon>) ||
                          (item.star === 4 && <StStarIcon>★★★★☆</StStarIcon>) ||
                          (item.star === 5 && <StStarIcon>★★★★★</StStarIcon>)}
                      </StCardTitle>
                      <StContent>
                        <span dangerouslySetInnerHTML={{ __html: address }} />
                      </StContent>
                      {parseInt(item.distance) > 999 && (
                        <StContent>
                          {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                          km남음
                        </StContent>
                      )}
                      {parseInt(item.distance) < 999 && (
                        <div>{parseInt(item.distance)}m남음</div>
                      )}
                    </StCard>
                  </div>
                );
              })}
            {isLoading || isFetching ? (
              <Skeletons style={{ marginTop: "20px" }} />
            ) : null}
          </StCards>
        </StListPage>
      )}
    </>
  );
}

export default HospitalList;
