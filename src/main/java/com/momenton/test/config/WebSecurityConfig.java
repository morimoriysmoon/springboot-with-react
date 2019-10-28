package com.momenton.test.config;

import com.momenton.test.security.AppLogoutSuccessHandler;
import com.momenton.test.security.AppSessionSuccessHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
        AppSessionSuccessHandler appSessionSuccessHandler = new AppSessionSuccessHandler();
        appSessionSuccessHandler.setDefaultTargetUrl("/main");
        //appSessionSuccessHandler.setTargetUrlParameter("url");
        //appSessionSuccessHandler.setUseReferer(true);
        return appSessionSuccessHandler;
    }

    @Bean
    public LogoutSuccessHandler myLogoutSuccessHandler() {
        AppLogoutSuccessHandler appLogoutSuccessHandler = new AppLogoutSuccessHandler();
        appLogoutSuccessHandler.setTargetUrlParameter("logout"); // TODO : not working
        return appLogoutSuccessHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .authorizeRequests()
                //.antMatchers("/").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/js/**", "/css/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/perform_login")
                .successHandler(myAuthenticationSuccessHandler())
                //.defaultSuccessUrl("/main", true)
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/perform_logout")
                .logoutSuccessHandler(myLogoutSuccessHandler())
                .deleteCookies("JSESSIONID")
                .permitAll();

        http.csrf().disable();
        http.headers().frameOptions().disable();
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }
}
