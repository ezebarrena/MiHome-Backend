let instance = null
require ('dotenv').config

const MessageService = require('../services/message.service')

class MessageController {
    static getInstance() {
        if (!instance){
            return new MessageController()
        }
        return instance
    }

    async sendMessage(req, res) {
        try {
            const user = req.body.userId;
            const realEstate = req.body.reId
            const subject = req.body.subject
            const text = req.body.text

            await MessageService.sendMessage(user, realEstate, subject, text, req.body)
            return res.status(200).json({
                message: "Mensaje enviado",
                status: 200
            })  
        } catch (err) {
            console.error(err);
            return res.status(500).json({
            method: "sendMessage",
            message: err,

        })}
    }
}

module.exports = MessageController.getInstance();