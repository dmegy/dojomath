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


CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    userName TEXT,
    referrerId TEXT,
    email TEXT,
    hashedPassword TEXT,
    areaCode TEXT,
    points INTEGER,
    combo INTEGER,
    longestCombo INTEGER,
    firstConnectionTime INTEGER,
    lastActiveTime INTEGER,
    lastStreak INTEGER,
    longestStreak INTEGER,
    nbQuestionsViewed INTEGER,
    nbQuestionsFailed INTEGER,
    nbQuestionsSkipped INTEGER,
    nbQuestionsSuccessful INTEGER,
    nbQuizStarted INTEGER,
    nbQuizAborted INTEGER,
    nbQuizFinished INTEGER,
    nbQuizPerfect INTEGER,
    creationDate TEXT,
    modificationDate TEXT
);

ALTER TABLE Users 
  ADD nbActivatedReferees INTEGER DEFAULT 0;

ALTER TABLE Users 
  ADD giftAmount INTEGER DEFAULT 0;

ALTER TABLE Users 
  ADD giftMessage TEXT;





