'use strict';

const Topic = require('../models/topic-model');
const MyResponse = require('../response/response');
const CommentCtrl = {};

CommentCtrl.save = async (req, res) => {
	const comment = {
		content: req.body.content,
		user: req.user.sub
	};
	const idTopic = req.params.topicId;

	try {
		const topicFound = await Topic.findById(idTopic);
		console.log(`ANTES: ${topicFound.comments}`);
		topicFound.comments.push(comment);
		console.log('***************************************************');
		console.log(`DESPUES: ${topicFound.comments}`);
		const topicSaved = await topicFound.save();
		return res.status(201).json(MyResponse._201('ok', topicSaved));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Topic not found'));
		} else if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500('Aqui courio un error'));
		}
	}
};

CommentCtrl.update = async (req, res) => {
	try {
		const tipocFoundByComment = await Topic.findOne({ 'comments._id': req.params.commentId });
		const comment = tipocFoundByComment.comments.id(req.params.commentId);
		if (comment.user != req.user.sub) return res.status(404).json(MyResponse._404('Comment not found'));
		comment.content = req.body.content || comment.content;
		const topicUpdated = await tipocFoundByComment.save();
		return res.status(200).json(MyResponse._200('Comment Updated', topicUpdated));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Comment not found'));
		} else if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

CommentCtrl.delete = async (req, res) => {
	try {
		const topicFound = await Topic.findOne({ _id: req.params.topicId });
		if (!topicFound) return res.status(404).json(MyResponse._404('Topic not found'));
		const comment = topicFound.comments.id(req.params.commentId);
		if (comment.user != req.user.sub) return res.status(404).json(MyResponse._404('Comment not found'));
		comment.remove();
		await topicFound.save();
		return res.status(204).json({});
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Comment not found'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

module.exports = CommentCtrl;
