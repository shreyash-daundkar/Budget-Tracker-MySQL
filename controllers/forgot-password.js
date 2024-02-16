const Sib = require('sib-api-v3-sdk');
const bcrypt = require('bcrypt');

const { createForgotPasswordRequest, findForgotPasswordRequestById, deactivateForgotPasswordRequest } = require('../services/forgot-password-request');
const { readUsers, updateUser } = require('../services/user');


exports.sendMail = async (req, res, next) => {
    try {
        const { email } = req.body;
    
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.EMAIL_API;
        
        const transEmailApi = new Sib.TransactionalEmailsApi();
    
        const sender = {
            email: process.env.EMAIL_SENDER_EMAIL,
            name: process.env.EMAIL_SENDER_NAME,
        }
    
        const receivers = [ { email } ];
        const users = await readUsers({ email });

        const forgotPasswordRequestObj = {
            isActive: true,
            userId: users[0].id, 
        }

        const id = await createForgotPasswordRequest({ forgotPasswordRequestObj });

        const key = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forget Password',
            textContent: `http://${req.headers.host}/reset-password.html?id=${id}`,
        });  

        res.json({ key });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error in sending mail'});
    }

}



exports.resetPassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const forgotPasswordRequestId = req.query.id;

        const { isActive, userId } = await findForgotPasswordRequestById({ forgotPasswordRequestId });
    
            if(isActive) {

                await deactivateForgotPasswordRequest({ forgotPasswordRequestId });
                const password = await hashPassword(newPassword);
                await updateUser({ userId, password });

            } else console.log('request is close');
            
        res.json({ success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({Message: 'error in reset password'});
    }
}

function hashPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, (error, hash) => {
            if(error) throw error;
            resolve(hash);
        });
    });
}