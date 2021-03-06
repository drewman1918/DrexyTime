require('dotenv').config();
const express = require('express')
      , session = require('express-session')
      , passport = require('passport')
      , Auth0Strategy = require('passport-auth0')
      , massive = require('massive')
      , controller = require('./controller')
      , bodyParser = require('body-parser')
      , nodemailer = require('nodemailer')
      , S3 = require('./S3.js')
      
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    EMAIL,
    EMAIL_PASSWORD,
    STRIPE_SECRET_KEY,
} = process.env;
        
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const app = express();

//Build
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
//This line should enable larger pictures to be uploaded, but it is not working.
// app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))();

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
        // email: "drew@bloomfieldcfo.com",
        email: 'test@user.com',
        employeeid: 14,
        // firstname: "drew",
        firstname: 'test',
        // lastname: "bloomfield",
        lastname: "user",
        payrate: 25,
        profilepicture: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
        role: "admin",
        companyid: 3
    }
    next()
})

app.get('/login', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}));

//Authentication Calls
app.get('/auth/me', (req, res, next) => {
    res.send(req.user)
})
app.get('/api/logout', controller.logout);

//Register Call
app.get('/api/emails', controller.getAllEmails);
app.post('/api/register', controller.registerNewUser);

//Client calls
app.get('/api/clients', controller.getAllClients);
app.post('/api/clients', controller.addClient);
app.put('/api/clients/:clientid', controller.updateEmail);
app.delete('/api/clients/:clientid', controller.deleteClient);

//Project Calls
app.get('/api/projects/:clientID', controller.getClientProjects);
app.delete('/api/projects/:projectid', controller.deleteProject);
app.put('/api/projects/:projectid', controller.editProject);
app.post('/api/projects', controller.addProject);

//Memo calls
app.post('/api/memos', controller.addMemo);
app.get('/api/memos/:employeeid/:date', controller.getUserMemos);
app.delete('/api/memos/:memoid', controller.deleteMemo);
app.put('/api/memos/:memoid', controller.editMemo);
app.get('/api/twoweekmemos/:one/:fourteen', controller.getTwoWeekMemos);
app.get('/api/twoweektotals/:one/:fourteen', controller.getTwoWeekTotals);
app.get('/api/invoicememos/:clientid/:startDate/:endDate', controller.getInvoiceMemos);
app.put('/api/invoicememos/:memoid', controller.editInvoiceMemo);

//Employee calls
app.get('/api/employees', controller.getEmployees);
app.put('/api/employees/:employeeid', controller.updateEmployee);
app.delete('/api/employees/:employeeid', controller.deleteEmployee);
app.post('/api/employees', controller.addEmployee);

//Time by employee
app.get('/api/maindata/:startDate/:endDate', controller.getMainData);

//Company Logo
app.get('/api/companylogo', controller.getCompanyLogo);
app.put('/api/companylogo', controller.updateCompanyLogo);

//Stripe
app.post('/api/stripe', function (req, res, next) {
    const stripeToken = req.body.stripeToken;

    stripe.customers.create({
        //pass in the email from the front end
        email: req.body.email,
        source: stripeToken,
    }, function(err, customer){
        //asynchronously called
        if (err) {
            res.send({
                success: false,
                message: 'Error'
            })
        } else {
            const { id } = customer;

            stripe.subscriptions.create({
                customer: id,
                items: [
                    {
                        plan: 'plan_D09wZts5tTogg9',
                    },
                ],
            },  function(err, subscription) {
                // asynchronously called
                if(err) {
                    res.send({
                        success: false,
                        message: 'Error'
                    })
                } else {
                    res.send(subscription)
                }
            })

        }
    }
    )
});

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
        }else {
        }
        transporter.close();
    })
    res.sendStatus(201);
})

//S3 -- See S3.js for actual code.
S3(app)

app.listen(SERVER_PORT, () => console.log( `You shall not pass on port: ${SERVER_PORT}` ))
