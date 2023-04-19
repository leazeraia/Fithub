-- Revert fithub:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS activity_user,
activity,
category_activity,
challenge_user,
challenge,
"user";

DROP TYPE IF EXISTS completed_challenge,
user_role,
user_profile_visibility,
user_gender;

COMMIT;
