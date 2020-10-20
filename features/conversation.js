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

module.exports = function (controller) {
    const MY_DIALOG_ID = 'convo starter';
    let convo = new BotkitConversation(MY_DIALOG_ID, controller);

    convo.say({
        text: 'Quick Replies',
        quick_replies: async (template, vars) => { return mapKeys(data) }
    });
    convo.ask('What would you like to know about Jesse?', [], 'reply_title');


    // convo.say('Beep Boop booting up...');
    // convo.say("Hi, I'm a bot created by Jesse Solis.");

    // convo.ask('What would you like to know about Jesse?', async (response, convo, bot) => {

    //     console.log(checkKeys(response))
    // }, 'res')
    // convo.say({
    //     text: 'Here is your dynamic button:',
    //     quick_replies: async (template, vars) => { return [{ title: 'technologies', payload: 'technologies' }] }
    // });

    // // ask a question, store the response in 'name'
    // convo.ask('What is your name?', async (response, convo, bot) => {
    //     console.log(`user name is ${response}`);
    //     // do something?
    // }, 'name');

    // // use add action to switch to a different thread, defined below...
    // convo.addAction('favorite_color');

    // // add a message and a prompt to a new thread called `favorite_color`
    // convo.addMessage('Awesome {{vars.name}}!', 'favorite_color');
    // convo.addQuestion('Now, what is your favorite color?', async (response, convo, bot) => {
    //     console.log(`user favorite color is ${response}`);
    // }, 'color', 'favorite_color');

    // // go to a confirmation
    // convo.addAction('confirmation', 'favorite_color');

    // // do a simple conditional branch looking for user to say "no"
    // convo.addQuestion('Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?', [
    //     {
    //         pattern: 'no',
    //         handler: async (response, convo, bot) => {
    //             // if user says no, go back to favorite color.
    //             await convo.gotoThread('favorite_color');
    //         }
    //     },
    //     {
    //         default: true,
    //         handler: async (response, convo, bot) => {
    //             // do nothing, allow convo to complete.
    //         }
    //     }
    // ], 'confirm', 'confirmation');

    controller.addDialog(convo);

    controller.hears('hello', 'message', async (bot, message) => {
        await bot.beginDialog(MY_DIALOG_ID);
    });
}
