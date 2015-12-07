// Define a collection to hold our tasks
Db = new Mongo.Collection("db");

Meteor.methods({processUrl: function (url) {
  try {
    var text = HTTP.call("GET", url).content,
    	chineseRegex = /(?:[\u4E00-\u9FA5\uF900-\uFA2D]){1,1}/mg,
    	asciiRegex = /[\x00-\xFF]+/mg,
    	lineBreaksRegex = /(\r\n|\n|\r)/gm,
    	result = [],
    	oneChar;
    text = text.replace(lineBreaksRegex, '').replace(asciiRegex, '');
    while(oneChar = chineseRegex.exec(text)) {
    	result.push(oneChar[0]);
    }
    result = _.map(_.groupBy(result), function(value, key) {
		return {
			id: key,
			count: value.length
		}
	});
    result.sort(function(a, b) {
   		return b.count > a.count;
    });
    return result;
  } catch (e) {
    return e;
  }
}});