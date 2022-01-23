const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json());


//api to check if string is palindrome or not
app.post('/checkPalindrome', (req, res) => {
    const { str } = req.body;

    if (str == str.split("").reverse().join("")) {
        res.json("its a palindrome");
    } else {
        res.json("its NOT a palindrome");
    }



});


//ROUTES C R U D
app.delete("/UsersList/:id", async(req, res) => {
    try {
        const UserList = await pool.query(`DELETE FROM users  where id=$1`, [req.params.id]);

        //res.json(UserList.);
        res.json(`user with id ${req.params.id} - deleted`);
    } catch (err) {
        console.error("error occured " + err);
    }

});
app.put("/UsersList/:id", async(req, res) => {
    try {

        const { name, address, designation } = req.body;
        console.log(name, address, designation);
        const UserList = await pool.query(`UPDATE users SET name=$1, address=$2, designation=$3  where id=$4 `, [name, address, designation, req.params.id]);


        res.json(`user with id ${req.params.id}: ` + `{${ name}, ${address}, ${designation}}` + ` - updated`);
    } catch (err) {
        console.error("error occured " + err);
    }

});
app.get("/UsersList/:name", async(req, res) => {
    try {

        const UserList = await pool.query(`SELECT * FROM  users where name=$1 `, [req.params.name]);


        res.json(UserList.rows[0]);
    } catch (err) {
        console.error("error occured " + err);
    }

});
app.get("/UsersList", async(req, res) => {
    try {

        const UserList = await pool.query(`SELECT * FROM  users `);


        res.json(UserList.rows);
    } catch (err) {
        console.error("error occured " + err);
    }

});
app.post("/saveUsers", async(req, res) => {
    try {
        //await
        const { name, address, designation, age } = req.body;
        console.log(name);
        // pool.connect();
        // pool.on("connect", () => {
        //     console.log("hello world");
        // });
        const newUser = await pool.query(`INSERT INTO
         users( name, address, designation, age) 
         VALUES($1, $2, $3, $4) RETURNING *`, [name, address, designation, age]);


        res.json(newUser.rows[0]);
    } catch (err) {
        console.error("error occured " + err);
    }

});

const port = 3000;
module.exports = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})