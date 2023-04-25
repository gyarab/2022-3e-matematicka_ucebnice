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

-- This function sets equal pair into equal_pairs table
create function set_equal_pair(
    _difficulty integer,
    _key varchar,
    _value varchar
)
    returns void
    language plpgsql
as
$$
declare
begin
    insert into equal_pairs values (DEFAULT, _difficulty, _key, _value);
end;
$$;

-- This function inserts new equal pair into the 'equal_pairs' table
create function get_equal_pairs(
    _difficulty integer,
    _size integer,
    _email varchar,
    _game_id integer
)
    returns varchar[][]
    language plpgsql
as
$$
declare
    _last_game_id    integer;
    _number_of_pairs integer;
    _user_id         uuid := (select id
                              from users
                              where email = _email);
    _game_stage      varchar[][];
begin
    -- get last game number
    select last_game_id
    into _last_game_id
    from user_game_info as ugi,
         users as u
    where ugi.user_id = u.id
      and u.email = _email
      and ugi.difficulty = _difficulty
      and ugi.game_id = _game_id;

    -- get number of stage records for particular type of the game
    select count(key)
    into _number_of_pairs
    from (select distinct on (key) key
          from (select key from equal_pairs where difficulty = _difficulty offset _last_game_id) as t1
          order by key) as t2;

    -- if user wants this game at first or user had already requested all stages then reset last_game_id
    if (_last_game_id is null) then
        insert into user_game_info
        values (DEFAULT, _difficulty, null, 0, _user_id, _game_id);
        _last_game_id := 0;
    elseif (_last_game_id + _size >= _number_of_pairs) then
        update user_game_info as ugi
        set last_game_id = 0
        where difficulty = _difficulty
          and game_id = _game_id
          and user_id = _user_id;
        _last_game_id := 0;
    end if;

    -- get game stage based on difficulty, length and last_game_id
    _game_stage := (ARRAY(select (key::varchar, value)
                          from (select distinct on (key) key, value, id
                                from (select key, value, id
                                      from equal_pairs
                                      where difficulty = _difficulty
                                      offset _last_game_id) as t1
                                order by key) t2
                          order by t2.id
                          limit _size));

    -- update last_game_id for current type of the game
    update user_game_info as ugi
    set last_game_id = (_last_game_id + _size)
    where difficulty = _difficulty
      and game_id = _game_id
      and user_id = _user_id;

    return _game_stage;
end;
$$;

-- This function provides insertion sorter game into the database
create function set_sorter_game(
    _difficulty integer,
    _size integer,
    _items character varying[]
)
    returns void
    language plpgsql
as
$$
declare
    _max_id bigint;
    _item   varchar;
begin
    insert into sorter_games values (DEFAULT, _difficulty, _size);
    select max(id) into _max_id from sorter_games;
    foreach _item in array _items
        loop
            insert into sorter_game_items values (DEFAULT, _item, _max_id);
        end loop;
end;
$$;

-- This function withdraws items for SorterGame from the database
create function get_sorter_game(
    _difficulty integer,
    _size integer,
    _email varchar
)
    returns varchar[]
    language plpgsql
as
$$
declare
    _game_id         integer := 5;
    _last_game_id    integer;
    _number_of_pairs integer;
    _user_id         uuid    := (select id
                                 from users
                                 where email = _email);
    _game_stage      varchar[];
begin
    -- get last game number
    select last_game_id
    into _last_game_id
    from user_game_info as ugi,
         users as u
    where ugi.user_id = u.id
      and u.email = _email
      and ugi.difficulty = _difficulty
      and ugi.game_id = _game_id;

    -- get number of stage records for particular type of the game
    select count(id)
    into _number_of_pairs
    from sorter_games
    where difficulty = _difficulty
      and size = _size;

    -- if user wants this game at first or user had already requested all stages then reset last_game_id
    if (_last_game_id is null) then
        insert into user_game_info
        values (DEFAULT, _difficulty, null, 0, _user_id, _game_id);
        _last_game_id := 0;
    elseif (_last_game_id + 1 >= _number_of_pairs) then
        update user_game_info as ugi
        set last_game_id = 0
        where difficulty = _difficulty
          and game_id = _game_id
          and user_id = _user_id;
        _last_game_id := 0;
    end if;

    -- get game stage based on difficulty, size and last_game_id
    _game_stage := ARRAY((select item
                          from sorter_game_items,
                               (select id
                                from sorter_games
                                where difficulty = _difficulty
                                  and size = _size
                                limit 1 offset _last_game_id) as sg
                          where sorter_game_id = sg.id));

    -- update last_game_id for current type of the game
    update user_game_info as ugi
    set last_game_id = _last_game_id + 1
    where difficulty = _difficulty
      and game_id = _game_id
      and user_id = _user_id;

    return _game_stage;
end;
$$;

-- This function provides insertion of users' scores into the database
create function set_user_score(
    _incorrect integer,
    _correct integer,
    _email varchar,
    _game_id integer
)
    returns void
    language plpgsql
as
$$
declare
    _user_id  uuid   := (select id
                         from users
                         where email = _email);
    _score_id bigint := (select id
                         from user_score
                         where user_id = _user_id
                           and game_id = _game_id);
begin
    if _score_id is null then
        insert into user_score
        values (DEFAULT, _incorrect, _correct, _game_id, _user_id);
        return;
    end if;

    update user_score
    set correct   = correct + _correct,
        incorrect = incorrect + _incorrect
    where user_id = _user_id
      and game_id = _game_id;
end;
$$;
