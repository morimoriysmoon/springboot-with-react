package com.momenton.test.domain;

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
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeRepositoryTests {

    @Autowired
    private EmployeeRepository employeeRepository;

    @After
    public void cleanup() {
        employeeRepository.deleteAll();
    }

    @Test
    public void TEST_save_entity() {
        employeeRepository.save(Employee.builder().name("Foobar").build());
        Employee item = employeeRepository.findEmployeeByName("Foobar");
        assertTrue(item != null);
        assertThat(item.getName(), is("Foobar"));
    }

    @Test
    public void TEST_find_employees_of_manager() {

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

        // Test
        List<Employee> managers = employeeRepository.findMembersByManager(jamie.getId());
        assertThat(managers.get(0).getName(), is("Alan"));
        assertThat(managers.get(1).getName(), is("Steve"));

        List<Employee> alanMembers = employeeRepository.findMembersByManager(alan.getId());
        assertThat(alanMembers.get(0).getName(), is("Alex"));
        assertThat(alanMembers.get(1).getName(), is("Martin"));
    }
}
