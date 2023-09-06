const express = require("express");
const router = express.Router();
const {connection} =require("../database/sql");

router.get('/', (req,response)=>{
    // connection.query(`CREATE TABLE UserQuizzesAns (
    //     Id INT AUTO_INCREMENT PRIMARY KEY,
    //     UserQuizId INT,
    //     QuestionId INT,
    //     UserAns INT, -- New column
    //     FOREIGN KEY (UserQuizId) REFERENCES UserQuizzes(Id),
    //     FOREIGN KEY (QuestionId) REFERENCES QuizQ(id)
    //   );
    //   `)
    //   console.log("done");
    connection.query(`SELECT * from UserQuizzes as U Join Quiz as Q ON Q.id = U.QuizId Where U.UserId = ${req.query.Id}`
    , (err,res)=>{
        if(err) throw err;
        else{
            console.log(res);
            response.send(res);
        }
    })
})
module.exports=router