create database nest_test;
\c nest_test;

create table users_tbl(
    id serial primary key,
    name char(50),
    age int,
    gender char(10),
    phonenumber char(12) unique
);
