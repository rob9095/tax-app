const axios = require("axios");
const querystring = require('querystring');

exports.teamworkApiCall = (method, path, key, data) => {
  const headerObj = {
		headers: {"Authorization": "BASIC " + Buffer.from(key + ":xxx").toString('base64')}
	};
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
      console.log('res is')
      console.log(res)
			return resolve(res.data);
		})
		.catch(err => {
      console.log('err is')
      console.log(err)
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
      console.log('res is')
      console.log(res)
      return resolve(res.data);
    })
    .catch(err => {
      console.log('err is')
      console.log(err)
      return reject(err.response.data.error);
    });
  });
}
