
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    userId INT REFERENCES users (user_id)
)