function isBrowserRequest(req) {
  return req.headers.accept && req.headers.accept.includes('text/html');
}

module.exports = { isBrowserRequest };