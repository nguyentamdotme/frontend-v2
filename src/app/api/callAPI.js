import FormData from 'form-data';

import backend from '../config/backend.config'

export default (opt) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.accessToken
  }
  let option = {
    method       : opt.method,
    responseType : 'json',
    headers      : headers
  }
  if(opt.method != 'GET') {
    option.body = JSON.stringify(opt.data) || {};
  }
  const request = new Request(backend.url+'/api/v1'+opt.url, option);
  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function uploadMultiple(files) {
  const form = new FormData();
  for(let i = 0 ; i<= files.length; i++) {
    form.append('image-'+i,files[i]);
  }
  const option = {
    method: 'POST',
    headers: {
      'Authorization': sessionStorage.accessToken,
    },
    body: form
  }
  const request = new Request(backend.url+'/api/v1/upload/multiple', option);
  return fetch(request).then(response => {
    // console.log(response);
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function upload(files) {
  const form = new FormData();
  form.append('image',files);
  const option = {
    method: 'POST',
    body: form
  }
  console.log(option);
  const request = new Request(backend.url+'/api/v1/upload/', option);
  return fetch(request).then(response => {
    // console.log(response);
    return response.json();
  }).catch(error => {
    return error;
  });
}
