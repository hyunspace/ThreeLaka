import { Radio } from '@material-ui/core';
import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 80vw;
  width: 80%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
  &.login-form {
    justify-content: space-around;
  }
`;

export const AuthBlock = styled.div`
  /* *, *::before, *::after{
    padding: 0;
    margin: 0;
  } */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  /* overflow: hidden; */
  padding: 2rem;
  background: linear-gradient(
    90deg,
    rgba(74, 159, 255, 1) 0%,
    rgba(88, 172, 240, 1) 41%,
    rgba(176, 255, 145, 1) 100%
  );
  .sign-up-mode {
    opacity: 0;
    pointer-events: none;
  }

  .toggle-forms-wrap {
    left: 40%;
    /* background-color: black; */
  }
  .toggle-carousel {
    left: 0%;
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/loginimageleft.png')
      center no-repeat;
    background-size: cover;
  }
`;

export const AuthContainer = styled.div`
  position: relative;
  background-color: white;
  width: 60vw;
  max-width: 80vw;
  height: 80vh;
  border-radius: 3.3rem;
  /* border: solid red 2px; */
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
`;

export const InnerBox = styled.div`
  /* padding: 2rem; */
  /* margin: 2rem; */
  position: absolute;
  width: 90%;
  /* width: calc(100%-4.1rem); */
  height: 100%;
  top: 5%;
  transform: translateX(5%);
  /* left:10%; */
  /* transform: translate(-50%,-50%); */
  /* background-color: black; */
`;

export const FormsWrap = styled.div`
  position: absolute;
  height: 90%;
  width: 60%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  /* border: red solid 1px; */

  .sign-up-form {
    opacity: 0;
    pointer-events: none;
  }
  .sign-up-form > div:nth-child(2) {
    height: 60%;
  }
  .hide-login-form {
    opacity: 0;
    pointer-events: none;
  }
  .show-login-form {
    opacity: 1;
    pointer-events: all;
  }
  .show-sign-up-form {
    opacity: 1;
    pointer-events: all;
  }
  transition: 0.8s ease-in-out;
`;

export const Carousel = styled.div`
  position: absolute;
  top: 2.5%;
  height: 90%;
  left: 60%;
  width: 40%;
  background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/loginimageright.png')
    center no-repeat;
  background-size: cover;
  top: 0;
  transition: 0.8s ease-in-out;
  border-radius: 5vmin;
`;

export const Heading = styled.div`
  font-family: Fredoka;
  h1 {
    display: inline;
    font-size: 4vmin;
  }
`;
export const InputWrap = styled.div`
  width: 20vw;
  position: relative;
  height: 23vh;
  display: flex;
  /* border-radius: 50%; */
  /* border: 1px red solid; */
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  .short {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .age {
    /* width: 30%; */
  }
  .gender {
    font-size: 3vmin;
  }
  span {
    font-size: 2vmin;
    line-height: 2vmin;
  }
`;
// // ?????? url ?????? input ????????????
// export const StyledInput = styled.div`
//   position: relative;
//   margin-bottom: 2vh;

//   & input {
//     width: 100%;
//     /* height: 10vh; */
//     padding: 1vh 0.5vw;
//     background: transparent;
//     color: #111111;
//     border: none;
//     outline: none;
//     box-shadow: none;
//     font-size: 1em;
//     /* letter-spacing: 0.1em; */
//   }

//   // input ?????? ??? ?????????
//   & span {
//     position: absolute;
//     left: 0;
//     /* padding: 2vh; */
//     color: rgba(0, 0, 0, 0.4);
//     /* text-align: center; */
//     pointer-events: none;
//   }
//   & input:valid ~ span,
//   input:focus ~ span {
//     color: #111111;
//     transform: translateY(-3vh);
//     font-size: 0.8rem;
//   }

//   // input ?????? ??????????????? ??????
//   & i {
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     width: 100%;
//     height: 0.5vh;
//     border-radius: 10px;
//     background: #111111;
//     overflow: hidden;
//   }
//   & i::before {
//     content: '';
//     position: absolute;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, #4a9fff, #b0ff91, #4a9fff);
//     animation: animate 5s linear infinite;
//     transition: 0.5s;
//   }
//   & input:valid ~ i::before,
//   input:focus ~ i::before {
//     left: 0%;
//   }
//   @keyframes animate {
//     0% {
//       background-position-x: 0;
//     }
//     100% {
//       background-position-x: 30vw;
//     }
//   }
// `;

export const StyledInput = styled.input`
  font-family: Fredoka;
  width: 100%;
  height: 32%;
  background: none;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 50px;
  padding-left: 1vw;
  font-size: 2.5vmin;
  color: #333333;
  transition: 0.4s;
  &.active {
    /* border-bottom-color: #333333; */
  }
`;

export const ErrorText = styled.div`
  font-family: Fredoka;
  font-size: 1.3vmin;
  color: red;
  margin-top: 3px;
`;

export const StyledLabel = styled.div`
  font-family: Fredoka;
  position: none;
  left: 0;
  top: 50%;
  transform: translateY(180%);

  font-size: 2.3vmin;
  background: white;
  justify-content: start;
  align-items: flex-start;
  width: 10vw;
  color: gray;
  /* padding-left: 1vw; */
  margin-left: 1vw;
  /* margin-top: 1vh; */
  /* margin-bottom: -1.2vh; */
  pointer-events: none;
  padding-left: 0.5vw;
  transition: 0.4s;
  &.active {
    font-size: 1.4vmin;
    transform: translateY(85%) translateX(20%);
    top: -2px;
    width: 6vw;
    border-left: solid 1px grey;
    border-right: solid 1px grey;
  }
`;

export const SubmitBtnWrap = styled.div`
  p {
    color: #aaa;
    text-align: center;
    margin-top: 30px;
  }
  .toggle {
    display: inline-block;
    text-decoration: none;
    font-size: 3vmin;
    font-weight: bold;
    width: 100%;
    text-align: center;
    background: linear-gradient(
      110.64deg,
      #4a9fff 1.5%,
      rgba(88, 172, 240, 0.861458) 25%,
      #b0ff91 70%,
      rgba(88, 172, 240, 0.861458) 85%,
      #4a9fff 90%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 2s linear infinite, boomboom 0.5s alternate infinite;
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
    @keyframes boomboom {
      from {
        transform: translateX(-5%);
      }
      to {
        transform: translateX(5%);
      }
    }
  }
  .toggle-right {
    /* position: absolute; */
    /* right: 5px; */
    text-decoration: none;
    font-size: 3vmin;
    font-weight: bold;
    background: linear-gradient(
      110.64deg,
      #4a9fff 5.65%,
      rgba(88, 172, 240, 0.861458) 45.15%,
      #b0ff91 84.64%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
