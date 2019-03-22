var isNode = false;
var obj = [];
stringLength = 10;

var keyValueStringEntryArray =
[
 { letter: 'a', chance : 0.2},
 { letter: 'b', chance : 0.1},
 { letter: 'c', chance : .5},
 { letter: 'd', chance : .2},
];

(function () {
    var root = this;
    var _ = new Object();

    if (typeof module !== 'undefined' && module.exports) {
     module.exports = _;
     root._ = _;
     isNode = true;
    } else {
     root._ = _;
    }
})();

if (isNode) {
 var fs = require('fs');
 var path = require('path');
 var isEqual = require('./isequal')
 var defaultInputFile = 'inputparams.json';


 var inputParams = process.argv.slice(2);
 if (inputParams.length > 0) {
  inputParams.forEach(function (val, index, array) {
   if (index == 0) {
     var howResultStringIsLength = parseInt(val);
     if (!isNaN(howResultStringIsLength)) {
       stringLength = howResultStringIsLength;
     }
   } else {
    try {
      var rawData = fs.readFileSync(val, 'utf8');
      var parsedJson  = JSON.parse(rawData);
      // console.log('parsedJson:\n', parsedJson);
      if (typeof parsedJson !== 'undefined') {
       obj = Object.assign(obj, parsedJson);
      }
    } catch (err) {
     console.log('An error ocured: maybe invalid JSON input file... err:|', err, '|');
    }
   }
  });
 } else {
  console.log('Using: "node ' + path.basename(__filename) + ' stringLength inputfile.json"');
  console.log('\n"stringLength" - integer value - how result string is long...');
  console.log('\n"inputfile.json" must contain JSON like this: \n', keyValueStringEntryArray, '');
  console.log('...now program use default data or default file from current directory named:|', defaultInputFile, '|\n\n');
  // console.log('inputParams.length', inputParams.length);
  try {
   var rawData = fs.readFileSync(defaultInputFile, 'utf8');
   obj = JSON.parse(rawData);
  } catch (err) {
   console.log('An error ocured: maybe default input file (`', defaultInputFile,'`) is not exist...'); // err:', err, '');
   process.exit();
  }

 }

 if (obj.length > 0 && Array.isArray(obj) && isEqual.arrayEqual(Object.keys(obj[0]), [ 'letter', 'chance' ]) ) {
  // console.log('obj[0]', isEqual.arrayEqual(Object.keys(obj[0]), [ 'letter', 'chance' ]) );
  keyValueStringEntryArray = obj;
 }

}



if (1 !== keyValueStringEntryArray.map(item => item.chance).reduce((prev, next) => parseFloat(prev) + parseFloat(next)) )
{
 console.log('Invalid input data... `chance` of letters entry must be == 1...');
}

function randomSort(a, b) {
 return Math.random() > .5 ? -1 : 1;
}

function generatePseudoRandomString(keyValueDescriptor, stringLength) {
 const strL = parseInt(stringLength);
 var strResult = "";
 var lastLetter = "";
 keyValueDescriptor.filter((item) => {
   var howManyLetters = Math.round(strL * parseFloat(item.chance));
   strResult += Array(howManyLetters + 1).join(item.letter);
   lastLetter = item.letter;
   // console.log('howManyLetters:', howManyLetters, 'strResult:', strResult);
 });
 if (stringLength > strResult.length) {
  strResult += lastLetter;
 }
 sR = strResult.split('').sort(randomSort).join('');
 // console.log('sR', sR);
 return sR;
}

console.log('\nOutput:\n');
console.log(generatePseudoRandomString(keyValueStringEntryArray, stringLength));
console.log('\n');
