--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.8 (Debian 16.8-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: todos; Type: TABLE; Schema: public; Owner: demouser
--

CREATE TABLE public.todos (
    id integer NOT NULL,
    title text NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.todos OWNER TO demouser;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: demouser
--

CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todos_id_seq OWNER TO demouser;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: demouser
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: demouser
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: demouser
--

COPY public.todos (id, title, completed, created_at) FROM stdin;
1	a	t	2026-01-05 18:09:52.814492
2	b	t	2026-01-05 18:09:53.824368
\.


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: demouser
--

SELECT pg_catalog.setval('public.todos_id_seq', 2, true);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: demouser
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

