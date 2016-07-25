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
    user_profile_data json
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

COPY trainers (id, google_id, display_name, emails, user_profile_data) FROM stdin;
1	156894121110045560000	bozo	bwinckell@companeo.com	\N
\.


--
-- Name: trainers_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: pkm_trainer
--

SELECT pg_catalog.setval('trainers_id_seq', 1, true);


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

