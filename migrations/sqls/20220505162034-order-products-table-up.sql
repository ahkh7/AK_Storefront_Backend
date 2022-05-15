
CREATE TABLE order_products (
    order_products_id SERIAL PRIMARY KEY,
    orderId bigint REFERENCES orders (order_id),
    productId bigint REFERENCES products (product_id),
    quantity INT
)