require('dotenv').load();
const axios = require("axios");
const querystring = require('querystring');
const serverPort = require('../index');

exports.teamworkApiCall = (method, url, key, data) => {
  let secret = new Buffer(key + ":xxx").toString("base64");
  let config = {
    method,
    url,
    data,
    headers: {
      "Authorization": "BASIC " + secret,
      "Content-Type": "application/json"
     }
  }
	return new Promise((resolve, reject) => {
		return axios(config)
		.then(res => {
			return resolve(res.data);
		})
		.catch(err => {
      console.log('teamwork err is')
      console.log(err)
			return reject(err.response.data);
		});
	});
}

exports.refreshTokenApiCall = (method, path, token) => {
  let data =  querystring.stringify({
    "refresh_token": token.refreshToken,
    "grant_type": "refresh_token"
  })
  let secret = Buffer.from(token.clientKey + ":" + token.clientSecret).toString('base64');
	const headerObj = {
		headers: {
      "Authorization": "Basic " + secret,
      "Content-Type": "application/x-www-form-urlencoded",
    }
	};
  console.log(headerObj)
	return new Promise((resolve, reject) => {
		return axios[method.toLowerCase()](path, data, headerObj)
		.then(res => {
			return resolve(res.data);
		})
		.catch(err => {
			return reject(err.response.data.error);
		});
	});
}

exports.infusionsoftApiCall = (method, path, token, data) => {
  const headerObj = {
    headers: {
      "Authorization": "Bearer " + token.accessToken,
      "Accept": "application/json, */*",
    }
  };
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, headerObj)
    .then(res => {
      return resolve(res.data);
    })
    .catch(err => {
      return reject(err.response.data.error);
    });
  });
}

exports.localApiCall = (method, endPoint, data) => {
  let config = {
    method,
    url: `http://localhost:8082${endPoint}`,
    data,
    headers: {
      "Authorization": "Basic " + process.env.SECRET_KEY,
    }
  }
	return new Promise((resolve, reject) => {
		return axios(config)
		.then(res => {
      console.log('the local res is')
      console.log(res)
			return resolve(res.data);
		})
		.catch(err => {
      console.log('the local err is')
      console.log(err.response.data.error)
			return reject(err.response.data.error);
		});
	});
}
