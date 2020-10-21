const { Botkit, BotkitConversation } = require('botkit');
const data = require('../data');

function checkKeys(key) {
    return Object.keys(data)
}

function mapKeys(data) {
    console.log(data)

    const keys = Object.keys(data)
    console.log(keys)
    return keys.map(key => {
        return { title: key, payload: key }
    })
}

function personalInfoReply(key) {
    const res = data['Personal Info']
    if (key === '') {
        return ''
    } else if (key === 'state') {
        return `Jesse is from ${res[key]}`
    } else if (key === 'city') {
        return `Jesse is from ${res[key]}, ${res.state}`
    } else if (key === 'age') {
        return `Jesse is ${res[key]} years old`
    } else if (key === 'gender') {
        return `Jesse is a ${res[key]}`
    }
}


module.exports = function (controller) {
    const MY_PERSONAL_INFO = 'personal info';
    let convo = new BotkitConversation(MY_PERSONAL_INFO, controller);

    convo.addAction('personalQuestion')

    convo.addQuestion({
        text: 'what would you like to know about Jesse personally?',
        quick_replies: [{
            content_type: 'text',
            title: 'age',
            payload: 'age',
        }, {
            content_type: 'text',
            title: 'city',
            payload: 'city',
        }, {
            content_type: 'text',
            title: 'state',
            payload: 'state',
        }, {
            content_type: 'text',
            title: 'gender',
            payload: 'gender',
        }],
    }, async function (response, convo, bot) {
        const key = response
        await bot.say(personalInfoReply(key))

    }, 'response', 'personalQuestion');

    convo.addAction('confirmation', 'personalQuestion');

    // do a simple conditional branch looking for user to say "no"
    convo.addQuestion('Would you like to know anything else personal about Jesse', [
        {
            pattern: 'no',
            handler: async (response, convo, bot) => {

            }
        },
        {
            pattern: 'yes',
            handler: async (response, convo, bot) => {

                await convo.gotoThread('personalQuestion');
            }
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say("Sorry I don't understand. Enter 'yes' or 'no'.")
                await convo.gotoThread('confirmation')
            }
        }
    ], 'confirm', 'confirmation');

    controller.addDialog(convo);

    controller.hears('personal info', 'message', async (bot, message) => {
        await bot.beginDialog(MY_PERSONAL_INFO);
    });
}
