sqlite3 database.db 
.tables

PRAGMA table_info(FinishedQuizzes);

PRAGMA index_list('FinishedQuizzes'); 

-- marche avec ou sans guillemets apparemment)


-- créatio index : 

CREATE INDEX idx_id ON FinishedQuizzes(Id);

PRAGMA index_info('idx_id');


select * from FinishedQuizzes;
insert into FinishedQuizzes ('UserId') values ('premier test');
select * from FinishedQuizzes;
delete from FinishedQuizzes where Id = 1;
select * from FinishedQuizzes;

ALTER TABLE FinishedQuizzes
  ADD DateTime INTEGER;

ALTER TABLE questionsFeedback 
RENAME COLUMN LastContributor TO LastContributorId;

ALTER TABLE questionsFeedback 
  ADD LastContributorName TEXT;

ALTER TABLE questionsFeedback 
RENAME COLUMN LastUpdated TO LastModified;

ALTER TABLE questionsFeedback 
  ADD LastContributorName TEXT;


CREATE TABLE Questions (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Viewed INTEGER,
    Skipped INTEGER,
    Successful INTEGER,
    Failed INTEGER,
    Liked INTEGER,
    ProblemReported INTEGER,
    LastContributor TEXT,
    LastUpdated INTEGER
);




--  pour le feedback:


CREATE TABLE QuestionsFeedback (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Liked INTEGER,
    ProblemReported INTEGER,
    LastContributorId TEXT,
    LastContributorName TEXT,
    LastModified TEXT
);

WITH RECURSIVE cnt(x) AS (
    SELECT 1
    UNION ALL
    SELECT x + 1
    FROM cnt
    WHERE x < 4000
)
INSERT INTO QuestionsFeedback (Liked, ProblemReported, LastContributorId,LastContributorName, LastModified)
SELECT 
    0,       -- Liked
    0,       -- ProblemReported
    NULL,    -- LastContributorId
    NULL,    -- LastContributorName
    NULL     -- LastModified
FROM cnt;







SELECT * FROM Questions;



-- création table instructeurs

CREATE TABLE instructors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    creation_time INTEGER,
    last_active_time INTEGER
);

- - - - - - - - - - - -

- - - table Questions dans db_questions.db : 

CREATE TABLE Questions (
Id INTEGER PRIMARY KEY AUTOINCREMENT,
Successful INTEGER,
Skipped INTEGER,
Failed INTEGER
);



insertion de 4000 questions vides

WITH RECURSIVE cnt(x) AS (
    SELECT 1
    UNION ALL
    SELECT x + 1
    FROM cnt
    WHERE x < 4000
)
INSERT INTO Questions (Successful, Skipped, Failed)
SELECT 
    0,       -- Successful
    0,       -- Skipped
    0       -- Failed
FROM cnt;


- - - -
remplacement de NULL par des zéros :


UPDATE [table]
SET [column]=0
WHERE [column] IS NULL;


- - - -

pour les messages:

CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    sender_ip TEXT,
    sender_id TEXT,
    sender_name TEXT,
    recipient_id TEXT,
    recipient_name TEXT,
    content TEXT
);



