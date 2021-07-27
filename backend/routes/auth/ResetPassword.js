const { sha512 } = require('crypto-hash');

const Users = require('../../models/User');
const ResetRequest = require('../../models/ResetRequest');

async function ResetPassword(req, res, next) {
    try {
        const resetRequestId = req.params.resetRequest;
        const updatedPassword = req.body.password;

        // Check to make sure that the user sent a password.
        if (!updatedPassword) {
            return res
                .status(400)
                .send(
                    'That form does not contain a password, please try again.'
                );
        }
        const hashedPassword = await sha512(updatedPassword);

        // Check to make sure that the resetRequest exists in the database.
        const resetRequest = await ResetRequest.findById(resetRequestId);
        if (!resetRequest) {
            return res
                .status(404)
                .send(
                    'That reset request does not exist, please follow the link from your email to reset your password.'
                );
        }

        const user = await Users.findByIdAndUpdate(resetRequest.user, {
            password: hashedPassword,
        });

        // Delete all resetRequests associated with that user
        await ResetRequest.deleteMany({ user: user.id });

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong!');
    }
}

module.exports = ResetPassword;
