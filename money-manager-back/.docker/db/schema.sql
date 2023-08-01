create table activities(
    id varchar(36) not null primary key, 
    description varchar(80) not null, 
    value float not null, 
    type smallint not null, 
    date datetime(6) not null, 
    created_at datetime(6) not null, 
    updated_at datetime(6) not null
);