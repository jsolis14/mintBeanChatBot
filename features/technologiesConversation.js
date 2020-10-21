const { Botkit, BotkitConversation } = require('botkit');
const data = require('../data');

function technologyReply(key) {
    keys = ['javascript', 'python', 'react', 'redux', 'postgres', 'flask', 'express', 'html', 'css']
    console.log(key, keys)
    const idx = keys.findIndex((ele) => ele === key)
    console.log(idx)
    if (idx !== -1) {
        console.log(data.technologies[keys[idx]])
        return `The projects I have made using ${key} are ${data.technologies[keys[idx]].join(', ')}`
    } else if (key === 'all') {
        return `These are all the technologies which I have used: ${Object.keys(data.technologies).join(',')}`
    } else {
        return ''
    }
}

module.exports = function (controller) {
    const MY_TECHNOLOGIES = 'technologies';
    let convo = new BotkitConversation(MY_TECHNOLOGIES, controller);

    convo.addAction('technology question')
    convo.addQuestion({
        text: 'what would you like to know about the technologies I know?',
        quick_replies: [{
            content_type: 'text',
            title: 'javascript',
            payload: 'javascript',
        }, {
            content_type: 'text',
            title: 'python',
            payload: 'python',
        }, {
            content_type: 'text',
            title: 'react',
            payload: 'react',
        }, {
            content_type: 'text',
            title: 'redux',
            payload: 'redux',
        },
        {
            content_type: 'text',
            title: 'express',
            payload: 'express',
        },
        {
            content_type: 'text',
            title: 'flask',
            payload: 'flask',
        },
        {
            content_type: 'text',
            title: 'postgresql',
            payload: 'postgresql',
        },
        {
            content_type: 'text',
            title: 'all',
            payload: 'all',
        }],
    }, async function (response, convo, bot) {
        const key = response
        await bot.say(technologyReply(key))

    }, 'response', 'technology question');

    convo.addAction('confirm technology', 'technology question');

    // do a simple conditional branch looking for user to say "no"
    convo.addQuestion('Would you like to know anything else about the technolgies I have used?', [
        {
            pattern: 'no',
            handler: async (response, convo, bot) => {

            }
        },
        {
            pattern: 'yes',
            handler: async (response, convo, bot) => {

                await convo.gotoThread('technology question');
            }
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say("Sorry I don't understand. Enter 'yes' or 'no'.")
                await convo.gotoThread('confirm technology')
            }
        }
    ], 'confirm', 'confirm technology');

    controller.addDialog(convo);

    controller.hears('technologies', 'message', async (bot, message) => {
        await bot.beginDialog(MY_TECHNOLOGIES);
    });
}
