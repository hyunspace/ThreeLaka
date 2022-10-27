import styled from 'styled-components';

// 메인페이지 검색
export const NewVideo = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: row;
  position: relative;
  width: 40vw;
  margin-top: 10vh;
`;

export const SearchBarContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 10vh;
`;

// 영상 url 넣을 input 스타일링
export const SearchBarInput = styled.div`
  position: relative;
  margin-bottom: 2vh;

  & input {
    width: 100%;
    /* height: 10vh; */
    padding: 1vh 0.5vw;
    background: transparent;
    color: #111111;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 1em;
    /* letter-spacing: 0.1em; */
  }

  // input 박스 내 안내문
  & span {
    position: absolute;
    left: 0;
    /* padding: 2vh; */
    color: rgba(0, 0, 0, 0.4);
    /* text-align: center; */
    pointer-events: none;
  }
  & input:valid ~ span,
  input:focus ~ span {
    color: #111111;
    transform: translateY(-3vh);
    font-size: 0.8rem;
  }

  // input 아래 그라데이션 효과
  & i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.5vh;
    border-radius: 10px;
    background: #111111;
    overflow: hidden;
  }
  & i::before {
    content: '';
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #4a9fff, #b0ff91, #4a9fff);
    animation: animate 5s linear infinite;
    transition: 0.5s;
  }
  & input:valid ~ i::before,
  input:focus ~ i::before {
    left: 0%;
  }
  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 30vw;
    }
  }
`;

export const SearchButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15vw;
    height: 4vh;
    background: #111111;
    color: #ffffff;
    border-radius: 5px;
    padding: 2.5vh 1vw;
  }
  & button:hover {
    background-color: #4a9fff;
    transition: 0.2s;
    /* background: linear-gradient(80deg, #4a9fff, #b0ff91); */
    /* animation: animate 2s linear; */
  }
  /* @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 50%;
    }
  } */
`;