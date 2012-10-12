(function() {
	var mongoose = require('mongoose'),
		conn = mongoose.connect('192.168.8.20', 'mesh_new');
	var meshSchema = require('./MeshSchema');
	exports.Descriptor_tree_2013 = mongoose.model('Descriptor_tree_2013', meshSchema.DescriptorTree2013Schema, "Descriptor_tree_2013");
	exports.Descriptor_2013 = mongoose.model('Descriptor_2013', meshSchema.Descriptor2013Schema, "Descriptor_2013");
	exports.Qualifier_2013 = mongoose.model('Qualifier_2013', meshSchema.Qualifier2013Schema, "Qualifier_2013");
}).call(this);