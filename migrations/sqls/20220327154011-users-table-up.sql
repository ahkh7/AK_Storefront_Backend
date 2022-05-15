
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
)