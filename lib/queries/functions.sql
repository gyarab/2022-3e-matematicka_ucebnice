-- This file includes all types of PostgresSQL functions used in the project

-- This function inserts data for ChooseCorrectAnswer game based on parameters
create function set_choose_correct_game(
    _question varchar,
    _correct_answer integer,
    _difficulty integer,
    _length integer,
    _answers integer[]
)
    returns void
    language plpgsql
as
$$
declare
    _answer integer;
    _max_id integer;
begin
    insert into choose_correct_game values (DEFAULT, _question, _correct_answer, _difficulty, _length);

    select max(id) into _max_id from choose_correct_game;
    foreach _answer in array _answers
        loop
            insert into choose_correct_game_answers values (DEFAULT, _answer, _max_id);
        end loop;
end;
$$;

-- This function selects all needed properties to render ChooseCorrectAnswerGame and returns them as a record
create function get_choose_correct_stage(
    _difficulty integer,
    _length integer,
    _email varchar
)
    returns record
    language plpgsql
as
$$
declare
    _game_id          integer := 1;
    _last_game_id     integer;
    _number_of_stages integer;
    _game_stage       record;
    _user_id          uuid    := (select id
                                  from users
                                  where email = _email);
begin
    -- get last game number
    select last_game_id
    into _last_game_id
    from user_game_info as ugi,
         users as u
    where ugi.user_id = u.id
      and u.email = _email
      and ugi.difficulty = _difficulty
      and ugi.length = _length
      and ugi.game_id = _game_id;

    -- get number of stage records for particular type of the game
    select count(id)
    into _number_of_stages
    from choose_correct_game
    where difficulty = _difficulty
      and length = _length;

    -- if user wants this game at first or user had already requested all stages then reset last_game_id
    if (_last_game_id is null) then
        insert into user_game_info
        values (DEFAULT, _difficulty, _length, 0, _user_id, _game_id);
        _last_game_id := 0;
    elseif (_last_game_id >= _number_of_stages) then
        update user_game_info as ugi
        set last_game_id = 0
        where difficulty = _difficulty
          and length = _length
          and game_id = _game_id
          and user_id = _user_id;
        _last_game_id := 0;
    end if;

    -- get game stage based on difficulty, length and last_game_id
    select question,
           correct_answer,
           ARRAY(select answer from choose_correct_game_answers as cga where cga.choose_correct_game_id = ccg.id)
    into _game_stage
    from choose_correct_game as ccg
    where ccg.difficulty = _difficulty
      and ccg.length = _length
    order by ccg.id
    limit 1 offset _last_game_id;

    -- update last_game_id for current type of the game
    update user_game_info as ugi
    set last_game_id = _last_game_id + 1
    where difficulty = _difficulty
      and length = _length
      and game_id = _game_id
      and user_id = _user_id;

    return _game_stage;
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
    from sessions as ss,
         users as us
    where ss.user_id = us.id
      and us.email = userEmail;

    if expires_time_in_milliseconds is null or
       expires_time_in_milliseconds <= floor(EXTRACT(epoch FROM now()) * 1000) then
        return false;
    else
        return true;
    end if;
end;
$$;