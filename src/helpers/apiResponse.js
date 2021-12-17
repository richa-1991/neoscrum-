exports.successResponse = function (res, msg) {
	var data = {
		status: true,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg,total, data) {
	var resData = {
		status: true,
		message: msg,
		total:total,
		data: data
	};
	return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationError= function (res, msg, data=[]) {
	var resData = {
		status: false,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: false,
		message: msg,
	};
	return res.status(401).json(data);
};