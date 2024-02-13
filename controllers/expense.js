const { createExpense, countExpenses, readExpenses, readExpenseById, deleteExpense, updateExpense } = require('../services/expense');


exports.displayExpense = async (req, res, next) => {
    try {
        const currPage = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);
        const userId = req.user._id.toString();

        if (isNaN(currPage) || isNaN(limit)) {
            return res.status(400).json({ message: 'Invalid page or limit parameter' });
        }

        const offset = (currPage - 1) * limit;

        const count = await countExpenses({ userId });
        const totalPages = Math.ceil(count / limit);

        const expense = await readExpenses({ userId, offset, limit });

        res.json({ expense, totalPages }); 
        
    } catch (error) {
        handelDatabaseError(res, error);
    }
}



exports.addExpense = async (req, res, next) => {
    try{
        const expenseObj = req.body;
        const userId = req.user._id.toString();

        const expense = await createExpense({ expenseObj, userId });
        res.json(expense); 

    } catch(error) {   
        handelDatabaseError(res, error);
    }
}


exports.deleteExpense = async (req, res, next) => {

    try {
        const { expenseId } = req.query;

        const expenseObj = await readExpenseById({ expenseId });
        if(expenseObj.length === 0) res.status(404).json({ message: 'expense not found' });

        await deleteExpense({ expenseObj }); 

        res.json({ success: true });
    } catch (error) {
        handelDatabaseError(res, error);
    }
}


exports.editExpense = async (req, res, next) => { 
    try {
        const { expenseId } = req.query;
        const newExpenseObj = req.body;

        const expenseObj = await readExpenseById({ expenseId });
        if(expenseObj.length === 0) res.status(404).json({ message: 'expense not found' });

        const expense = await updateExpense({ expenseId, newExpenseObj });
        res.json(expense);

    } catch (error) {
        handelDatabaseError(res, error);
    }
}


function handelDatabaseError(res, error) {
    console.log(error);
    return res.status(500).json({message: error.message});
}