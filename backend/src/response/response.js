'use strict'

const MyResponse = {}

MyResponse._200 = (message, data) => {
    return {
        success: true,
        name: 'CorrectRequest',
        message,
        code: 200,
        data,
        error: {}
    }
}

MyResponse._201 = (message, data) => {
    return {
        success: true,
        name: 'Created',
        message,
        code: 201,
        data,
        error: {}
    }
}

MyResponse._400 = (error) => {
    return {
        success: false,
        name: 'BadRequest',
        message: 'Bad Request',
        code: 400,
        data: {},
        error: {
            name: 'BadRequest',
            error
        }
    };
}

MyResponse._403 = (error) => {
    return {
        success: false,
        name: 'Forbidden',
        message: 'Forbidden',
        code: 403,
        data: {},
        error: {
            name: 'Forbidden',
            error
        }
    };
}

MyResponse._404 = (message) => {
    return {
        success: false,
        name: 'NotFound',
        message,
        code: 404,
        data: {},
        error: {
            name: 'NotFound',
            message
        }
    };
}

MyResponse._500 = (error) => {
    return {
        success: false,
        name: 'ServerError',
        message: 'Server Error',
        code: 500,
        data: {},
        error: {
            name: 'ServerError',
            error
        }
    }
}



module.exports = MyResponse;