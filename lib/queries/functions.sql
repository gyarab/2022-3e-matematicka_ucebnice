-- This file includes all types of PostgresSQL functions used in the project

-- This function inserts data for ChooseCorrectAnswer game based on parameters
create function set_choose_correct_game(
    question varchar,
    correct_answer integer,
    difficulty integer,
    length integer,
    answers integer[]
)
    returns void
    language plpgsql
as
$$
declare
    game_id integer;
    i       integer := 1;
begin
    insert into choose_correct_game values (DEFAULT, question, correct_answer, difficulty, length);
    select max(id) into game_id from choose_correct_game;
    loop
        insert into choose_correct_game_answers values (DEFAULT, (answers[i]), game_id);
        i := i + 1;
        exit when i = array_length(answers, 1) + 1;
    end loop;
end;
$$;