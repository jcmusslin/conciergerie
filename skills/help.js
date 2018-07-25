//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "link") + ": search internal orange site link related to specific matter";
        text += "\n- " + bot.appendMention(message, "news") + ": get financial, services or technical news about orange or its competitors";
        text += "\n- " + bot.appendMention(message, "support") + ": enter a conversation with the bot and redirect to the correct site or tel # to solve the issue";
        text += "\n- " + bot.appendMention(message, "trouble") + ": enter a conversation (q&a) with the bot and perform basic troubleshooting algorithm";
        text += "\n\nI also understand:";
        text += "\n- " + bot.appendMention(message, "about") + ": how to use this bot and list the skills";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        text += "\n- " + bot.appendMention(message, "show [skill]") + ": display the code of the specified skill";
        bot.reply(message, text);
    });
}
