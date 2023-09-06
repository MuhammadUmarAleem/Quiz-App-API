const express = require("express");
const router = express.Router();
const {connection} =require("../database/sql");

router.get('/', (req,response)=>{
    // connection.query(`-- Inserting 10 quiz questions with QuizId set to 1
    // INSERT INTO QuizQ (title, QuizId, option1, option2, option3, option4, correctoption)
    // VALUES
    //   ('What is the capital of France?', 1, 'London', 'Madrid', 'Paris', 'Berlin', 3),
    //   ('Which planet is known as the Red Planet?', 1, 'Mars', 'Venus', 'Jupiter', 'Saturn', 1),
    //   ('Who painted the Mona Lisa?', 1, 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo', 3),
    //   ('What is the chemical symbol for gold?', 1, 'Go', 'Au', 'Gd', 'Gl', 2),
    //   ('Which famous scientist developed the theory of general relativity?', 1, 'Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Niels Bohr', 2),
    //   ('What is the largest mammal on Earth?', 1, 'Elephant', 'Giraffe', 'Blue Whale', 'Hippopotamus', 3),
    //   ('Which novel is written by Jane Austen?', 1, 'Pride and Prejudice', 'Moby-Dick', 'To Kill a Mockingbird', '1984', 1),
    //   ('In which year did the Titanic sink?', 1, '1905', '1912', '1920', '1931', 2),
    //   ('What is the national flower of Japan?', 1, 'Cherry Blossom', 'Rose', 'Lily', 'Tulip', 1),
    //   ('Which element is represented by the chemical symbol "O" in the periodic table?', 1, 'Oxygen', 'Osmium', 'Oganesson', 'Osmium', 1);
    
    
    //   `)
    //   console.log("done");
    console.log(req.query.Id)
    connection.query(`SELECT * from Quiz Join QuizQ Where Quiz.id = ${req.query.Id}`
    , (err,res)=>{
        if(err) throw err;
        else{
            console.log(res);
            response.send(res);
        }
    })
})
module.exports=router