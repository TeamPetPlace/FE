import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getMyPost } from "../../api/mypage";
import { deletePost } from "../../api/owner";
import styled from "styled-components";
import chatbubble from "../../style/img/chatbubble.svg";
import Button from "../../element/Button";

function PostList() {
  const [myList, setMyList] = useState([]);

  const { data } = useQuery("getmypost", getMyPost, {
    onSuccess: (response) => {
      setMyList(response.content);
      // console.log(response.content);
    },
  });

  const navigate = useNavigate();

  //게시글 삭제
  const queryClient = useQueryClient();
  const deletPostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("getmypost");
    },
  });

  const onDeleteHandler = (id) => {
    const message = window.confirm("삭제하시겠습니까?");
    if (message) {
      deletPostMutation.mutate(id);
    } else {
      return;
    }
  };

  return (
    <div>
      <Stdiv>
        {myList != [] &&
          myList?.map((item) => {
            return (
              <StListContainer key={item.id}>
                <StImg src={item.reSizeImage} alt="img" />
                <StContentContainer>
                  <StChatContent>
                    <img src={chatbubble} style={{ marginRight: "5px" }} />{" "}
                    {item.reviewCount}
                  </StChatContent>
                  <StTitle>{item.title}</StTitle>
                  <StContent>{item.contents}</StContent>
                  <StUnderDiv>
                    <StSmallContent>
                      {item.createdAt.split("T", 1)}
                    </StSmallContent>
                    {item.category === "병원" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/hospital/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                    {item.category === "미용" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/shop/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                    {item.category === "카페" && (
                      <div>
                        <Button
                          size="postList"
                          onClick={() => navigate(`/cafe/${item.id}`)}
                        >
                          보러가기
                        </Button>
                        <Button
                          size="postList"
                          onClick={() => onDeleteHandler(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    )}
                  </StUnderDiv>
                </StContentContainer>
              </StListContainer>
            );
          })}
      </Stdiv>
    </div>
  );
}

export default PostList;

const Stdiv = styled.div`
  width: 825px;
  height: 960px;
  margin: 65px 78px;
  @media screen and (max-width: 767px) {
    width: 280px;
    height: 550px;
    margin: 20px 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 580px;
    height: 800px;
    margin: 50px 40px;
  }
`;

const StListContainer = styled.div`
  width: 820px;
  height: 314px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 280px;
    height: 150px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 500px;
    height: 200px;
  }
`;

const StImg = styled.img`
  width: 320px;
  height: 232px;
  margin-top: 44px;
  border-radius: 5px;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 90px;
    margin-top: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 200px;
    height: 150px;
    margin-top: 20px;
  }
`;

const StContentContainer = styled.div`
  width: 490px;
  height: 232px;
  margin-top: 44px;
  @media screen and (max-width: 767px) {
    width: 150px;
    height: 100px;
    margin-top: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 300px;
    height: 150px;
    margin-top: 20px;
  }
`;

const StTitle = styled.div`
  font-size: 20px;
  height: 28px;
  font-weight: bold;
  margin-left: 35px;
  @media screen and (max-width: 767px) {
    font-size: 13px;
    height: 20px;
    margin-left: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 20px;
    height: 30px;
    margin-left: 15px;
  }
`;

const StContent = styled.div`
  font-size: 14px;
  height: 130px;
  margin-left: 35px;

  @media screen and (max-width: 767px) {
    height: 50px;
    margin-left: 10px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 90px;
    margin-left: 15px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StSmallContent = styled.div`
  font-size: 12px;
  width: 100px;
  color: #999999;
  display: flex;
  margin-left: 35px;
  @media screen and (max-width: 767px) {
    margin-left: 5px;
    font-size: 8px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 10px;
  }
`;

const StChatContent = styled.div`
  font-size: 12px;
  color: #999999;
  display: flex;
  margin-left: 440px;
  @media screen and (max-width: 767px) {
    margin-left: 120px;
    font-size: 10px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 320px;
  }
`;

const StUnderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-top: 5px;
  @media screen and (max-width: 767px) {
    width: 150px;
    margin-top: -10px;
  }
`;
