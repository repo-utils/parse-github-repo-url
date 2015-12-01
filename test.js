
var assert = require('assert')

var parse = require('./')

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

  it('works for www.github.com', function () {
    var url = 'https://www.github.com/component/emitter'
    var parsed = parse(url)
    assert.deepEqual(['component', 'emitter', ''], parsed)
  })

  it('works for http://www.github.com', function () {
    var url = 'http://www.github.com/component/emitter'
    var parsed = parse(url)
    assert.deepEqual(['component', 'emitter', ''], parsed)
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

describe('url parse', function () {
  var builtinUrlParse = require('url').parse

  it('handles https:// url', function () {
    var url = 'https://foo.com/bar'
    var parsed = builtinUrlParse(url)
    assert.equal('foo.com', parsed.hostname)
  })

  it('does not handle emails', function () {
    var url = 'git@foo.com/bar'
    var parsed = builtinUrlParse(url)
    assert.equal(null, parsed.hostname, JSON.stringify(parsed))
  })
})

describe('git @ syntax', function () {
  it('works for git url', function () {
    var url = 'git@github.com:bahmutov/lazy-ass.git'
    var parsed = parse(url)
    assert.deepEqual(['bahmutov', 'lazy-ass', ''], parsed)
  });

  it('works for https:git url', function () {
    var url = 'https:git@github.com:bahmutov/lazy-ass.git'
    var parsed = parse(url)
    assert.deepEqual(['bahmutov', 'lazy-ass', ''], parsed)
  });
})
