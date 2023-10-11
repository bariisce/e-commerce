yeni sorgular


 stored procedure Kategori ekleme 

	DELIMITER $$
	CREATE PROCEDURE `CategoryAddSP` (IN CategoryName varchar(255),IN CategoryDescription varchar(255))
	BEGIN
	INSERT INTO categories (`name`, `description`, `createdAt`, `updatedAt`) VALUES (CategoryName, CategoryDescription, now(), now());

	END$$

	DELIMITER ;
	
	Çağrı Yapma
	CALL `CategoryAddSP`("Giyim","Giyim kategorisi açıklama");



stored procedure Kullanıcı Siparişlerini getir

	DELIMITER $$
	CREATE PROCEDURE `userOrderSp` (IN userid int)
	BEGIN
	-- Kullanıcın siparişlerini getirir
		select * from orders O INNER JOIN orderitems OT ON O.id=OT.orderId AND O.userId=userid;
	END$$

	DELIMITER ;
	
	Çağrı yapma
	CALL `userOrderSp`(1);
	
	
	
	
fonksiyon Kullanıcın toplam siparişlerinde ne kadar harcadığını döndürür 
		DELIMITER $$
		CREATE FUNCTION userordertotal(
			userid int
		) 
		RETURNS int(11)
		DETERMINISTIC
			BEGIN
				DECLARE toplam int;
					SET toplam= (SELECT SUM(price)  from orders O INNER JOIN orderitems OT ON O.id=OT.orderId AND O.userId=userid);
				RETURN (toplam);
			END$$
		DELIMITER ;

	Çağrı yapma
	select userordertotal(1)



fonksiyon Ürünün vergisi hesaplayan 
		DELIMITER $$
		CREATE FUNCTION TaxCalculation(
			productid int,
            taxerate int
		) 
		RETURNS float
		DETERMINISTIC
			BEGIN
				DECLARE kdv float;
					SET kdv= (SELECT price FROM products where id=productid)*taxerate/100;
				RETURN (kdv);
			END$$
		DELIMITER ;
		
		select TaxCalculation(1,18) 
		
		
		
		
View Sepetinde Ürün Ekleyen Kullanıcının (adı,ürün adı,sepete ekleme tarihini gösterir)
		CREATE VIEW userCartProduct
		AS
		SELECT U.name AS "Kullanıcı Adı",P.name AS "Ürün Adı",CI.updatedAt AS "Sepete Ekleme Tarihi"
		FROM carts C INNER JOIN users U ON C.userId= U.id INNER JOIN cartitems CI ON C.id=CI.cartId INNER JOIN products P ON CI.productId=P.id
		
		Çağrı yapma
		SELECT * FROM usercartproduct;
		
		
View en az 1 ürün olan kategoriler
		CREATE VIEW hasProductCategory
		AS
		SELECT DISTINCT C.name FROM categories C LEFT JOIN products P ON C.id=P.categoryId WHERE P.categoryId IS NOT NULL
		
		Çağrı yapma
		SELECT * FROM hasProductCategory;
		
		
		
View hiç ürünü olamayan kategoriler
		CREATE VIEW noProductCategory
		AS
		SELECT DISTINCT C.name FROM categories C LEFT JOIN products P ON C.id=P.categoryId WHERE P.categoryId IS NULL
		
		Çağrı yapma
		SELECT * FROM noProductCategory;
		
		

View Siparişi olan kullanıcıların siparişleri
		CREATE VIEW userOrderProduct
		AS
		SELECT  U.name As "Kullanıcı Adı",P.name As "Ürün Adı" FROM users U INNER JOIN orders O ON O.userId=U.id INNER JOIN orderitems OI ON O.id=OI.orderId INNER JOIN products P ON OI.productId=P.id
		
		Çağrı yapma
		SELECT * FROM usersWithoutOrder;




View Hiç sipariş vermeyen kullanıcıların mail adresleri
		CREATE VIEW usersWithoutOrder
		AS
		SELECT DISTINCT U.email,'Siparişi yok' As 'Sipariş Durumu' FROM users U LEFT JOIN orders O ON O.userId=U.id WHERE O.id IS NULL

			Çağrı yapma
		SELECT * FROM usersWithoutOrder;




        