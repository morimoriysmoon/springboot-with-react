package com.momenton.test.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "tb_employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Version
    @Column(name = "version")
    private Integer version;

    private String name;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Builder
    public Employee(String name, Employee manager) {
        this.name = name;
        this.manager = manager;
    }
}
