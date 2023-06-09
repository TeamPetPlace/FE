import React, { useState, useEffect } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { GoSearch } from "react-icons/go";
import { AllPost, AddLikesPost, SearchPost, DeleteLikePost } from "../../api/category";
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
  StIconimg,
  StStarIcon,
  StCardTitle,
  StPageMoveBtn,
  StIconBtn,
} from "./AllCategoryListStyle";
import dibs from "../../style/img/dibs.svg";
import noDibs from "../../style/img/noDibs.svg";
import History from "../../element/History";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import Button from "../../element/Button";
import Swal from "sweetalert2";
import styled from "styled-components";
import chatbubble from "../../style/img/chatbubble.svg";

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
        lat: cookies.lat,
        lng: cookies.lng,
        page,
        size,
      }),
    {
      onSuccess: (item) => {
        setCards(item.data.content);
      },
    }
  );
  console.log(cards);

  //무한스크롤
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery(
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
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasNextPage)
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

      setSearchData(data.content);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "검색 결과가 없습니다.",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      });
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
      setSearchData(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const LikeMutation = useMutation(AddLikesPost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "찜하기",
        text: "마이페이지 '찜목록'에서 확인이 가능합니다!",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload("/hospital");
        } else {
          return;
        }
      });
    },
    onError: (error) => {
      queryclient.invalidateQueries("AllPost");
      console.log("찜하기 실패");
    },
  });

  const DeleteMutation = useMutation(DeleteLikePost, {
    onSuccess: () => {
      queryclient.invalidateQueries("AllPost");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "찜하기 취소",
        confirmButtonColor: "#FFD53F",
        timer: 3000,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload("/hospital");
        } else {
          return;
        }
      });
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

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //맨 아래로 버튼
  const moveBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  };

  return (
    <>
      <StPlace>
        <StTitle>
          병원
          <StIconimg alt="hospital_icon" src={hospital_icon} />
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
            <StSearchButton aria-label="search" id="search" onClick={onSearchHandler}>
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
                (match) => `<mark style="background-color: #FFD53F">${match}</mark>`
              );
              const address = item.address
                .split(" ", 3)
                .join(" ")
                .replace(
                  new RegExp(searchkeyword, "gi"),
                  (match) => `<mark style="background-color: #FFD53F">${match}</mark>`
                );
              return (
                <div key={index}>
                  <StCard key={index}>
                    <div>
                      <Button onClick={() => LikeBtn(item)} size="dib">
                        {item.like === false ? (
                          <>
                            <img alt="nodibs" src={noDibs} />
                          </>
                        ) : (
                          <img alt="dibs" src={dibs} />
                        )}
                      </Button>
                      {item.like === false ? (
                        <StContainer>
                          <StCardImg
                            onClick={() => {
                              navigate(`/hospital/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                          />
                          <StCaption
                            onClick={() => {
                              navigate(`/hospital/${item.id}`);
                            }}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
                      ) : (
                        <StContainer>
                          <StCardImg
                            onClick={() => {
                              navigate(`/hospital/${item.id}`);
                            }}
                            src={item.reSizeImage}
                            alt="IMG"
                            style={{ border: "3px solid #FFD53F" }}
                          />
                          <StCaption
                            onClick={() => {
                              navigate(`/hospital/${item.id}`);
                            }}
                          >
                            보러가기
                          </StCaption>
                        </StContainer>
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
                      <div>
                        <img alt="comment" src={chatbubble} style={{ marginRight: "5px" }} />{" "}
                        {item.reviewCount}
                      </div>
                    </StContent>
                    {parseInt(item.distance) > 999 && (
                      <StContent>
                        {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                        km남음
                      </StContent>
                    )}
                    {parseInt(item.distance) < 999 && (
                      <StContent>{parseInt(item.distance)}m남음</StContent>
                    )}
                  </StCard>
                </div>
              );
            })}
            {isLoading || isFetching ? <Skeletons style={{ color: "transparent" }} /> : null}
          </StCards>
        </StListPage>
      ) : (
        <StListPage>
          <StCards>
            {searchData !== [] &&
              searchData?.map((item, index) => {
                const title = item.title.replace(
                  new RegExp(searchkeyword, "gi"),
                  (match) => `<mark style="background-color: #FFD53F">${match}</mark>`
                );
                const address = item.address
                  .split(" ", 3)
                  .join(" ")
                  .replace(
                    new RegExp(searchkeyword, "gi"),
                    (match) => `<mark style="background-color: #FFD53F">${match}</mark>`
                  );
                const content = item.contents;
                const contentIndex = content.toLowerCase().indexOf(searchkeyword.toLowerCase());
                let contentDisplay = "";
                if (contentIndex !== -1) {
                  contentDisplay = `...${content.slice(
                    contentIndex,
                    contentIndex + searchkeyword.length
                  )}...`;
                }
                const feature1 = item.feature1;
                const feature1Index = feature1.toLowerCase().indexOf(searchkeyword.toLowerCase());
                let feature1Display = "";
                if (feature1Index !== -1) {
                  feature1Display = `...${feature1.slice(
                    feature1Index,
                    feature1Index + searchkeyword.length
                  )}...`;
                }
                return (
                  <div key={index}>
                    <StCard key={index}>
                      <div>
                        <Button onClick={() => LikeBtn(item)} size="dib">
                          {item.like === false ? (
                            <>
                              <img alt="nodibs" src={noDibs} />
                            </>
                          ) : (
                            <img alt="dibs" src={dibs} />
                          )}
                        </Button>
                        {item.like === false ? (
                          <StContainer>
                            <StCardImg
                              onClick={() => {
                                navigate(`/hospital/${item.id}`);
                              }}
                              src={item.reSizeImage}
                              alt="IMG"
                            />
                            <StCaption
                              onClick={() => {
                                navigate(`/hospital/${item.id}`);
                              }}
                            >
                              보러가기
                            </StCaption>
                          </StContainer>
                        ) : (
                          <StContainer>
                            <StCardImg
                              onClick={() => {
                                navigate(`/hospital/${item.id}`);
                              }}
                              src={item.reSizeImage}
                              alt="IMG"
                            />
                            <StCaption
                              onClick={() => {
                                navigate(`/hospital/${item.id}`);
                              }}
                            >
                              보러가기
                            </StCaption>
                          </StContainer>
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
                      <div style={{ display: "none" }}>{item.contents}</div>
                      {contentDisplay && (
                        <span
                          dangerouslySetInnerHTML={{ __html: contentDisplay }}
                          style={{ backgroundColor: "#FFD53F" }}
                        />
                      )}
                      {feature1Display && (
                        <span
                          dangerouslySetInnerHTML={{ __html: feature1Display }}
                          style={{ backgroundColor: "#FFD53F" }}
                        />
                      )}
                      <StContent>
                        <span dangerouslySetInnerHTML={{ __html: address }} />
                        <div>
                          <img alt="comment" src={chatbubble} style={{ marginRight: "5px" }} />{" "}
                          {item.reviewCount}
                        </div>
                      </StContent>
                      {parseInt(item.distance) > 999 && (
                        <StContent>
                          {((parseInt(item.distance) * 1) / 1000).toFixed(1)}
                          km남음
                        </StContent>
                      )}
                      {parseInt(item.distance) < 999 && (
                        <StContent>{parseInt(item.distance)}m남음</StContent>
                      )}
                    </StCard>
                  </div>
                );
              })}
            {isLoading || isFetching ? <Skeletons style={{ marginTop: "20px" }} /> : null}
          </StCards>
        </StListPage>
      )}
      <StPageMoveBtn>
        <StIconBtn aria-label="moveTop" onClick={moveTop}>
          <BiUpArrowAlt />
        </StIconBtn>
        <StIconBtn aria-label="moveBottom" onClick={moveBottom}>
          <BiDownArrowAlt />
        </StIconBtn>
      </StPageMoveBtn>
    </>
  );
}

export default HospitalList;

const StCaption = styled.div`
  position: absolute;
  bottom: 50%;
  left: 0%;
  text-align: center;
  width: 100%;
  color: #fff;
  opacity: 0;
  z-index: 999;
  cursor: pointer;
`;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  &:hover {
    ${StCardImg} {
      filter: brightness(50%);
    }
    ${StCaption} {
      opacity: 1;
    }
  }
`;
