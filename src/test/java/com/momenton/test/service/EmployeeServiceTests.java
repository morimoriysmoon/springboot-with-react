package com.momenton.test.service;

import com.momenton.test.domain.Employee;
import com.momenton.test.dto.EmployeeDto;
import com.momenton.test.repository.EmployeeRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeServiceTests {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @After
    public void cleanup() {
        employeeRepository.deleteAll();
    }

    @Test
    public void TEST_populate_all_employees() {
        //CEO
        Employee jamie = Employee.builder().name("Jamie").build();
        employeeRepository.save(jamie);

        // Alan
        Employee alan = Employee.builder().name("Alan").manager(jamie).build();
        employeeRepository.save(alan);

        Employee martin = Employee.builder().name("Martin").manager(alan).build();
        employeeRepository.save(martin);

        Employee alex = Employee.builder().name("Alex").manager(alan).build();
        employeeRepository.save(alex);

        // Steve
        Employee steve = Employee.builder().name("Steve").manager(jamie).build();
        employeeRepository.save(steve);

        Employee david = Employee.builder().name("David").manager(steve).build();
        employeeRepository.save(david);

        EmployeeDto CEO = employeeService.populateMembersOfCeo();
        assertThat(CEO.getName(), is("Jamie"));

        List<EmployeeDto> managers = CEO.getMembers();

        assertThat(managers.get(0).getName(), is("Alan"));
        assertThat(managers.get(0).getMembers().get(0).getName(), is("Alex"));
        assertThat(managers.get(0).getMembers().get(1).getName(), is("Martin"));

        assertThat(managers.get(1).getName(), is("Steve"));
        assertThat(managers.get(1).getMembers().get(0).getName(), is("David"));
    }
}
