const { Botkit, BotkitConversation } = require('botkit');
const data = require('../data');

function schoolInfoResponse(school, key) {
    if (key === 'location') {
        return `I went to ${school} in ${data.education[school].location}`
    } else if (key === "started") {
        return `I started at ${school} in ${data.education[school].started}`
    } else if (key === "graduated") {
        return `I graduated from ${school} in ${data.education[school].graduated}`
    } else if (key === "degree") {
        return `I got my ${data.education[school].degree} from ${school}`
    } else if (key === "major") {
        return `I got my ${data.education[school].degree} in ${data.education[school].major} from ${school}`
    }
}

module.exports = function (controller) {
    const MY_EDUCATION = 'my education';
    let convo = new BotkitConversation(MY_EDUCATION, controller);

    convo.addAction('school question')
    convo.addQuestion({
        text: 'Which school would you like to know about?',
        quick_replies: [{
            content_type: 'text',
            title: 'texas a&m university',
            payload: 'texas a&m university',
        }, {
            content_type: 'text',
            title: 'app academy',
            payload: 'app academy',
        },],
    }, async function (response, convo, bot) {
        const key = response
        const schools = Object.keys(data.education)
        const idx = schools.findIndex(ele => key === ele)

        if (idx === -1) {
            await bot.say(`Sorry, I dont think I went ${key}. Please choose an option from the quick replies`)
            await convo.gotoThread('school question');
        }
    }, 'school', 'school question');

    convo.addAction('school info question', 'school question')
    convo.addQuestion({
        text: 'what would you like to know about {{vars.school}}',
        quick_replies: [{
            content_type: 'text',
            title: 'location',
            payload: 'location',
        }, {
            content_type: 'text',
            title: 'started',
            payload: 'started',
        }, {
            content_type: 'text',
            title: 'graduated',
            payload: 'graduated',
        }, {
            content_type: 'text',
            title: 'degree',
            payload: 'degree',
        }, {
            content_type: 'text',
            title: 'major',
            payload: 'major',
        }],
    }, async function (response, convo, bot) {
        const key = response
        await bot.say(schoolInfoResponse(convo.vars.school, key))
    }, 'schoolInfo', 'school info question');


    convo.addAction('school confirmation', 'school info question')
    convo.addQuestion('Would you like to know anything else about {{vars.school}}?', [
        {
            pattern: 'no',
            handler: async (response, convo, bot) => {
                await convo.gotoThread('education confirmation')
            }
        },
        {
            pattern: 'yes',
            handler: async (response, convo, bot) => {

                await convo.gotoThread('school info question');
            }
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say("Sorry I don't understand. Enter 'yes' or 'no'.")
                await convo.gotoThread('school confirmation')
            }
        }
    ], 'confirm', 'school confirmation');

    convo.addAction('education confirmation', 'school confirmation')
    convo.addQuestion('Would you like to know anything else about my education?', [
        {
            pattern: 'no',
            handler: async (response, convo, bot) => {
            }
        },
        {
            pattern: 'yes',
            handler: async (response, convo, bot) => {

                await convo.gotoThread('school question');
            }
        },
        {
            default: true,
            handler: async (response, convo, bot) => {
                await bot.say("Sorry I don't understand. Enter 'yes' or 'no'.")
                await convo.gotoThread('education confirmation')
            }
        }
    ], 'educationConfirm', 'education confirmation');

    controller.addDialog(convo);

    controller.hears('education', 'message', async (bot, message) => {
        await bot.beginDialog(MY_EDUCATION);
    });
}
