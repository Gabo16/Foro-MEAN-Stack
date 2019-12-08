'use strict';

const Topic = require('../models/topic-model');
const MyResponse = require('../response/response');

const TopicCtrl = {};

TopicCtrl.getTopics = async (req, res) => {
	const page = req.params.page || 1;
	const options = {
		page,
		sort: { date: -1 },
		populate: {
			path: 'user comments.user',
			select: 'name image email'
		},
		limit: 5
	};

	try {
		const topics = await Topic.paginate({}, options);
		if (topics.totalDocs > 0) {
			// console.log(topics);
			return res.status(200).json(
				MyResponse._200('Finding Topics', {
					totalTopics: topics.totalDocs,
					totalPages: topics.totalPages,
					page: topics.page,
					topics: topics.docs,
					nextPage: topics.nextPage,
					prevPage: topics.prevPage
				})
			);
		} else {
			return res.status(404).json(MyResponse._404('There are no topics registered in the database'));
		}
	} catch (error) {
		return res.status(500).json(MyResponse._500(error));
	}
};

TopicCtrl.getTopic = async (req, res) => {
	const id = req.params.id;
	try {
		const topicFound = await Topic.findById(id).populate('user comments.user', 'name email image');
		if (topicFound == null) {
			return res.status(404).json(MyResponse._404('Topic not found'));
		}
		return res.status(200).json(MyResponse._200('Topic Found', { topic: topicFound }));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

TopicCtrl.getTopicByUserId = async (req, res) => {
	const user = req.params.user;
	const page = parseInt(req.query.page) || 1;
	const options = {
		page,
		sort: { date: -1 },
		populate: {
			path: 'user',
			select: 'name email'
		},
		limit: 5
	};

	try {
		const topics = await Topic.paginate({ user }, options);
		if (topics.totalDocs > 0) {
			return res.status(200).json(
				MyResponse._200('Finding Topics', {
					totalTopics: topics.totalDocs,
					totalPages: topics.totalPages,
					page: topics.page,
					topics: topics.docs,
					nextPage: topics.nextPage,
					prevPage: topics.prevPage
				})
			);
		} else {
			return res.status(200).json(
				MyResponse._200('Finding Topics', {
					totalTopics: 0,
					totalPages: 0,
					page: 0,
					topics: null,
					nextPage: 0,
					prevPage: 0
				})
			);
		}
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

TopicCtrl.save = async (req, res) => {
	const topic = new Topic({
		tittle: req.body.tittle,
		content: req.body.content,
		code: req.body.code,
		lang: req.body.lang,
		user: req.user.sub
	});
	try {
		const topicSaved = await topic.save();
		return res.status(201).json(MyResponse._201('User has been registered in the database', { user: topicSaved }));
	} catch (error) {
		if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500('Error updating user'));
		}
	}
};

TopicCtrl.update = async (req, res) => {
	const topicId = req.params.id;
	const userId = req.user.sub;

	try {
		const topicFound = await Topic.findOne({ _id: topicId });
		if (topicFound.user != userId) return res.status(404).json(MyResponse._404('Topic not found'));
		if (!topicFound) return res.status(404).json(MyResponse._404('Topic not found'));
		topicFound.tittle = req.body.tittle || topicFound.tittle;
		topicFound.content = req.body.content || topicFound.content;
		topicFound.code = req.body.code || topicFound.code;
		topicFound.lang = req.body.lang || topicFound.lang;

		const topicUpdated = await topicFound.save();
		return res
			.status(200)
			.json(MyResponse._200('The topic has been successfully updated', { topic: topicUpdated }));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Topic not found'));
		} else if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500('Error updating user'));
		}
	}
};

TopicCtrl.delete = async (req, res) => {
	const topicId = req.params.id;
	const userId = req.user.sub;

	// console.log(topicId, userId);

	try {
		const topicFound = await Topic.findOne({ _id: topicId, user: userId });
		if (!topicFound) {
			return res.status(404).json(MyResponse._404('Topic not found'));
		}
		await Topic.findByIdAndDelete(topicFound.id);
		return res.status(204).json({});
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Topic not found'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

TopicCtrl.search = async (req, res) => {
	const termino = req.body.termino;
	if (!termino) return res.status(400).json(MyResponse._400('There is no search term'));
	try {
		const totaltopics = await Topic.countDocuments();
		const topicsFound = await Topic.find({
			$or: [
				{ tittle: { $regex: termino, $options: 'i' } },
				{ content: { $regex: termino, $options: 'i' } },
				{ code: { $regex: termino, $options: 'i' } },
				{ lang: { $regex: termino, $options: 'i' } }
			]
		})
			.sort([['date', 'descending']])
			.populate('user comments.user', 'name email image');
		if (totaltopics > 0) {
			return res.status(200).json(MyResponse._200('Finding Topics', { topics: topicsFound }));
		} else {
			return res.status(404).json(MyResponse._404('There are no topics registered in the database'));
		}
	} catch (error) {
		return res.status(500).json(MyResponse._500(error));
	}
};

TopicCtrl.searchPaginated = async (req, res) => {
	const termino = req.body.termino;
	const page = parseInt(req.params.page) || 1;
	const options = {
		page,
		sort: { date: -1 },
		populate: {
			path: 'user comments.user',
			select: 'name image email'
		},
		limit: 10
	};
	if (!termino) return res.status(400).json(MyResponse._400('There is no search term'));
	try {
		const topics = await Topic.paginate(
			{
				$or: [
					{ tittle: { $regex: termino, $options: 'i' } },
					{ content: { $regex: termino, $options: 'i' } },
					{ code: { $regex: termino, $options: 'i' } },
					{ lang: { $regex: termino, $options: 'i' } }
				]
			},
			options
		);
		if (topics.totalDocs > 0) {
			return res.status(200).json(
				MyResponse._200('Finding Topics', {
					total_Topics: topics.totalDocs,
					total_Pages: topics.totalPages,
					page: topics.page,
					topics: topics.docs
				})
			);
		} else {
			return res.status(404).json(MyResponse._404('There are no topics registered in the database'));
		}
	} catch (error) {
		return res.status(500).json(MyResponse._500(error));
	}
};

module.exports = TopicCtrl;
