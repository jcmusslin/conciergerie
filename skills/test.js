//
// Displays the code of the specified skill
//
module.exports = function (controller) {

    controller.hears([/^test\s*(.*)$/, /^code\s*(.*)$/], 'direct_message,direct_mention', function (bot, message) {

        // Fetch value argument
        var skill = message.match[1];
        if (skill) {
            showSkill(skill, bot, message);
            return;
        }

        bot.startConversation(message, function (err, convo) {

            convo.ask("Please choose a skill among 'link', 'news', 'support', 'trouble', 'about', 'help', 'show'", [
                {
                    pattern: "^link|news|support|trouble|about|help|show$",
                    callback: function (response, convo) {
                        // ends current conversation
                        convo.stop();

                        showSkill(response.text, bot, message);
                        return;
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Sorry, this skill is not correct. Try again...");
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        });
    });
};

function showSkill(skill, bot, message) {
    // Append .js extension
    var skill_source = skill + ".js";

    // Read file contents
    var normalizedPath = require("path").join(__dirname, skill_source);
    require("fs").readFile(normalizedPath, 'utf8', function (err, data) {
        if (err) {
            bot.reply(message, "Could not find code for skill '" + skill + "'. Try again with another skill name...");
            return;
        }

        // Post file contents back to Cisco Spark
        //var code = "```javascript\n" + data + "\n```";
        var code = "https://images.caradisiac.com/logos/1/4/0/4/111404/S5-Audi-TT-show-car-Boston-14336.jpg";
        bot.reply(message, {files:[code]});
    });
}
