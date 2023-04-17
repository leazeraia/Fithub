-- Verify fithub:init on pg

BEGIN;

SELECT * FROM user WHERE false;
SELECT * FROM challenge WHERE false;
SELECT * FROM challenge_user WHERE false;
SELECT * FROM category_activity WHERE false;
SELECT * FROM activity WHERE false;
SELECT * FROM activity_user WHERE false;

ROLLBACK;
