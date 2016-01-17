ChinDict = new Mongo.Collection("chindict");

if(Meteor.isServer) {
    Meteor.methods({processUrl: (url) => {
        try {
            var text = HTTP.call("GET", url).content,
            	chineseRegex = /(?:[\u4E00-\u9FA5\uF900-\uFA2D]){1,1}/mg,
            	asciiRegex = /[\x00-\xFF]+/mg,
            	lineBreaksRegex = /(\r\n|\n|\r)/gm,
            	charList = [],
            	oneChar;
            text = text.replace(lineBreaksRegex, '').replace(asciiRegex, '');
            while(oneChar = chineseRegex.exec(text)) {
            	charList.push(oneChar[0]);
            }
            charList = _.map(_.groupBy(charList), (value, key) => {
        		return {
        			key: key,
        			count: value.length
        		};
        	});
        	charList = _.sortBy(charList, "count");
        	charList.reverse();

            //the rest of it should be processed asynchronously. 
            var firstBatch = _.first(charList, 50);
            firstBatch.forEach((entry) => {
                entry.def = ChinDict.findOne({simpl:entry.key}).therest;
            });
            
            return firstBatch;

            //async.calculate();

        } catch (e) {
            return e;
        }
    }});
}