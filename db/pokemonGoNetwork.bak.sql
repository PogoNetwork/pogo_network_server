--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: trainers_network; Type: SCHEMA; Schema: -; Owner: pkm_trainer
--

CREATE SCHEMA trainers_network;


ALTER SCHEMA trainers_network OWNER TO pkm_trainer;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = trainers_network, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: friends; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE TABLE friends (
    id integer NOT NULL,
    id_from integer NOT NULL,
    id_to integer NOT NULL,
    is_accepted text DEFAULT 'pending'::text NOT NULL,
    accepted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE friends OWNER TO pkm_trainer;

--
-- Name: friends_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE friends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE friends_id_seq OWNER TO pkm_trainer;

--
-- Name: friends_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: pkm_trainer
--

ALTER SEQUENCE friends_id_seq OWNED BY friends.id;


--
-- Name: memberships; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE TABLE memberships (
    id integer NOT NULL,
    trainer_id integer NOT NULL,
    team_id integer NOT NULL,
    is_accepted boolean DEFAULT false NOT NULL,
    membership_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE memberships OWNER TO pkm_trainer;

--
-- Name: memberships_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE memberships_id_seq OWNER TO pkm_trainer;

--
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: pkm_trainer
--

ALTER SEQUENCE memberships_id_seq OWNED BY memberships.id;


--
-- Name: teams; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE TABLE teams (
    id integer NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    team_name text DEFAULT 'pikachu'::text NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE teams OWNER TO pkm_trainer;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE teams_id_seq OWNER TO pkm_trainer;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: pkm_trainer
--

ALTER SEQUENCE teams_id_seq OWNED BY teams.id;


--
-- Name: trainers; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE TABLE trainers (
    id integer NOT NULL,
    google_id numeric NOT NULL,
    display_name text NOT NULL,
    emails text,
    user_profile_data json,
    account_deleted boolean DEFAULT false NOT NULL,
    pogo_team_color text DEFAULT 'none'::text NOT NULL,
    first_connection boolean DEFAULT true NOT NULL
);


ALTER TABLE trainers OWNER TO pkm_trainer;

--
-- Name: trainers_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE trainers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainers_id_seq OWNER TO pkm_trainer;

--
-- Name: trainers_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: pkm_trainer
--

ALTER SEQUENCE trainers_id_seq OWNED BY trainers.id;


--
-- Name: id; Type: DEFAULT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends ALTER COLUMN id SET DEFAULT nextval('friends_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY memberships ALTER COLUMN id SET DEFAULT nextval('memberships_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY teams ALTER COLUMN id SET DEFAULT nextval('teams_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY trainers ALTER COLUMN id SET DEFAULT nextval('trainers_id_seq'::regclass);


--
-- Data for Name: friends; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY friends (id, id_from, id_to, is_accepted, accepted_at) FROM stdin;
48	44	43	pending	2016-08-02 01:24:05.089149+02
\.


--
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('friends_id_seq', 48, true);


--
-- Data for Name: memberships; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY memberships (id, trainer_id, team_id, is_accepted, membership_date) FROM stdin;
\.


--
-- Name: memberships_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('memberships_id_seq', 3, true);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY teams (id, creation_date, team_name, owner_id) FROM stdin;
8	2016-08-05 21:53:03.755631+02	benben	43
12	2016-08-05 21:59:22.663198+02	pouet	44
20	2016-08-08 21:17:07.92204+02	benbenen	43
47	2016-08-08 22:23:10.648877+02	pouetzazaz	43
50	2016-08-08 22:33:45.665267+02	pouetzazaz azdazdazd	44
51	2016-08-08 22:34:00.437551+02	pouetzazaz azdazdazd z   zefzefzf  zefzef	44
52	2016-08-08 22:34:15.528704+02	pouetzazaz azdaZdazd z   zefzefzf  zefzef	44
\.


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('teams_id_seq', 53, true);


--
-- Data for Name: trainers; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY trainers (id, google_id, display_name, emails, user_profile_data, account_deleted, pogo_team_color, first_connection) FROM stdin;
43	116371735781381729561	benjamin winckell	winckell.benjamin.isart@gmail.com	 {"id":"116371735781381729561","displayName":"benjamin winckell","name":{"familyName":"winckell","givenName":"benjamin"},"emails":[{"value":"winckell.benjamin.isart@gmail.com","type":"account"}],"photos":[{"value":"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50"}],"gender":"male","provider":"google","_raw":"{\\n \\"kind\\": \\"plus#person\\",\\n \\"etag\\": \\"\\\\\\"xw0en60W6-NurXn4VBU-CMjSPEw/U4bUCC_bXIb3o3NT5X9pT3nwIQQ\\\\\\"\\",\\n \\"gender\\": \\"male\\",\\n \\"emails\\": [\\n  {\\n   \\"value\\": \\"winckell.benjamin.isart@gmail.com\\",\\n   \\"type\\": \\"account\\"\\n  }\\n ],\\n \\"objectType\\": \\"person\\",\\n \\"id\\": \\"116371735781381729561\\",\\n \\"displayName\\": \\"benjamin winckell\\",\\n \\"name\\": {\\n  \\"familyName\\": \\"winckell\\",\\n  \\"givenName\\": \\"benjamin\\"\\n },\\n \\"url\\": \\"https://plus.google.com/116371735781381729561\\",\\n \\"image\\": {\\n  \\"url\\": \\"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50\\",\\n  \\"isDefault\\": false\\n },\\n \\"isPlusUser\\": true,\\n \\"language\\": \\"fr\\",\\n \\"circledByCount\\": 25,\\n \\"verified\\": false\\n}\\n","_json":{"kind":"plus#person","etag":"\\"xw0en60W6-NurXn4VBU-CMjSPEw/U4bUCC_bXIb3o3NT5X9pT3nwIQQ\\"","gender":"male","emails":[{"value":"winckell.benjamin.isart@gmail.com","type":"account"}],"objectType":"person","id":"116371735781381729561","displayName":"benjamin winckell","name":{"familyName":"winckell","givenName":"benjamin"},"url":"https://plus.google.com/116371735781381729561","image":{"url":"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50","isDefault":false},"isPlusUser":true,"language":"fr","circledByCount":25,"verified":false}}	f	none	t
44	114317970972352369339	Benjamin Winckell	b.winckell@student.isartdigital.com	 {"id":"114317970972352369339","displayName":"Benjamin Winckell","name":{"familyName":"Winckell","givenName":"Benjamin"},"emails":[{"value":"b.winckell@student.isartdigital.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/-6_GGNc_1PqY/AAAAAAAAAAI/AAAAAAAAAAA/WyTspoHnYzo/photo.jpg?sz=50"}],"gender":"male","provider":"google","_raw":"{\\n \\"kind\\": \\"plus#person\\",\\n \\"etag\\": \\"\\\\\\"xw0en60W6-NurXn4VBU-CMjSPEw/8eFG7koOQL7gXeQIqKEqRZSn7D8\\\\\\"\\",\\n \\"gender\\": \\"male\\",\\n \\"emails\\": [\\n  {\\n   \\"value\\": \\"b.winckell@student.isartdigital.com\\",\\n   \\"type\\": \\"account\\"\\n  }\\n ],\\n \\"objectType\\": \\"person\\",\\n \\"id\\": \\"114317970972352369339\\",\\n \\"displayName\\": \\"Benjamin Winckell\\",\\n \\"name\\": {\\n  \\"familyName\\": \\"Winckell\\",\\n  \\"givenName\\": \\"Benjamin\\"\\n },\\n \\"url\\": \\"https://plus.google.com/114317970972352369339\\",\\n \\"image\\": {\\n  \\"url\\": \\"https://lh3.googleusercontent.com/-6_GGNc_1PqY/AAAAAAAAAAI/AAAAAAAAAAA/WyTspoHnYzo/photo.jpg?sz=50\\",\\n  \\"isDefault\\": true\\n },\\n \\"organizations\\": [\\n  {\\n   \\"name\\": \\"Isart Digital\\",\\n   \\"type\\": \\"school\\",\\n   \\"primary\\": false\\n  },\\n  {\\n   \\"name\\": \\"procheo\\",\\n   \\"title\\": \\"dev Front/End\\",\\n   \\"type\\": \\"work\\",\\n   \\"primary\\": false\\n  }\\n ],\\n \\"isPlusUser\\": true,\\n \\"language\\": \\"fr\\",\\n \\"circledByCount\\": 9,\\n \\"verified\\": false,\\n \\"domain\\": \\"student.isartdigital.com\\"\\n}\\n","_json":{"kind":"plus#person","etag":"\\"xw0en60W6-NurXn4VBU-CMjSPEw/8eFG7koOQL7gXeQIqKEqRZSn7D8\\"","gender":"male","emails":[{"value":"b.winckell@student.isartdigital.com","type":"account"}],"objectType":"person","id":"114317970972352369339","displayName":"Benjamin Winckell","name":{"familyName":"Winckell","givenName":"Benjamin"},"url":"https://plus.google.com/114317970972352369339","image":{"url":"https://lh3.googleusercontent.com/-6_GGNc_1PqY/AAAAAAAAAAI/AAAAAAAAAAA/WyTspoHnYzo/photo.jpg?sz=50","isDefault":true},"organizations":[{"name":"Isart Digital","type":"school","primary":false},{"name":"procheo","title":"dev Front/End","type":"work","primary":false}],"isPlusUser":true,"language":"fr","circledByCount":9,"verified":false,"domain":"student.isartdigital.com"}}	f	none	t
\.


--
-- Name: trainers_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('trainers_id_seq', 44, true);


--
-- Name: membership_prim; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT membership_prim PRIMARY KEY (id);


--
-- Name: prim; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT prim PRIMARY KEY (id);


--
-- Name: prim_key; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT prim_key PRIMARY KEY (id);


--
-- Name: primary key; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY trainers
    ADD CONSTRAINT "primary key" PRIMARY KEY (id);


--
-- Name: team_name; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT team_name UNIQUE (team_name);


--
-- Name: fki_foreign_key_from; Type: INDEX; Schema: trainers_network; Owner: pkm_trainer
--

CREATE INDEX fki_foreign_key_from ON friends USING btree (id_from);


--
-- Name: fki_foreign_key_to; Type: INDEX; Schema: trainers_network; Owner: pkm_trainer
--

CREATE INDEX fki_foreign_key_to ON friends USING btree (id_to);


--
-- Name: foreign_key; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT foreign_key FOREIGN KEY (owner_id) REFERENCES trainers(id);


--
-- Name: from foreign; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT "from foreign" FOREIGN KEY (id_from) REFERENCES trainers(id);


--
-- Name: team_foreign_key; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT team_foreign_key FOREIGN KEY (team_id) REFERENCES teams(id);


--
-- Name: to foreign; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT "to foreign" FOREIGN KEY (id_to) REFERENCES trainers(id);


--
-- Name: trainer_foreign_key; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY memberships
    ADD CONSTRAINT trainer_foreign_key FOREIGN KEY (trainer_id) REFERENCES trainers(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

