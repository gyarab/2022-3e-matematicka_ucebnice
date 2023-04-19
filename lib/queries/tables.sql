-- This file includes all types of PostgresSQL tables used in the project


-- If you wanted to create appropriate database for this application, you need to go on NextAuth.js website and download all required tables for authentication.

-- Choose correct answer game tables
create table choose_correct_game
(
    id             serial primary key,
    question       varchar not null unique,
    correct_answer integer not null,
    difficulty     integer not null check ( difficulty > 0 ),
    length         integer not null check ( length >= 2 )
);

create table choose_correct_game_answers
(
    id                     serial primary key,
    answer                 integer not null,
    choose_correct_game_id integer not null references choose_correct_game
);

--