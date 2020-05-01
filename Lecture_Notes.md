**Multi-Table Queries**

<!-- In this lecture we'll learn about:-->

    Foreign keys
    SQL joins
    Aggregate functions
    Knex joins
    Database access functions 


**Overview of foreign keys**

 Foreign keys are a type of table field used for creating links between tables. Foreign keys point to the primary key of a different table by having the same value as that primary key(essentially making links between tables). Like primary keys, they are most often integers that identify (rather than store) data. However, whereas a primary key is used to id rows in a table, foreign keys are used to connect a record in one table to a record in a second table.
 A foreign key's job is to point to a unique identifier in a different table
 (primary key), rather than be that identifier, itself.
 Foreign keys don't need to be unique as you can have multiple foreign keys in
 a table pointing to the same primary key.
 



**Overview of join statement**

We can use a JOIN to combine query data from multiple tables using a single SELECT statement.

_What is a join?_
- a join statement is a method for querying data from two or more tables
- we use joins to connect tables on a common field (such as a foreign and primary key)

Using joins requires that the two tables of interest contain at least one field with shared information.
This query will return the data from both tables for every instance where the ON condition is true.
We can shorten the condition by giving the table names an alias.



**Overview of database access methods**

While we can write database code directly into our endpoints, best practices dictate that all database logic exists in separate, modular methods. These files containing database access helpers are often called models

To handle CRUD operations for a single resource, we would want to create a model (or database access file) containing the following methods:

function find() {
}

function findById(id) {
}

function add(user) {
}

function update(changes, id) {
}

function remove(id) {
}


Once all methods are written as desired, we can export them like so:

module.exports = {
  find,
  findById, 
  add, 
  update, 
  delete
}
and use the helper functions in our endpoints


<!-- What is the difference between these lines ?

res.json(await db("users"))
await res.json(db("users"))


db returns a promise, so await db("users") waits for the promise to resolve 
before sending the result from the database to the .json() function.
The other one won't wait for the db promise to resolve before sending the result to the .json() function. 
If you're lucky, it will resolve so quickly that you won't get an error. 
If you're not lucky, you'll get an unfulfilled promise error. 
The await in front of res does nothing, as res.json() doesn't return a promise. -->



<!-- What is the point of useNullAsDefault: true in the package.json file?

In a DBMS such as MySQL, if you don't specify a default for a column and then perform an INSERT without providing a value for that column, 
it will choose a falsey default value that makes sense for the data type, if it can.
In the case of something like an INTEGER, the default is 0. For a TEXT type, an empty string. Etc. For types where no implicit value makes sense, it will choose NULL.
SQLite on the other hand doesn't automatically provide any default and will throw an error if you INSERT a new row which is missing a column that doesn't have a default specified. useNullAsDefault: true prevents having to be explicit about every default in your migration. -->


<!-- SELECT
	"Product"."ProductName",
	"OrderDetail"."Quantity"
FROM "Product"
JOIN "OrderDetail"
ON "Product"."Id" = "OrderDetail"."ProductId"
WHERE "OrderDetail"."OrderId" = "10251"
ORDER BY "ProductName"

works the same as

SELECT
	"Product"."ProductName",
	"OrderDetail"."Quantity"
FROM "Product"
JOIN "OrderDetail"
ON "Product"."Id" = "OrderDetail"."ProductId"
WHERE "OrderDetail"."OrderId" = "10251"
ORDER BY "Product"."ProductName"


Is there a way to know when we have to include the table name first and when we can omit it?

Michael  [5:10 PM]
Oh I see. The reason you can omit it there is because your main table is "Product". So what follows the FROM can be omitted. -->