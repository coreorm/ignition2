/**
 * api index
 */
require('./header.js');

var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-cg-cid,x-api-key,x-cg-debug');
  // put back no cache headers
  res.header('Cache-Control', 'no-store');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 'Sun, 27 Jul 1997 05:00:00 GMT');
  next();
};

var port = 1200;
if (typeof process.argv[2] != 'undefined') {
  port = parseInt(process.argv[2]);
}

app.set('port', port);

app.use(express.static('public'));

app.use(allowCrossDomain);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var requestParser = function (req, res, next) {
  if (typeof req.object !== 'object') req.object = {};

  // set response debug for 500 errors (where service may not be available yet)
  res.cgDebugEnabled = false;
  // verify if debug is being asked
  if (typeof req.get('x-cg-debug') != 'undefined' ||
    typeof req.query['x-cg-debug'] != 'undefined') {
    res.cgDebugEnabled = true;
  }

  // verify if x-cg-cid is passed in by header (api gateway backwards compatible)
  if (typeof req.get('x-cg-cid') != 'undefined') {
    req.query['CognitoID'] = req.get('x-cg-cid');
    // also assign to object
    if (req.object) {
      req.object.payload['CognitoID'] = req.get('x-cg-cid');
    }
  }

  next();
};

app.use(requestParser);

app.set('view engine', 'jade');

/**
 * temporary error handler cache for error handling
 * @type {{req: null, res: null}}
 */
var errorHandlerCache = {
  req: null,
  res: null
};

/*-------------------[base]-------------------*/

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/detail', function (req, res) {
  res.render('detail1');
});
app.get('/result-simple', function (req, res) {
  res.render('result-simple');
});
app.get('/result-complete', function (req, res) {
  res.render('result-complete');
});
app.get('/confirm', function (req, res) {
  res.render('confirm-book');
});
app.get('/service-finder', function (req, res) {
  res.render('lp');
});

/*-------------------[pages]-------------------*/


// must be live!
app.get('/ping', function (req, res) {
  res.send('PONG');
});

/*-------------------[main thread]-------------------*/

var domain = require('domain');
var d = domain.create();

// run in domain
d.run(function () {
  // handle error
  app.use(function (err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    console.log(err);

  });

  var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
});
