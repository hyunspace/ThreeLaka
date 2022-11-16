package com.ssafy.laka.domain;

import com.ssafy.laka.domain.enums.State;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "assignment")
public class Assignment {
    @Id
    @GeneratedValue
    @Column(name = "assignment_id")
    private int assignmentId;

    @ManyToOne(targetEntity = Video.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(targetEntity = Guild.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "guild_Id")
    private Guild guild;

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL)
    private List<Alert> alerts;

    // 시작일, 종료일
    private String startDate;
    private String endDate;

}
