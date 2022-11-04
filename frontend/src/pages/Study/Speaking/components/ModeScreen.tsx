import React from 'react';
import { useLocation } from 'react-router-dom';
import WebCam from '../components/WebCam';
import VoiceRecorder from '../components/VoiceRecorder';
import SpeechTest from '../components/SpeechTest';
//style
import { MainPaleBox } from '../../../../styles/Common/CommonDivStyle';

const ModeScreen = () => {
  const modeCode = useLocation().search.replace('?mode=', '');

  if (modeCode == 'test') {
    return (
      <MainPaleBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
      >
        <SpeechTest />
      </MainPaleBox>
    );
  } else if (modeCode == 'video') {
    return (
      <MainPaleBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <WebCam />
      </MainPaleBox>
    );
  } else if (modeCode === 'audio') {
    return (
      <MainPaleBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VoiceRecorder />
      </MainPaleBox>
    );
  } else {
    return (
      <MainPaleBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
      ></MainPaleBox>
    );
  }
};

export default ModeScreen;