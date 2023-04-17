-- Revert fithub:user_img_path from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "user"
    DROP COLUMN "image_path";

ALTER TABLE "user"
    DROP COLUMN "image_mimetype";

COMMIT;
