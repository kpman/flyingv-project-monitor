var fs = require('fs');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = Promise.promisify(require("request"));

var projectid = process.argv[2] || null;

if (!projectid) {
  process.exit(1);
} else {
  var URL = 'https://www.flyingv.cc/project/' + projectid;
  request(URL).then(function(contents) {
    var $ = cheerio.load(contents[1]);
    var $percent = $('.countdes .percentt').text().replace(/\%/g,'');
    var $money = $('.countdes .rtt h3').text().replace(/,/g,'').replace(/\$/g,'');
    console.log($money);
    var data = $percent + ',' + $money + '\n';
    fs.appendFile('output.csv', data, 'utf8', function(err) {
      console.log('appendfile done.');
      process.exit(1);
    });
  });
}