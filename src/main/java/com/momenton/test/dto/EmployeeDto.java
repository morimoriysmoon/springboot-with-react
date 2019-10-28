package com.momenton.test.dto;

import com.momenton.test.domain.Employee;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EmployeeDto {
    private Long id;
    private String name;
    private Long managerId;

    @Setter
    private List<EmployeeDto> members = new ArrayList<>();

    public EmployeeDto(Employee entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.managerId = (entity.getManager() != null ? entity.getManager().getId() : null);
    }
}
