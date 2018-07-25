//
// No news for now
//
module.exports = function (controller) {

  controller.hears([/^news\s*(.*)$/, /^code\s*(.*)$/], 'direct_message,direct_mention', function (bot, message) {
    // Fetch value argument
    var keyword = message.match[1];

    // add news api request code here using info from newsapi.org   
    var unirest = require("unirest");
    var req = unirest("GET", "https://newsapi.org/v2/everything");
    if (!keyword) {
      keyword = '"orange business"';
    }
    console.log(keyword);
    // chose a type of query among 3 (needs to modify unirest request)
    req.query({

      //"sources": "techcrunch, wired, les-echos",
      "q": keyword,
      "language": "en",
      //"category": "business"

      // everything --------------
      "sortBy": "relevancy"


    });

    req.headers({
      "Cache-Control": "no-cache",
      "Authorization": "Bearer a220974a9036435e8e4c1705f01b360b",
    });

    // get API results and send it to Spark html formated
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      var news = res.body.articles;
      var newsMaxIndex = news.length - 1;

      // Remove duplicate titles
      var result = [];
      for (var i = newsMaxIndex; i >= 0; i--) {
        var notSeen = true;
        for (var j = i - 1; j >= 0; j--) {
          if (news[i].title == news[j].title) { notSeen = false }
        }
        if (notSeen) {
          result.push(news[i]);
        }
      }

      // max news number to show
      var newsNumber = 7;
      if (result.length < 7) {newsNumber = result.length}

      // top n news
      var text = "Top " + newsNumber + " news: <br>";
      if (newsNumber == 0) {text = "Sorry no news found about " + keyword}
      for (i = result.length - 1; i >= result.length - newsNumber; i--) {
        text += "<b>" + result[i].title + "</b><br>";
        text += "<i>" + result[i].description + "</i><br>";
        text += ' <a href="' + result[i].url + '"></a><br><br>';
      }
      bot.reply(message, text);


    });
    // ends here
  });
}