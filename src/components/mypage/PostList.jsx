import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { getMyPost } from "../../api/mypage";
import { deletePost } from "../../api/owner";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import styled from "styled-components";
import chatbubble from "../../style/img/chatbubble.svg";

function PostList() {
  const [myList, setMyList] = useState([]);

  const { data } = useQuery("getmypost", getMyPost, {
    onSuccess: (response) => {
      setMyList(response.content);
      console.log(response.content);
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
        {myList.length > 0 &&
          myList?.map((item) => {
            return (
              <StListContainer key={item.id}>
                <StImg src={item.reSizeImage} alt="img" />
                <StContentContainer>
                  <StSmallContent style={{ margin: "0 0 0 440px" }}>
                    <img src={chatbubble} style={{ marginRight: "5px" }} />{" "}
                    {item.reviewCount}
                  </StSmallContent>
                  <StTitle>{item.title}</StTitle>
                  <StContent>{item.contents}</StContent>
                  <StUnderDiv>
                    <StSmallContent style={{ marginLeft: "35px" }}>
                      {item.createdAt.split("T", 1)}
                    </StSmallContent>
                    {item.category === "병원" && (
                      <div>
                        <StBtn onClick={() => navigate(`/hospital/${item.id}`)}>
                          보러가기
                        </StBtn>
                        <StBtn onClick={() => onDeleteHandler(item.id)}>
                          삭제
                        </StBtn>
                      </div>
                    )}
                    {item.category === "미용" && (
                      <div>
                        <StBtn onClick={() => navigate(`/shop/${item.id}`)}>
                          보러가기
                        </StBtn>
                        <StBtn onClick={() => onDeleteHandler(item.id)}>
                          삭제
                        </StBtn>
                      </div>
                    )}
                    {item.category === "카페" && (
                      <div>
                        <StBtn onClick={() => navigate(`/cafe/${item.id}`)}>
                          보러가기
                        </StBtn>
                        <StBtn onClick={() => onDeleteHandler(item.id)}>
                          삭제
                        </StBtn>
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
  height: 860px;
  margin: 65px 78px;
`;

const StListContainer = styled.div`
  width: 820px;
  height: 314px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
`;

const StImg = styled.img`
  width: 320px;
  height: 232px;
  margin-top: 44px;
  border-radius: 5px;
`;

const StContentContainer = styled.div`
  width: 490px;
  height: 232px;
  margin-top: 44px;
`;

const StTitle = styled.div`
  font-size: 20px;
  height: 28px;
  font-weight: bold;
  margin-left: 35px;
`;

const StContent = styled.div`
  font-size: 14px;
  height: 130px;
  margin-left: 35px;
`;

const StSmallContent = styled.div`
  font-size: 12px;
  color: #999999;
  display: flex;
`;

const StBtn = styled.button`
  font-size: 12px;
  width: 75px;
  height: 30px;
  /* padding: 2px; */
  text-align: center;
  background-color: #ffff;
  border: 1px solid #cccccc;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    background-color: #eee;
  }
`;

const StUnderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StBtnDiv = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
`;
