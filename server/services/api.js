const axios = require("axios");
const querystring = require('querystring');

exports.teamworkApiCall = (method, url, key, data) => {
  let secret = new Buffer(key + ":xxx").toString("base64");
  const headerObj = {
    headers: {
      "Authorization": "BASIC " + secret,
      "Content-Type": "application/json"
     }
	};
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
