//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears([".*"], 'direct_message,direct_mention', function (bot, message) {
        var skill = message.match[0];
        var mardown = "Sorry, I did not understand " + skill + ".<br/>Try "
            + bot.appendMention(message, "help");
            
        bot.reply(message, mardown);
    });
}