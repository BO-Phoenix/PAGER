DROP DATABASE IF EXISTS raversDB;

CREATE DATABASE raversDB;

-- NEEDS EMAIL INPUT FROM FRONT_END
-- Display
CREATE TABLE [IF NOT EXISTS] users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL,
  birthday DATE NOT NULL,
  profile_pic TEXT,
  description TEXT,
  music_tastes INT ARRAY,
  friends_list INT ARRAY,
  invitation_list INT ARRAY
);

-- PROFILE PIC NEEDS DEFAULT PICTURE URL
-- MAYBE FUSING MUSIC WITH USERS AS ARRAY OF STRINGS

CREATE TABLE [IF NOT EXISTS] events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  event_image TEXT NOT NULL,
  event_description TEXT,
  group_ids INT ARRAY,
);

CREATE TABLE [IF NOT EXISTS] groups (
  id SERIAL PRIMARY KEY,
  organizer_name VARCHAR(50) REFERENCES users(user_name),
  group_name VARCHAR(50),
  group_image TEXT,
  vibes VARCHAR(20),
  size VARCHAR(20),
  member_list INT ARRAY,
  pending_request INT ARRAY,
);

CREATE TABLE [IF NOT EXISTS] music (
  id SERIAL PRIMARY KEY,
  genre VARCHAR(20),
);

CREATE TABLE [IF NOT EXISTS] chats (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(50) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  message_body TEXT NOT NULL,
  -- reaction JSON,
  group_id INT REFERENCES groups(id),
);

-- Are event statuses connect to user or groups??

CREATE TABLE [IF NOT EXISTS] users_events (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES groups(id),
  user_id INT  REFERENCES groups(id),
  status INT,
);

CREATE TABLE [IF NOT EXISTS] users_groups (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES groups(id),
  user_id INT REFERENCES users(id),
);

CREATE TABLE [IF NOT EXISTS] events_groups (
  id SERIAL PRIMARY KEY,
  group_id INT REFERENCES groups(id),
  event_id INT REFERENCES events(id),
);

