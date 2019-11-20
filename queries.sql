-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT ProductName, CategoryName FROM Products
JOIN Categories
GROUP BY ProductName;
-- 77 Records

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT O.Id,
       S.CompanyName
  FROM Shipper AS S
  JOIN [Order] AS O
 WHERE O.OrderDate < '2012-08-09' AND 
       O.ShipVia = s.Id;

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT P.ProductName, OD.Quantity FROM Product as P
JOIN OrderDetail AS OD
WHERE P.ID = OD.ProductID AND OD.OrderID = '10251'
ORDER BY P.ProductName ASC;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT O.ID, OD.OrderID, C.CompanyName, E.LastName FROM [Order] AS O
JOIN OrderDetail AS OD ON O.ID = OD.OrderID
JOIN Employee AS E ON O.EmployeeID = E.ID
JOIN Customer AS C ON O.CustomerID = C.ID
GROUP BY OD.OrderID;

