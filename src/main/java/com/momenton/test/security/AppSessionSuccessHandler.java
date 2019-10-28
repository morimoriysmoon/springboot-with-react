package com.momenton.test.security;

import com.momenton.test.domain.User;
import com.momenton.test.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Slf4j
@Transactional(readOnly = true)
public class AppSessionSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        if (authentication != null && authentication.isAuthenticated()) {

            HttpSession session = request.getSession();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            log.info(String.format("[%s] logged", userDetails.getUsername()));
            for (GrantedAuthority authority : userDetails.getAuthorities()) {
                log.info(String.format("[%s] granted", authority.getAuthority()));
            }

            /**
             * 사용자에 따라 다른 landing page를 주고 싶다면 여기에서 처리하자.
             * 인증에 성공하였으니 필요한 항목을 session에 추가할 수 있다.
             */

            User currentUser = userService.findByUsername(userDetails.getUsername());
            log.info(String.format("[%d]", currentUser.getId()));

            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
