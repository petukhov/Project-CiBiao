// Define a collection to hold our tasks
Db = new Mongo.Collection("db");

Meteor.methods({processUrl: function (url) {
  try {
    var text = HTTP.call("GET", url).content,
    	chineseRegex = /(?:[\u4E00-\u9FA5\uF900-\uFA2D]){1,1}/mg,
    	asciiRegex = /[\x00-\xFF]+/mg,
    	lineBreaksRegex = /(\r\n|\n|\r)/gm,
    	result = new Set(),
    	oneChar;
    text = text.replace(lineBreaksRegex, '').replace(asciiRegex, '');
    while(oneChar = chineseRegex.exec(text)) {
    	result.add(oneChar[0]);
    }
    result = Array.from(result);
    result.sort(function(a, b) {
    	return a.localeCompare(b);
    });
    return result;
  } catch (e) {
    return e;
  }
}});