var fs = require('fs');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = Promise.promisify(require('request'));
var moment = require('moment');

var projectid = '8250';

if (!projectid) {
  process.exit(1);
} else {
  var URL = 'https://www.flyingv.cc/project/' + projectid;
  request(URL).then(function(contents) {
    var $ = cheerio.load(contents[1]);
    var $percent = $('.countdes .percentt').text().replace(/\%/g,'');
    var $money = $('.countdes .rtt h3').text().replace(/,/g,'').replace(/\$/g,'');
    var now = moment().format('YYYY-MM-DD h:mm:ss a');
    console.log(now);
    var data = now + ',' + $percent + ',' + $money + '\n';
    fs.appendFile('output.csv', data, 'utf8', function(err) {
      console.log('appendfile done.');
      process.exit(0);
    });
  });
}
