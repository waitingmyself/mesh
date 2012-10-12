var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var YMDSchema = new Schema({
	Year: String,
	Month: String,
	Day: String
});

var TreeSchema = new Schema({
	DescriptorUI: String,
	DescriptorName: {
		String: String
	},
	zh: {
		String: String
	},
	key: String,
	children: [TreeSchema]
});
exports.DescriptorTree2013Schema = new Schema({
	DescriptorUI: String,
	DescriptorName: {
		String: String
	},
	zh: {
		String: String
	},
	tree: [TreeSchema]
});

var AllowableQualifierSchema = new Schema({
	QualifierReferredTo: {
		QualifierUI: String,
		QualifierName: {
			String: String
		}
	},
	Abbreviation: String
});
var SemanticTypeSchema = new Schema({
	SemanticTypeUI: String,
	SemanticTypeName: String
});
var ConceptRelationSchema = new Schema({
	RelationName: String,
	Concept1UI: String,
	Concept2UI: String
});
var TermSchema = new Schema({
	ConceptPreferredTermYN: String,
	IsPermutedTermYN: String,
	LexicalTag: String,
	PrintFlagYN: String,
	EntryVersion: String,
	RecordPreferredTermYN: String,
	TermUI: String,
	Abbreviation:String,
	String: String,
	DateCreated: {
		type: Schema.Types.Mixed,
		refs: YMDSchema
	},
	ThesaurusIDlist: [String]
});
var ConceptSchema = new Schema({
	CASN1Name: String,
	ConceptName: {
		String: String
	},
	ConceptUI: String,
	ConceptUMLSUI: String,
	PreferredConceptYN: String,
	ScopeNote: String,
	SemanticTypeList: [SemanticTypeSchema],
	ConceptRelationList: [ConceptRelationSchema],
	TermList: [TermSchema]
});
var SeeRelatedSchema = new Schema({
	DescriptorReferredTo: {
		DescriptorUI: String,
		DescriptorName: {
			String: String
		}
	}
});
exports.Descriptor2013Schema = new Schema({
	ActiveMeSHYearList: [String],
	Annotation: String,
	AllowableQualifiersList: [AllowableQualifierSchema],
	ConceptList: [ConceptSchema],
	DateCreated: {
		type: Schema.Types.Mixed,
		refs: YMDSchema
	},
	DescriptorUI: String,
	DescriptorName: {
		String: String
	},
	zh: {
		String: String
	},
	SeeRelatedList: [SeeRelatedSchema],
	TreeNumberList: Array,
	PreviousIndexingList: [String],
	HistoryNote: String
});

exports.Qualifier2013Schema = new Schema({
	QualifierType: String,
	QualifierUI: String,
	QualifierName: {
		String: String
	},
	DateCreated: {
		type: Schema.Types.Mixed,
		refs: YMDSchema
	},
	DateRevised: {
		type: Schema.Types.Mixed,
		refs: YMDSchema
	},
	DateEstablished: {
		type: Schema.Types.Mixed,
		refs: YMDSchema
	},
	ActiveMeSHYearList: [String],
	Annotation: String,
	HistoryNote: String,
	OnlineNote: String,
	TreeNumberList: [String],
	TreeNodeAllowedList: [String],
	RecordOriginatorsList: [String],
	ConceptList: [ConceptSchema]
});