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
    answer  integer;
begin
    insert into choose_correct_game values (DEFAULT, question, correct_answer, difficulty, length);
    select max(id) into game_id from choose_correct_game;
    foreach answer slice 1 in array answers
        loop
            insert into choose_correct_game_answers values (DEFAULT, answer, game_id);
        end loop;
end;
$$;

-- This function verifies whether the user has a valid session or not
-- returns true if authorized
-- returns false if not authorized or does not exist
create function verify_user(userEmail varchar)
    returns boolean
    language plpgsql
as
$$
declare
    expires_time_in_milliseconds bigint;
begin
    select max(expires)::bigint
    into expires_time_in_milliseconds
    from sessions as ss, users as us where ss.user_id = us.id and us.email = userEmail;

    if expires_time_in_milliseconds is null or expires_time_in_milliseconds <= floor(EXTRACT(epoch FROM now()) * 1000) then
        return false;
    else
        return true;
    end if;
end;
$$;