-- Deploy fithub:user_img_path to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "user"
    ADD COLUMN "image_path" TEXT DEFAULT NULL;

ALTER TABLE "user"
    ADD COLUMN "image_mimetype" TEXT DEFAULT NULL;


COMMIT;
