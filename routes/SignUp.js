const express = require("express");
const router = express.Router();
const { connection } = require("../database/sql");

router.post("/", async (req, response) => {

    const firstname = req.body.firstname;
    const email = req.body.email;
    const passowrd = req.body.password;

    const data = {					
            Username: firstname,
            Email: email,
            Password: passowrd,
    };
    console.log(data);
    connection.query("INSERT into User SET ?", data,(err,res) => {
      if (err) {
        console.error("Error adding User:", err);
        response.status(500).json({ message: 'Error adding User' });
      } else {
        console.log("User added successfully");
        response.redirect("http://localhost:3000/");
      }
    }
  );
});

module.exports = router;