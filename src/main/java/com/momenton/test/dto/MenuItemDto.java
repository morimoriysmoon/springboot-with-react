package com.momenton.test.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuItemDto {
    private String name;
    private String icon;
    private String url;
    private Boolean selected;

    @Builder
    public MenuItemDto(String name, String icon, String url, Boolean selected){
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.selected = selected;
    }
}
