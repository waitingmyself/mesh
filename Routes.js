function isZh(str) {
	return /.*[\u4e00-\u9fa5]+.*$/.test(str);
}

var service = require('./MongoService');

exports.auth_user = function(req, res, next) {
	if(req.session && req.session.login_user) {
		next();
	} else {
		var cookie = req.cookies && req.cookies['login_user'];
		if(cookie) {
			req.session.login_user = cookie;
			next();
		} else {
			if(req.path == '/login_init' || req.path == '/login') {
				next();
			} else {
				res.redirect('/login_init');
			}
		}
	}
}

exports.login = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	if('admin' == username && 'kingyee' == password) {
		res.cookie('login_user', username, {
			path: '/',
			maxAge: 1000 * 60 * 60 * 24 * 30
		});
		req.session.login_user = username;
		res.redirect('/');
	} else {
		res.render('login');
	}
}

exports.login_init = function(req, res, next) {
	res.render('login');
}

exports.logout = function(req, res, next) {
	req.session.destroy();
	res.clearCookie('login_user', {
		path: '/'
	});
	res.redirect('/');
}

exports.index = function(req, res) {
	res.render('help');
};

exports.error = function(req, res) {
	res.redirect('/');
}

exports.jsonp = function(req, res) {
	var keyword = req.params.id;
	var query;
	console.log(keyword);
	if(isZh(keyword)) {
		console.log('is zh');
		query = {
			'zh.String': new RegExp(keyword)
		}
	} else {
		query = {
			'DescriptorName.String': new RegExp(keyword, 'i')
		}
	};
	service.Descriptor_2013.find(query, 'DescriptorName zh TreeNumberList', {
		limit: 10
	}, function(err, items) {
		if(items && items.length > 0) {
			res.json({
				data: items
			});
		} else {
			res.json({
				data: []
			});
		}
	});
};

exports.tree = function(req, res) {
	var keyword = req.params.id;
	var query;
	if(isZh(keyword)) {
		query = {
			zh: {
				String: keyword
			}
		}
	} else {
		query = {
			DescriptorName: {
				String: keyword
			}
		};
	}
	service.Descriptor_tree_2013.find(query, function(err, item) {
		if(item && item.length > 0) {
			res.render('tree', item[0]);
		} else {
			res.send('no result');
		}
	});
};

function commonSearch(req, res, render) {
	var keyword = req.params.id;
	if(/D\d{6}/.test(keyword)) {
		query = {
			DescriptorUI: keyword
		};
	} else {
		query = {
			DescriptorName: {
				String: keyword
			}
		};
	}
	service.Descriptor_2013.find(query, function(err, items) {
		if(items && items.length > 0) {
			res.render(render, items[0]);
		} else {
			res.send('no result');
		}
	});
}

exports.MBrowser = function(req, res) {
	commonSearch(req, res, 'MBrowser');
};
exports.EBrowser = function(req, res) {
	commonSearch(req, res, 'EBrowser');
};
exports.CBrowser = function(req, res) {
	commonSearch(req, res, 'CBrowser');
};

exports.qual = function(req, res) {
	var keyword = req.params.id,
		query = {
			"ConceptList": {
				"$elemMatch": {
					"TermList": {
						"$elemMatch": {
							"Abbreviation": keyword
						}
					}
				}
			}
		};
	service.Qualifier_2013.find(query, function(err, items) {
		if(items && items.length > 0) {
			res.render('qual', items[0]);
		} else {
			res.send('no result');
		}
	});
};