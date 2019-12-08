'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let Schema = mongoose.Schema;

let CommentSchema = Schema(
	{
		content: {
			type: String,
			trim: true,
			required: [ true, 'The content of the comment is necessary' ],
			maxlength: [ 600, 'Content must not have more than 600 characters', 'size content' ]
		},
		date: {
			type: Date,
			default: Date.now
		},
		user: {
			type: Schema.ObjectId,
			ref: 'User',
			required: [ true, 'User id is necessary' ]
		}
	},
	{ versionKey: false }
);

let Comment = mongoose.model('Comment', CommentSchema);

let TopicSchema = Schema(
	{
		tittle: {
			type: String,
			required: [ true, 'Tittle is necessary' ],
			maxlength: [ 200, 'Tittle must not have more than 200 characters', 'size tittle' ]
		},
		content: {
			type: String,
			required: [ true, 'Content is necessary' ],
			maxlength: [ 5000, 'Content must not have more than 5000 characters', 'size content' ]
		},
		code: {
			type: String,
			required: [ true, 'Code is necessary' ]
		},
		lang: {
			type: String,
			required: [ true, 'Language is necessary' ]
		},
		date: {
			type: Date,
			default: Date.now
		},
		user: {
			type: Schema.ObjectId,
			ref: 'User',
			required: [ true, 'User id is necessary' ]
		},
		comments: [ CommentSchema ]
	},
	{ versionKey: false }
);

TopicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Topic', TopicSchema);
