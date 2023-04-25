-- This file includes all types of PostgresSQL tables used in the project
-- If you wanted to create appropriate database for this application, you need to go on NextAuth.js website and download all required tables for authentication.

-- Table for saving game id and a name of the particular game
create table games
(
    id bigserial primary key,
    name varchar not null unique
);

-- ChooseCorrectAnswer game tables
create table choose_correct_game
(
    id             bigserial primary key,
    question       varchar not null unique,
    correct_answer integer not null,
    difficulty     integer not null check ( difficulty > 0 ),
    length         integer not null check ( length >= 2 )
);
create table choose_correct_game_answers
(
    id                     bigserial primary key,
    answer                 integer not null,
    choose_correct_game_id integer not null references choose_correct_game
);

-- Table to save where user ended with their practice
create table user_game_info
(
    id bigserial primary key,
    difficulty integer not null check ( difficulty >= 1 and difficulty <= 5 ),
    length integer,
    last_game_id integer not null check ( last_game_id >= 0 ),
    user_id uuid references users,
    game_id integer references games
);

-- Pexeso, TrueFalse, CardFlipper game table
create table equal_pairs
(
    id bigserial primary key,
    difficulty integer not null check ( difficulty >= 1 and difficulty <= 4 ),
    key varchar not null,
    value varchar not null,

    constraint unique_equal_pair unique ( key, value )
);

-- Sorter game tables
create table sorter_games
(
    id bigserial primary key,
    difficulty integer not null check ( difficulty >= 1 and difficulty <= 4 ),
    size integer not null check ( size >= 3 and size <= 100)
);

create table sorter_game_items
(
    id bigserial primary key,
    item varchar not null,
    sorter_game_id bigint not null references sorter_games
);

-- Score tables
create table user_score
(
  id bigserial primary key,
  incorrect integer not null,
  correct integer not null,
  game_id bigint not null references games,
  user_id uuid not null references users
);