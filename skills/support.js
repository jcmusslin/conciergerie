//
// No support
//
module.exports = function (controller) {
    
        controller.hears([/^support$/], 'direct_message,direct_mention', function (bot, message) {
            var mardown = "No support... still under construction, ask your colleagues.<br/>Try "
                + bot.appendMention(message, "help");
                
            bot.reply(message, mardown);
        });
    }