// const express = require('express');
// const app = express();
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

// const dbService = require('./dbService');
// const { response } = require('express');

// app.use(cors());
// app.use(express.json());
// app.set('view engine' , 'ejs');
// app.use(express.urlencoded({extended: true}));


// // let sql = "SELECT * FROM feedbacks;";

// // pool.execute(sql , function(err,result){
// //     if(err){
// //         throw err;
// //     }
// //     else{
// //         app.listen(3000);
// //         console.log('connected');
// //         console.log(request);
// //     }
// // });

// app.listen(process.env.PORT ,()=> console.log('app is runnning'));

// app.get('/' , (req,res)=>{
//     res.render('index' , {title: 'Home'});
// });

// app.post('/' , (req,res)=>{
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var subject = req.body.subject;
//     var courseCode = req.body.courseCode;
//     var whyChoose  = req.body.whyChoose;
//     var knowledgeLevel = req.body.knowledgeLevel;
//     var effortLevel = req.body.effortLevel;
//     var atEnd = req.body.atEnd;
//     var communication = req.body.communication;
//     var recommendation = req.body.recommendation;

//     var sql = `INSERT INTO feedbacks (firstname , lastname , subject , coursecode , choose , knowledge level , effortlevel , knowledgelevelatend , communication , recommendation)
//     VALUES ("${firstName}" , "${lastName}" , "${subject}" , "${courseCode}" , "${whyChoose}" , "${knowledgeLevel}" , "${effortLevel}" , "${atEnd}" , "${communication}" , "${recommendation}")`;

//     var [newPost, _] = pool.execute(sql , function(error,result){
//         if(error){
//             throw error;
//         }
//         else{
//             res.json(req.body);
//             console.log(result);
//         }
//     })
//     newPost.save();
//     res.redirect('/thanku');
// })

// app.get('/thanku' , (req,res)=>{
//     const db = dbService.getDbServiceInstance();
//     // res.render('thanku' , {title: 'thankyou'});

//     const result = db.getAllData();
    
//     result.then(data => response.json({data: data}))
//     .catch(err => console.log(err));
// })


const express = require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

app.get('/' , (req,res)=>{
    res.render('index' , {title: 'Home'});
});


app.post('/' , (req,res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var subject = req.body.subject;
    var courseCode = req.body.courseCode;
    var whyChoose  = req.body.whyChoose;
    var knowledgeLevel = req.body.knowledgeLevel;
    var effortLevel = req.body.effortLevel;
    var atEnd = req.body.atEnd;
    var communication = req.body.communication;
    var recommendation = req.body.recommendation;

    var query = `INSERT INTO feedbacks (firstname , lastname , sub , coursecode , choose , knowledgelevel , effortlevel , knowledgelevelatend , communication , recommendation)
    VALUES ("${firstName}" , "${lastName}" , "${subject}" , "${courseCode}" , "${whyChoose}" , "${knowledgeLevel}" , "${effortLevel}" , "${atEnd}" , "${communication}" , "${recommendation}")`;

    con.query(query , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(result);
        }
    });
    res.redirect('/thanku');
})

app.get('/thanku' , (req,res)=>{
    var que = `SELECT * FROM feedbacks;`;
    con.query(que , (error , result)=>{
        if(error){
            console.log(error);
        }
        res.render('thanku');
    })
})

app.get('/thankuu' , (req,res)=>{
    var que = `SELECT * FROM feedbacks;`;
    con.query(que , (error , result)=>{
        if(error){
            console.log(error);
        }
        // console.log(result);
        return res.json(result);
    })
})

app.delete('/thankuu/:id' , (req,res)=>{
    const id = req.params.id;
    var que = `DELETE FROM feedbacks where id='${id}'`;
    con.query(que , (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            // console.log(result);
        }
    })
    res.send("404");
    // console.log(res);
})

app.post('/thanku' , (req,res)=>{
    let id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var subject = req.body.subject;
    var courseCode = req.body.courseCode;
    var whyChoose  = req.body.whyChoose;
    var knowledgeLevel = req.body.knowledgeLevel;
    var effortLevel = req.body.effortLevel;
    var atEnd = req.body.atEnd;
    var communication = req.body.communication;
    var recommendation = req.body.recommendation;

    var query = `UPDATE feedbacks SET firstname="${firstName}" , lastname="${lastName}" , sub="${subject}" , coursecode="${courseCode}" , choose="${whyChoose}" , knowledgelevel="${knowledgeLevel}" , effortlevel="${effortLevel}" , knowledgelevelatend="${atEnd}" , communication="${communication}" , recommendation="${recommendation}"
    WHERE id = ${id}`;

    con.query(query , (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
    res.redirect('/thanku');
})

app.listen(5000);