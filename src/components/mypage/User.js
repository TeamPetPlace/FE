import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMypage, updateUser } from "../../api/mypage";

function User() {
  const { id } = useParams();
  const [mypage, setMypage] = useState();

  const [cookies] = useCookies(["access_token", "loginType"]);

  const queryClient = useQueryClient();
  const { data } = useQuery("getmypage", getMypage, {
    onSuccess: (response) => {
      setMypage(response.response);
    },
  });

  const onEditMode = () => {
    setEdit(!edit);
    setUpdateNick(mypage.nickname);
    setImage(image);
    setImgView([mypage.image]);
  };

  //수정 모드
  const [edit, setEdit] = useState(false);
  const [updateNick, setUpdateNick] = useState("");
  const [imgView, setImgView] = useState([]);
  const [image, setImage] = useState([]);
  const fileInput = useRef(null);

  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const onImgHandler = (event) => {
    setImgView([]);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        setImage(event.target.files[i]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base = reader.result;
          if (base) {
            const baseSub = base.toString();
            setImgView((imgView) => [...imgView, baseSub]);
          }
        };
      }
    }
  };

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("getmypage");
    },
  });

  const onUpdateHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nickname", updateNick);
    formData.append("image", image);
    const payload = {
      id: id,
      nickname: updateNick,
      image: image,
    };
    updateMutation.mutate(payload);
    onEditMode();
    alert("수정 완료");
  };

  return (
    <div>
      {edit ? (
        // 수정모드
        <StForm onSubmit={onUpdateHandler} encType="multipart/form-data">
          <div>
            <input
              type="file"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={onImgHandler}
            />
            <button onClick={onImgButton}>이미지 업로드</button>
            <div>
              {imgView.length > 0 &&
                imgView?.map((item, index) => {
                  return <img src={item} alt="img" key={index} />;
                })}
            </div>
          </div>
          <StUserBox>
            <StNick>
              <div>닉네임</div>
              <input
                type="text"
                name="nick"
                value={updateNick}
                onChange={(event) => {
                  setUpdateNick(event.target.value);
                }}
              />
              {cookies.loginType === "BUSINESS" && (
                <div style={{ fontWeight: "900" }}>(사업자)</div>
              )}
              {cookies.loginType === "USER" && (
                <div style={{ fontWeight: "900" }}>(회원)</div>
              )}
            </StNick>
            {mypage && (
              <StEmail>
                <div>이메일</div>
                <div>{mypage.email}</div>
              </StEmail>
            )}
            <button>수정하기</button>
            <button onClick={onEditMode}>취소하기</button>
          </StUserBox>
        </StForm>
      ) : (
        // 수정 전 모드
        <>
          {mypage && (
            <>
              {mypage.image === null ? (
                <StImg
                  src="http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/09/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-09-19-%EC%98%A4%ED%9B%84-2.17.32.png"
                  alt="origin"
                />
              ) : (
                <StImg src={mypage.image} alt="img" />
              )}

              <StUserBox>
                <StNick>
                  <div>닉네임:</div>
                  <div>{mypage.nickname}</div>
                  {cookies.loginType === "BUSINESS" && (
                    <div style={{ fontWeight: "900" }}>(사업자)</div>
                  )}
                  {cookies.loginType === "USER" && (
                    <div style={{ fontWeight: "900" }}>(회원)</div>
                  )}
                </StNick>
                <StEmail>
                  <div>이메일:</div>
                  <div>{mypage.email}</div>
                </StEmail>
                <button onClick={onEditMode}>수정하기</button>
              </StUserBox>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default User;

const StForm = styled.form`
  display: flex;
`;

const StUserBox = styled.div`
  width: 400px;
  height: 200px;
  border: 1px solid black;
  background-color: #eee;
`;

const StNick = styled.div`
  display: flex;
`;

const StEmail = styled.div`
  display: flex;
`;

const StImg = styled.img`
  width: 200px;
  height: 200px;
`;
