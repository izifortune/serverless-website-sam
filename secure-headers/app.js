exports.lambdaHandler = async (event) => {
  const { Records: [{ cf: { response } }] } = event;

  if(response.headers['content-type'] && response.headers['content-type'][0].value.indexOf('text/html') < 0 ||
    response.headers['location']) {
    return response;
  }

  response.headers = {
    ...response.headers,
    ['strict-transport-security']: [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains'}],
    ['x-content-type-options']: [{key: 'X-Content-Type-Options', value: 'nosniff'}],
    ['x-frame-options']: [{key: 'X-Frame-Options', value: 'SAMEORIGIN'}],
    ['x-xss-protection']: [{key: 'X-XSS-Protection', value: '1; mode=block'}],
    ['referrer-policy']: [{key: 'Referrer-Policy', value: 'same-origin'}],
  };
  return response;
};
