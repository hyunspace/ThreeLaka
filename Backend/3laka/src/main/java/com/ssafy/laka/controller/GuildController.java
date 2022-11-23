package com.ssafy.laka.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.dto.exception.common.InvalidParameterException;
import com.ssafy.laka.dto.exception.guild.RequestListEmptyException;
import com.ssafy.laka.dto.guild.*;
import com.ssafy.laka.service.GuildService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/guild")
public class GuildController {
    private final GuildService guildService;
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @PostMapping("/")
    @ApiOperation(value = "길드 생성")
    public ResponseEntity<GuildResponseDto> createGuild(@RequestPart String title,
                                                        @RequestPart String description,
                                                        @RequestPart(required = false) MultipartFile file,
                                                        BindingResult result){
        if(result.hasErrors()){
            throw new InvalidParameterException(result);
        }
        GuildCreateDto guildCreateDto = new GuildCreateDto(title, description);
        GuildResponseDto guild = guildService.createGuild(guildCreateDto);
        if (file.isEmpty()) {
            return new ResponseEntity<>(guild, HttpStatus.OK);
        }
        Date today = new Date();
        System.out.println(1);
        SimpleDateFormat sdf = new SimpleDateFormat( "_yyyyMMddHHmmss");
        String suffix = sdf.format(today);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        System.out.println(2);
        try(InputStream inputStream = file.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucketName, guild.getGuildId() + suffix, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            System.out.println(3);
            Guild guild1 = guildService.updateProfile(guild.getGuildId(), guild.getGuildId() + suffix);
            return new ResponseEntity<>(GuildResponseDto.from(guild1, guild.getMasterNickname()), HttpStatus.OK);
        } catch (IOException e){
            throw new RuntimeException("이미지 업로드 실패");
        }
    }

    @PostMapping("/request")
    @ApiOperation(value = "길드 가입 요청")
    public ResponseEntity<String> joinGuild(@RequestBody int guildId){
        guildService.joinGuild(guildId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/members/{guildId}")
    @ApiOperation(value = "길드의 멤버들 정보 조회")
    public ResponseEntity<MemberResponseDto> searchMembers(@PathVariable @RequestBody int guildId){
        return new ResponseEntity<>(guildService.searchMembers(guildId), HttpStatus.OK);
    }

    @GetMapping("/search/{guildId}")
    @ApiOperation(value = "멤버 정보 제외한 길드 정보 조회")
    public ResponseEntity<GuildResponseDto> searchGuild(@PathVariable @RequestBody int guildId){
        return new ResponseEntity<>(guildService.searchGuild(guildId), HttpStatus.OK);
    }

    @DeleteMapping("/quit/")
    @ApiOperation(value = "내가 가입한 길드 탈퇴")
    public ResponseEntity<String> quitGuild(){
        guildService.quitGuild();
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/notice/{guildId}")
    @ApiOperation(value = "길드 멤버의 길드 공지 조회")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable int guildId){
        return new ResponseEntity<>(guildService.getNotice(guildId), HttpStatus.OK);
    }

    // 여기서부터 전부 반환값 협의 필요 =====================================================================================
    @GetMapping("/ranking")
    @ApiOperation(value = "상위 랭킹 길드 조회")
    public ResponseEntity<List<GuildWithTimeInterface>> getRankGuild(){
        return new ResponseEntity<>(guildService.getRankGuild(), HttpStatus.OK);
    }

    @GetMapping("/request")
    @ApiOperation(value = "나의 길드 요청 목록 조회")
    public ResponseEntity<List<GuildRequestDto>> getMyRequests(){
        // 로그인한 유저가 가입 요청한 길드의 리스트 조회
        return new ResponseEntity<>(guildService.getMyRequests(), HttpStatus.OK);
    }

    @GetMapping("/search")
    @ApiOperation(value = "조건에 맞는 길드 검색")
    public ResponseEntity<?> searchGuild(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer yoil,
            @RequestParam(required = false) Integer startTime,
            @RequestParam(required = false) Integer time){
        // 키워드, 요일, 시작시각, 시간 등의 조건을 받아 해당 조건을 만족하는 길드 리스트 조회
        return new ResponseEntity<>(guildService.searchGuilds(new GuildSearchDto(keyword, yoil, startTime, time)), HttpStatus.OK);
    }

    @GetMapping("/assignment/{status}")
    @ApiOperation(value = "공통 과제 목록 조회")
    public ResponseEntity<List<AssignmentResponseDto>> getAssignments(@PathVariable int status){
        // 예정(0) / 진행중(1) / 완료된(2) 공통 과제 조회
        return new ResponseEntity<>(guildService.getAssignments(status), HttpStatus.OK);
    }

    // 수정 필요 ========================================================================================================
    @GetMapping("/{assignment_id}/progress")
    @ApiOperation(value = "해당 공통과제의 모든 길드원 진행도 조회")
    public ResponseEntity<List<ProgressInterface>> getProgress(@PathVariable int assignment_id){
        // 해당 공통과제의 모든 길드원 진행도 조회 (반환값 형식에 길드원의 일부 유저정보 필요)
        return new ResponseEntity<>(guildService.getProgress(assignment_id), HttpStatus.OK);
    }

    // 수정 필요 ========================================================================================================
    @GetMapping("/{assignment_id}/essay")
    @ApiOperation(value = "해당 공통과제의 모든 길드원 에세이 조회")
    public ResponseEntity<?> getEssay(@PathVariable int assignment_id){
        // 해당 공통과제의 모든 길드원 에세이 조회 (반환값 형식에 길드원의 일부 유저정보 필요)
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/activity")
    @ApiOperation(value = "길드 활동량 순 정렬 조회")
    public ResponseEntity<List<GuildOrderResponseDto>> getGuildOrderActivity(){
        return new ResponseEntity<>(guildService.getGuildOrderActivity(), HttpStatus.OK);
    }

    @GetMapping("/name")
    @ApiOperation(value = "길드 이름 순 정렬 조회")
    public ResponseEntity<List<GuildOrderResponseDto>> getGuildOrderName(){
        return new ResponseEntity<>(guildService.getGuildOrderName(), HttpStatus.OK);
    }

    @GetMapping("/size")
    @ApiOperation(value = "길드 인원 순 정렬 조회")
    public ResponseEntity<List<GuildOrderResponseDto>> getGuildOrderSize(){
        return new ResponseEntity<>(guildService.getGuildOrderSize(), HttpStatus.OK);
    }

    @GetMapping("/{guild_id}/member")
    @ApiOperation(value = "길드원 학습량순 조회")
    public ResponseEntity<List<GoodMemberInterface>> getGoodMembers(@PathVariable int guild_id){
        return new ResponseEntity<>(guildService.getGoodMembers(guild_id), HttpStatus.OK);
    }

    @GetMapping("/{video_id}/essay/list")
    @ApiOperation(value = "유저의 특정 비디오 에세이 목록 조회")
    public ResponseEntity<List<EssayDto>> getEssayForVideo(@PathVariable String video_id){
        return new ResponseEntity<>(guildService.getEssayForVideo(video_id), HttpStatus.OK);
    }

    // 길드 마스터 권한 한정 기능 ==========================================================================================

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @DeleteMapping("/")
    @ApiOperation(value = "내가 마스터인 길드 삭제")
    public ResponseEntity<String> deleteGuild(){
        guildService.deleteGuild();
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @GetMapping("/requests")
    @ApiOperation(value = "내가 마스터인 길드 가입 요청 조회")
    public ResponseEntity <List<JoinRequestDto>> getJoinReqList() {
        List<JoinRequestDto> reqList = guildService.getJoinReqList();
        if (reqList.size() < 1) {
            throw new RequestListEmptyException();
        }
        return new ResponseEntity<>(reqList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PutMapping("/accept")
    @ApiOperation(value = "길드 가입 요청 수락")
    public ResponseEntity<String> acceptGuild(@RequestBody int requestId){
        guildService.acceptGuild(requestId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @DeleteMapping("/reject")
    @ApiOperation(value = "길드 가입 요청 거절")
    public ResponseEntity<String> rejectGuild(@RequestBody int requestId){
        guildService.rejectGuild(requestId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PutMapping("/user/guild")
    @ApiOperation(value = "내가 마스터인 길드 정보 수정")
    public ResponseEntity<String> updateGuild(String description){
        guildService.setDescription(description);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @DeleteMapping("/remove/{userId}")
    @ApiOperation(value = "마스터의 멤버 추방")
    public ResponseEntity<String> deleteMember(@PathVariable int userId){
        guildService.deleteMember(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PostMapping("/notice")
    @ApiOperation(value = "내가 마스터인 길드 공지 생성")
    public ResponseEntity<NoticeResponseDto> createNotice(@RequestBody String notice){
        return new ResponseEntity<>(guildService.createNotice(notice), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @DeleteMapping("/notice")
    @ApiOperation(value = "길드 마스터의 길드 공지 삭제")
    public ResponseEntity<String> deleteNotice(){
        guildService.deleteNotice();
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PutMapping("/notice")
    @ApiOperation(value = "길드 마스터의 길드 공지 수정")
    public ResponseEntity<NoticeResponseDto> updateNotice(String notice){
        return new ResponseEntity<>(guildService.updateNotice(notice), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PostMapping("/master/{userId}")
    @ApiOperation(value = "길드 마스터 변경")
    public ResponseEntity<String> changeMaster(@PathVariable int userId){
        guildService.changeMaster(userId);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PostMapping("/assignment")
    @ApiOperation(value = "공통 과제 생성")
    public ResponseEntity<String> createAssignment(@RequestBody AssignmentRequestDto info){
        // 공통 과제를 생성
        return new ResponseEntity<>(guildService.createAssignment(info), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PutMapping("/assignment")
    @ApiOperation(value = "공통 과제 수정")
    public ResponseEntity<String> updateAssignment(@RequestBody AssignmentUpdateRequestDto info){
        // 공통 과제 수정
        return new ResponseEntity<>(guildService.updateAssignment(info), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @DeleteMapping("/assignment/{assignment_id}")
    @ApiOperation(value = "공통 과제 삭제")
    public ResponseEntity<String> deleteAssignment(@PathVariable int assignment_id){
        // 공통 과제 삭제
        return new ResponseEntity<>(guildService.deleteAssignment(assignment_id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_GUILD_MASTER')")
    @PutMapping("/profile/{guild_id}")
    @ApiOperation(value = "프로필 사진 수정", notes = "길드의 프로필 사진을 수정한다")
    public ResponseEntity<String> changeProfile(@PathVariable int guild_id, @RequestPart MultipartFile file) {
        // 프로필 사진 수정
        if(file.isEmpty()){
            throw new RuntimeException("이미지가 없습니다.");
        }
        Date today = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat( "_yyyyMMddHHmmss");
        String suffix = sdf.format(today);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        try(InputStream inputStream = file.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucketName, "guild" + guild_id + suffix, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            guildService.updateProfile(guild_id, guild_id + suffix);
        } catch (IOException e){
            throw new RuntimeException("이미지 업로드 실패");
        }
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    
}
