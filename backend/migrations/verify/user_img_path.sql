-- Verify fithub:user_img_path on pg

BEGIN;

-- XXX Add verifications here.
SELECT "image_path", "image_mimetype" FROM "user" WHERE false;

ROLLBACK;
