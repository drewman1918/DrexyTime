require('dotenv').config();
const express = require('express')
      , session = require('express-session')
      , passport = require('passport')
      , Auth0Strategy = require('passport-auth0')
      , massive = require('massive')
      , controller = require('./controller')
      , bodyParser = require('body-parser')
      , nodemailer = require('nodemailer');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    EMAIL,
    EMAIL_PASSWORD
} = process.env;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then( (db) => {
    app.set('db', db);
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    //this scope defines what info you can get back from the authorization
    scope: 'openid profile email'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let db = app.get('db');
    let { picture, email} = profile._json;
    db.find_user([email]).then( (foundUser) => {
        if (foundUser[0]){
            done(null, {email: foundUser[0].email, profilepicture: picture})
        } else {
            done(null, null)
        }
    })
}))

passport.serializeUser( (profile, done) => {
    done(null, profile);
})
passport.deserializeUser( (profile, done) => {
    //whatever we pass out of the done method here will end up on req.user. So user will be there. 
    app.get('db').find_user([profile.email]).then( (user) => {
        done(null, Object.assign({}, user[0], {profilepicture: profile.profilepicture}));
    });
})

//This exists to pretend that I am logged in, even though I am not logged in. This is the exact information that logging in will pass to req.user. Delete this once I finish developing. 
app.use( (req, res, next) => {
    req.user = {
        billingrate: 100,
        email: "drew@bloomfieldcfo.com",
        employeeid: 1,
        firstname: "drew",
        lastname: "bloomfield",
        payrate: 25,
        profilepicture: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
        role: "admin"
    }
    next()
})

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/mytime/today',
    failureRedirect: 'http://localhost:3001'
}));

//Authentication Calls
app.get('/auth/me', (req, res, next) => {
    res.send(req.user)
})

//Client and Project calls
app.get('/api/clients', controller.getAllClients)
app.get('/api/projects/:clientID', controller.getClientProjects)

//Memo calls
app.post('/api/memos', controller.addMemo);
app.get('/api/memos/:employeeid/:date', controller.getUserMemos);
app.delete('/api/memos/:memoid', controller.deleteMemo);
app.put('/api/memos/:memoid', controller.editMemo);

//Employee calls
app.get('/api/employees', controller.getEmployees);
app.put('/api/employees/:employeeid', controller.updateEmployee);
app.delete('/api/employees/:employeeid', controller.deleteEmployee);
app.post('/api/employees', controller.addEmployee);

//Time by employee
app.get('/api/maindata/:startDate/:endDate', controller.getMainData);

// Nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

app.post('/api/email', (req, res, next) => {
    const { subject, senderName, message, senderEmail} = req.body;
    var mail = {
        from: EMAIL,
        to: EMAIL,
        subject: subject,
        html: "Name: " + senderName + "<br/> Message: " + message + "<br/>" + "Respond to: " + senderEmail
    }
    transporter.sendMail(mail, (error, response) => {
        if(error){
            console.log("Email sending error");
            console.log(error);
        }else {
            console.log("Success!")
        }
        transporter.close();
    })
    res.sendStatus(201);
})

app.listen(SERVER_PORT, () => console.log( `You shall not pass on port: ${SERVER_PORT}` ))
