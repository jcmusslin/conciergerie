module.exports = function (controller) {
    
        controller.hears([/^link$/], 'direct_message,direct_mention', function (bot, message) {    
        
            bot.startConversation(message, function (err, convo) {
                convo.ask('I can help you find the correct link for the tool you need <br>What subject are you looking for (or quit)?', [
                    {
                        // only for testing
                        pattern: "^testing$",
                        callback: function (response, convo) {
                            convo.say('you can try <b>Hello world <a href="http://google.com">clickHere</a></b>');
                            convo.next();
                        },
                    },
                    {
                        // Oneo - travel expense
                        pattern: "^oneo|travel|voyage|expense|trip|remboursement|mission$",
                        callback: function (response, convo) {
                            convo.say('just click <a href="https://neo.mykds.com/home?instance=orange">Oneo</a>');
                            convo.next();
                        },
                    },
                    {
                        // learning
                        pattern: "^learning|formation|mooc|training|tutorial|elearning$",
                        callback: function (response, convo) {
                            convo.say('you can try <a href="https://orange.csod.com/LMS/catalog/Welcome.aspx?tab_page_id=-67&tab_id=-1">Orange Learning</a>');
                            convo.next();
                        },
                    },
                    {
                        // Test sur le site Cisco
                        pattern: "^cisco|spark$",
                        callback: function (response, convo) {
                            convo.say('Cool, I like ' + response.text + ' too!');
                            convo.say('you can try www.cisco.com');
                            convo.next();
                        },
                    },
                    {
                        // Decidium
                        pattern: "^payroll|decidium|rtt|vacances|paie|congés$",
                        callback: function (response, convo) {
                            // convo.say('Cool, I like ' + response.text + ' too!');
                            convo.say('you can try <a href="https://hr-services.fr.adp.com/portal-main/portal/#/home">Decidium</a>');
                            convo.next();
                        },
                    },
                    {
                        // Quit
                        pattern: "^quit|bye|exit$",
                        callback: function (response, convo) {
                            convo.say('Bye, you are exiting search link skill <br>you can type help for information about my skills');
                            convo.next();
                        },
                    },
                    {
                        default: true,
                        callback: function (response, convo) {
                            convo.say("Sorry, I don't know this subject. Try another one... ");
                            convo.say('you can also try <a href="http://mytools.sso.infra.ftgroup/binbeemytools/Home/Portfolio">mytools</a> to get rid of this bot')
                            convo.repeat();
                            convo.next();
                        }
                    }
                ]);
            });
    
        });
    };