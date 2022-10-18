package com.ssafy.laka.dto.exception.dashboard;


import com.ssafy.laka.dto.exception.CustomException;
import com.ssafy.laka.dto.exception.ErrorCode;

public class VideoNotFoundException extends CustomException {
    public VideoNotFoundException(){
        super(ErrorCode.VIDEO_NOT_FOUND);
    }
}
