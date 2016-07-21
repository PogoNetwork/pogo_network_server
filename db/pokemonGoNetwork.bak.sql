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
-- Name: trainers_network; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA trainers_network;


ALTER SCHEMA trainers_network OWNER TO postgres;

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
-- Name: trainers; Type: TABLE; Schema: trainers_network; Owner: postgres; Tablespace: 
--

CREATE TABLE trainers (
    id integer NOT NULL,
    google_id integer NOT NULL,
    display_name text NOT NULL,
    emails text,
    user_profile_data json,
    pseudo text
);


ALTER TABLE trainers_network.trainers OWNER TO postgres;

--
-- Name: trainers_id_seq; Type: SEQUENCE; Schema: trainers_network; Owner: postgres
--

CREATE SEQUENCE trainers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainers_network.trainers_id_seq OWNER TO postgres;

--
-- Name: trainers_id_seq; Type: SEQUENCE OWNED BY; Schema: trainers_network; Owner: postgres
--

ALTER SEQUENCE trainers_id_seq OWNED BY trainers.id;


--
-- Name: id; Type: DEFAULT; Schema: trainers_network; Owner: postgres
--

ALTER TABLE ONLY trainers ALTER COLUMN id SET DEFAULT nextval('trainers_id_seq'::regclass);


--
-- Data for Name: trainers; Type: TABLE DATA; Schema: trainers_network; Owner: postgres
--

COPY trainers (id, google_id, display_name, emails, user_profile_data, pseudo) FROM stdin;
\.


--
-- Name: trainers_id_seq; Type: SEQUENCE SET; Schema: trainers_network; Owner: postgres
--

SELECT pg_catalog.setval('trainers_id_seq', 1, false);


--
-- Name: primary key; Type: CONSTRAINT; Schema: trainers_network; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY trainers
    ADD CONSTRAINT "primary key" PRIMARY KEY (id);


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

