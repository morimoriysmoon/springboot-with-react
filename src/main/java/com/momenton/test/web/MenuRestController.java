package com.momenton.test.web;

import com.momenton.test.dto.MenuDto;
import com.momenton.test.dto.MenuItemDto;
import com.momenton.test.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MenuRestController {

    private final SecurityService securityService;

    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    public MenuDto getMenu() {

        // 사용자에 따라 다른 메뉴를 전달한다.
        List<MenuItemDto> items = new ArrayList<>();

        items.add(MenuItemDto.builder().name("Timer").icon("timer").url("/react-apps/timer").selected(true).build());
        items.add(MenuItemDto.builder().name("Calculator").icon("calculator").url("/react-apps/calculator").selected(false).build());
        items.add(MenuItemDto.builder().name("Timer").icon("timer").url("/react-apps/timer").selected(false).build());
        items.add(MenuItemDto.builder().name("Calculator").icon("calculator").url("/react-apps/calculator").selected(false).build());
        items.add(MenuItemDto.builder().name("Timer").icon("timer").url("/react-apps/timer").selected(false).build());
        items.add(MenuItemDto.builder().name("Calculator").icon("calculator").url("/react-apps/calculator").selected(false).build());

        MenuDto menu = MenuDto.builder().username(securityService.findLoggedInUsername()).items(items).build();

        return menu;
    }
}
