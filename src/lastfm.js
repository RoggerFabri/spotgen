var http = require('./http')

module.exports = function (key) {
  var lastfm = {}

  /**
   * Get the Last.fm metadata for a track.
   *
   * [Reference](http://www.last.fm/api/show/track.getInfo).
   *
   * @param {String} artist - The artist.
   * @param {String} title - The title.
   * @param {boolean} [correct] - Whether to autocorrect misspellings,
   * default true.
   * @return {Promise | JSON} The track info.
   */
  lastfm.getInfo = function (artist, title, user, correct) {
    var url = 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo'
    correct = (correct === undefined) ? true : correct
    url += '&api_key=' + encodeURIComponent(key)
    url += '&artist=' + encodeURIComponent(artist)
    url += '&track=' + encodeURIComponent(title)
    url += user ? ('&username=' + encodeURIComponent(user)) : ''
    url += '&autocorrect=' + (correct ? 1 : 0)
    url += '&format=json'
    return lastfm.request(url).then(function (result) {
      if (result && !result.error && result.track) {
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    })
  }

  /**
   * Perform a Last.fm request.
   * @param {string} url - The URL to look up.
   */
  lastfm.request = function (url) {
    console.log(url.replace(/&api_key=[^&]*/i, ''))
    return http.json(url)
  }

  return lastfm
}