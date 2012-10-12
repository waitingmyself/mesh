var express = require('express'),
	app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'jade');

var routes = require('./Routes');

app.get('/', routes.index);
app.get('/jsonp/:id', routes.jsonp);
app.get('/tree/:id', routes.tree);
app.get('/MBrowser/:id', routes.MBrowser);
app.get('/qual/:id', routes.qual);
app.get('/:id', routes.index);
app.get('*', routes.error);

app.listen(3000);