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
