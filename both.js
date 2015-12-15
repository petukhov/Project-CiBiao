ChinDict = new Mongo.Collection("chindict");

if(Meteor.isServer) {
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
            var result = _.first(result, 500);
            result = _.map(_.groupBy(result), function(value, key) {
            	//var d = ChinDict.findOne({simpl:key}).therest;
            	//console.log(d)
        		return {
        			id: key,
        			count: value.length
        			//def: d
        		};
        	});
            //add the first 50 translations. save the rest of the list into the db
        	result = _.sortBy(result, "count");
        	result.reverse();
            return result;
        } catch (e) {
            return e;
        }
    }});
}