import isomorphicFetch from 'isomorphic-fetch';

function parseStatus(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response));
    } else {
      res.then(response => reject({ status, response }));
    }
  });
}

function requestHeaders(headers) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: headers,
  };
}


export default (url, method, body, headers) => {
  const options = {
    method,
    headers: Object.assign({}, requestHeaders(headers)),

    body: method !== 'GET' ? JSON.stringify(body) : null,
  };

  return isomorphicFetch(url, options)
    .then(res => parseStatus(res.status, res.json()))
    .catch(err => console.log(err));
};
