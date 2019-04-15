import { host } from '../constants';


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options={'mode': 'no-cors'}) {
  
  const headers = {
    'Accept': 'application/json',
    "Content-Type": "application/json"
  };
  options.headers = Object.assign(options.headers||{}, headers);
  options.json && (options.body = JSON.stringify(options.json));
  console.log("Api-Req: ", options)
  return fetch(host+url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log("Api-Res:kkkk", data);
      return{ data }
    })
    .catch(err => {
      console.warn("Api-Res:", err);
      return { err }
    });
}
