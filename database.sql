CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
new_task VARCHAR(150) NOT NULL,
finish_by DATE
);

INSERT INTO tasks (new_task, finish_by)
VALUES ('Finish weekend challenge', '11/21/2016'),
('Do some serious laundry', '11/20/2016'),
('Go grocery shopping', '11/20/2016'),
('Change my socks', '11/19/2016');
