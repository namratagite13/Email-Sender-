
const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home')
});

app.post('/send-email', (req, res) =>{

    const {recipient, subject, message} = req.body;

    const transporter = nodeMailer.createTransport({
        'service': 'gmail',
        'auth':{
            'user': "",
            'pass': ''

        }
    });

    const mailOptions = {
       from: "",
       to: recipient,
       subject: subject,
       text: message


    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log('error sending mail', error)
            res.status().json({
                message: 'error sending mail'
            })
        }else{
            console.log('email send successfully.')
        }
    })


})

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
});