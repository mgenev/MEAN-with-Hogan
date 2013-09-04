/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**
 * Article Schema
 */

//TODO try using different collection name here, like flashcard
// reference http://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose

var ArticleSchema = new Schema({
	created: {type : Date, default : Date.now},
	title: {type: String, default: '', trim : true},
	side1: {type: String, default: '', trim : true},
  side2: {type: String, default: '', trim : true},
	user: {type : Schema.ObjectId, ref : 'User'}
  //todo ADD DECK AS REF
  //deck : {type : String, default: '', trim: true} 
  },
  {collection : 'flashcards'}
);


/**
 * Statics
 */

ArticleSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('user').exec(cb);
  }
};
//TODO look up mongoose.model
mongoose.model('Article', ArticleSchema);