--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: completed_challenge; Type: TYPE; Schema: public; Owner: spedata
--

CREATE TYPE public.completed_challenge AS ENUM (
    'yes',
    'no'
);


ALTER TYPE public.completed_challenge OWNER TO spedata;

--
-- Name: user_gender; Type: TYPE; Schema: public; Owner: spedata
--

CREATE TYPE public.user_gender AS ENUM (
    'femme',
    'homme',
    'non-spécifié'
);


ALTER TYPE public.user_gender OWNER TO spedata;

--
-- Name: user_profile_visibility; Type: TYPE; Schema: public; Owner: spedata
--

CREATE TYPE public.user_profile_visibility AS ENUM (
    'publique',
    'privé'
);


ALTER TYPE public.user_profile_visibility OWNER TO spedata;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: spedata
--

CREATE TYPE public.user_role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.user_role OWNER TO spedata;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public.activity (
    id integer NOT NULL,
    code integer NOT NULL,
    label text NOT NULL,
    met double precision NOT NULL,
    category_activity_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.activity OWNER TO spedata;

--
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: spedata
--

ALTER TABLE public.activity ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: activity_user; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public.activity_user (
    id integer NOT NULL,
    user_id integer NOT NULL,
    activity_id integer NOT NULL,
    calories integer NOT NULL,
    duration integer NOT NULL,
    date_assigned text DEFAULT to_char(now(), 'YYYY-MM-DD'::text),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    CONSTRAINT activity_user_calories_check CHECK ((calories > 1)),
    CONSTRAINT activity_user_duration_check CHECK ((duration > 1))
);


ALTER TABLE public.activity_user OWNER TO spedata;

--
-- Name: activity_user_id_seq; Type: SEQUENCE; Schema: public; Owner: spedata
--

ALTER TABLE public.activity_user ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.activity_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: category_activity; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public.category_activity (
    id integer NOT NULL,
    label text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.category_activity OWNER TO spedata;

--
-- Name: category_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: spedata
--

ALTER TABLE public.category_activity ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: challenge; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public.challenge (
    id integer NOT NULL,
    label text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.challenge OWNER TO spedata;

--
-- Name: challenge_id_seq; Type: SEQUENCE; Schema: public; Owner: spedata
--

ALTER TABLE public.challenge ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.challenge_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: challenge_user; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public.challenge_user (
    user_id integer NOT NULL,
    challenge_id integer NOT NULL,
    completed public.completed_challenge DEFAULT 'no'::public.completed_challenge,
    date_assigned text DEFAULT to_char(now(), 'YYYY-MM-DD'::text),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.challenge_user OWNER TO spedata;

--
-- Name: user; Type: TABLE; Schema: public; Owner: spedata
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    nickname text NOT NULL,
    password text NOT NULL,
    phone text,
    login_streak integer DEFAULT 0,
    role public.user_role DEFAULT 'user'::public.user_role,
    email text NOT NULL,
    weight integer NOT NULL,
    age integer NOT NULL,
    gender public.user_gender DEFAULT 'non-spécifié'::public.user_gender,
    challenge_id integer,
    xp integer DEFAULT 0,
    profile_visibility public.user_profile_visibility DEFAULT 'publique'::public.user_profile_visibility,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    image_path text,
    image_mimetype text
);


ALTER TABLE public."user" OWNER TO spedata;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: spedata
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.activity (id, code, label, met, category_activity_id, created_at, updated_at) FROM stdin;
1	1003	cyclisme, en montagne, en montée, effort vigoureux	14	1	2023-04-11 09:21:08.514+02	2023-04-11 09:21:08.514+02
2	1004	cyclisme, en montagne, en compétition, en course	16	1	2023-04-11 09:21:08.553+02	2023-04-11 09:21:08.553+02
3	1008	cyclisme, BMX	8.5	1	2023-04-11 09:21:08.571+02	2023-04-11 09:21:08.571+02
4	1009	cyclisme, en montagne, général	8.5	1	2023-04-11 09:21:08.574+02	2023-04-11 09:21:08.574+02
5	1010	cyclisme, <16 km/h, loisirs, pour aller au travail ou pour le plaisir (code Taylor 115)	4	1	2023-04-11 09:21:08.577+02	2023-04-11 09:21:08.577+02
6	1011	cyclisme, pour aller/revenir du travail, à son rythme	6.8	1	2023-04-11 09:21:08.579+02	2023-04-11 09:21:08.579+02
7	1013	cyclisme, sur terre ou route de campagne, rythme modéré	5.8	1	2023-04-11 09:21:08.581+02	2023-04-11 09:21:08.581+02
8	1015	cyclisme, général	7.5	1	2023-04-11 09:21:08.583+02	2023-04-11 09:21:08.583+02
9	1018	cyclisme, loisir, 9 km/h	3.5	1	2023-04-11 09:21:08.585+02	2023-04-11 09:21:08.585+02
10	1019	cyclisme, loisir, 15 km/h	5.8	1	2023-04-11 09:21:08.586+02	2023-04-11 09:21:08.586+02
11	1020	cyclisme, 16-19,2 km/h, loisirs, rythme lent, effort léger	6.8	1	2023-04-11 09:21:08.59+02	2023-04-11 09:21:08.59+02
12	1030	cyclisme, 19,3-22,4 km/h, loisirs, effort modéré	8	1	2023-04-11 09:21:08.593+02	2023-04-11 09:21:08.593+02
13	1040	cyclisme, 22,5-25,6 km/h, course ou loisirs, rythme rapide, effort vigoureux	10	1	2023-04-11 09:21:08.595+02	2023-04-11 09:21:08.595+02
14	1050	cyclisme, 25,7-30,6 km/h, course/sans aspiration ou > 30,6 km/h avec aspiration, rythme très rapide, course générale	12	1	2023-04-11 09:21:08.596+02	2023-04-11 09:21:08.596+02
15	1060	cyclisme, > 32 km/h, course, sans aspiration	15.8	1	2023-04-11 09:21:08.601+02	2023-04-11 09:21:08.601+02
16	1065	cyclisme, 19,3 km/h, assis, mains sur les cocottes de frein ou en bas du guidon, 80 tr/min	8.5	1	2023-04-11 09:21:08.603+02	2023-04-11 09:21:08.603+02
17	1066	cyclisme, 19,3 km/h, en danseuse, mains sur les cocottes de frein, 60 tr/min	9	1	2023-04-11 09:21:08.604+02	2023-04-11 09:21:08.604+02
18	1070	monocyclisme	5	1	2023-04-11 09:21:08.607+02	2023-04-11 09:21:08.607+02
19	2001	jeu vidéo réclamant une activité (par ex. Wii Fit), effort léger (par ex. position d’équilibre, yoga)	2.3	2	2023-04-11 09:21:08.608+02	2023-04-11 09:21:08.608+02
20	2003	jeu vidéo réclamant une activité (par ex. Wii Fit), effort modéré (par ex. aérobic, résistance)	3.8	2	2023-04-11 09:21:08.609+02	2023-04-11 09:21:08.609+02
21	2005	jeu vidéo/d’arcade réclamant une activité (par ex. Exergaming, Dance Dance Revolution), effort vigoureux	7.2	2	2023-04-11 09:21:08.61+02	2023-04-11 09:21:08.61+02
22	2008	parcours d’obstacle de type militaire, programme de formation de camp d’entraînement	5	2	2023-04-11 09:21:08.611+02	2023-04-11 09:21:08.611+02
23	2010	cyclisme, vélo d'appartement, général	7	2	2023-04-11 09:21:08.612+02	2023-04-11 09:21:08.612+02
24	2011	cyclisme, vélo d'appartement, 30-50 watts, effort très léger à léger	3.5	2	2023-04-11 09:21:08.614+02	2023-04-11 09:21:08.614+02
25	2012	cyclisme, vélo d'appartement, 90-100 watts, effort modéré à vigoureux	6.8	2	2023-04-11 09:21:08.615+02	2023-04-11 09:21:08.615+02
26	2013	cyclisme, vélo d'appartement, 101-160 watts, effort vigoureux	8.8	2	2023-04-11 09:21:08.616+02	2023-04-11 09:21:08.616+02
27	2014	cyclisme, vélo d'appartement, 161-200 watts, effort vigoureux	11	2	2023-04-11 09:21:08.618+02	2023-04-11 09:21:08.618+02
28	2015	cyclisme, vélo d'appartement, 201-270 watts, effort très vigoureux	14	2	2023-04-11 09:21:08.619+02	2023-04-11 09:21:08.619+02
29	2017	cyclisme, vélo d'appartement, 51-89 watts, effort léger à modéré	4.8	2	2023-04-11 09:21:08.628+02	2023-04-11 09:21:08.628+02
30	2019	cyclisme, vélo d’appartement, cardiovélo	8.5	2	2023-04-11 09:21:08.63+02	2023-04-11 09:21:08.63+02
31	2020	gymnastique suédoise (par ex. pompes, abdominaux, tractions, sauts en écart), effort vigoureux	8	2	2023-04-11 09:21:08.633+02	2023-04-11 09:21:08.633+02
32	2022	gymnastique suédoise (par ex. pompes, redressements assis, fentes), effort modéré	3.8	2	2023-04-11 09:21:08.635+02	2023-04-11 09:21:08.635+02
33	2024	gymnastique suédoise (par ex. redressements assis, abdominaux), effort léger	2.8	2	2023-04-11 09:21:08.638+02	2023-04-11 09:21:08.638+02
34	2030	gymnastique suédoise, effort léger à modéré, général (par ex. exercices pour le dos), monter et descendre les escaliers (code Taylor 150)	3.5	2	2023-04-11 09:21:08.641+02	2023-04-11 09:21:08.641+02
35	2035	entraînement en circuit, effort modéré	4.3	2	2023-04-11 09:21:08.642+02	2023-04-11 09:21:08.642+02
36	2040	entraînement en circuit, avec des haltères, comprenant des mouvements d'aérobic avec un temps de repos minimal, général, effort vigoureux	8	2	2023-04-11 09:21:08.643+02	2023-04-11 09:21:08.643+02
37	2045	TM\nexercices Curveschez les femmes	3.5	2	2023-04-11 09:21:08.645+02	2023-04-11 09:21:08.645+02
38	2048	machine elliptique, effort modéré	5	2	2023-04-11 09:21:08.647+02	2023-04-11 09:21:08.647+02
39	2050	entraînement en résistance (haltérophilie, poids libre, nautilus ou universel), force athlétique ou body-building, effort vigoureux (code Taylor 210)	6	2	2023-04-11 09:21:08.648+02	2023-04-11 09:21:08.648+02
40	2052	entraînement en résistance (à une masse), squats, effort lent ou explosif	5	2	2023-04-11 09:21:08.649+02	2023-04-11 09:21:08.649+02
41	2054	entraînement en résistance (à une masse), exercices multiples, 8-15 répétitions à des résistances variées	3.5	2	2023-04-11 09:21:08.65+02	2023-04-11 09:21:08.65+02
42	2060	exercice de club de remise en forme, général (code Taylor 160)	5.5	2	2023-04-11 09:21:08.652+02	2023-04-11 09:21:08.652+02
43	2061	exercice de club de remise en forme, général, gym/musculation en une même séance	5	2	2023-04-11 09:21:08.653+02	2023-04-11 09:21:08.653+02
44	2062	exercice de club de remise en forme, cours de conditionnement	7.8	2	2023-04-11 09:21:08.655+02	2023-04-11 09:21:08.655+02
45	2064	exercice à la maison, général	3.8	2	2023-04-11 09:21:08.656+02	2023-04-11 09:21:08.656+02
46	2065	tapis de course, général	9	2	2023-04-11 09:21:08.658+02	2023-04-11 09:21:08.658+02
47	2068	corde à sauter, général	12.3	2	2023-04-11 09:21:08.659+02	2023-04-11 09:21:08.659+02
48	2070	rame, rameur d'appartement, général, effort vigoureux	6	2	2023-04-11 09:21:08.661+02	2023-04-11 09:21:08.661+02
49	2071	rame, rameur d’appartement, général, effort modéré	4.8	2	2023-04-11 09:21:08.663+02	2023-04-11 09:21:08.663+02
50	2072	rame, rameur d’appartement, 100 watts, effort modéré	7	2	2023-04-11 09:21:08.664+02	2023-04-11 09:21:08.664+02
51	2073	rame, rameur d'appartement, 150 watts, effort vigoureux	8.5	2	2023-04-11 09:21:08.666+02	2023-04-11 09:21:08.666+02
52	2074	rame, rameur d'appartement, 200 watts, effort très vigoureux	12	2	2023-04-11 09:21:08.668+02	2023-04-11 09:21:08.668+02
53	2080	machine d'entraînement au ski, général	6.8	2	2023-04-11 09:21:08.67+02	2023-04-11 09:21:08.67+02
54	2085	tapis pour glissements latéraux, général	11	2	2023-04-11 09:21:08.671+02	2023-04-11 09:21:08.671+02
55	2090	slimnastics, jazzercise	6	2	2023-04-11 09:21:08.673+02	2023-04-11 09:21:08.673+02
56	2101	stretching doux	2.3	2	2023-04-11 09:21:08.674+02	2023-04-11 09:21:08.674+02
57	2105	Pilates, général	3	2	2023-04-11 09:21:08.675+02	2023-04-11 09:21:08.675+02
58	2110	cours d’exercices (par ex. aérobic, aquagym)	6.8	2	2023-04-11 09:21:08.676+02	2023-04-11 09:21:08.676+02
59	2112	ballon d’exercice thérapeutique, exercice au Fitball	2.8	2	2023-04-11 09:21:08.678+02	2023-04-11 09:21:08.678+02
60	2115	exercices du haut du corps, ergomètre à bras	2.8	2	2023-04-11 09:21:08.679+02	2023-04-11 09:21:08.679+02
430	15100	boxe, sur ring, général	12.8	10	2023-04-11 09:21:09.364+02	2023-04-11 09:21:09.364+02
61	2117	exercices du haut du corps, vélo d’appartement – Airdyne (bras uniquement) 40 tr/min, effort modéré	4.3	2	2023-04-11 09:21:08.679+02	2023-04-11 09:21:08.679+02
62	2140	exercices de gymnastique en vidéo, programmes TV de remise en forme (par ex. yoga, stretching), effort léger	2.3	2	2023-04-11 09:21:08.683+02	2023-04-11 09:21:08.683+02
63	2143	exercices de gymnastique en vidéo, programmes TV de remise en forme (par ex. entraînement cardio-pulmonaire), effort modéré	4	2	2023-04-11 09:21:08.685+02	2023-04-11 09:21:08.685+02
64	2146	exercices de gymnastique en vidéo, programmes TV de remise en forme (par ex. entraînement cardio-pulmonaire), effort vigoureux	6	2	2023-04-11 09:21:08.686+02	2023-04-11 09:21:08.686+02
65	2150	yoga, Hatha	2.5	2	2023-04-11 09:21:08.687+02	2023-04-11 09:21:08.687+02
66	2160	yoga, Power	4	2	2023-04-11 09:21:08.689+02	2023-04-11 09:21:08.689+02
67	2170	yoga, Nadisodhana	2	2	2023-04-11 09:21:08.69+02	2023-04-11 09:21:08.69+02
68	2180	yoga, Surya Namaskar	3.3	2	2023-04-11 09:21:08.692+02	2023-04-11 09:21:08.692+02
69	2200	activités physiques néozélandaises (par ex. Haka Powhiri, Moteatea, Waita Tira, Whakawatea, etc.), général, effort modéré	5.3	2	2023-04-11 09:21:08.693+02	2023-04-11 09:21:08.693+02
70	2205	activités physiques néozélandaises (par ex. Haka, Taiahab), général, effort vigoureux	6.8	2	2023-04-11 09:21:08.695+02	2023-04-11 09:21:08.695+02
71	3010	ballet, moderne ou jazz, général, répétition ou cours	5	3	2023-04-11 09:21:08.699+02	2023-04-11 09:21:08.699+02
72	3012	ballet, moderne ou jazz, représentation, effort vigoureux	6.8	3	2023-04-11 09:21:08.7+02	2023-04-11 09:21:08.7+02
73	3014	claquettes	4.8	3	2023-04-11 09:21:08.702+02	2023-04-11 09:21:08.702+02
74	3015	aérobic, général	7.3	3	2023-04-11 09:21:08.704+02	2023-04-11 09:21:08.704+02
75	3016	aérobic, step, avec un step de 15-20 cm	7.5	3	2023-04-11 09:21:08.705+02	2023-04-11 09:21:08.705+02
76	3017	aérobic, step, avec un step de 25-30 cm	9.5	3	2023-04-11 09:21:08.706+02	2023-04-11 09:21:08.706+02
77	3018	aérobic, step, avec un step de 10 cm	5.5	3	2023-04-11 09:21:08.707+02	2023-04-11 09:21:08.707+02
78	3019	cours de step sur banc, général	8.5	3	2023-04-11 09:21:08.709+02	2023-04-11 09:21:08.709+02
79	3020	aérobic, faible impact	5	3	2023-04-11 09:21:08.71+02	2023-04-11 09:21:08.71+02
80	3021	aérobic, fort impact	7.3	3	2023-04-11 09:21:08.711+02	2023-04-11 09:21:08.711+02
81	3022	aérobic danse avec des lests de 4,5-7 kg	10	3	2023-04-11 09:21:08.716+02	2023-04-11 09:21:08.716+02
82	3025	danse ethnique ou culturelle (par ex. grecque, moyen-orientale, hula, salsa, merengue, bamba y plena, flamenco, danse du ventre et swing)	4.5	3	2023-04-11 09:21:08.717+02	2023-04-11 09:21:08.717+02
83	3030	danse de salon, rapide (code Taylor 125)	5.5	3	2023-04-11 09:21:08.718+02	2023-04-11 09:21:08.718+02
84	3031	danse générale (par ex. disco, folk, gigue irlandaise à claquettes, danse de groupe, polka, contra, country)	7.8	3	2023-04-11 09:21:08.72+02	2023-04-11 09:21:08.72+02
85	3038	danse de salon, en compétition, général	11.3	3	2023-04-11 09:21:08.722+02	2023-04-11 09:21:08.722+02
86	3040	ème\ndanse de salon, lente (par ex. valse, fox-trot, slow, samba, tango, danse du XIXsiècle, mambo, cha-cha)	3	3	2023-04-11 09:21:08.725+02	2023-04-11 09:21:08.725+02
87	3050	danse à clochettes Anishinaabe	5.5	3	2023-04-11 09:21:08.728+02	2023-04-11 09:21:08.728+02
88	3060	danse caribéenne (Abakua, Beguine, Bellair, Bongo, Brukin's, quadrille caribéen, Dinki Mini, Gere, Gumbay, Ibo, Jonkonnu, Kumina, Oreisha,\nJambu)	3.5	3	2023-04-11 09:21:08.734+02	2023-04-11 09:21:08.734+02
89	4001	pêche, général	3.5	4	2023-04-11 09:21:08.738+02	2023-04-11 09:21:08.738+02
90	4005	pêche, pêche au crabe	4.5	4	2023-04-11 09:21:08.74+02	2023-04-11 09:21:08.74+02
91	4007	pêche, capture du poisson à la main	4	4	2023-04-11 09:21:08.742+02	2023-04-11 09:21:08.742+02
92	4010	activités liées à la pêche, recherche de vers, avec une pelle	4.3	4	2023-04-11 09:21:08.745+02	2023-04-11 09:21:08.745+02
93	4020	pêcher depuis la rive et marcher	4	4	2023-04-11 09:21:08.747+02	2023-04-11 09:21:08.747+02
94	4030	pêcher depuis un bateau ou canoë, position assise	2	4	2023-04-11 09:21:08.749+02	2023-04-11 09:21:08.749+02
95	4040	pêche depuis la rive, position debout (code Taylor 660)	3.5	4	2023-04-11 09:21:08.751+02	2023-04-11 09:21:08.751+02
96	4050	pêcher dans le courant, avec des cuissardes (code Taylor 670)	6	4	2023-04-11 09:21:08.754+02	2023-04-11 09:21:08.754+02
97	4060	pêche, glace, position assise	2	4	2023-04-11 09:21:08.755+02	2023-04-11 09:21:08.755+02
98	4061	pêcher, à la turlutte ou à la ligne, en position debout, général	1.8	4	2023-04-11 09:21:08.759+02	2023-04-11 09:21:08.759+02
99	4062	pêcher, épuisette, placer le filet et récupérer le poisson, général	3.5	4	2023-04-11 09:21:08.761+02	2023-04-11 09:21:08.761+02
100	4063	pêcher, filet fixe, poser le filet et récupérer le poisson, général	3.8	4	2023-04-11 09:21:08.764+02	2023-04-11 09:21:08.764+02
101	4064	pêcher, moulinet, placer le filet et récupérer le poisson, général	3	4	2023-04-11 09:21:08.766+02	2023-04-11 09:21:08.766+02
102	4065	pêcher au harpon, debout	2.3	4	2023-04-11 09:21:08.769+02	2023-04-11 09:21:08.769+02
103	4070	chasse, arc et flèches ou arbalète	2.5	4	2023-04-11 09:21:08.771+02	2023-04-11 09:21:08.771+02
104	4080	chasse, cerf, élan, gros gibier (code Taylor 170)	6	4	2023-04-11 09:21:08.773+02	2023-04-11 09:21:08.773+02
105	4081	chasse au gros gibier, en traînant la carcasse	11.3	4	2023-04-11 09:21:08.775+02	2023-04-11 09:21:08.775+02
106	4083	chasse aux gros animaux marins	4	4	2023-04-11 09:21:08.778+02	2023-04-11 09:21:08.778+02
107	4085	chasse au gros gibier, depuis une cache, peu de marche	2.5	4	2023-04-11 09:21:08.78+02	2023-04-11 09:21:08.78+02
108	4086	chasse au gros gibier à partir d'une voiture, un avion ou un bateau	2	4	2023-04-11 09:21:08.782+02	2023-04-11 09:21:08.782+02
109	4090	chasse, canard, échassier	2.5	4	2023-04-11 09:21:08.784+02	2023-04-11 09:21:08.784+02
110	4095	chasse, roussette, écureuil	3	4	2023-04-11 09:21:08.787+02	2023-04-11 09:21:08.787+02
111	4100	chasse, général	5	4	2023-04-11 09:21:08.789+02	2023-04-11 09:21:08.789+02
112	4110	chasse, faisans ou tétras (code Taylor 680)	6	4	2023-04-11 09:21:08.791+02	2023-04-11 09:21:08.791+02
113	4115	chasse, oiseaux	3.3	4	2023-04-11 09:21:08.793+02	2023-04-11 09:21:08.793+02
114	4120	chasse, lapin, écureuil, tétra des prairies, raton laveur, petit gibier (code Taylor 690)	5	4	2023-04-11 09:21:08.795+02	2023-04-11 09:21:08.795+02
115	4123	chasse, cochons sauvages	3.3	4	2023-04-11 09:21:08.798+02	2023-04-11 09:21:08.798+02
116	4124	piégeage, général	2	4	2023-04-11 09:21:08.803+02	2023-04-11 09:21:08.803+02
117	4125	chasse, randonnée avec équipement de chasse	9.5	4	2023-04-11 09:21:08.807+02	2023-04-11 09:21:08.807+02
118	4130	tir au pistolet ou ball-trap, position debout	2.5	4	2023-04-11 09:21:08.809+02	2023-04-11 09:21:08.809+02
119	4140	exercices de tir, position couchée	2.3	4	2023-04-11 09:21:08.811+02	2023-04-11 09:21:08.811+02
120	4145	exercices de tir, agenouillé ou en position debout	2.5	4	2023-04-11 09:21:08.813+02	2023-04-11 09:21:08.813+02
121	5010	nettoyage, balayer la moquette ou les sols, général	3.3	5	2023-04-11 09:21:08.816+02	2023-04-11 09:21:08.816+02
122	5011	nettoyage, balayer, lentement, effort léger	2.3	5	2023-04-11 09:21:08.818+02	2023-04-11 09:21:08.818+02
123	5012	nettoyage, balayer, lentement, effort modéré	3.8	5	2023-04-11 09:21:08.82+02	2023-04-11 09:21:08.82+02
124	5020	nettoyage, important ou majeur (par ex. nettoyage de la voiture, des fenêtres, du garage), effort modéré	3.5	5	2023-04-11 09:21:08.822+02	2023-04-11 09:21:08.822+02
431	15110	boxe, sac de frappe	5.5	10	2023-04-11 09:21:09.369+02	2023-04-11 09:21:09.369+02
125	5021	nettoyage, lavage, debout, effort modéré	3.5	5	2023-04-11 09:21:08.824+02	2023-04-11 09:21:08.824+02
126	5022	nettoyage des fenêtres, lavage des fenêtres, général	3.2	5	2023-04-11 09:21:08.826+02	2023-04-11 09:21:08.826+02
127	5023	lavage, debout, effort léger	2.5	5	2023-04-11 09:21:08.828+02	2023-04-11 09:21:08.828+02
128	5024	cirage des sols, debout, marche lente, avec une cireuse électrique	4.5	5	2023-04-11 09:21:08.83+02	2023-04-11 09:21:08.83+02
129	5025	multiples tâches ménagères en même temps, effort léger	2.8	5	2023-04-11 09:21:08.834+02	2023-04-11 09:21:08.834+02
130	5026	multiples tâches ménagères en même temps, effort modéré	3.5	5	2023-04-11 09:21:08.836+02	2023-04-11 09:21:08.836+02
131	5027	multiples tâches ménagères en même temps, effort vigoureux	4.3	5	2023-04-11 09:21:08.838+02	2023-04-11 09:21:08.838+02
132	5030	nettoyage, maison ou cabane, général, effort modéré	3.3	5	2023-04-11 09:21:08.84+02	2023-04-11 09:21:08.84+02
133	5032	époussetage ou cirage des meubles, général	2.3	5	2023-04-11 09:21:08.843+02	2023-04-11 09:21:08.843+02
134	5035	activités de cuisine, en général (par ex. cuisiner, laver la vaisselle, nettoyer), effort modéré	3.3	5	2023-04-11 09:21:08.845+02	2023-04-11 09:21:08.845+02
135	5040	nettoyage, général (ranger, changer les draps, sortir les poubelles), effort léger	2.5	5	2023-04-11 09:21:08.848+02	2023-04-11 09:21:08.848+02
136	5041	faire la vaisselle, debout ou en général (non classé en composants debout/marche)	1.8	5	2023-04-11 09:21:08.854+02	2023-04-11 09:21:08.854+02
137	5042	faire la vaisselle, débarrasser les plats de la table, marcher, effort léger	2.5	5	2023-04-11 09:21:08.856+02	2023-04-11 09:21:08.856+02
138	5043	passer l'aspirateur, général, effort modéré	3.3	5	2023-04-11 09:21:08.858+02	2023-04-11 09:21:08.858+02
139	5044	dépecer des animaux, petits	3	5	2023-04-11 09:21:08.86+02	2023-04-11 09:21:08.86+02
140	5045	dépecer des animaux, grands, effort vigoureux	6	5	2023-04-11 09:21:08.862+02	2023-04-11 09:21:08.862+02
141	5046	découper et fumer du poisson, sécher du poisson ou de la viande	2.3	5	2023-04-11 09:21:08.865+02	2023-04-11 09:21:08.865+02
142	5048	tanner des peaux, général	4	5	2023-04-11 09:21:08.867+02	2023-04-11 09:21:08.867+02
143	5049	cuisiner ou préparer des repas, effort modéré	3.5	5	2023-04-11 09:21:08.869+02	2023-04-11 09:21:08.869+02
144	5050	cuisiner ou préparer des repas – position debout ou assise ou en général (non classé en composants debout/marche), appareils manuels, effort\nléger	2	5	2023-04-11 09:21:08.87+02	2023-04-11 09:21:08.87+02
145	5051	servir les aliments, mettre la table, impliquant de marcher ou de se tenir debout	2.5	5	2023-04-11 09:21:08.872+02	2023-04-11 09:21:08.872+02
146	5052	cuisiner ou préparer des repas, marcher	2.5	5	2023-04-11 09:21:08.873+02	2023-04-11 09:21:08.873+02
147	5053	nourrir des animaux domestiques	2.5	5	2023-04-11 09:21:08.874+02	2023-04-11 09:21:08.874+02
148	5055	ranger des provisions (par ex. porter des provisions, faire des courses sans chariot), porter des paquets	2.5	5	2023-04-11 09:21:08.876+02	2023-04-11 09:21:08.876+02
149	5056	porter des provisions en montant des escaliers	7.5	5	2023-04-11 09:21:08.879+02	2023-04-11 09:21:08.879+02
150	5057	cuisiner du pain indien dans un four d'extérieur	3	5	2023-04-11 09:21:08.885+02	2023-04-11 09:21:08.885+02
151	5060	faire des courses alimentaires avec ou sans chariot, debout ou en marchant	2.3	5	2023-04-11 09:21:08.887+02	2023-04-11 09:21:08.887+02
152	5065	faire des courses non-alimentaires avec ou sans chariot, debout ou en marchant	2.3	5	2023-04-11 09:21:08.89+02	2023-04-11 09:21:08.89+02
153	5070	repasser	1.8	5	2023-04-11 09:21:08.893+02	2023-04-11 09:21:08.893+02
154	5080	tricoter, coudre, effort léger, emballer des cadeaux, en position assise	1.3	5	2023-04-11 09:21:08.895+02	2023-04-11 09:21:08.895+02
155	5082	coudre à la machine	2.8	5	2023-04-11 09:21:08.897+02	2023-04-11 09:21:08.897+02
156	5090	faire la lessive, plier ou étendre des vêtements, mettre des vêtements au lave-linge ou au sèche-linge, faire une valise, laver des vêtements à la\nmain, impliquant d'être debout, effort léger	2	5	2023-04-11 09:21:08.899+02	2023-04-11 09:21:08.899+02
157	5092	faire la lessive, pendre du linge, laver des vêtements à la main, effort modéré	4	5	2023-04-11 09:21:08.901+02	2023-04-11 09:21:08.901+02
158	5095	faire la lessive, ranger des vêtements, rassembler des vêtements pour les ranger, ranger du linge propre, impliquant de marcher	2.3	5	2023-04-11 09:21:08.902+02	2023-04-11 09:21:08.902+02
159	5100	faire le lit, changer les draps	3.3	5	2023-04-11 09:21:08.904+02	2023-04-11 09:21:08.904+02
160	5110	récolter et fabriquer du sirop d'érable (porter des seaux, du bois)	5	5	2023-04-11 09:21:08.906+02	2023-04-11 09:21:08.906+02
161	5120	déplacer des meubles, des objets, porter des cartons	5.8	5	2023-04-11 09:21:08.908+02	2023-04-11 09:21:08.908+02
162	5121	déplacer, soulever des charges légères	5	5	2023-04-11 09:21:08.91+02	2023-04-11 09:21:08.91+02
163	5125	ranger une pièce	4.8	5	2023-04-11 09:21:08.913+02	2023-04-11 09:21:08.913+02
164	5130	nettoyer à la brosse des sols, à genoux, nettoyer à la brosse une salle de bain, une baignoire, effort modéré	3.5	5	2023-04-11 09:21:08.914+02	2023-04-11 09:21:08.914+02
165	5131	nettoyer à la brosse des sols, à genoux, nettoyer à la brosse une salle de bain, une baignoire, effort léger	2	5	2023-04-11 09:21:08.916+02	2023-04-11 09:21:08.916+02
166	5132	nettoyer à la brosse des sols, à genoux, nettoyer à la brosse une salle de bain, une baignoire, effort vigoureux	6.5	5	2023-04-11 09:21:08.918+02	2023-04-11 09:21:08.918+02
167	5140	balayer le garage, le trottoir ou l'extérieur de la maison	4	5	2023-04-11 09:21:08.919+02	2023-04-11 09:21:08.919+02
168	5146	être debout, emballer/déballer des cartons, soulever occasionnellement des objets légers, charger ou décharger des articles dans la voiture, effort\nmodéré	3.5	5	2023-04-11 09:21:08.922+02	2023-04-11 09:21:08.922+02
169	5147	impliquant de marcher, ranger des objets, effort modéré	3	5	2023-04-11 09:21:08.927+02	2023-04-11 09:21:08.927+02
170	5148	arroser les plantes	2.5	5	2023-04-11 09:21:08.929+02	2023-04-11 09:21:08.929+02
171	5149	faire un feu	2.5	5	2023-04-11 09:21:08.931+02	2023-04-11 09:21:08.931+02
172	5150	porter des objets dans des escaliers, porter des cartons ou des meubles	9	5	2023-04-11 09:21:08.932+02	2023-04-11 09:21:08.932+02
173	5171	être debout, jouer avec un/des enfant(s), effort léger, périodes actives uniquement	2.8	5	2023-04-11 09:21:08.935+02	2023-04-11 09:21:08.935+02
174	5175	marcher/courir, jouer avec un/des enfant(s), effort modéré, périodes actives uniquement	3.5	5	2023-04-11 09:21:08.937+02	2023-04-11 09:21:08.937+02
175	5180	marcher/courir, jouer avec un/des enfant(s), effort vigoureux, périodes actives uniquement	5.8	5	2023-04-11 09:21:08.939+02	2023-04-11 09:21:08.939+02
176	5181	marcher et porter un petit enfant de 7 kg ou plus	3	5	2023-04-11 09:21:08.941+02	2023-04-11 09:21:08.941+02
177	5182	marcher et porter un petit enfant de moins de 7 kg	2.3	5	2023-04-11 09:21:08.942+02	2023-04-11 09:21:08.942+02
178	5183	être debout, porter un enfant	2	5	2023-04-11 09:21:08.945+02	2023-04-11 09:21:08.945+02
179	5186	s’occuper d’enfants, debout (par ex. habiller, baigner, préparer, nourrir, soulever occasionnellement l'enfant) effort modéré	3	5	2023-04-11 09:21:08.946+02	2023-04-11 09:21:08.946+02
180	5191	être debout, jouer avec des animaux, effort léger, périodes actives uniquement	2.8	5	2023-04-11 09:21:08.947+02	2023-04-11 09:21:08.947+02
181	5192	marcher/courir, jouer avec des animaux, général, effort léger, périodes actives uniquement	3	5	2023-04-11 09:21:08.949+02	2023-04-11 09:21:08.949+02
248	8160	ratisser la pelouse ou des feuilles, effort modéré	3.8	7	2023-04-11 09:21:09.082+02	2023-04-11 09:21:09.082+02
182	5193	marcher/courir, jouer avec des animaux, effort modéré, périodes actives uniquement	4	5	2023-04-11 09:21:08.95+02	2023-04-11 09:21:08.95+02
183	5194	marcher/courir, jouer avec des animaux, effort vigoureux, périodes actives uniquement	5	5	2023-04-11 09:21:08.952+02	2023-04-11 09:21:08.952+02
184	6020	travailler sur la carrosserie d'une automobile	4	6	2023-04-11 09:21:08.954+02	2023-04-11 09:21:08.954+02
185	6030	réparation automobile, effort léger ou modéré	3.3	6	2023-04-11 09:21:08.955+02	2023-04-11 09:21:08.955+02
186	6040	menuiserie, général, atelier (code Taylor 620)	3	6	2023-04-11 09:21:08.958+02	2023-04-11 09:21:08.958+02
187	6050	menuiserie, extérieur de la maison, installer des gouttières, construire une clôture (code Taylor 640)	6	6	2023-04-11 09:21:08.959+02	2023-04-11 09:21:08.959+02
188	6052	menuiserie, extérieur de la maison, construire une clôture	3.8	6	2023-04-11 09:21:08.962+02	2023-04-11 09:21:08.962+02
189	6060	menuiserie, finition ou restauration de meubles	3.3	6	2023-04-11 09:21:08.964+02	2023-04-11 09:21:08.964+02
190	6070	menuiserie, scier du bois de feuillus	6	6	2023-04-11 09:21:08.966+02	2023-04-11 09:21:08.966+02
191	6072	menuiserie, travaux de rénovation résidentielle, effort modéré	4	6	2023-04-11 09:21:08.967+02	2023-04-11 09:21:08.967+02
192	6074	menuiserie, travaux de rénovation résidentielle, effort léger	2.3	6	2023-04-11 09:21:08.968+02	2023-04-11 09:21:08.968+02
193	6080	calfeutrer, isoler une cabane en bois	5	6	2023-04-11 09:21:08.97+02	2023-04-11 09:21:08.97+02
194	6090	calfeutrer, hors cabane	4.5	6	2023-04-11 09:21:08.974+02	2023-04-11 09:21:08.974+02
195	6100	nettoyer les gouttières	5	6	2023-04-11 09:21:08.976+02	2023-04-11 09:21:08.976+02
196	6110	creuser un garage	5	6	2023-04-11 09:21:08.979+02	2023-04-11 09:21:08.979+02
197	6120	poser des doubles fenêtres	5	6	2023-04-11 09:21:08.983+02	2023-04-11 09:21:08.983+02
198	6122	poser des plaques de plâtre à l’intérieur d’une maison	5	6	2023-04-11 09:21:08.985+02	2023-04-11 09:21:08.985+02
199	6124	planter des clous	3	6	2023-04-11 09:21:08.987+02	2023-04-11 09:21:08.987+02
200	6126	réparation domestique, général, effort léger	2.5	6	2023-04-11 09:21:08.988+02	2023-04-11 09:21:08.988+02
201	6127	réparation domestique, général, effort modéré	4.5	6	2023-04-11 09:21:08.989+02	2023-04-11 09:21:08.989+02
202	6128	réparation domestique, général, effort vigoureux	6	6	2023-04-11 09:21:08.99+02	2023-04-11 09:21:08.99+02
203	6130	poser ou retirer de la moquette	4.5	6	2023-04-11 09:21:08.991+02	2023-04-11 09:21:08.991+02
204	6140	poser du carrelage ou du linoléum, réparer des appareils	3.8	6	2023-04-11 09:21:08.992+02	2023-04-11 09:21:08.992+02
205	6144	réparer des appareils	3	6	2023-04-11 09:21:08.993+02	2023-04-11 09:21:08.993+02
206	6150	peindre, extérieur de la maison (code Taylor 650)	5	6	2023-04-11 09:21:08.996+02	2023-04-11 09:21:08.996+02
207	6160	peindre, intérieur de la maison, papier peint, décapage de peinture	3.3	6	2023-04-11 09:21:08.997+02	2023-04-11 09:21:08.997+02
208	6165	peindre, (code Taylor 630)	4.5	6	2023-04-11 09:21:08.998+02	2023-04-11 09:21:08.998+02
209	6167	plomberie, général	3	6	2023-04-11 09:21:09+02	2023-04-11 09:21:09+02
210	6170	poser et retirer une bâche – voilier	3	6	2023-04-11 09:21:09.001+02	2023-04-11 09:21:09.001+02
211	6180	poser la toiture	6	6	2023-04-11 09:21:09.003+02	2023-04-11 09:21:09.003+02
212	6190	poncer les sols avec une ponceuse	4.5	6	2023-04-11 09:21:09.004+02	2023-04-11 09:21:09.004+02
213	6200	décaper et peindre un voilier ou un hors-bord	4.5	6	2023-04-11 09:21:09.006+02	2023-04-11 09:21:09.006+02
214	6205	affûter des outils	2	6	2023-04-11 09:21:09.007+02	2023-04-11 09:21:09.007+02
215	6210	étaler de la terre à l'aide d'une pelle	5	6	2023-04-11 09:21:09.011+02	2023-04-11 09:21:09.011+02
216	6220	laver et cirer la coque d'un voilier ou un avion	4.5	6	2023-04-11 09:21:09.012+02	2023-04-11 09:21:09.012+02
217	6225	laver et cirer une voiture	2	6	2023-04-11 09:21:09.014+02	2023-04-11 09:21:09.014+02
218	6230	laver une clôture, peindre une clôture, effort modéré	4.5	6	2023-04-11 09:21:09.018+02	2023-04-11 09:21:09.018+02
219	6240	câblage, dériver-connecter	3.3	6	2023-04-11 09:21:09.023+02	2023-04-11 09:21:09.023+02
220	8009	porter, charger ou empiler du bois, charger/décharger ou transporter du bois de charpente, effort léger à modéré	3.3	7	2023-04-11 09:21:09.026+02	2023-04-11 09:21:09.026+02
221	8010	porter, charger ou empiler du bois, charger/décharger ou transporter du bois de charpente	5.5	7	2023-04-11 09:21:09.027+02	2023-04-11 09:21:09.027+02
222	8019	couper du bois, fendre des bûches, effort modéré	4.5	7	2023-04-11 09:21:09.031+02	2023-04-11 09:21:09.031+02
223	8020	couper du bois, fendre des bûches, effort vigoureux	6.3	7	2023-04-11 09:21:09.034+02	2023-04-11 09:21:09.034+02
224	8025	débroussailler, éclaircir un jardin, effort modéré	3.5	7	2023-04-11 09:21:09.037+02	2023-04-11 09:21:09.037+02
225	8030	débroussailler, sous-bois ou terrain, porter des branches, tirer une brouette, effort vigoureux	6.3	7	2023-04-11 09:21:09.041+02	2023-04-11 09:21:09.041+02
226	8040	creuser un bac à sable, pelleter du sable	5	7	2023-04-11 09:21:09.043+02	2023-04-11 09:21:09.043+02
227	8045	creuser, bêcher, garnir le jardin, composter, effort léger à modéré	3.5	7	2023-04-11 09:21:09.045+02	2023-04-11 09:21:09.045+02
228	8050	creuser, bêcher, garnir le jardin, composter (code Taylor 590)	5	7	2023-04-11 09:21:09.047+02	2023-04-11 09:21:09.047+02
229	8052	creuser, bêcher, garnir le jardin, composter, effort vigoureux	7.8	7	2023-04-11 09:21:09.052+02	2023-04-11 09:21:09.052+02
230	8055	conduire un tracteur	2.8	7	2023-04-11 09:21:09.054+02	2023-04-11 09:21:09.054+02
231	8057	abattre des arbres de grande taille	8.3	7	2023-04-11 09:21:09.055+02	2023-04-11 09:21:09.055+02
232	8058	abattre des arbres de taille moyenne à petite	5.3	7	2023-04-11 09:21:09.056+02	2023-04-11 09:21:09.056+02
233	8060	jardiner avec des outils motorisés lourds, labourer un jardin, utiliser une tronçonneuse	5.8	7	2023-04-11 09:21:09.058+02	2023-04-11 09:21:09.058+02
234	8065	jardiner, avec des conteneurs, personnes de plus de 60 ans	2.3	7	2023-04-11 09:21:09.06+02	2023-04-11 09:21:09.06+02
235	8070	canaux d'irrigation, ouvrir et fermer des barrages	4	7	2023-04-11 09:21:09.062+02	2023-04-11 09:21:09.062+02
236	8080	poser des pierres concassées	6.3	7	2023-04-11 09:21:09.063+02	2023-04-11 09:21:09.063+02
237	8090	poser du gazon	5	7	2023-04-11 09:21:09.065+02	2023-04-11 09:21:09.065+02
238	8095	tondre la pelouse, général	5.5	7	2023-04-11 09:21:09.066+02	2023-04-11 09:21:09.066+02
239	8100	tondre la pelouse, conduire une tondeuse (code Taylor 550)	2.5	7	2023-04-11 09:21:09.068+02	2023-04-11 09:21:09.068+02
240	8110	tondre la pelouse, marcher, tondeuse manuelle (code Taylor 570)	6	7	2023-04-11 09:21:09.07+02	2023-04-11 09:21:09.07+02
241	8120	tondre la pelouse, marcher, tondeuse à moteur, effort modéré ou vigoureux	5	7	2023-04-11 09:21:09.071+02	2023-04-11 09:21:09.071+02
242	8125	tondre la pelouse, tondeuse à moteur, effort léger ou modéré (code Taylor 590)	4.5	7	2023-04-11 09:21:09.073+02	2023-04-11 09:21:09.073+02
243	8130	utiliser une souffleuse à neige, marcher	2.5	7	2023-04-11 09:21:09.074+02	2023-04-11 09:21:09.074+02
244	8135	planter, rempoter, transplanter des germes ou plantes, effort léger	2	7	2023-04-11 09:21:09.075+02	2023-04-11 09:21:09.075+02
245	8140	planter des germes, buissons, penché, effort modéré	4.3	7	2023-04-11 09:21:09.077+02	2023-04-11 09:21:09.077+02
246	8145	planter des cultures ou jardiner, penché, effort modéré	4.3	7	2023-04-11 09:21:09.079+02	2023-04-11 09:21:09.079+02
247	8150	planter des arbres	4.5	7	2023-04-11 09:21:09.08+02	2023-04-11 09:21:09.08+02
428	15090	bowling (code Taylor 390)	3	10	2023-04-11 09:21:09.362+02	2023-04-11 09:21:09.362+02
249	8165	ratisser la pelouse (code Taylor 600)	4	7	2023-04-11 09:21:09.083+02	2023-04-11 09:21:09.083+02
250	8170	ratisser le toit avec un grattoir à neige	4	7	2023-04-11 09:21:09.089+02	2023-04-11 09:21:09.089+02
251	8180	conduire une souffleuse à neige	3	7	2023-04-11 09:21:09.091+02	2023-04-11 09:21:09.091+02
252	8190	mettre en sac de l'herbe, des feuilles	4	7	2023-04-11 09:21:09.092+02	2023-04-11 09:21:09.092+02
253	8192	pelleter de la terre ou de la boue	5.5	7	2023-04-11 09:21:09.094+02	2023-04-11 09:21:09.094+02
254	8195	pelleter de la neige, à la main, effort modéré	5.3	7	2023-04-11 09:21:09.095+02	2023-04-11 09:21:09.095+02
255	8200	pelleter de la neige, à la main (code Taylor 610)	6	7	2023-04-11 09:21:09.097+02	2023-04-11 09:21:09.097+02
256	8202	pelleter de la neige, à la main, effort vigoureux	7.5	7	2023-04-11 09:21:09.099+02	2023-04-11 09:21:09.099+02
257	8210	tailler des arbustes ou des arbres, outil de coupe manuel	4	7	2023-04-11 09:21:09.1+02	2023-04-11 09:21:09.1+02
258	8215	tailler des arbustes ou des arbres, outil de coupe à moteur, utilisation d'un souffleur de feuilles, d'une débroussailleuse, effort modéré	3.5	7	2023-04-11 09:21:09.102+02	2023-04-11 09:21:09.102+02
259	8220	marcher, appliquer de l'engrais ou ensemencer une pelouse, distributeur roulant	3	7	2023-04-11 09:21:09.104+02	2023-04-11 09:21:09.104+02
260	8230	arroser la pelouse ou le jardin, debout ou en marchant	1.5	7	2023-04-11 09:21:09.105+02	2023-04-11 09:21:09.105+02
261	8239	désherber, cultiver le jardin, effort léger à modéré	3.5	7	2023-04-11 09:21:09.108+02	2023-04-11 09:21:09.108+02
262	8240	désherber, cultiver le jardin (code Taylor 580)	4.5	7	2023-04-11 09:21:09.11+02	2023-04-11 09:21:09.11+02
263	8241	désherber, cultiver le jardin, avec une houe, effort modéré à vigoureux	5	7	2023-04-11 09:21:09.115+02	2023-04-11 09:21:09.115+02
264	8245	jardiner, général, effort modéré	3.8	7	2023-04-11 09:21:09.117+02	2023-04-11 09:21:09.117+02
265	8246	cueillir des fruits sur les arbres, ramasser des fruits/légumes, effort modéré	3.5	7	2023-04-11 09:21:09.118+02	2023-04-11 09:21:09.118+02
266	8248	cueillir des fruits, glaner des fruits, ramasser des fruits/légumes, monter une échelle pour cueillir des fruits, effort vigoureux	4.5	7	2023-04-11 09:21:09.119+02	2023-04-11 09:21:09.119+02
267	8250	impliquant de marcher/d'être debout – récolter le jardin, effort léger, cueillir des fleurs ou ramasser des légumes	3.3	7	2023-04-11 09:21:09.121+02	2023-04-11 09:21:09.121+02
268	8251	marcher, ranger des outils de jardinage	3	7	2023-04-11 09:21:09.122+02	2023-04-11 09:21:09.122+02
269	8255	brouetter, pousser un chariot ou une brouette de jardinage	5.5	7	2023-04-11 09:21:09.124+02	2023-04-11 09:21:09.124+02
270	8260	travaux de cour, général, effort léger	3	7	2023-04-11 09:21:09.13+02	2023-04-11 09:21:09.13+02
271	8261	travaux de cour, général, effort modéré	4	7	2023-04-11 09:21:09.131+02	2023-04-11 09:21:09.131+02
272	8262	travaux de cour, général, effort vigoureux	6	7	2023-04-11 09:21:09.152+02	2023-04-11 09:21:09.152+02
273	11010	boulangerie, général, effort modéré	4	8	2023-04-11 09:21:09.153+02	2023-04-11 09:21:09.153+02
274	11015	boulangerie, effort léger	2	8	2023-04-11 09:21:09.154+02	2023-04-11 09:21:09.154+02
275	11030	construction de routes, conduire des machines lourdes	6	8	2023-04-11 09:21:09.155+02	2023-04-11 09:21:09.155+02
276	11035	construction de routes, gérer la circulation, debout	2	8	2023-04-11 09:21:09.156+02	2023-04-11 09:21:09.156+02
277	11038	charpenterie, général, effort léger	2.5	8	2023-04-11 09:21:09.157+02	2023-04-11 09:21:09.157+02
278	11040	charpenterie, général, effort modéré	4.3	8	2023-04-11 09:21:09.158+02	2023-04-11 09:21:09.158+02
279	11042	charpenterie, général, effort lourd ou vigoureux	7	8	2023-04-11 09:21:09.159+02	2023-04-11 09:21:09.159+02
280	11050	port de charges lourdes (par ex. briques, outils)	8	8	2023-04-11 09:21:09.16+02	2023-04-11 09:21:09.16+02
281	11060	montée de charges modérées dans des escaliers, transport de cartons (11-22 kg)	8	8	2023-04-11 09:21:09.162+02	2023-04-11 09:21:09.162+02
282	11070	femme de chambre, concierge d'hôtel, faire le lit, nettoyer une salle de bains, pousser un chariot	4	8	2023-04-11 09:21:09.163+02	2023-04-11 09:21:09.163+02
283	11080	extraction de charbon, perforation du charbon, de la roche	5.3	8	2023-04-11 09:21:09.168+02	2023-04-11 09:21:09.168+02
284	11090	extraction de charbon, montage des supports	5	8	2023-04-11 09:21:09.17+02	2023-04-11 09:21:09.17+02
285	11100	extraction de charbon, général	5.5	8	2023-04-11 09:21:09.171+02	2023-04-11 09:21:09.171+02
286	11110	extraction de charbon, pelleter le charbon	6.3	8	2023-04-11 09:21:09.172+02	2023-04-11 09:21:09.172+02
287	11115	cuisiner, chef	2.5	8	2023-04-11 09:21:09.173+02	2023-04-11 09:21:09.173+02
288	11120	construction, à l'extérieur, rénovation, structures nouvelles (par ex. réparation de toit, divers)	4	8	2023-04-11 09:21:09.174+02	2023-04-11 09:21:09.174+02
289	11125	travail de concierge, effort léger (par ex. nettoyer lavabos et toilettes, épousseter, passer l'aspirateur, nettoyage léger)	2.3	8	2023-04-11 09:21:09.175+02	2023-04-11 09:21:09.175+02
290	11126	travail de concierge, effort modéré (par ex. armoire électrique, balayer, passer la serpillère, sortir les poubelles, passer l'aspirateur)	3.8	8	2023-04-11 09:21:09.176+02	2023-04-11 09:21:09.176+02
291	11130	travaux d'électricité (par ex. brancher des fils, dériver-connecter)	3.3	8	2023-04-11 09:21:09.178+02	2023-04-11 09:21:09.178+02
292	11135	ingénieur (par ex. mécanique ou électrique)	1.8	8	2023-04-11 09:21:09.179+02	2023-04-11 09:21:09.179+02
293	11145	agriculture, effort vigoureux (par ex. fabriquer des bottes de foin, nettoyer une grange)	7.8	8	2023-04-11 09:21:09.18+02	2023-04-11 09:21:09.18+02
294	11146	agriculture, effort modéré (par ex. nourrir des animaux, regrouper du bétail à pied et/ou cheval, épandre du fumier, récolter des cultures)	4.8	8	2023-04-11 09:21:09.181+02	2023-04-11 09:21:09.181+02
295	11147	agriculture, effort léger (par ex. nettoyer des déjections animales, préparer de la nourriture pour animaux)	2	8	2023-04-11 09:21:09.181+02	2023-04-11 09:21:09.181+02
296	11170	agriculture, conduites (par ex. conduire un tracteur ou une moissonneuse)	2.8	8	2023-04-11 09:21:09.182+02	2023-04-11 09:21:09.182+02
297	11180	agriculture, alimenter de petits animaux	3.5	8	2023-04-11 09:21:09.183+02	2023-04-11 09:21:09.183+02
298	11190	agriculture, alimenter le bétail, les chevaux	4.3	8	2023-04-11 09:21:09.184+02	2023-04-11 09:21:09.184+02
299	11191	agriculture, transporter de l'eau pour les animaux, transporter de l'eau en général	4.3	8	2023-04-11 09:21:09.184+02	2023-04-11 09:21:09.184+02
300	11192	agriculture, s'occuper des animaux (par ex. toilettage, brossage, tonte des moutons, aide à la mise bas, soins médicaux, marquage), général	4.5	8	2023-04-11 09:21:09.185+02	2023-04-11 09:21:09.185+02
301	11195	agriculture, riz, plantation, activités de traitement du grain	3.8	8	2023-04-11 09:21:09.186+02	2023-04-11 09:21:09.186+02
302	11210	agriculture, traire à la main, nettoyage des seaux, effort modéré	3.5	8	2023-04-11 09:21:09.187+02	2023-04-11 09:21:09.187+02
303	11220	agriculture, traire à la machine, effort léger	1.3	8	2023-04-11 09:21:09.188+02	2023-04-11 09:21:09.188+02
304	11240	pompier, général	8	8	2023-04-11 09:21:09.189+02	2023-04-11 09:21:09.189+02
305	11244	pompier, secours de victime, accident automobile, utilisation d’une gaffe	6.8	8	2023-04-11 09:21:09.19+02	2023-04-11 09:21:09.19+02
306	11245	pompier, levage et montée de l’échelle avec l’équipement complet, exercice d’extinction de feu	8	8	2023-04-11 09:21:09.191+02	2023-04-11 09:21:09.191+02
429	15092	bowling, en intérieur, piste de bowling	3.8	10	2023-04-11 09:21:09.363+02	2023-04-11 09:21:09.363+02
307	11246	pompier, transport de tuyaux au sol, transport du matériel, ouverture de murs, etc., en portant l’équipement complet	9	8	2023-04-11 09:21:09.192+02	2023-04-11 09:21:09.192+02
308	11247	pêche, commerciale, effort léger	3.5	8	2023-04-11 09:21:09.193+02	2023-04-11 09:21:09.193+02
309	11248	pêche, commerciale, effort modéré	5	8	2023-04-11 09:21:09.194+02	2023-04-11 09:21:09.194+02
310	11249	pêche, commerciale, effort vigoureux	7	8	2023-04-11 09:21:09.195+02	2023-04-11 09:21:09.195+02
311	11250	foresterie, couper du bois à la hache, très vite, hache de 1,25 kg, 51 coups/minute, effort violent	17.5	8	2023-04-11 09:21:09.196+02	2023-04-11 09:21:09.196+02
312	11260	foresterie, couper du bois à la hache, lentement, hache de 1,25 kg, 19 coups/minute, effort modéré	5	8	2023-04-11 09:21:09.197+02	2023-04-11 09:21:09.197+02
313	11262	foresterie, couper du bois à la hache, vite, hache de 1,25 kg, 35 coups/minute, effort vigoureux	8	8	2023-04-11 09:21:09.198+02	2023-04-11 09:21:09.198+02
314	11264	foresterie, effort modéré (par ex. scier du bois à la tronçonneuse, désherber, biner)	4.5	8	2023-04-11 09:21:09.198+02	2023-04-11 09:21:09.198+02
315	11266	foresterie, effort vigoureux (par ex. écorcer, abattre ou élaguer des arbres, porter ou empiler des buches, planter des semences, scier du bois à la\nmain)	8	8	2023-04-11 09:21:09.199+02	2023-04-11 09:21:09.199+02
316	11370	pelleterie	4.5	8	2023-04-11 09:21:09.2+02	2023-04-11 09:21:09.2+02
317	11375	collecte d’ordures, marcher, verser des conteneurs dans un camion	4	8	2023-04-11 09:21:09.201+02	2023-04-11 09:21:09.201+02
318	11378	coiffeur (par ex. tresser des cheveux, manucurer, maquiller)	1.8	8	2023-04-11 09:21:09.204+02	2023-04-11 09:21:09.204+02
319	11380	palefrenier, nourrir des chevaux, nettoyer des stalles, laver, bouchonner, coiffer, faire travailler les chevaux à la longe ou les monter	7.3	8	2023-04-11 09:21:09.205+02	2023-04-11 09:21:09.205+02
320	11381	cheval, nourrir, abreuver, nettoyer des stalles, impliquant de marcher et porter des charges	4.3	8	2023-04-11 09:21:09.206+02	2023-04-11 09:21:09.206+02
321	11390	course de chevaux, galop	7.3	8	2023-04-11 09:21:09.207+02	2023-04-11 09:21:09.207+02
322	11400	course de chevaux, trot	5.8	8	2023-04-11 09:21:09.207+02	2023-04-11 09:21:09.207+02
323	11410	course de chevaux, pas	3.8	8	2023-04-11 09:21:09.208+02	2023-04-11 09:21:09.208+02
324	11413	cuisinière	3	8	2023-04-11 09:21:09.209+02	2023-04-11 09:21:09.209+02
325	11415	jardinier, jardinage, général	4	8	2023-04-11 09:21:09.21+02	2023-04-11 09:21:09.21+02
326	11418	blanchisseur	3.3	8	2023-04-11 09:21:09.211+02	2023-04-11 09:21:09.211+02
327	11420	serrurier	3	8	2023-04-11 09:21:09.211+02	2023-04-11 09:21:09.211+02
328	11430	travail à la machine (par ex. usinage, tôlerie, montage de machine, tournage, soudage), effort léger à modéré	3	8	2023-04-11 09:21:09.212+02	2023-04-11 09:21:09.212+02
329	11450	travail à la machine, utilisation d'une poinçonneuse, effort modéré	5	8	2023-04-11 09:21:09.213+02	2023-04-11 09:21:09.213+02
330	11472	gestionnaire, propriété	1.8	8	2023-04-11 09:21:09.214+02	2023-04-11 09:21:09.214+02
331	11475	travail manuel ou non qualifié, général, effort léger	2.8	8	2023-04-11 09:21:09.215+02	2023-04-11 09:21:09.215+02
332	11476	travail manuel ou non qualifié, général, effort modéré	4.5	8	2023-04-11 09:21:09.216+02	2023-04-11 09:21:09.216+02
333	11477	travail manuel ou non qualifié, général, effort vigoureux	6.5	8	2023-04-11 09:21:09.218+02	2023-04-11 09:21:09.218+02
334	11480	maçonnerie, béton, effort modéré	4.3	8	2023-04-11 09:21:09.218+02	2023-04-11 09:21:09.218+02
335	11482	maçonnerie, béton, effort léger	2.5	8	2023-04-11 09:21:09.219+02	2023-04-11 09:21:09.219+02
336	11485	massothérapeute, debout	4	8	2023-04-11 09:21:09.22+02	2023-04-11 09:21:09.22+02
337	11490	déplacer, porter ou pousser des objets lourds, 34 kg ou plus (par ex. bureaux, déménagement), périodes actives uniquement	7.5	8	2023-04-11 09:21:09.221+02	2023-04-11 09:21:09.221+02
338	11495	plongée sous-marine, homme-grenouille, commandos de marine	12	8	2023-04-11 09:21:09.221+02	2023-04-11 09:21:09.221+02
339	11500	utiliser un équipement de travail lourd, automatisé, sans conduire	2.5	8	2023-04-11 09:21:09.222+02	2023-04-11 09:21:09.222+02
340	11510	travail dans une orangeraie, cueillette des oranges	4.5	8	2023-04-11 09:21:09.223+02	2023-04-11 09:21:09.223+02
341	11514	peinture, maison, meubles, effort modéré	3.3	8	2023-04-11 09:21:09.224+02	2023-04-11 09:21:09.224+02
342	11516	activités de plomberie	3	8	2023-04-11 09:21:09.224+02	2023-04-11 09:21:09.224+02
343	11520	impression, travailleur de l'industrie du papier, debout	2	8	2023-04-11 09:21:09.226+02	2023-04-11 09:21:09.226+02
344	11525	police, faire la circulation, debout	2.5	8	2023-04-11 09:21:09.227+02	2023-04-11 09:21:09.227+02
345	11526	police, conduire un véhicule de police, assis	2.5	8	2023-04-11 09:21:09.228+02	2023-04-11 09:21:09.228+02
346	11527	police, être conduit dans un véhicule de police, assis	1.3	8	2023-04-11 09:21:09.23+02	2023-04-11 09:21:09.23+02
347	11528	police, effectuer une arrestation, debout	4	8	2023-04-11 09:21:09.231+02	2023-04-11 09:21:09.231+02
348	11529	postier, marcher pour livrer le courrier	2.3	8	2023-04-11 09:21:09.233+02	2023-04-11 09:21:09.233+02
349	11530	cordonnerie, général	2	8	2023-04-11 09:21:09.234+02	2023-04-11 09:21:09.234+02
350	11540	pelleter, creuser des fossés	7.8	8	2023-04-11 09:21:09.235+02	2023-04-11 09:21:09.235+02
351	11550	pelleter, plus de 7 kg/minute, en creusant profondément, effort vigoureux	8.8	8	2023-04-11 09:21:09.236+02	2023-04-11 09:21:09.236+02
352	11560	pelleter, moins de 4,5 kg/minute, effort modéré	5	8	2023-04-11 09:21:09.247+02	2023-04-11 09:21:09.247+02
353	11570	pelleter, 4,5-7 kg/minute, effort vigoureux	6.5	8	2023-04-11 09:21:09.248+02	2023-04-11 09:21:09.248+02
354	11580	travail assis, effort léger (par ex. travail de bureau, travail de laboratoire de chimie, travail sur ordinateur, réparation d’ensemble léger, réparation de\nmontre, lecture)	1.5	8	2023-04-11 09:21:09.249+02	2023-04-11 09:21:09.249+02
355	11585	être assis, réunions, effort léger, général, et/ou impliquant une discussion (par ex. déjeuner d'affaires)	1.5	8	2023-04-11 09:21:09.25+02	2023-04-11 09:21:09.25+02
356	11590	travail assis, effort modéré (par ex. pousser de lourds leviers, conduire une tondeuse/un chariot élévateur, commander une grue)	2.5	8	2023-04-11 09:21:09.251+02	2023-04-11 09:21:09.251+02
357	11593	être assis, enseigner le stretching ou le yoga, ou cours d’exercices légers	2.8	8	2023-04-11 09:21:09.252+02	2023-04-11 09:21:09.252+02
358	11600	être debout, effort léger (par ex. barman, employé de magasin, assemblage, remplissage, reproduction, bibliothécaire, installer un sapin de Noël,\nêtre debout et parler au travail, changer de vêtements lors de l'enseignement de l'éducation physique, debout)	3	8	2023-04-11 09:21:09.253+02	2023-04-11 09:21:09.253+02
359	11610	être debout, effort léger/modéré (par ex. assembler/réparer des pièces lourdes, souder, stocker des pièces, réparer des automobiles, être debout,\nemballer des objets, soins infirmiers à des patients)	3	8	2023-04-11 09:21:09.253+02	2023-04-11 09:21:09.253+02
360	11615	être debout, effort modéré, soulever des articles en permanence, 5–10 kg, avec une marche limitée ou sur place	4.5	8	2023-04-11 09:21:09.254+02	2023-04-11 09:21:09.254+02
361	11620	être debout, effort modéré, levage intermittent de 23 kg, nouer/lover des cordages	3.5	8	2023-04-11 09:21:09.255+02	2023-04-11 09:21:09.255+02
362	11630	être debout, effort modéré/important (par ex. soulever plus de 23 kg, maçonner, peindre, tapisser)	4.5	8	2023-04-11 09:21:09.256+02	2023-04-11 09:21:09.256+02
363	11708	aciérie, effort modéré (par ex. ébarber, forger, retourner des moules)	5.3	8	2023-04-11 09:21:09.257+02	2023-04-11 09:21:09.257+02
364	11710	aciérie, effort vigoureux (par ex. laminer à la main, laminer des aciers marchands, enlever des scories, alimenter un four)	8.3	8	2023-04-11 09:21:09.258+02	2023-04-11 09:21:09.258+02
365	11720	confection, coupe de tissu	2.3	8	2023-04-11 09:21:09.259+02	2023-04-11 09:21:09.259+02
366	11730	confection, général	2.5	8	2023-04-11 09:21:09.264+02	2023-04-11 09:21:09.264+02
367	11740	confection, coudre à la main	1.8	8	2023-04-11 09:21:09.271+02	2023-04-11 09:21:09.271+02
368	11750	confection, coudre à la machine	2.5	8	2023-04-11 09:21:09.272+02	2023-04-11 09:21:09.272+02
369	11760	confection, pressing	3.5	8	2023-04-11 09:21:09.273+02	2023-04-11 09:21:09.273+02
370	11763	confection, tisser, effort léger (par ex. opérations de finition, lavage, teinture, visite, métrage, paperasse)	2	8	2023-04-11 09:21:09.274+02	2023-04-11 09:21:09.274+02
371	11765	confection, tissage, effort modéré (par ex. opérations de filage et tissage, apporter des boîtes de fil aux filateurs, chargement d’ensouple de chaîne,\nbobinage, ourdissage, découpe de tissu)	4	8	2023-04-11 09:21:09.275+02	2023-04-11 09:21:09.275+02
372	11766	conduite de camion, chargement et déchargement du camion, arrimage de la charge, marcher en portant des charges lourdes	6.5	8	2023-04-11 09:21:09.277+02	2023-04-11 09:21:09.277+02
373	11767	camion, conduire un camion de livraison, un taxi, un bus navette, un bus scolaire	2	8	2023-04-11 09:21:09.278+02	2023-04-11 09:21:09.278+02
374	11770	taper des documents avec une machine à écrire électrique, mécanique ou un ordinateur	1.3	8	2023-04-11 09:21:09.278+02	2023-04-11 09:21:09.278+02
375	11780	utiliser des outils motorisés lourds tels que des outils pneumatiques (par ex. marteaux-piqueurs, foreuses)	6.3	8	2023-04-11 09:21:09.279+02	2023-04-11 09:21:09.279+02
376	11790	utiliser des outils lourds (non motorisés) tels que des pelles, des pioches, des barres à mine, des bêches	8	8	2023-04-11 09:21:09.289+02	2023-04-11 09:21:09.289+02
377	11791	marcher au travail, à moins de 3,5 km/h, dans un bureau ou laboratoire, rythme très lent	2	8	2023-04-11 09:21:09.295+02	2023-04-11 09:21:09.295+02
378	11792	marcher au travail à 5 km/h, dans un bureau, rythme modéré, sans rien porter	3.5	8	2023-04-11 09:21:09.296+02	2023-04-11 09:21:09.296+02
379	11793	marcher au travail à 6 km/h, dans un bureau, rythme rapide, sans rien porter	4.3	8	2023-04-11 09:21:09.297+02	2023-04-11 09:21:09.297+02
380	11795	marcher au travail, à 3 km/h, rythme lent, en portant des objets légers pesant moins de 11 kg	3.5	8	2023-04-11 09:21:09.298+02	2023-04-11 09:21:09.298+02
381	11796	marcher, ranger des affaires au travail, se préparer à partir	3	8	2023-04-11 09:21:09.299+02	2023-04-11 09:21:09.299+02
382	11797	marcher, à 4 km/h, rythme lent, en portant des objets lourds de plus de 11 kg	3.8	8	2023-04-11 09:21:09.3+02	2023-04-11 09:21:09.3+02
383	11800	marcher à 5 km/h, rythme modéré, en portant des objets légers de moins de 11 kg	4.5	8	2023-04-11 09:21:09.301+02	2023-04-11 09:21:09.301+02
384	11805	marcher, pousser un fauteuil roulant	3.5	8	2023-04-11 09:21:09.302+02	2023-04-11 09:21:09.302+02
385	11810	marcher à 6 km/h, rythme rapide, en portant des objets pesant moins de 11 kg	4.8	8	2023-04-11 09:21:09.303+02	2023-04-11 09:21:09.303+02
386	11820	marcher ou descendre des escaliers ou se tenir debout en portant des objets pesant de 11 à 22 kg	5	8	2023-04-11 09:21:09.304+02	2023-04-11 09:21:09.304+02
387	11830	marcher ou descendre des escaliers ou se tenir debout en portant des objets pesant de 22 à 33 kg	6.5	8	2023-04-11 09:21:09.305+02	2023-04-11 09:21:09.305+02
388	11840	marcher ou descendre des escaliers ou se tenir debout en portant des objets pesant de 33 à 45 kg	7.5	8	2023-04-11 09:21:09.306+02	2023-04-11 09:21:09.306+02
389	11850	marcher ou descendre des escaliers ou se tenir debout en portant des objets pesant de 45 kg ou plus	8.5	8	2023-04-11 09:21:09.307+02	2023-04-11 09:21:09.307+02
390	11870	employé d'un magasin de décor, acteur de théâtre, technicien de coulisses	3	8	2023-04-11 09:21:09.307+02	2023-04-11 09:21:09.307+02
391	12010	combinaison jogging/marche (composant jogging inférieur à 10 minutes) (code Taylor 180)	6	9	2023-04-11 09:21:09.308+02	2023-04-11 09:21:09.308+02
392	12020	jogging, général	7	9	2023-04-11 09:21:09.309+02	2023-04-11 09:21:09.309+02
393	12025	jogging, sur-place	8	9	2023-04-11 09:21:09.31+02	2023-04-11 09:21:09.31+02
394	12027	jogging, sur un mini-trampoline	4.5	9	2023-04-11 09:21:09.311+02	2023-04-11 09:21:09.311+02
395	12029	courir à 6,5 km/h (9 min/km)	6	9	2023-04-11 09:21:09.312+02	2023-04-11 09:21:09.312+02
396	12030	courir à 8 km/h (7,5 min/km)	8.3	9	2023-04-11 09:21:09.318+02	2023-04-11 09:21:09.318+02
397	12040	courir à 8,4 km/h (7,3 min/km)	9	9	2023-04-11 09:21:09.319+02	2023-04-11 09:21:09.319+02
398	12050	courir à 9,6 km/h (6,25 min/km)	9.8	9	2023-04-11 09:21:09.32+02	2023-04-11 09:21:09.32+02
399	12060	courir à 10.8 km/h (5,5 min/km)	10.5	9	2023-04-11 09:21:09.32+02	2023-04-11 09:21:09.32+02
400	12070	courir à 11,25 km/h (5,3 min/km)	11	9	2023-04-11 09:21:09.321+02	2023-04-11 09:21:09.321+02
401	12080	courir à 12 km/h (5 min/km)	11.5	9	2023-04-11 09:21:09.322+02	2023-04-11 09:21:09.322+02
402	12090	courir à 12,9 km/h (4,65 min/km)	11.8	9	2023-04-11 09:21:09.322+02	2023-04-11 09:21:09.322+02
403	12100	courir à 13,8 km/h (4,3 min/km)	12.3	9	2023-04-11 09:21:09.323+02	2023-04-11 09:21:09.323+02
404	12110	courir à 14,5 km/h (4,1 min/km)	12.8	9	2023-04-11 09:21:09.324+02	2023-04-11 09:21:09.324+02
405	12120	courir à 16 km/h (3,75 min/km)	14.5	9	2023-04-11 09:21:09.325+02	2023-04-11 09:21:09.325+02
406	12130	courir à 17,7 km/h (3,4 min/km)	16	9	2023-04-11 09:21:09.326+02	2023-04-11 09:21:09.326+02
407	12132	courir à 19,3 km/h (3,1 min/km)	19	9	2023-04-11 09:21:09.327+02	2023-04-11 09:21:09.327+02
408	12134	courir à 20,9 km/h (2,9 min/km)	19.8	9	2023-04-11 09:21:09.328+02	2023-04-11 09:21:09.328+02
409	12135	courir à 22,5 km/h (2,66 min/km)	23	9	2023-04-11 09:21:09.329+02	2023-04-11 09:21:09.329+02
410	12140	courir, cross	9	9	2023-04-11 09:21:09.33+02	2023-04-11 09:21:09.33+02
411	12150	courir (code Taylor 200)	8	9	2023-04-11 09:21:09.33+02	2023-04-11 09:21:09.33+02
412	12170	courir, escaliers, montée	15	9	2023-04-11 09:21:09.335+02	2023-04-11 09:21:09.335+02
413	12180	courir, sur une piste, entraînement d’équipe	10	9	2023-04-11 09:21:09.336+02	2023-04-11 09:21:09.336+02
414	12190	courir, entraînement, pousser un fauteuil roulant ou landau	8	9	2023-04-11 09:21:09.337+02	2023-04-11 09:21:09.337+02
415	12200	courir, marathon	13.3	9	2023-04-11 09:21:09.338+02	2023-04-11 09:21:09.338+02
416	15000	jeux traditionnels d’Alaska, épreuves olympiques esquimaudes, général	5.5	10	2023-04-11 09:21:09.339+02	2023-04-11 09:21:09.339+02
417	15010	tir à l'arc, hors chasse	4.3	10	2023-04-11 09:21:09.34+02	2023-04-11 09:21:09.34+02
418	15020	badminton, compétition (code Taylor 450)	7	10	2023-04-11 09:21:09.34+02	2023-04-11 09:21:09.34+02
419	15030	badminton, double ou simple, général	5.5	10	2023-04-11 09:21:09.342+02	2023-04-11 09:21:09.342+02
420	15040	basket-ball, match (code Taylor 490)	8	10	2023-04-11 09:21:09.352+02	2023-04-11 09:21:09.352+02
421	15050	basket-ball, hors match, général (code Taylor 480)	6	10	2023-04-11 09:21:09.353+02	2023-04-11 09:21:09.353+02
422	15055	basket-ball, général	6.5	10	2023-04-11 09:21:09.354+02	2023-04-11 09:21:09.354+02
423	15060	basket-ball, arbitrage (code Taylor 500)	7	10	2023-04-11 09:21:09.355+02	2023-04-11 09:21:09.355+02
424	15070	basket-ball, tir au panier	4.5	10	2023-04-11 09:21:09.356+02	2023-04-11 09:21:09.356+02
425	15072	basket-ball, exercices, entraînement	9.3	10	2023-04-11 09:21:09.358+02	2023-04-11 09:21:09.358+02
426	15075	basket-ball, fauteuil roulant	7.8	10	2023-04-11 09:21:09.359+02	2023-04-11 09:21:09.359+02
427	15080	billard	2.5	10	2023-04-11 09:21:09.361+02	2023-04-11 09:21:09.361+02
432	15120	boxe, entraînement (sparring-partner)	7.8	10	2023-04-11 09:21:09.37+02	2023-04-11 09:21:09.37+02
433	15130	ballon-balai	7	10	2023-04-11 09:21:09.372+02	2023-04-11 09:21:09.372+02
434	15135	jeux d’enfants, jeux d’adultes (par ex. marelle, 4-square, ballon prisonnier, équipement de cours de récréation, t-ball, spirobole, billes, jeux\nd'arcade), effort modéré	5.8	10	2023-04-11 09:21:09.372+02	2023-04-11 09:21:09.372+02
435	15138	majorette, mouvements de gymnastique, compétition	6	10	2023-04-11 09:21:09.373+02	2023-04-11 09:21:09.373+02
436	15140	entraîner, football, football américain, basketball, baseball, natation, etc.	4	10	2023-04-11 09:21:09.374+02	2023-04-11 09:21:09.374+02
437	15142	entraîner, jouer activement à un sport avec des joueurs	8	10	2023-04-11 09:21:09.375+02	2023-04-11 09:21:09.375+02
438	15150	cricket, frappe, service, défense	4.8	10	2023-04-11 09:21:09.377+02	2023-04-11 09:21:09.377+02
439	15160	croquet	3.3	10	2023-04-11 09:21:09.378+02	2023-04-11 09:21:09.378+02
440	15170	curling	4	10	2023-04-11 09:21:09.38+02	2023-04-11 09:21:09.38+02
441	15190	course de dragster, pousser ou conduire une voiture	6	10	2023-04-11 09:21:09.384+02	2023-04-11 09:21:09.384+02
442	15192	course de voiture, monoplace	8.5	10	2023-04-11 09:21:09.385+02	2023-04-11 09:21:09.385+02
443	15200	escrime	6	10	2023-04-11 09:21:09.386+02	2023-04-11 09:21:09.386+02
444	15210	football américain, compétition	8	10	2023-04-11 09:21:09.387+02	2023-04-11 09:21:09.387+02
445	15230	football américain, touch, flag, général (code Taylor 510)	8	10	2023-04-11 09:21:09.388+02	2023-04-11 09:21:09.388+02
446	15232	football américain, touch, flag, effort léger	4	10	2023-04-11 09:21:09.389+02	2023-04-11 09:21:09.389+02
447	15235	football américain ou baseball, jeu de balle	2.5	10	2023-04-11 09:21:09.39+02	2023-04-11 09:21:09.39+02
448	15240	frisbee, général	3	10	2023-04-11 09:21:09.391+02	2023-04-11 09:21:09.391+02
449	15250	frisbee, ultimate	8	10	2023-04-11 09:21:09.394+02	2023-04-11 09:21:09.394+02
450	15255	golf, général	4.8	10	2023-04-11 09:21:09.395+02	2023-04-11 09:21:09.395+02
451	15265	golf, marcher, porter des clubs	4.3	10	2023-04-11 09:21:09.396+02	2023-04-11 09:21:09.396+02
452	15270	golf, minigolf, practice	3	10	2023-04-11 09:21:09.397+02	2023-04-11 09:21:09.397+02
453	15285	golf, marcher, tirer des clubs	5.3	10	2023-04-11 09:21:09.399+02	2023-04-11 09:21:09.399+02
454	15290	golf, avec un chariot électrique (code Taylor 070)	3.5	10	2023-04-11 09:21:09.399+02	2023-04-11 09:21:09.399+02
455	15300	gymnastique, général	3.8	10	2023-04-11 09:21:09.4+02	2023-04-11 09:21:09.4+02
456	15310	footbag	4	10	2023-04-11 09:21:09.401+02	2023-04-11 09:21:09.401+02
457	15320	handball, général (code Taylor 520)	12	10	2023-04-11 09:21:09.402+02	2023-04-11 09:21:09.402+02
458	15330	handball, équipe	8	10	2023-04-11 09:21:09.403+02	2023-04-11 09:21:09.403+02
459	15335	accrobranches, éléments multiples	4	10	2023-04-11 09:21:09.406+02	2023-04-11 09:21:09.406+02
460	15340	deltaplane	3.5	10	2023-04-11 09:21:09.407+02	2023-04-11 09:21:09.407+02
461	15350	hockey, sur gazon	7.8	10	2023-04-11 09:21:09.408+02	2023-04-11 09:21:09.408+02
462	15360	hockey sur glace, général	8	10	2023-04-11 09:21:09.41+02	2023-04-11 09:21:09.41+02
463	15362	hockey sur glace, compétition	10	10	2023-04-11 09:21:09.411+02	2023-04-11 09:21:09.411+02
464	15370	équitation, général	5.5	10	2023-04-11 09:21:09.412+02	2023-04-11 09:21:09.412+02
465	15375	toilettage de cheval, donner à manger, à boire, nettoyer les étables avec marche et port de charges	4.3	10	2023-04-11 09:21:09.413+02	2023-04-11 09:21:09.413+02
466	15380	seller, nettoyer, toiletter, poser et retirer le harnais d’un cheval	4.5	10	2023-04-11 09:21:09.414+02	2023-04-11 09:21:09.414+02
467	15390	équitation, trot	5.8	10	2023-04-11 09:21:09.415+02	2023-04-11 09:21:09.415+02
468	15395	équitation, petit ou grand galop	7.3	10	2023-04-11 09:21:09.416+02	2023-04-11 09:21:09.416+02
469	15400	équitation, pas	3.8	10	2023-04-11 09:21:09.42+02	2023-04-11 09:21:09.42+02
470	15402	équitation, saut d’obstacles	9	10	2023-04-11 09:21:09.421+02	2023-04-11 09:21:09.421+02
471	15408	charrette à cheval, conduire, être debout ou assis	1.8	10	2023-04-11 09:21:09.422+02	2023-04-11 09:21:09.422+02
472	15410	lancer de fer à cheval, quoits	3	10	2023-04-11 09:21:09.423+02	2023-04-11 09:21:09.423+02
473	15420	pelote basque	12	10	2023-04-11 09:21:09.424+02	2023-04-11 09:21:09.424+02
474	15425	arts martiaux, différents types, rythme lent, débutants, entraînement	5.3	10	2023-04-11 09:21:09.425+02	2023-04-11 09:21:09.425+02
475	15430	arts martiaux, différents types, rythme modéré (par ex. judo, ju-jitsu, karaté, kick-boxing, taekwondo, tai-bo, boxe thaïe)	10.3	10	2023-04-11 09:21:09.426+02	2023-04-11 09:21:09.426+02
476	15440	jonglage	4	10	2023-04-11 09:21:09.427+02	2023-04-11 09:21:09.427+02
477	15450	kickball	7	10	2023-04-11 09:21:09.428+02	2023-04-11 09:21:09.428+02
478	15460	crosse	8	10	2023-04-11 09:21:09.429+02	2023-04-11 09:21:09.429+02
479	15465	boulingrin, pétanque, activité extérieure	3.3	10	2023-04-11 09:21:09.43+02	2023-04-11 09:21:09.43+02
480	15470	moto-cross, sports automobiles sur circuit, véhicule tous terrains, général	4	10	2023-04-11 09:21:09.431+02	2023-04-11 09:21:09.431+02
481	15480	course d'orientation	9	10	2023-04-11 09:21:09.432+02	2023-04-11 09:21:09.432+02
482	15490	jokari, compétition	10	10	2023-04-11 09:21:09.433+02	2023-04-11 09:21:09.433+02
483	15500	jokari, loisirs, général (code Taylor 460)	6	10	2023-04-11 09:21:09.434+02	2023-04-11 09:21:09.434+02
484	15510	polo	8	10	2023-04-11 09:21:09.435+02	2023-04-11 09:21:09.435+02
485	15520	racquetball, compétition	10	10	2023-04-11 09:21:09.436+02	2023-04-11 09:21:09.436+02
486	15530	racquetball, général (code Taylor 470)	7	10	2023-04-11 09:21:09.437+02	2023-04-11 09:21:09.437+02
487	15533	escalade, varappe (code Taylor 470) (ancien code = 17120)	8	10	2023-04-11 09:21:09.438+02	2023-04-11 09:21:09.438+02
488	15535	escalade, varappe, grande difficulté	7.5	10	2023-04-11 09:21:09.439+02	2023-04-11 09:21:09.439+02
489	15537	escalade, varappe, difficulté faible à modérée	5.8	10	2023-04-11 09:21:09.44+02	2023-04-11 09:21:09.44+02
490	15540	escalade, descente en rappel	5	10	2023-04-11 09:21:09.441+02	2023-04-11 09:21:09.441+02
491	15542	rodéo, général, effort léger	4	10	2023-04-11 09:21:09.442+02	2023-04-11 09:21:09.442+02
492	15544	rodéo, général, effort modéré	5.5	10	2023-04-11 09:21:09.443+02	2023-04-11 09:21:09.443+02
493	15546	rodéo, général, effort vigoureux	7	10	2023-04-11 09:21:09.444+02	2023-04-11 09:21:09.444+02
494	15550	corde à sauter, rythme rapide, 120-160 sauts/min	12.3	10	2023-04-11 09:21:09.445+02	2023-04-11 09:21:09.445+02
495	15551	corde à sauter, rythme modéré, 100-120 sauts/min, général, saut de 60 cm, saut simple	11.8	10	2023-04-11 09:21:09.446+02	2023-04-11 09:21:09.446+02
496	15552	corde à sauter, rythme lent, < 100 sauts/min, saut de 60 cm, saut rythmé	8.8	10	2023-04-11 09:21:09.447+02	2023-04-11 09:21:09.447+02
497	15560	rugby à quinze, équipe, compétition	8.3	10	2023-04-11 09:21:09.447+02	2023-04-11 09:21:09.447+02
498	15562	rugby, touch, hors compétition	6.3	10	2023-04-11 09:21:09.448+02	2023-04-11 09:21:09.448+02
499	15570	jeu de palets	3	10	2023-04-11 09:21:09.449+02	2023-04-11 09:21:09.449+02
500	15580	skate, général, effort modéré	5	10	2023-04-11 09:21:09.45+02	2023-04-11 09:21:09.45+02
501	15582	skate, compétition, effort vigoureux	6	10	2023-04-11 09:21:09.451+02	2023-04-11 09:21:09.451+02
502	15590	patin à roulettes (code Taylor 360)	7	10	2023-04-11 09:21:09.452+02	2023-04-11 09:21:09.452+02
503	15591	roller, patin en ligne, 14,4 km/h, rythme loisir	7.5	10	2023-04-11 09:21:09.452+02	2023-04-11 09:21:09.452+02
504	15592	roller, patin en ligne, 17,7 km/h, rythme modéré, exercice d’entraînement	9.8	10	2023-04-11 09:21:09.453+02	2023-04-11 09:21:09.453+02
505	15593	roller, patin en ligne, 21 à 21,7 km/h, rythme rapide, exercice d’entraînement	12.3	10	2023-04-11 09:21:09.454+02	2023-04-11 09:21:09.454+02
506	15594	roller, patin en ligne, 24,0 km/h, effort maximal	14	10	2023-04-11 09:21:09.455+02	2023-04-11 09:21:09.455+02
507	15600	saut en parachute, saut d’un point fixe, saut à l’élastique	3.5	10	2023-04-11 09:21:09.456+02	2023-04-11 09:21:09.456+02
508	15605	football, compétition	10	10	2023-04-11 09:21:09.457+02	2023-04-11 09:21:09.457+02
509	15610	football, loisirs, général (code Taylor 540)	7	10	2023-04-11 09:21:09.458+02	2023-04-11 09:21:09.458+02
510	15620	softball ou baseball, lancer rapide ou lent, général (code Taylor 440)	5	10	2023-04-11 09:21:09.459+02	2023-04-11 09:21:09.459+02
511	15625	softball, entraînement	4	10	2023-04-11 09:21:09.461+02	2023-04-11 09:21:09.461+02
512	15630	softball, arbitrage	4	10	2023-04-11 09:21:09.462+02	2023-04-11 09:21:09.462+02
513	15640	softball, lancer	6	10	2023-04-11 09:21:09.464+02	2023-04-11 09:21:09.464+02
514	15645	spectateur de sport, très excité, passionné, mouvements physiques	3.3	10	2023-04-11 09:21:09.466+02	2023-04-11 09:21:09.466+02
515	15650	squash (code Taylor 530)	12	10	2023-04-11 09:21:09.468+02	2023-04-11 09:21:09.468+02
516	15652	squash, général	7.3	10	2023-04-11 09:21:09.469+02	2023-04-11 09:21:09.469+02
517	15660	tennis de table, ping-pong (code Taylor 410)	4	10	2023-04-11 09:21:09.471+02	2023-04-11 09:21:09.471+02
518	15670	tai chi, qi gong, général	3	10	2023-04-11 09:21:09.472+02	2023-04-11 09:21:09.472+02
519	15672	tai chi, qi gong, position assise, effort léger	1.5	10	2023-04-11 09:21:09.473+02	2023-04-11 09:21:09.473+02
520	15675	tennis, général	7.3	10	2023-04-11 09:21:09.474+02	2023-04-11 09:21:09.474+02
521	15680	tennis, double, (code Taylor 430)	6	10	2023-04-11 09:21:09.476+02	2023-04-11 09:21:09.476+02
522	15685	tennis, double	4.5	10	2023-04-11 09:21:09.477+02	2023-04-11 09:21:09.477+02
523	15690	tennis, simple, (code Taylor 420)	8	10	2023-04-11 09:21:09.479+02	2023-04-11 09:21:09.479+02
524	15695	tennis, frapper la balle, jeu récréatif, effort modéré	5	10	2023-04-11 09:21:09.48+02	2023-04-11 09:21:09.48+02
525	15700	trampoline, récréatif	3.5	10	2023-04-11 09:21:09.481+02	2023-04-11 09:21:09.481+02
526	15702	trampoline, compétition	4.5	10	2023-04-11 09:21:09.483+02	2023-04-11 09:21:09.483+02
527	15710	volley-ball (code Taylor 400)	4	10	2023-04-11 09:21:09.484+02	2023-04-11 09:21:09.484+02
528	15711	volley-ball, compétition, gymnase	6	10	2023-04-11 09:21:09.486+02	2023-04-11 09:21:09.486+02
529	15720	volley-ball, hors compétition, équipe de 6-9 joueurs, général	3	10	2023-04-11 09:21:09.488+02	2023-04-11 09:21:09.488+02
530	15725	beach-volley, dans le sable	8	10	2023-04-11 09:21:09.497+02	2023-04-11 09:21:09.497+02
531	15730	lutte (un match = 5 minutes)	6	10	2023-04-11 09:21:09.5+02	2023-04-11 09:21:09.5+02
532	15731	wallyball, général	7	10	2023-04-11 09:21:09.502+02	2023-04-11 09:21:09.502+02
533	15732	athlétisme (par ex. lancer de poids, lancer de disque, lancer de marteau)	4	10	2023-04-11 09:21:09.505+02	2023-04-11 09:21:09.505+02
534	15733	athlétisme (par ex. saut en hauteur, saut en longueur, triple saut, lancer de javelot, saut à la perche)	6	10	2023-04-11 09:21:09.508+02	2023-04-11 09:21:09.508+02
535	15734	athlétisme (par ex. steeple, course de haies)	10	10	2023-04-11 09:21:09.51+02	2023-04-11 09:21:09.51+02
536	17010	randonnée (code Taylor 050)	7	11	2023-04-11 09:21:09.511+02	2023-04-11 09:21:09.511+02
537	17012	randonnée ou marche organisée avec un sac à dos	7.8	11	2023-04-11 09:21:09.513+02	2023-04-11 09:21:09.513+02
538	17020	porter une charge de 7 kg (par ex. valise), à plat ou en descendant des escaliers	5	11	2023-04-11 09:21:09.515+02	2023-04-11 09:21:09.515+02
539	17021	porter un enfant de 7 kg, marche lente	2.3	11	2023-04-11 09:21:09.522+02	2023-04-11 09:21:09.522+02
540	17025	porter une charge en montant des escaliers, général	8.3	11	2023-04-11 09:21:09.524+02	2023-04-11 09:21:09.524+02
541	17026	porter une charge de 0,5-7 kg en montant des escaliers	5	11	2023-04-11 09:21:09.526+02	2023-04-11 09:21:09.526+02
542	17027	porter une charge de 7-11 kg en montant des escaliers	6	11	2023-04-11 09:21:09.528+02	2023-04-11 09:21:09.528+02
543	17028	porter une charge de 11-22 kg en montant des escaliers	8	11	2023-04-11 09:21:09.533+02	2023-04-11 09:21:09.533+02
544	17029	porter une charge de 22-33 kg en montant des escaliers	10	11	2023-04-11 09:21:09.535+02	2023-04-11 09:21:09.535+02
545	17030	porter une charge > 34 kg en montant des escaliers	12	11	2023-04-11 09:21:09.536+02	2023-04-11 09:21:09.536+02
546	17031	charger/décharger une voiture impliquant de la marche	3.5	11	2023-04-11 09:21:09.538+02	2023-04-11 09:21:09.538+02
547	17033	randonner en collines, sans charge	6.3	11	2023-04-11 09:21:09.541+02	2023-04-11 09:21:09.541+02
548	17035	randonner en collines en portant une charge de 0 à 4 kg	6.5	11	2023-04-11 09:21:09.542+02	2023-04-11 09:21:09.542+02
549	17040	randonner en collines en portant une charge de 4,5 à 9 kg	7.3	11	2023-04-11 09:21:09.544+02	2023-04-11 09:21:09.544+02
550	17050	randonner en collines en portant une charge de 9,5 à 19 kg	8.3	11	2023-04-11 09:21:09.546+02	2023-04-11 09:21:09.546+02
551	17060	randonner en collines en portant une charge supérieure à 19 kg	9	11	2023-04-11 09:21:09.547+02	2023-04-11 09:21:09.547+02
552	17070	descendre des escaliers	3.5	11	2023-04-11 09:21:09.549+02	2023-04-11 09:21:09.549+02
553	17080	randonnée, à travers champs (code Taylor 040)	6	11	2023-04-11 09:21:09.553+02	2023-04-11 09:21:09.553+02
554	17082	randonner ou marcher à allure normale à travers champs et versants de colline	5.3	11	2023-04-11 09:21:09.555+02	2023-04-11 09:21:09.555+02
555	17085	admirer les oiseaux, marche lente	2.5	11	2023-04-11 09:21:09.558+02	2023-04-11 09:21:09.558+02
556	17088	marche militaire, vitesse modérée, sans sac	4.5	11	2023-04-11 09:21:09.56+02	2023-04-11 09:21:09.56+02
557	17090	marche militaire rapide, sans sac	8	11	2023-04-11 09:21:09.561+02	2023-04-11 09:21:09.561+02
558	17100	pousser ou tirer une poussette avec un enfant ou marcher avec des enfants, 4 à 5 km/h	4	11	2023-04-11 09:21:09.563+02	2023-04-11 09:21:09.563+02
559	17105	pousser un fauteuil roulant, cadre privé	3.8	11	2023-04-11 09:21:09.564+02	2023-04-11 09:21:09.564+02
560	17110	marche athlétique	6.5	11	2023-04-11 09:21:09.566+02	2023-04-11 09:21:09.566+02
561	17130	monter des escaliers, utiliser ou monter sur une échelle (code Taylor 030)	8	11	2023-04-11 09:21:09.569+02	2023-04-11 09:21:09.569+02
562	17133	monter des escaliers, rythme lent	4	11	2023-04-11 09:21:09.571+02	2023-04-11 09:21:09.571+02
563	17134	monter des escaliers, rythme rapide	8.8	11	2023-04-11 09:21:09.573+02	2023-04-11 09:21:09.573+02
564	17140	utiliser des béquilles	5	11	2023-04-11 09:21:09.575+02	2023-04-11 09:21:09.575+02
565	17150	marcher à la maison	2	11	2023-04-11 09:21:09.576+02	2023-04-11 09:21:09.576+02
566	17151	marcher à moins de 3 km/h, à plat, flâner, rythme très lent	2	11	2023-04-11 09:21:09.577+02	2023-04-11 09:21:09.577+02
567	17152	marcher à 3 km/h, à plat, rythme lent, sol ferme	2.8	11	2023-04-11 09:21:09.578+02	2023-04-11 09:21:09.578+02
568	17160	marcher pour le plaisir (code Taylor 010)	3.5	11	2023-04-11 09:21:09.58+02	2023-04-11 09:21:09.58+02
569	17161	marcher de la maison à la voiture ou au bus, de la voiture ou du bus vers d'autres endroits, de la voiture ou du bus vers et depuis le lieu de travail	2.5	11	2023-04-11 09:21:09.581+02	2023-04-11 09:21:09.581+02
570	17162	marcher vers la maison du voisin ou la maison familiale dans un but social	2.5	11	2023-04-11 09:21:09.583+02	2023-04-11 09:21:09.583+02
571	17165	promener le chien	3	11	2023-04-11 09:21:09.584+02	2023-04-11 09:21:09.584+02
572	17170	marcher à 4 km/h, à plat, sol ferme	3	11	2023-04-11 09:21:09.585+02	2023-04-11 09:21:09.585+02
573	17180	marcher à 4 km/h, en descente	3.3	11	2023-04-11 09:21:09.587+02	2023-04-11 09:21:09.587+02
574	17190	marcher à 4,5-5 km/h, à plat, rythme modéré, sol ferme	3.5	11	2023-04-11 09:21:09.588+02	2023-04-11 09:21:09.588+02
575	17200	marcher à 5,5 km/h, à plat, rythme rapide, sol ferme, marcher pour faire de l'exercice	4.3	11	2023-04-11 09:21:09.59+02	2023-04-11 09:21:09.59+02
576	17210	marcher à 4,5-5,5 km/h, en montée de 1 à 5 %	5.3	11	2023-04-11 09:21:09.592+02	2023-04-11 09:21:09.592+02
577	17211	marcher à 4,5-5,5 km/h, en montée de 6-15 %	8	11	2023-04-11 09:21:09.593+02	2023-04-11 09:21:09.593+02
578	17220	marcher à 6,5 km/h, à plat, sol ferme, rythme très rapide	5	11	2023-04-11 09:21:09.594+02	2023-04-11 09:21:09.594+02
579	17230	marcher à 7 km/h, à plat, sol ferme, rythme extrêmement rapide	7	11	2023-04-11 09:21:09.596+02	2023-04-11 09:21:09.596+02
580	17231	marcher à 8 km/h, à plat, sol ferme	8.3	11	2023-04-11 09:21:09.597+02	2023-04-11 09:21:09.597+02
581	17235	marcher à 8 km/h, en montée de 3 %	9.8	11	2023-04-11 09:21:09.599+02	2023-04-11 09:21:09.599+02
582	17250	marcher pour le plaisir, pause de travail	3.5	11	2023-04-11 09:21:09.6+02	2023-04-11 09:21:09.6+02
583	17260	marcher dans l'herbe	4.8	11	2023-04-11 09:21:09.601+02	2023-04-11 09:21:09.601+02
584	17262	marcher à un rythme normal, dans un champ labouré ou dans du sable	4.5	11	2023-04-11 09:21:09.608+02	2023-04-11 09:21:09.608+02
585	17270	marcher pour aller au travail ou à l'école (code Taylor 015)	4	11	2023-04-11 09:21:09.615+02	2023-04-11 09:21:09.615+02
586	17280	marcher vers et depuis une dépendance	2.5	11	2023-04-11 09:21:09.616+02	2023-04-11 09:21:09.616+02
587	17302	marcher pour l’exercice à 5,5-6,5 km/h avec des bâtons de ski, marche nordique, à plat, rythme modéré	4.8	11	2023-04-11 09:21:09.618+02	2023-04-11 09:21:09.618+02
588	17305	marcher pour l’exercice à 8 km/h avec des bâtons de ski, marche nordique, à plat, rythme rapide	9.5	11	2023-04-11 09:21:09.62+02	2023-04-11 09:21:09.62+02
589	17310	marcher pour l’exercice avec des bâtons de ski, marche nordique, en montée	6.8	11	2023-04-11 09:21:09.621+02	2023-04-11 09:21:09.621+02
590	17320	marcher, en arrière, 5,5 km/h, à plat	6	11	2023-04-11 09:21:09.623+02	2023-04-11 09:21:09.623+02
591	17325	marcher, en arrière à 5,5 km/h, en montée de 5%	8	11	2023-04-11 09:21:09.624+02	2023-04-11 09:21:09.624+02
592	18010	navigation, au moteur, barrer	2.5	12	2023-04-11 09:21:09.626+02	2023-04-11 09:21:09.626+02
593	18012	navigation, au moteur, passager, effort léger	1.3	12	2023-04-11 09:21:09.628+02	2023-04-11 09:21:09.628+02
594	18020	canoë, pendant une randonnée avec camping (code Taylor 270)	4	12	2023-04-11 09:21:09.63+02	2023-04-11 09:21:09.63+02
595	18025	canoë, récolte de riz sauvage en faisant tomber le riz des tiges	3.3	12	2023-04-11 09:21:09.631+02	2023-04-11 09:21:09.631+02
596	18030	canoë, portage	7	12	2023-04-11 09:21:09.633+02	2023-04-11 09:21:09.633+02
597	18040	canoë, pagayer à 3,2-4,8 km/h, effort léger	2.8	12	2023-04-11 09:21:09.635+02	2023-04-11 09:21:09.635+02
598	18050	canoë, pagayer à 6,4-8 km/h, effort modéré	5.8	12	2023-04-11 09:21:09.637+02	2023-04-11 09:21:09.637+02
599	18060	canoë, pagayer, kayak, compétition, > 9,65 km/h, effort vigoureux	12.5	12	2023-04-11 09:21:09.639+02	2023-04-11 09:21:09.639+02
600	18070	canoë, pagayer pour le plaisir, général (code Taylor 250)	3.5	12	2023-04-11 09:21:09.64+02	2023-04-11 09:21:09.64+02
601	18080	canoë, pagayer, compétition, en équipe ou en couple (code Taylor 260)	12	12	2023-04-11 09:21:09.642+02	2023-04-11 09:21:09.642+02
602	18090	plongeon, tremplin ou plateforme	3	12	2023-04-11 09:21:09.643+02	2023-04-11 09:21:09.643+02
603	18100	kayak, effort modéré	5	12	2023-04-11 09:21:09.645+02	2023-04-11 09:21:09.645+02
604	18110	bateau à aubes	4	12	2023-04-11 09:21:09.647+02	2023-04-11 09:21:09.647+02
605	18120	voile, voilier et planche à voile, windsurf, voile sur glace, général (code Taylor 235)	3	12	2023-04-11 09:21:09.648+02	2023-04-11 09:21:09.648+02
606	18130	voile, compétition	4.5	12	2023-04-11 09:21:09.65+02	2023-04-11 09:21:09.65+02
607	18140	voile, Sunfish/Laser/Hobby Cat, quillards, navigation hauturière, croisière, plaisance	3.3	12	2023-04-11 09:21:09.652+02	2023-04-11 09:21:09.652+02
608	18150	ski nautique ou wakeboard (code Taylor 220)	6	12	2023-04-11 09:21:09.654+02	2023-04-11 09:21:09.654+02
609	18160	scooter des mers, conduire, dans l'eau	7	12	2023-04-11 09:21:09.656+02	2023-04-11 09:21:09.656+02
610	18180	plongée sous-marine, rythme rapide	15.8	12	2023-04-11 09:21:09.657+02	2023-04-11 09:21:09.657+02
611	18190	plongée sous-marine, rythme modéré	11.8	12	2023-04-11 09:21:09.659+02	2023-04-11 09:21:09.659+02
612	18200	plongée sous-marine, général (code Taylor 310)	7	12	2023-04-11 09:21:09.667+02	2023-04-11 09:21:09.667+02
613	18210	plongée libre (code Taylor 310)	5	12	2023-04-11 09:21:09.669+02	2023-04-11 09:21:09.669+02
614	18220	surf, corps ou planche, général	3	12	2023-04-11 09:21:09.671+02	2023-04-11 09:21:09.671+02
615	18222	surf, corps ou planche, compétition	5	12	2023-04-11 09:21:09.679+02	2023-04-11 09:21:09.679+02
616	18225	planche à rame, en position debout	6	12	2023-04-11 09:21:09.682+02	2023-04-11 09:21:09.682+02
617	18230	longueurs de piscine, nage libre, rythme rapide, effort vigoureux	9.8	12	2023-04-11 09:21:09.684+02	2023-04-11 09:21:09.684+02
618	18240	longueurs de piscine, nage libre, crawl, rythme lent, effort modéré ou léger	5.8	12	2023-04-11 09:21:09.685+02	2023-04-11 09:21:09.685+02
619	18250	natation, nage sur le dos, général, entraînement ou compétition	9.5	12	2023-04-11 09:21:09.686+02	2023-04-11 09:21:09.686+02
620	18255	natation, nage sur le dos, loisirs	4.8	12	2023-04-11 09:21:09.687+02	2023-04-11 09:21:09.687+02
621	18260	natation, brasse, général, entraînement ou compétition	10.3	12	2023-04-11 09:21:09.688+02	2023-04-11 09:21:09.688+02
622	18265	natation, brasse, loisirs	5.3	12	2023-04-11 09:21:09.689+02	2023-04-11 09:21:09.689+02
623	18270	natation, papillon, général	13.8	12	2023-04-11 09:21:09.69+02	2023-04-11 09:21:09.69+02
624	18280	natation, crawl, rythme rapide (~70 mètres/minute), effort vigoureux	10	12	2023-04-11 09:21:09.691+02	2023-04-11 09:21:09.691+02
625	18290	natation, crawl, rythme rapide (~45 mètres/minute), effort vigoureux	8.3	12	2023-04-11 09:21:09.693+02	2023-04-11 09:21:09.693+02
626	18300	natation, lac, océan, rivière (codes Taylor 280, 295)	6	12	2023-04-11 09:21:09.694+02	2023-04-11 09:21:09.694+02
627	18310	natation, loisirs, sans longueurs, général	6	12	2023-04-11 09:21:09.696+02	2023-04-11 09:21:09.696+02
628	18320	natation, nage indienne, général	7	12	2023-04-11 09:21:09.697+02	2023-04-11 09:21:09.697+02
629	18330	natation, synchronisée	8	12	2023-04-11 09:21:09.699+02	2023-04-11 09:21:09.699+02
630	18340	natation, sur-place, rythme rapide, effort vigoureux	9.8	12	2023-04-11 09:21:09.7+02	2023-04-11 09:21:09.7+02
631	18350	natation, sur-place, effort modéré, général	3.5	12	2023-04-11 09:21:09.701+02	2023-04-11 09:21:09.701+02
632	18352	descendre en chambre à air, flotter sur une rivière, général	2.3	12	2023-04-11 09:21:09.702+02	2023-04-11 09:21:09.702+02
633	2120	aérobic aquatique, gymnastique suédoise aquatique, exercices dans l’eau	5.3	2	2023-04-11 09:21:09.703+02	2023-04-11 09:21:09.703+02
634	18355	aérobic aquatique, gymnastique suédoise aquatique	5.5	12	2023-04-11 09:21:09.703+02	2023-04-11 09:21:09.703+02
635	18360	water polo	10	12	2023-04-11 09:21:09.707+02	2023-04-11 09:21:09.707+02
636	18365	water volley-ball	3	12	2023-04-11 09:21:09.709+02	2023-04-11 09:21:09.709+02
637	18366	water jogging	9.8	12	2023-04-11 09:21:09.71+02	2023-04-11 09:21:09.71+02
638	18367	marcher dans l’eau, effort léger, rythme lent	2.5	12	2023-04-11 09:21:09.711+02	2023-04-11 09:21:09.711+02
639	18368	marcher dans l’eau, effort modéré, rythme modéré	4.5	12	2023-04-11 09:21:09.712+02	2023-04-11 09:21:09.712+02
640	18369	marcher dans l’eau, effort vigoureux, rythme soutenu	6.8	12	2023-04-11 09:21:09.713+02	2023-04-11 09:21:09.713+02
641	18370	rafting, kayak, canoë en eau vive	5	12	2023-04-11 09:21:09.714+02	2023-04-11 09:21:09.714+02
642	18380	planche à voile, sans pomper pour gagner en vitesse	5	12	2023-04-11 09:21:09.716+02	2023-04-11 09:21:09.716+02
643	18385	planche à voile ou kitesurf, entraînement	11	12	2023-04-11 09:21:09.722+02	2023-04-11 09:21:09.722+02
644	18390	planche à voile, compétition, en pompant pour gagner en vitesse	13.5	12	2023-04-11 09:21:09.723+02	2023-04-11 09:21:09.723+02
645	19005	randonnée en traîneau à chiens en tant que musher	7.5	13	2023-04-11 09:21:09.724+02	2023-04-11 09:21:09.724+02
646	19006	randonnée en traîneau à chiens en tant que passager	2.5	13	2023-04-11 09:21:09.725+02	2023-04-11 09:21:09.725+02
647	19010	retrait de la glace, maison, créer/forer des trous	6	13	2023-04-11 09:21:09.725+02	2023-04-11 09:21:09.725+02
648	19011	pêche sur glace, position assise	2	13	2023-04-11 09:21:09.726+02	2023-04-11 09:21:09.726+02
649	19018	patinage, dance sur glace	14	13	2023-04-11 09:21:09.727+02	2023-04-11 09:21:09.727+02
650	19020	patinage sur glace à 14,5 km/h ou moins	5.5	13	2023-04-11 09:21:09.728+02	2023-04-11 09:21:09.728+02
651	19030	patinage sur glace, général (code Taylor 360)	7	13	2023-04-11 09:21:09.73+02	2023-04-11 09:21:09.73+02
652	19040	patinage sur glace, rythme rapide, plus de 14,5 km/h, hors compétition	9	13	2023-04-11 09:21:09.731+02	2023-04-11 09:21:09.731+02
653	19050	patinage de vitesse, compétition	13.3	13	2023-04-11 09:21:09.731+02	2023-04-11 09:21:09.731+02
654	19060	saut à ski, monter en portant des skis	7	13	2023-04-11 09:21:09.732+02	2023-04-11 09:21:09.732+02
655	19075	ski, général	7	13	2023-04-11 09:21:09.733+02	2023-04-11 09:21:09.733+02
656	19080	ski de fond à 4 km/h, rythme lent ou effort léger, marche nordique	6.8	13	2023-04-11 09:21:09.733+02	2023-04-11 09:21:09.733+02
657	19090	ski de fond à 6,5-8 km/h, rythme et effort modérés, général	9	13	2023-04-11 09:21:09.734+02	2023-04-11 09:21:09.734+02
658	19100	ski de fond à 8-12,5 km/h, rythme rapide, effort vigoureux	12.5	13	2023-04-11 09:21:09.735+02	2023-04-11 09:21:09.735+02
659	19110	ski de fond à plus de 13 km/h, skieur d’élite, course	15	13	2023-04-11 09:21:09.736+02	2023-04-11 09:21:09.736+02
660	19130	ski de fond, neige dure, montée, maximum, alpinisme	15.5	13	2023-04-11 09:21:09.737+02	2023-04-11 09:21:09.737+02
661	19135	ski de fond, patinage	13.3	13	2023-04-11 09:21:09.738+02	2023-04-11 09:21:09.738+02
662	19140	ski de fond, biathlon, pas de patineur	13.5	13	2023-04-11 09:21:09.743+02	2023-04-11 09:21:09.743+02
663	19150	ski, descente, ski alpin ou snowboard, effort léger, périodes d’activité uniquement	4.3	13	2023-04-11 09:21:09.745+02	2023-04-11 09:21:09.745+02
664	19160	ski, descente, ski alpin ou snowboard, effort modéré, général, périodes d’activité uniquement	5.3	13	2023-04-11 09:21:09.746+02	2023-04-11 09:21:09.746+02
665	19170	ski, descente, effort vigoureux, course	8	13	2023-04-11 09:21:09.748+02	2023-04-11 09:21:09.748+02
666	19175	ski, ski à roulettes, coureurs d’élite	12.5	13	2023-04-11 09:21:09.749+02	2023-04-11 09:21:09.749+02
667	19180	traîneau, toboggan, bobsleigh, luge (code Taylor 370)	7	13	2023-04-11 09:21:09.75+02	2023-04-11 09:21:09.75+02
668	19190	raquettes à neige, effort modéré	5.3	13	2023-04-11 09:21:09.751+02	2023-04-11 09:21:09.751+02
669	19192	raquettes à neige, effort vigoureux	10	13	2023-04-11 09:21:09.753+02	2023-04-11 09:21:09.753+02
670	19200	moto des neiges, conduire, effort modéré	3.5	13	2023-04-11 09:21:09.755+02	2023-04-11 09:21:09.755+02
671	19202	moto des neiges, passager	2	13	2023-04-11 09:21:09.758+02	2023-04-11 09:21:09.758+02
672	19252	déblayer la neige à la pelle, à la main, effort modéré	5.3	13	2023-04-11 09:21:09.765+02	2023-04-11 09:21:09.765+02
673	19254	déblayer la neige à la pelle, à la main, effort vigoureux	7.5	13	2023-04-11 09:21:09.767+02	2023-04-11 09:21:09.767+02
674	19260	passer la souffleuses à neige, marcher et pousser	2.5	13	2023-04-11 09:21:09.769+02	2023-04-11 09:21:09.769+02
\.


--
-- Data for Name: activity_user; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.activity_user (id, user_id, activity_id, calories, duration, date_assigned, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: category_activity; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.category_activity (id, label, created_at, updated_at) FROM stdin;
1	Cyclisme	2023-04-11 09:21:08.514+02	2023-04-11 09:21:08.514+02
2	Exercice intérieur	2023-04-11 09:21:08.551+02	2023-04-11 09:21:08.551+02
3	Danse	2023-04-11 09:21:08.554+02	2023-04-11 09:21:08.554+02
4	Pêche et chasse	2023-04-11 09:21:08.559+02	2023-04-11 09:21:08.559+02
5	Activité domestique	2023-04-11 09:21:08.572+02	2023-04-11 09:21:08.572+02
6	Réparation domestique	2023-04-11 09:21:08.575+02	2023-04-11 09:21:08.575+02
7	Pelouse et jardin	2023-04-11 09:21:08.578+02	2023-04-11 09:21:08.578+02
8	Profession	2023-04-11 09:21:08.58+02	2023-04-11 09:21:08.58+02
9	Course	2023-04-11 09:21:08.582+02	2023-04-11 09:21:08.582+02
10	Sport	2023-04-11 09:21:08.584+02	2023-04-11 09:21:08.584+02
11	Marche	2023-04-11 09:21:08.585+02	2023-04-11 09:21:08.585+02
12	Activité nautique et aquatique	2023-04-11 09:21:08.589+02	2023-04-11 09:21:08.589+02
13	Activité hivernale	2023-04-11 09:21:08.591+02	2023-04-11 09:21:08.591+02
\.


--
-- Data for Name: challenge; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.challenge (id, label, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: challenge_user; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public.challenge_user (user_id, challenge_id, completed, date_assigned, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: spedata
--

COPY public."user" (id, firstname, lastname, nickname, password, phone, login_streak, role, email, weight, age, gender, challenge_id, xp, profile_visibility, created_at, updated_at, image_path, image_mimetype) FROM stdin;
1	Armand	Frmand	Blacksmith94	$2b$10$QDXZHvOLIZvdZXTPJGafmedOHT1NmITszy8qInYnyKLF0WLpwyvWy	\N	0	user	armeron@gmail.com	65	22	non-spécifié	\N	0	publique	2023-04-11 09:23:55.367+02	2023-04-11 09:23:55.367+02	\N	\N
2	Laurent	Daurent	Lolo52	$2b$10$fsRnV4rVutrb8jgoeemYBOW17VUdsntByXRAoo4O2/vieCJUhTNJm	\N	0	user	ldupuy@gmail.com	62	17	non-spécifié	\N	0	publique	2023-04-11 09:25:21.193+02	2023-04-11 09:25:21.193+02	\N	\N
3	John	Dohn	xXElJohnDoeXx	$2b$10$qQ9iIrF72tbRixF51z8jhurIYuhimTFSxUYJABevkvCDdtTYs2Mry	\N	0	user	eljohndoe@gmail.com	51	15	non-spécifié	\N	0	publique	2023-04-11 09:26:29.959+02	2023-04-11 09:26:29.959+02	\N	\N
4	Tiffany	Miffany	Tiffette32	$2b$10$WjMwtJB74SvKbmaxes7LFObR.YR75JqWsBxraoZI/DBzvuVeGciT6	\N	0	user	tiffette32@gmail.com	52	23	femme	\N	0	publique	2023-04-11 09:28:37.88+02	2023-04-11 09:28:37.88+02	\N	\N
\.


--
-- Name: activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.activity_id_seq', 674, true);


--
-- Name: activity_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.activity_user_id_seq', 1, false);


--
-- Name: category_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.category_activity_id_seq', 13, true);


--
-- Name: challenge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.challenge_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spedata
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: activity activity_code_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_code_key UNIQUE (code);


--
-- Name: activity activity_label_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_label_key UNIQUE (label);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: activity_user activity_user_pkey; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity_user
    ADD CONSTRAINT activity_user_pkey PRIMARY KEY (id);


--
-- Name: category_activity category_activity_label_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.category_activity
    ADD CONSTRAINT category_activity_label_key UNIQUE (label);


--
-- Name: category_activity category_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.category_activity
    ADD CONSTRAINT category_activity_pkey PRIMARY KEY (id);


--
-- Name: challenge challenge_label_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT challenge_label_key UNIQUE (label);


--
-- Name: challenge challenge_pkey; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT challenge_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_nickname_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_nickname_key UNIQUE (nickname);


--
-- Name: user user_phone_key; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_phone_key UNIQUE (phone);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: activity activity_category_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_category_activity_id_fkey FOREIGN KEY (category_activity_id) REFERENCES public.category_activity(id) ON DELETE CASCADE;


--
-- Name: activity_user activity_user_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity_user
    ADD CONSTRAINT activity_user_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activity(id) ON DELETE CASCADE;


--
-- Name: activity_user activity_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.activity_user
    ADD CONSTRAINT activity_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: challenge_user challenge_user_challenge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.challenge_user
    ADD CONSTRAINT challenge_user_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenge(id) ON DELETE CASCADE;


--
-- Name: challenge_user challenge_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public.challenge_user
    ADD CONSTRAINT challenge_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user user_challenge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spedata
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenge(id);


--
-- PostgreSQL database dump complete
--

