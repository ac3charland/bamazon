var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

// Display all items in the products table
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    console.log("AVAILABLE PRODUCTS:\n\n")
    for (index in res) {
        var item = res[index];
        console.log(
            "ID:", item.item_id, 
            "|", item.product_name, 
            "| Department:", item.department_name, 
            "Price: $", item.price, 
            "In stock:", item.stock_quantity
        )
        console.log("\n")
    }

    // First prompt asking user what they want to buy and how much
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to buy:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the quantity you would like to purchase.",
            name: "qty"
        }
    ]).then(function (iRes) {
        var id = iRes.id;
        var custQty = iRes.qty;
        
        // Find item in DB
        connection.query(
            "SELECT * FROM products WHERE ?",
            [
                {
                    item_id: id
                }
            ],
            function (err, res) {
                if (err) throw err;

                var dbQty = res[0].stock_quantity;
                var price = res[0].price;
                // Check if the user's quantity can be fulfilled
                if (custQty > dbQty) {
                    console.log("Insufficient quantity!");
                } else {
                    var newQty = parseInt(dbQty) - parseInt(custQty);
                    // Update stock_quantity in DB
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQty
                            },
                            {
                                item_id: parseInt(id)
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Order placed! Your order cost $" + custQty * price);
                            
                        }
                    )
                }
                connection.end();
            }
        )
    });
});

