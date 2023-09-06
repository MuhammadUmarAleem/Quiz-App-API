const express = require("express");
const router = express.Router();
const {connection} =require("../database/sql");

router.post('/', (req,res)=>{
    const currentDateTime = new Date();

    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1; // Month is 0-indexed, so add 1
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime);
    
    console.log( req.query.UserId);
    console.log( req.query.QuizId);
    console.log(req.query.Array)
    const splitedArray = req.query.Array.split(',');
    console.log(splitedArray)

    try {
        
                connection.query(`INSERT INTO UserQuizzes (UserId, QuizId, DateTime)
                VALUES
                  (${req.query.UserId}, ${req.query.QuizId}, '${formattedDateTime}')`, (err, result) => {
                    if (err) throw err;
                    console.log('Data inserted successfully!');
                  });
        
                  const query = `SELECT Max(Id) as Id FROM UserQuizzes`;
                  var AccountId = 0;
                  connection.query(query, (error, results, fields) => {
                    if (error) {
                      console.error('Error retrieving data from MySQL database:', error);
                      return;
                    }
                    else{
                        console.log(results);
                        var Id = results[0].Id;

                        var query1 = `INSERT INTO UserQuizzesAns (UserQuizId, QuestionId, UserAns)
                        VALUES
                          `;
                        for (let i = 0; i <= 8; i++) {
                            query1 = query1+`(${Id}, ${splitedArray[i*2]}, ${splitedArray[(i*2)+1]}),`;
                        }
                        query1 = query1+`(${Id}, ${req.query.a}, ${req.query.b})`;
                        console.log(query1)
                                    
                        connection.query(query1,(err, result) => {
                            if (err) throw err;
                            console.log('Data inserted successfully!');
                            res.redirect(`http://localhost:3000/Progress?Id=${Id}`);
                          });
                    }
                    console.log('Data retrieved from MySQL database:', results);
                  });
          } catch (error) {
            console.error("An error occurred: ", error);
            res.redirect(`http://localhost:3000/Progress?Id=${Id}`);
          }
})
module.exports=router