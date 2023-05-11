--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.3

-- Started on 2023-05-11 14:32:21

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
-- TOC entry 215 (class 1259 OID 16492)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    eventid integer NOT NULL,
    userid integer,
    title character varying(35),
    eventdate date,
    start time without time zone,
    fin time without time zone,
    descrip character varying(255),
    category character varying(10)
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16499)
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO postgres;

--
-- TOC entry 4309 (class 0 OID 0)
-- Dependencies: 216
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.eventid;


--
-- TOC entry 214 (class 1259 OID 16459)
-- Name: eventnote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventnote (
    enoteid integer NOT NULL,
    noteid integer,
    eid integer
);


ALTER TABLE public.eventnote OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16458)
-- Name: eventnote_enoteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventnote_enoteid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eventnote_enoteid_seq OWNER TO postgres;

--
-- TOC entry 4310 (class 0 OID 0)
-- Dependencies: 213
-- Name: eventnote_enoteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventnote_enoteid_seq OWNED BY public.eventnote.enoteid;


--
-- TOC entry 212 (class 1259 OID 16445)
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    noteid integer NOT NULL,
    uid integer,
    description text,
    name character varying(50)
);


ALTER TABLE public.note OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16444)
-- Name: note_noteid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_noteid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.note_noteid_seq OWNER TO postgres;

--
-- TOC entry 4311 (class 0 OID 0)
-- Dependencies: 211
-- Name: note_noteid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_noteid_seq OWNED BY public.note.noteid;


--
-- TOC entry 210 (class 1259 OID 16406)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    lastname character varying(35) NOT NULL,
    firstname character varying(35) NOT NULL,
    email character varying(50) NOT NULL,
    pass character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16405)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 4312 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 4145 (class 2604 OID 16500)
-- Name: event eventid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN eventid SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- TOC entry 4144 (class 2604 OID 16462)
-- Name: eventnote enoteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventnote ALTER COLUMN enoteid SET DEFAULT nextval('public.eventnote_enoteid_seq'::regclass);


--
-- TOC entry 4143 (class 2604 OID 16448)
-- Name: note noteid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note ALTER COLUMN noteid SET DEFAULT nextval('public.note_noteid_seq'::regclass);


--
-- TOC entry 4142 (class 2604 OID 16409)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 4301 (class 0 OID 16492)
-- Dependencies: 215
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (eventid, userid, title, eventdate, start, fin, descrip, category) FROM stdin;
117	1	Test	2023-05-09	10:00:00	11:00:00	meeting event!	Meeting
118	1	Test	2023-05-09	13:00:00	14:00:00	shopping event!	Shopping
119	1	Test	2023-05-10	10:00:00	11:00:00	medical event!	Medical
121	9	Test	2023-05-15	13:00:00	14:00:00	shopping event	Shopping
122	9	Test	2023-05-17	10:00:00	11:45:00	medical event	Medical
26	5	test2	2023-05-07	03:00:00	04:00:00	test2	Meeting
27	5	test3	2023-05-07	03:00:00	04:00:00	test3	Meeting
28	5	test4	2023-05-07	19:00:00	20:00:00	group2 test4	Meeting
29	5	Doctor appointment	2023-05-07	07:00:00	08:00:00	t	Meeting
30	5	test5	2023-05-07	08:00:00	09:30:00	rt	Meeting
31	5	test5	2023-05-08	00:00:00	01:00:00	test5	Meeting
\.


--
-- TOC entry 4300 (class 0 OID 16459)
-- Dependencies: 214
-- Data for Name: eventnote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventnote (enoteid, noteid, eid) FROM stdin;
\.


--
-- TOC entry 4298 (class 0 OID 16445)
-- Dependencies: 212
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note (noteid, uid, description, name) FROM stdin;
1	2	This is a note	Notes
2	2	Can you believe it? Two notes!	Another note
3	3		test
4	3		test 2
5	3		test
6	3	test	test4
8	3	test	test_Jonathan
9	5	fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd	fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd
10	5	111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111	1111111111111111111111111111111111
11	5	222222222222222222222222222222222222222222222222222222222222222222	22222222222222222222222222222222222222222222
12	5	test	test
13	1	test note	test
14	7	adfdfd	fdfd
15	8	test	test
16	8	test2	test2
17	7	test	test
18	7	test2	test2
19	7	test3	test3
20	6	Test	test
21	9	of 	fjdkfjkd
\.


--
-- TOC entry 4296 (class 0 OID 16406)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, lastname, firstname, email, pass) FROM stdin;
1	User	Add	email@email.com	Pass123
2	User	Demo	demouser@email.com	Pass1234!
3	tester	testing	testcase@test.com	Test1234@
4				
5	Testing	Redirect	Redirect@email.com	Test1234@
6	Name	My	fake@email.com	12345
7	Kim	Taeoh	taeohkim@aol.com	Happymode98!
8	test1234	test1234	test1234@gmail.com	1234
9	Hart	Darius	darius@gmail.com	12345
\.


--
-- TOC entry 4313 (class 0 OID 0)
-- Dependencies: 216
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_id_seq', 125, true);


--
-- TOC entry 4314 (class 0 OID 0)
-- Dependencies: 213
-- Name: eventnote_enoteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventnote_enoteid_seq', 1, false);


--
-- TOC entry 4315 (class 0 OID 0)
-- Dependencies: 211
-- Name: note_noteid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_noteid_seq', 21, true);


--
-- TOC entry 4316 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 9, true);


--
-- TOC entry 4153 (class 2606 OID 16498)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (eventid);


--
-- TOC entry 4151 (class 2606 OID 16466)
-- Name: eventnote eventnote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventnote
    ADD CONSTRAINT eventnote_pkey PRIMARY KEY (enoteid);


--
-- TOC entry 4149 (class 2606 OID 16452)
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (noteid);


--
-- TOC entry 4147 (class 2606 OID 16411)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 4155 (class 2606 OID 16467)
-- Name: eventnote eventnote_uid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventnote
    ADD CONSTRAINT eventnote_uid_fkey FOREIGN KEY (noteid) REFERENCES public.note(noteid);


--
-- TOC entry 4154 (class 2606 OID 16453)
-- Name: note note_uid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(userid);


--
-- TOC entry 4308 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2023-05-11 14:32:24

--
-- PostgreSQL database dump complete
--

