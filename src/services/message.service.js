const mongoose = require('mongoose');
const MessageModel = require('../models/Message')
const UserModel = require('../models/User')
const RealEstateModel = require ('../models/RealEstate')

const sendMessageEmail = require ('../utils/emailNotifier')


class MessageService {

    async sendMessage(userId, realEstateId, subject, text, message) {
        try {

            console.log(message)
            await MessageModel.create(message);

            const user = await UserModel.findOne({_id: new mongoose.Types.ObjectId(userId)})
            console.log(user.email)
            const re = await RealEstateModel.findOne({_id: new mongoose.Types.ObjectId(realEstateId)})

            console.log(re)
            let reEmail = re.contactEmail
            if (!reEmail) {
                reEmail = re.logInEmail
            }
            console.log("useremail:" + user.email + "   reEmail:" + reEmail)

            await sendMessageEmail(user.email, reEmail, subject, text)
        } catch (err) {
            console.error(err);
            throw new Error("Error in sendMessage Service");
        }
    }
}

module.exports = new MessageService();