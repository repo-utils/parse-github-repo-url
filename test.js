
var assert = require('assert')

var parse = require('.')

describe('versionless', function () {
  [
    'component/emitter',
    'https://github.com/component/emitter',
    'git://github.com/component/emitter.git',
    'https://github.com/repos/component/emitter/tarball',
    'https://github.com/repos/component/emitter/zipball',
    'https://codeload.github.com/component/emitter/legacy.zip',
    'https://codeload.github.com/component/emitter/legacy.tar.gz',
  ].forEach(function (url) {
    it(url, function () {
      assert.deepEqual(['component', 'emitter', ''], parse(url))
    })
  })
})

describe('versioned', function () {
  [
    'component/emitter#1',
    'component/emitter@1',
    'component/emitter#"1"',
    'component/emitter@"1"',
    'git://github.com/component/emitter.git#1',
    'https://github.com/repos/component/emitter/tarball/1',
    'https://github.com/repos/component/emitter/zipball/1',
    'https://codeload.github.com/component/emitter/legacy.zip/1',
    'https://codeload.github.com/component/emitter/legacy.tar.gz/1',
    'https://github.com/component/emitter/archive/1.tar.gz',
  ].forEach(function (url) {
    it(url, function () {
      assert.deepEqual(['component', 'emitter', '1'], parse(url))
    })
  })
})
