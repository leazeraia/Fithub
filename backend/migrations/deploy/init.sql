-- Deploy fithub:init to pg

BEGIN;

-- XXX Add DDLs here.

CREATE TYPE user_gender AS ENUM ('femme', 'homme', 'non-spécifié');
CREATE TYPE user_profile_visibility AS ENUM ('publique', 'privé');
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- challenge --

CREATE TABLE IF NOT EXISTS challenge (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    nickname TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT DEFAULT NULL UNIQUE,
    login_streak INTEGER DEFAULT 0,
    role user_role DEFAULT 'user',
    email TEXT NOT NULL UNIQUE,
    weight INTEGER NOT NULL,
    age INTEGER NOT NULL,
    gender user_gender DEFAULT 'non-spécifié',
    challenge_id INT REFERENCES challenge(id) ON DELETE CASCADE DEFAULT NULL,
    xp INT DEFAULT 0,
    profile_visibility user_profile_visibility DEFAULT 'publique',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);


CREATE TYPE completed_challenge AS ENUM ('yes', 'no');

CREATE TABLE IF NOT EXISTS challenge_user (
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
    challenge_id INT REFERENCES challenge(id) ON DELETE CASCADE NOT NULL,
    completed completed_challenge DEFAULT 'no',
    date_assigned TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END challenge --

-- activity section --

CREATE TABLE IF NOT EXISTS category_activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code INT NOT NULL UNIQUE,
    label TEXT NOT NULL UNIQUE,
    met FLOAT NOT NULL,
    category_activity_id INT REFERENCES category_activity(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS activity_user (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE NOT NULL,
    activity_id INT REFERENCES activity(id) ON DELETE CASCADE NOT NULL,
    calories INT NOT NULL CHECK (calories > 1),
    duration INT NOT NULL CHECK (duration > 1),
    date_assigned TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM-DD'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL
);

-- END activity section --

COMMIT;
