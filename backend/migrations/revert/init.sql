-- Revert fithub:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS comment_article,
liked_article_user,
assigned_category_article,
article,
category_article,
activity_user,
activity,
category_activity,
--bought_product_user,
--comment_product_user,
--comment_product,
product,
category_product,
company,
challenge_user,
challenge,
"user";

DROP TYPE IF EXISTS user_role,
product_availability,
user_profile_visibility,
user_gender,
completed_challenge;

COMMIT;
