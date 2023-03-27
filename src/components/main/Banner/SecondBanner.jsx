import React from "react";
import styled from "styled-components";

function SecondBanner() {
  return (
    <StBanner>
      <StContents>
        <StTitle>세계 동물의 날</StTitle>
        <StText>
          ‘세계 동물의 날’은 동물의 복지와 권리를 위해 제정된 국제적인 기념일로,
          독일의 작가이자 동물학자인 하인리히 짐머만(Heinlich Zimmerman)이
          1931년 이탈리아 피렌체에서 열린 세계동물보호 행사에 참여해 세계 동물의
          날을 보편적인 기념일로 제정하자는 결의안이 채택되어 현재 세계적인
          행사로 자리 잡았다. 또한, 10월 4일은 생태와 동물의 수호성인이라고
          불리는 아시시의 성인 프란체스코(St. Francesco)의 축일로, 동물의 탄생을
          축복하는 의식을 거행하는 의식을 치루는 날이다. 한편, 세계 70여
          개국에서 매년 세계 동물의 날을 기념하기 위해 국적·종교·정치적 이념과
          상관없이 다양한 교육·의식, 동물 보호소 개방과 반려동물 입양 등
          동물들의 복지를 향상하기 위한 여러 가지 행사가 열린다. 아울러, 전
          세계의 동물 활동가들이 모여 동물 실험과 안락사 등 동물이 직면하고 있는
          많은 문제점에 대해 의견을 나누고 해결 방안에 대해 논의한다.
        </StText>
      </StContents>
    </StBanner>
  );
}

export default SecondBanner;

const StBanner = styled.div`
  width: 100%;
  background-color: #fffbe3;
  height: 400px;
  margin-bottom: 68px;
`;

const StContents = styled.div`
  width: 890px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const StTitle = styled.div`
  font-size: 34px;
  font-weight: 900;
`;

const StText = styled.p`
  font-size: 20px;
  color: #555;
`;
