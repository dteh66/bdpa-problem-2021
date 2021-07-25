const { sha512 } = require('crypto-hash');

const Users = require('../../models/User');
const ResetRequest = require('../../models/ResetRequest');

async function ResetPassword(req, res, next) {
    try {
        const resetRequestId = req.params.resetRequest;
        console.log(resetRequestId);
        const updatedPassword = req.body.password;

        if (!updatedPassword) {
            res.status(400).send(
                'That form does not contain a password, please try again.'
            );
            return;
        }

        const hashedPassword = await sha512(updatedPassword);
        const resetRequest = await ResetRequest.findById(resetRequestId);

        if (!resetRequest) {
            res.status(404).send(
                'That reset request does not exist, please follow the link from your email to reset your password.'
            );
            return;
        }

        const user = await Users.findByIdAndUpdate(resetRequest.user, {
            password: hashedPassword,
        });
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
}

module.exports = ResetPassword;
