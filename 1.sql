SCRIPT:
mysqlsh --sql -u root -h localhost -P 3306 --file [filename]

ANSWER:
DROP DATABASE IF EXISTS dbms_lab_2024;
CREATE DATABASE dbms_lab_2024;
USE dbms_lab_2024;

-- =====================================================
-- STEP 1: Create Tables with Primary Keys and Foreign Keys
-- =====================================================

CREATE TABLE customer (
    custn INT PRIMARY KEY,
    cname VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE item (
    itemn INT PRIMARY KEY,
    unitprice DECIMAL(10,2) NOT NULL
);

CREATE TABLE warehouse (
    warehousen INT PRIMARY KEY,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    ordern INT PRIMARY KEY,
    odate DATE NOT NULL,
    custn INT NOT NULL,
    order_amt DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_orders_customer
    FOREIGN KEY (custn) REFERENCES customer(custn)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE order_item (
    ordern INT NOT NULL,
    itemn INT NOT NULL,
    qty INT NOT NULL,

    PRIMARY KEY (ordern, itemn),

    CONSTRAINT fk_order_item_orders
    FOREIGN KEY (ordern) REFERENCES orders(ordern)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

    CONSTRAINT fk_order_item_item
    FOREIGN KEY (itemn) REFERENCES item(itemn)
    ON UPDATE CASCADE
);

CREATE TABLE shipment (
    ordern INT NOT NULL,
    warehousen INT NOT NULL,
    ship_date DATE NOT NULL,

    PRIMARY KEY (ordern, warehousen),

    CONSTRAINT fk_shipment_orders
    FOREIGN KEY (ordern) REFERENCES orders(ordern)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

    CONSTRAINT fk_shipment_warehouse
    FOREIGN KEY (warehousen) REFERENCES warehouse(warehousen)
    ON UPDATE CASCADE
);

-- =====================================================
-- STEP 2: Insert Data
-- =====================================================

INSERT INTO customer (custn, cname, city) VALUES
(1, 'Customer 1', 'Mysuru'),
(2, 'Customer 2', 'Bengaluru'),
(3, 'Kumar', 'Mumbai'),
(4, 'Customer 4', 'Delhi'),
(5, 'Customer 5', 'Bengaluru');

INSERT INTO item (itemn, unitprice) VALUES
(1, 400),
(2, 200),
(3, 1000),
(4, 100),
(5, 500);

INSERT INTO warehouse (warehousen, city) VALUES
(1, 'Mysuru'),
(2, 'Bengaluru'),
(3, 'Mumbai'),
(4, 'Delhi'),
(5, 'Chennai');

INSERT INTO orders (ordern, odate, custn, order_amt) VALUES
(1, '2020-01-14', 1, 2000),
(2, '2021-04-13', 2, 500),
(3, '2019-10-02', 3, 2500),
(4, '2019-05-12', 5, 1000),
(5, '2020-12-23', 3, 1200);

INSERT INTO order_item (ordern, itemn, qty) VALUES
(1, 1, 5),
(2, 5, 1),
(3, 5, 5),
(4, 3, 1),
(5, 4, 12);

INSERT INTO shipment (ordern, warehousen, ship_date) VALUES
(1, 2, '2020-01-16'),
(2, 1, '2021-04-14'),
(3, 4, '2019-10-07'),
(4, 3, '2019-05-16'),
(5, 5, '2020-12-23');

-- =====================================================
-- STEP 3: Show All Tables
-- =====================================================

SELECT 'CUSTOMER TABLE' AS Info;
SELECT * FROM customer;

SELECT 'ORDERS TABLE' AS Info;
SELECT * FROM orders;

SELECT 'ORDER_ITEM TABLE' AS Info;
SELECT * FROM order_item;

SELECT 'ITEM TABLE' AS Info;
SELECT * FROM item;

SELECT 'SHIPMENT TABLE' AS Info;
SELECT * FROM shipment;

SELECT 'WAREHOUSE TABLE' AS Info;
SELECT * FROM warehouse;

-- =====================================================
-- QUESTION 1(a)
-- List the Order# and Ship_date for all orders shipped from Warehouse# 2
-- =====================================================

SELECT 'QUESTION 1(a): Orders shipped from Warehouse 2' AS Info;

SELECT 
    ordern AS Order_No,
    ship_date AS Ship_Date
FROM shipment
WHERE warehousen = 2;

-- =====================================================
-- QUESTION 1(b)
-- List the Warehouse information from which the Customer named Kumar was supplied his orders
-- =====================================================

SELECT 'QUESTION 1(b): Warehouse information for Kumar orders' AS Info;

SELECT DISTINCT
    w.warehousen AS Warehouse_No,
    w.city AS Warehouse_City
FROM customer c
JOIN orders o 
    ON c.custn = o.custn
JOIN shipment s 
    ON o.ordern = s.ordern
JOIN warehouse w 
    ON s.warehousen = w.warehousen
WHERE c.cname = 'Kumar';

-- =====================================================
-- QUESTION 1(c)
-- Produce a listing of Order#, Warehouse#
-- =====================================================

SELECT 'QUESTION 1(c): Order number and Warehouse number' AS Info;

SELECT 
    ordern AS Order_No,
    warehousen AS Warehouse_No
FROM shipment;

-- =====================================================
-- QUESTION 1(d)
-- Produce a listing: Cname, #ofOrders, Avg_Order_Amt
-- =====================================================

SELECT 'QUESTION 1(d): Customer name, number of orders, average order amount' AS Info;

SELECT 
    c.cname AS Cname,
    COUNT(o.ordern) AS Number_Of_Orders,
    IFNULL(AVG(o.order_amt), 0) AS Avg_Order_Amt
FROM customer c
LEFT JOIN orders o 
    ON c.custn = o.custn
GROUP BY c.custn, c.cname;

-- =====================================================
-- QUESTION 1(e)
-- Delete all orders for customer named Kumar
-- =====================================================

SELECT 'QUESTION 1(e): Delete all orders for Kumar' AS Info;

DELETE o
FROM orders o
JOIN customer c 
    ON o.custn = c.custn
WHERE c.cname = 'Kumar';

SELECT 'After deleting Kumar orders: ORDERS table' AS Info;
SELECT * FROM orders;

SELECT 'After deleting Kumar orders: SHIPMENT table' AS Info;
SELECT * FROM shipment;

SELECT 'After deleting Kumar orders: ORDER_ITEM table' AS Info;
SELECT * FROM order_item;

-- =====================================================
-- QUESTION 1(f)
-- Find the item with the maximum unit price
-- =====================================================

SELECT 'QUESTION 1(f): Item with maximum unit price' AS Info;

SELECT 
    itemn AS Item_No,
    unitprice AS Unit_Price
FROM item
WHERE unitprice = (
    SELECT MAX(unitprice)
    FROM item
);

-- =====================================================
-- QUESTION 2
-- Create trigger so that after any update or delete from customer table,
-- old data is stored in customer_bak table
-- =====================================================

CREATE TABLE customer_bak (
    backup_id INT AUTO_INCREMENT PRIMARY KEY,
    custn INT,
    cname VARCHAR(50),
    city VARCHAR(50),
    operation_date DATETIME,
    operation_type VARCHAR(20)
);

-- MySQL e UPDATE and DELETE er jonno alada trigger korte hoy.

DELIMITER $$

CREATE TRIGGER customer_trigg_update
AFTER UPDATE ON customer
FOR EACH ROW
BEGIN
    INSERT INTO customer_bak
    (custn, cname, city, operation_date, operation_type)
    VALUES
    (OLD.custn, OLD.cname, OLD.city, NOW(), 'UPDATE');
END$$

CREATE TRIGGER customer_trigg_delete
AFTER DELETE ON customer
FOR EACH ROW
BEGIN
    INSERT INTO customer_bak
    (custn, cname, city, operation_date, operation_type)
    VALUES
    (OLD.custn, OLD.cname, OLD.city, NOW(), 'DELETE');
END$$

DELIMITER ;

-- =====================================================
-- STEP 4: Trigger Test
-- =====================================================

SELECT 'QUESTION 2: Trigger test before update/delete' AS Info;
SELECT * FROM customer_bak;

-- Update test
UPDATE customer
SET city = 'Dhaka'
WHERE custn = 1;

SELECT 'After updating Customer 1, old data stored in customer_bak' AS Info;
SELECT * FROM customer_bak;

-- Delete test
DELETE FROM customer
WHERE custn = 4;

SELECT 'After deleting Customer 4, old data stored in customer_bak' AS Info;
SELECT * FROM customer_bak;

SELECT 'Final CUSTOMER table' AS Info;
SELECT * FROM customer;

SELECT 'Final CUSTOMER table' AS Info;
SELECT * FROM customer;


```Please analyze the attached image containing a Database Management System (DBMS) lab exam/question paper and provide the complete MySQL solution by strictly following this structure:



1. Create Database & Tables Block:

- Include the 'CREATE DATABASE IF NOT EXISTS db_name;' and 'USE db_name;' statements at the very beginning.

- Provide the complete 'CREATE TABLE' statements with proper Primary Keys, Foreign Keys, and Composite Keys based on the schema/relations shown. Ensure the correct execution order to avoid foreign key dependency errors.

- Include 'INSERT INTO' statements with at least 5 sample tuples for each table based on the data visible in the image.

- Put this entire database, table creation, and data insertion setup into ONE SINGLE copy-pasteable SQL code block.



2. Question Answers Block-by-Block:

- For each question/query (e.g., a, b, c, d, e, etc.), provide the solution in its own separate SQL code block.

- Crucial: In all queries, explicitly reference the table names using the 'db_name.table_name' format (e.g., SELECT ... FROM db_name.Employee).

- Ensure the code blocks are clean, well-formatted, and ready to copy-paste directly.



3. Explanation Block (Optional/Helpful):

- Briefly explain the logic of each query in simple, easy-to-understand language so that I can explain it to my teacher/examiner if asked.



Please generate the response now based on the attached image.



Note; without comment```
