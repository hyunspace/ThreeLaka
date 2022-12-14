package com.ssafy.laka.dto.guild;

import com.ssafy.laka.domain.Guild;
import com.ssafy.laka.dto.user.UserListResponseDto;
import com.ssafy.laka.dto.user.UserResponseDto;
import com.ssafy.laka.repository.UserRepository;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "GuildResponseDto", description = "멤버 정보 제외한 길드 정보 조회")
public class GuildResponseDto {
    private int guildId;
    private int masterId;
    private String masterNickname;
    private String guildName;
    private String description;
    private String notice;
//    private List<UserListResponseDto> members;

//    guild를 넣어서 GuildResponseDto를 만들어 내는 함수
    public static GuildResponseDto from(Guild entity, String masterNickname){
        return GuildResponseDto.builder()
                .guildId(entity.getId())
                .masterId(entity.getMaster())
                .masterNickname(masterNickname)
                .guildName(entity.getGuildName())
                .description(entity.getDescription())
                .notice(entity.getNotice())
//                .members(entity.getMembers().stream().map(u -> UserListResponseDto.from(u)).collect(Collectors.toList()))
                .build();







    }
}
