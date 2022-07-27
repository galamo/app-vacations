// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'northwind'
});



// with placeholder
function seed() {

    for (let index = 0; index < 5000; index++) {
        connection.query(
            'INSERT INTO `northwind`.`strings` (`string_data`) VALUES (?);',
            ["test_" + Math.random() * 9999999999999],
            function (err, results) {
                console.log(results);
            }
        );

    }
}
seed()