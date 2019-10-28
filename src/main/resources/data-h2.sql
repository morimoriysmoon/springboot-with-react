insert into tb_employee (id, version, name) values (150, 0, 'Jamie');

insert into tb_employee (id, version, name, manager_id) values (100, 0, 'Alan', 150);
insert into tb_employee (id, version, name, manager_id) values (220, 0, 'Martin', 100);
insert into tb_employee (id, version, name, manager_id) values (275, 0, 'Alex', 100);

insert into tb_employee (id, version, name, manager_id) values (400, 0, 'Steve', 150);
insert into tb_employee (id, version, name, manager_id) values (190, 0, 'David', 400);


insert into tb_user (id, username, password, version) values (1, 'admin', '$2a$10$49yeVC.NX/ac5v9OVYpr8eXwo.eirbxiso54FN0boWqDrafwxwHNy', 0);
insert into tb_user (id, username, password, version) values (2, 'peter', '$2a$10$49yeVC.NX/ac5v9OVYpr8eXwo.eirbxiso54FN0boWqDrafwxwHNy', 0);
insert into tb_user (id, username, password, version) values (3, 'jessica', '$2a$10$49yeVC.NX/ac5v9OVYpr8eXwo.eirbxiso54FN0boWqDrafwxwHNy', 0);
insert into tb_user (id, username, password, version) values (4, 'chloe', '$2a$10$49yeVC.NX/ac5v9OVYpr8eXwo.eirbxiso54FN0boWqDrafwxwHNy', 0);
insert into tb_user (id, username, password, version) values (5, 'david', '$2a$10$49yeVC.NX/ac5v9OVYpr8eXwo.eirbxiso54FN0boWqDrafwxwHNy', 0);

insert into tb_role (id, name, version) values (1, 'ROLE_ADMIN', 0);
insert into tb_role (id, name, version) values (2, 'ROLE_USER', 0);
insert into tb_role (id, name, version) values (3, 'ROLE_GUEST', 0);

insert into tb_user_roles (users_id, roles_id) values (1, 1);
insert into tb_user_roles (users_id, roles_id) values (1, 2);
insert into tb_user_roles (users_id, roles_id) values (1, 3);
insert into tb_user_roles (users_id, roles_id) values (2, 2);
insert into tb_user_roles (users_id, roles_id) values (3, 2);
insert into tb_user_roles (users_id, roles_id) values (4, 2);
insert into tb_user_roles (users_id, roles_id) values (5, 3);