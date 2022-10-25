import styled from "styled-components";

export const ReadPageBlock = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: row;
  width: 100vw;
  height: 85vh;
  padding: 0vh 5vw 0vh 5vw;  
  /* border: 1px solid black; */
`;

export const YoutubeAndDictContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 80vh;  
  /* border: 1px solid blue; */
`;

export const DictRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 40vw;
  height: 45vh;  
  /* border: 1px solid yellow; */
`;

export const DictInput = styled.input`
  width: 40vw;
  height: 10vh;
  border: black 2px solid;
`

export const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  /* justify-content: center; */
  align-items: center;
  width: 45vw;  
  height: 80vh; 
  /* padding: 4vh 4vw; */
  overflow-y : scroll;
  overflow-x: hidden;
  border: 1px solid green;
`;

export const ScriptItemBox = styled.div`
  min-height: 5vh;
  width: 45vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
`;

export const ScriptTimeStamp = styled.div`
  cursor: pointer;
  min-height: 5vh;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
  &.now-played {
    background-color: #adff45;
  }
  :hover {
    background: linear-gradient(90deg, rgba(74,159,255,1) 0%, rgba(88,172,240,1) 41%, rgba(176,255,145,1) 100%)
  }
`;

export const ScriptText = styled.div`
  min-height: 5vh;
  width: 35vw;
  padding: 0vh 2vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  /* border: 1px solid green; */
`;

export const ButtonRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 5vh;
  border: 1px solid green;
`;

export const ScriptWordSpan = styled.span`
  margin-right: 0.7vmin;
  cursor: pointer;
  :hover {
    background-color: yellow;
  }
  &.word-selected {
    background-color: #adff45;
  }
`