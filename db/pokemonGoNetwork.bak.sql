--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

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
-- Name: friends; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

CREATE TABLE friends (
    id_from integer NOT NULL,
    id_to integer NOT NULL,
    id integer NOT NULL,
    accepted_at timestamp with time zone[]
);


ALTER TABLE trainers_network.friends OWNER TO pkm_trainer;

--
-- Name: friends_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE friends_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainers_network.friends_id_seq OWNER TO pkm_trainer;

--
-- Name: friends_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: pkm_trainer
--

ALTER SEQUENCE friends_id_seq OWNED BY friends.id;


--
-- Name: trainers; Type: TABLE; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

CREATE TABLE trainers (
    id integer NOT NULL,
    google_id numeric NOT NULL,
    display_name text NOT NULL,
    emails text,
    user_profile_data json,
    account_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE trainers_network.trainers OWNER TO pkm_trainer;

--
-- Name: trainers_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: pkm_trainer
--

CREATE SEQUENCE trainers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainers_network.trainers_id_seq OWNER TO pkm_trainer;

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

ALTER TABLE ONLY trainers ALTER COLUMN id SET DEFAULT nextval('trainers_id_seq'::regclass);


--
-- Data for Name: friends; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY friends (id_from, id_to, id, accepted_at) FROM stdin;
\.


--
-- Name: friends_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('friends_id_seq', 1, false);


--
-- Data for Name: trainers; Type: TABLE DATA; Schema: trainers_network; Owner: pkm_trainer
--

COPY trainers (id, google_id, display_name, emails, user_profile_data, account_deleted) FROM stdin;
6	116371735781381729561	benjamin winckell	winckell.benjamin.isart@gmail.com	 {"id":"116371735781381729561","displayName":"benjamin winckell","name":{"familyName":"winckell","givenName":"benjamin"},"emails":[{"value":"winckell.benjamin.isart@gmail.com","type":"account"}],"photos":[{"value":"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50"}],"gender":"male","provider":"google","_raw":"{\\n \\"kind\\": \\"plus#person\\",\\n \\"etag\\": \\"\\\\\\"xw0en60W6-NurXn4VBU-CMjSPEw/U4bUCC_bXIb3o3NT5X9pT3nwIQQ\\\\\\"\\",\\n \\"gender\\": \\"male\\",\\n \\"emails\\": [\\n  {\\n   \\"value\\": \\"winckell.benjamin.isart@gmail.com\\",\\n   \\"type\\": \\"account\\"\\n  }\\n ],\\n \\"objectType\\": \\"person\\",\\n \\"id\\": \\"116371735781381729561\\",\\n \\"displayName\\": \\"benjamin winckell\\",\\n \\"name\\": {\\n  \\"familyName\\": \\"winckell\\",\\n  \\"givenName\\": \\"benjamin\\"\\n },\\n \\"url\\": \\"https://plus.google.com/116371735781381729561\\",\\n \\"image\\": {\\n  \\"url\\": \\"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50\\",\\n  \\"isDefault\\": false\\n },\\n \\"isPlusUser\\": true,\\n \\"language\\": \\"fr\\",\\n \\"circledByCount\\": 25,\\n \\"verified\\": false\\n}\\n","_json":{"kind":"plus#person","etag":"\\"xw0en60W6-NurXn4VBU-CMjSPEw/U4bUCC_bXIb3o3NT5X9pT3nwIQQ\\"","gender":"male","emails":[{"value":"winckell.benjamin.isart@gmail.com","type":"account"}],"objectType":"person","id":"116371735781381729561","displayName":"benjamin winckell","name":{"familyName":"winckell","givenName":"benjamin"},"url":"https://plus.google.com/116371735781381729561","image":{"url":"https://lh6.googleusercontent.com/-7nnxy5dLr0k/AAAAAAAAAAI/AAAAAAAAAIY/y9taEnTVf3M/photo.jpg?sz=50","isDefault":false},"isPlusUser":true,"language":"fr","circledByCount":25,"verified":false}}	f
\.


--
-- Name: trainers_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('trainers_id_seq', 6, true);


--
-- Name: prim_key; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT prim_key PRIMARY KEY (id);


--
-- Name: primary key; Type: CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

ALTER TABLE ONLY trainers
    ADD CONSTRAINT "primary key" PRIMARY KEY (id);


--
-- Name: fki_foreign_key_from; Type: INDEX; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

CREATE INDEX fki_foreign_key_from ON friends USING btree (id_from);


--
-- Name: fki_foreign_key_to; Type: INDEX; Schema: trainers_network; Owner: pkm_trainer; Tablespace: 
--

CREATE INDEX fki_foreign_key_to ON friends USING btree (id_to);


--
-- Name: foreign_key_from; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT foreign_key_from FOREIGN KEY (id_from) REFERENCES trainers(id);


--
-- Name: foreign_key_to; Type: FK CONSTRAINT; Schema: trainers_network; Owner: pkm_trainer
--

ALTER TABLE ONLY friends
    ADD CONSTRAINT foreign_key_to FOREIGN KEY (id_to) REFERENCES trainers(id);


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

