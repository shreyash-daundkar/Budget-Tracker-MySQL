const { readUsers } = require('../services/user');
const { storeInS3 } = require('../services/awsS3');
const { readExpenses } = require('../services/expense');
const { createDownloadHistory } = require('../services/download-history');



exports.leaderBoard = async (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const leaderBoard = await readUsers({ sortField: expense, sortDesc: true });

        res.json({isPremium: req.user.isPremium, leaderBoard});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error feaching leaderboard'});
    }
}    



exports.downloadReport = async (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};
        const userId = req.user.id;

        const expense = await readExpenses({ userId });
        const fileData = JSON.stringify(expense);
        const fileName = 'Expense' + req.user.id + new Date().toISOString() + '.txt';

        const location = await storeInS3(fileName, fileData);

        const downloadHistoryObj = {
            fileName, 
            location, 
            userId,
        }

        await createDownloadHistory({ downloadHistoryObj });
        
        res.json({ location });  

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error downloding report'});
    }
}