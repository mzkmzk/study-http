const resolveCurlResponse = require('../resolveCurlResponse')

it('测试curl基本解析', async () => {
  const str = 'GET /test.log HTTP/1.1\r' +
  '\nUser-Agent: curl/7.38.0\r' +
  '\nAccept: */*\r' +
  '\nRange: bytes=0-0,10-11\r' +
  '\nHost: study-http.404mzk.com\r' +
  '\n\r' +
  '\nHTTP/1.1 206 Partial Content\r' +
  '\nServer: nginx/1.17.10\r' +
  '\nDate: Sun, 07 Jun 2020 14:54:07 GMT\r' +
  '\nContent-Type: multipart/byteranges; boundary=00000000000000000063\r' +
  '\nContent-Length: 227\r' +
  '\nLast-Modified: Thu, 04 Jun 2020 13:39:49 GMT\r' +
  '\nConnection: keep-alive\r' +
  '\nETag: "5ed8f9a5-f"\r' +
  '\n\r' +
  '\n\r' +
  '\n234\r' +
  '\n'
  const { status, responseHeader, body} = resolveCurlResponse(str)
  
  expect(status).toBe(206)
  expect(responseHeader.ETag).toBe('"5ed8f9a5-f"')
  expect(body).toBe('234')
})