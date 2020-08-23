const _ = require('lodash')

const mockTimeHead = ['Date', 'Last-Modified']

const mockTime = function(row){
  let lines = row.split('\n')
  lines = _.map(lines, function(line) {
    const keyValue = line.split(': ')
    const key = keyValue[0].trim()
    if (mockTimeHead.indexOf(key) !== -1 ){
      return `${key}: mock-time\n`
    } else {
      return line
    }
  })
  return lines.join('')
}

const mockBoundary = function(row){
  const boundary = row.match(/boundary=(\w*)/)
  if (boundary && boundary[1]) {
    row = row.replace(new RegExp(boundary[1], 'g'), 'mock-boundary-00001')
  }
  
  return row
}

const handleRequestHeader = (stdout) => {
  const result = { requestHeader: {}}
  const lines = stdout.split('\n')
  const firstLine = lines[0].split(' ')
  result.method = firstLine[0]
  result.path = firstLine[1]
  result.requestHttpVersion = firstLine[2]
  _.forEach(lines.slice(1), line => {
    const keyValue = line.split(': ')
    const key = keyValue[0].trim()
    const value = keyValue[1].trim()
    result.requestHeader[key] = value.trim()
  })
  return result
}

const handleResponse = (stdout) => {
 
  const result = { responseHeader: {},  }
  const lines = stdout.split('\n')
  const firstLine = lines[0].split(' ')
  const headEndIndex = _.findIndex(lines, value => value.trim() === '')
  
  _.forEach(lines.slice(1, headEndIndex), line => {
    const keyValue = line.split(': ')
    const key = keyValue[0].trim()
    const value = keyValue[1].trim()
    result.responseHeader[key] = value.trim()
  })
  result.status = parseInt(firstLine[1]) 
  result.body = lines.slice(headEndIndex + 1, lines.length).join('\n').trim()
  return result
}

module.exports = function (stdout, stderr) {
  const lines = stdout.split('\n')
  
  const headEndIndex = _.findIndex(lines, value => value.trim() === '')
  const requestResult = handleRequestHeader(lines.slice(0, headEndIndex).join('\n'))
  const responseResult = handleResponse(lines.slice(headEndIndex + 1).join('\n'))
  return Object.assign({row: mockBoundary(mockTime(stdout))}, requestResult, responseResult)
}