/**
 * Created by wang7liang on 2018/3/10.
 */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let multer = require('multer');
let loginRoute = require('./login/loginRoute.js');
let userRoute = require('./user/userRoute.js');


let app = new express();
app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

loginRoute(app);
userRoute(app);

app.listen(8888);

