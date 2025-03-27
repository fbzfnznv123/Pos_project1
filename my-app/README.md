npm run start


SELECT product_id,product_name,product_description,price,create_time,stock_id,status,img_url,update_at FROM products ORDER BY update_at DESC;

update  products  set  img_url = './logo192.png'

;

delete from 
  products ;



CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `product_name` varchar(255) NOT NULL COMMENT 'Product Name',
  `product_description` text COMMENT 'Product Description',
  `price` int NOT NULL COMMENT 'Product Price',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `stock_id` int DEFAULT NULL COMMENT 'Stock ID',  -- `stock_id` ไม่มี AUTO_INCREMENT
  `status` enum('active','inactive') DEFAULT 'active' COMMENT 'Product Status',
  `img_url` varchar(1000) DEFAULT NULL COMMENT 'Product Image URL',
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update Time',
  PRIMARY KEY (`product_id`),
  UNIQUE (`stock_id`)  -- ถ้าต้องการให้ `stock_id` มีค่าไม่ซ้ำกัน
);

update 
  products 
set 
  product_name = product_name,
  
where 
  product_id = 'product_id';