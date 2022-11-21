import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import useModal from '../../../utils/useModal';

import VideoDataModal from '../../Main/components/VideoDataModal';
import { videoActions } from '../../../features/video/video-slice';

// style
import {
  VideoCardBlock,
  VideoDataBox,
  VideoImg,
  SubTagContainer,
  SubTag,
  VideoTitle,
} from '../../../styles/Main/MainStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { url } from 'inspector';

// video별 갖고 있는 정보들
type VideoCardProps = {
  data: {
    title: string;
    videoId: string;
    continueTime: string;
    stage: string;
  };
};

const DashboardVideoCard = ({ data }: VideoCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState<string>('');

  // 모달에 띄워줄 비디오 정보
  const videoData = useAppSelector((state) => state.video.videoData);
  // 영상 정보 조회
  const learningRecord = useAppSelector(
    (state) => state.video.recentVideoData.learningRecord
  );
  const handlerGetVideoData = (videoId: string) => {
    const videoUrl = `https://youtu.be/${videoId}`;
    dispatch(videoActions.getVideoData(videoUrl));
  };

  // 모달 사용하기
  const { isOpenModal, onClickModal } = useModal();

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);
  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (studyState.stage !== '') {
      navigate(
        `/study/reading/${studyState.learningRecordId}/${studyState.stage}/${studyState.videoId}`
      );
    }
  }, [studyState]);

  //모달보수공사
  const [isOpen, setIsOpen] = useState(false);
  const openModalVideo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '2vw',
        }}
      >
        <FlexTransparentDiv
          onClick={() => {
            handlerGetVideoData(data.videoId);
            openModalVideo();
          }}
          widthSize={'16vw'}
          heightSize={'20vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            borderTop: '10px solid black',
            borderBottom: '10px solid black',
            borderRadius: '10px',
            background: 'black',

            position: 'relative',
            minWidth: '16vw',
          }}
        >
          <VideoImg
            style={{
              width: '15vw',
              height: '18vh',
            }}
            src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`}
          />

          <FlexTransparentDiv
            widthSize={'4vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ position: 'absolute', top: '-1vh', right: '0.3vw' }}
          >
            <SubTag>ENG</SubTag>
          </FlexTransparentDiv>
          {/* {data.korScript && <SubTag>한글</SubTag>} */}
        </FlexTransparentDiv>
        <VideoTitle
          style={{
            width: '16vw',
            fontSize: '2vmin',
            padding: '0',
            height: 'auto',
            // marginLeft: '1vw',
          }}
        >
          {data.title}
        </VideoTitle>
      </div>
      {isOpen ? (
        <VideoDataModal
          isOpenModal={isOpenModal}
          toggle={onClickModal}
          videoData={videoData}
          learningRecord={learningRecord}
          //모달보수
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </>
  );
};

export default DashboardVideoCard;
