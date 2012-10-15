var express = require('express'),
	app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'jade');

var routes = require('./Routes');

app.use(function(req,res,next){
	var d = new Date();
	console.log('[' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' +  d.getUTCDate () 
		+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] '
		+ req.ip + ':' + req.path);
	next();
});
app.use(express.cookieParser());
app.use(express.session({
	secret: 'ky'
}));
app.use(express.bodyParser());
app.use(routes.auth_user);

app.get('/', routes.index);
app.post('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/login_init', routes.login_init);
app.get('/jsonp/:id', routes.jsonp);
app.get('/tree/:id', routes.tree);
app.get('/MBrowser/:id', routes.MBrowser);
app.get('/EBrowser/:id', routes.EBrowser);
app.get('/CBrowser/:id', routes.CBrowser);
app.get('/qual/:id', routes.qual);
app.get('/:id', routes.index);
app.get('*', routes.error);

app.listen(3000);