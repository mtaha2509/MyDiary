CREATE TABLE DiaryEntries (
    diary_entry_id SERIAL PRIMARY KEY,
    user_id INT,
    template_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE DiaryPages (
    page_id SERIAL PRIMARY KEY,
    diary_entry_id INT,
    page_number INT,
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (diary_entry_id) REFERENCES DiaryEntries(diary_entry_id)
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL
)

CREATE TABLE TIMECAPSULES (
    user_id INT,
    timecapsule_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    message_to_future_self TEXT,
    image_url VARCHAR(255),
    FOREIGN KEY (user_id ) REFERENCES users(id)
);