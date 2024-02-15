const { createDownloadHistory, readDownloadHistorys } = require('../services/download-history');

exports.downloadHistory = async  (req, res, next) => {
    try {
        if(!req.user.isPremium) throw {message: 'user is not premium'};

        const data = await readDownloadHistorys({ userId: req.user.id });
        res.json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error fetching download history'});
    }
}