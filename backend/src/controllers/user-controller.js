'use strict';

const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt-service');
const fs = require('fs');
const path = require('path');
const MyResponse = require('../response/response');

let UserController = {};

UserController.save = async (req, res) => {
	const user = req.body.user;
	try {
		const userSaved = await user.save();
		return res.status(201).json(MyResponse._201('User has been registered in the database', { user: userSaved }));
	} catch (error) {
		if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500('Error updating user'));
		}
	}
};

UserController.token = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const userFound = await User.findOne({ email });
		if (userFound) {
			if (bcrypt.compareSync(password, userFound.password)) {
				const token = jwt.createToken(userFound);
				return res.status(200).json(MyResponse._200('Valid Credentials', { token, user: userFound }));
			} else {
				return res.status(400).json(MyResponse._400('Invalid Credentials'));
			}
		} else {
			return res.status(400).json(MyResponse._400('Invalid Credentials'));
		}
	} catch (error) {
		return res.status(500).json(MyResponse._400(error));
	}
};

UserController.update = async (req, res) => {
	const body = req.body;
	try {
		const userFound = await User.findById(req.user.sub);
		userFound.name = body.name || userFound.name;
		userFound.surname = body.surname || userFound.surname;
		userFound.email = body.email || userFound.email;
		userFound.role = body.role || userFound.role;
		const userUpdated = await userFound.save();
		return res.status(200).json(MyResponse._200('The user has been successfully updated', { user: userUpdated }));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else if (error.name == 'ValidationError') {
			return res.status(400).json(MyResponse._400(error));
		} else {
			return res.status(500).json(MyResponse._500('Error updating user'));
		}
	}
};

UserController.getUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const options = {
		page,
		sort: { date: -1 },
		limit: 5
	};

	try {
		const users = await User.paginate({}, options);
		if (users.totalDocs > 0) {
			return res.status(200).json(
				MyResponse._200('Finding Users', {
					total_users: users.totalDocs,
					total_Pages: users.totalPages,
					page: users.page,
					users: users.docs
				})
			);
		} else {
			return res.status(400).json(MyResponse._404('There are no users registered in the database'));
		}
	} catch (error) {
		return res.status(500).json(MyResponse._500(error));
	}
};

UserController.getUser = async (req, res) => {
	const id = req.params.id;
	try {
		const userFound = await User.findById(id);
		if (userFound == null) {
			return res.status(404).json(MyResponse._404('User not found'));
		}
		return res.status(200).json(MyResponse._200('User Found', { user: userFound }));
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

UserController.delete = async (req, res) => {
	const id = req.user.sub;
	try {
		const userDelete = await User.findByIdAndDelete(id);
		return res.status(204).json({});
	} catch (error) {
		if (error.name == 'CastError') {
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else {
			return res.status(500).json(MyResponse._500(error));
		}
	}
};

UserController.uploadAvatar = async (req, res) => {
	const id = req.user.sub;
	const fileName = req.body.fileName;
	const pathDirectory = 'src\\uploads\\users\\';

	console.log(fileName);
	try {
		let userFound = await User.findById(id);
		if (userFound.image !== 'noavatar.png') {
			fs.unlinkSync(`${pathDirectory}${userFound.image}`);
		}
		userFound.image = fileName;
		const userUpdated = await userFound.save();
		return res.status(200).json(MyResponse._200('Image Saved', { image: userUpdated.image }));
	} catch (error) {
		if (error.name == 'CastError') {
			fs.unlinkSync(`${pathDirectory}${fileName}`);
			console.log(error);
			return res.status(404).json(MyResponse._404('Error in the User id'));
		} else if (error.name == 'ValidationError') {
			console.log(error);
			fs.unlinkSync(`${pathDirectory}${fileName}`);
			return res.status(400).json(MyResponse._400(error));
		} else {
			fs.unlinkSync(`${pathDirectory}${fileName}`);
			console.log(error);
			return res.status(500).json(MyResponse._500('Error updating user'));
		}
	}
};

UserController.getAvatar = (req, res) => {
	const pathDirectory = 'src\\uploads\\users\\';
	let fileName = req.params.fileName;
	let pathFile = pathDirectory + fileName;
	if (fs.existsSync(pathFile)) {
		return res.sendFile(path.resolve(pathFile));
	} else {
		return res.status(404).json(MyResponse._404('Image not found'));
	}
};

module.exports = UserController;
