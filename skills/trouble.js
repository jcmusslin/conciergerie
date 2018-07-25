//
// No trouble
//
module.exports = function (controller) {
    
        controller.hears([/^trouble$/], 'direct_message,direct_mention', function (bot, message) {
            var mardown = "\"Never wait for trouble.\" <i>- Chuck Yeager -<br/>Try "
                + bot.appendMention(message, "help");
                
            bot.reply(message, mardown);
        });
    }