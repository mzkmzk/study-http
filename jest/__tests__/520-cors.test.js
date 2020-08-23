const curl = require('../curl/index')

it('简单跨域请求', async () => {
  const { row } = await curl(`curl -vs -H 'Host: study-http.404mzk.com' -H 'Origin: http://www.404mzk.com' http://47.115.81.18:9500/cors-sample`)
  expect(row).toMatchSnapshot()
})


it('复杂跨域请求', async () => {
  const { row } = await curl(`curl -vs -X OPTIONS -H 'Content-Type: application/json' -H  'Origin: http://www.404mzk.com' -H 'Host: study-http.404mzk.com'  http://47.115.81.18:9500/cors-complex`)
  expect(row).toMatchSnapshot()
  const result = await curl(`curl -vs -X POST -H 'Content-Type: application/json' -H  'Origin: http://www.404mzk.com' -H 'Host: study-http.404mzk.com'  http://47.115.81.18:9500/cors-complex`)
  expect(result.row).toMatchSnapshot()
})
