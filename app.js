const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const premiumFeatureRoute = require('./routes/premium-feature');
const forgotPasswordRoute = require('./routes/forgot-password');
const buyPremiumRoute = require('./routes/buy-premium');
const downloadHistoryRoute = require('./routes/download-history')

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



mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.kaqa2nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
 .then(() => {

    console.log('db connected');
    app.listen(process.env.PORT || 4000);
    
 })
 .catch(error => console.log(error));