const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const database = require('./util/database');

const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const premiumFeatureRoute = require('./routes/premium-feature');
const forgotPasswordRoute = require('./routes/forgot-password');
const buyPremiumRoute = require('./routes/buy-premium');
const downloadHistoryRoute = require('./routes/download-history')

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/buy-premium-order');
const DownloadHistory = require('./models/download-history');
const ForgotPasswordRequests = require('./models/forgot-password-request');

const authenticate = require('./middlewares/authenticate');


 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(['/expense','/premium-features','/premium-buy','/download-history'], authenticate);
app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/premium-features', premiumFeatureRoute);
app.use('/premium-buy', buyPremiumRoute);
app.use('/forgot-password', forgotPasswordRoute);
app.use('/download-history', downloadHistoryRoute);

app.use('/', (req, res, next) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlPath = url.pathname;
    res.sendFile(path.join(__dirname , 'public' + urlPath))
});



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

User.hasMany(DownloadHistory);
DownloadHistory.belongsTo(User);



database.sync()
 .then(() => app.listen(process.env.PORT || 4000))
 .catch(error => console.log(error));