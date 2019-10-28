package com.momenton.test.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MenuDto {
    private String username;
    private List<MenuItemDto> items;

    @Builder
    public MenuDto(String username, List<MenuItemDto> items) {
        this.username = username;
        this.items = items;
    }
}
