-- Verify fithub:init on pg

BEGIN;

SELECT * FROM user WHERE false;
SELECT * FROM challenge WHERE false;
SELECT * FROM challenge_user WHERE false;
SELECT * FROM company WHERE false;
SELECT * FROM category_product WHERE false;
SELECT * FROM product WHERE false;
SELECT * FROM comment_product WHERE false;
SELECT * FROM comment_product_user WHERE false;
SELECT * FROM bought_product_user WHERE false;
SELECT * FROM category_activity WHERE false;
SELECT * FROM activity WHERE false;
SELECT * FROM activity_user WHERE false;
SELECT * FROM category_article WHERE false;
SELECT * FROM article WHERE false;
SELECT * FROM liked_article_user WHERE false;
SELECT * FROM comment_article WHERE false;
SELECT * FROM comment_article_user WHERE false;

ROLLBACK;
