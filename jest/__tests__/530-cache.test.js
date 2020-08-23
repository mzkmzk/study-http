const curl = require('../curl/index')

it('正常测试', async function(){
  const curlString = "curl -vs \
    -H 'Host: study-http.404mzk.com' \
    http://47.115.81.18:9500/test.log"
  const { status, body, row } = await curl(curlString)

  expect(status).toBe(200)
  expect(row).toMatchSnapshot()
})

it('if-none-match测试', async function(){
  const curlString = "curl -vs \
    -H 'If-None-Match: " + '"5ed8f9a5-f"' + "' \
    -H 'Host: study-http.404mzk.com' \
    http://47.115.81.18:9500/test.log"
  const { status, body, row } = await curl(curlString)

  expect(status).toBe(304)
  expect(row).toMatchSnapshot()
})