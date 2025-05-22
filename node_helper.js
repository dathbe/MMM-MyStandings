const Log = require('logger')
const NodeHelper = require('node_helper')
const fs = require('node:fs')
const path = require('node:path')

module.exports = NodeHelper.create({
  start: function () {
    Log.log('Starting node_helper for: ' + this.name)
  },

  getDirectoryTree(dirPath) {
    const result = []
    const files = fs.readdirSync(dirPath, { withFileTypes: true })

    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name)
      if (file.name.endsWith('.svg') || file.name.endsWith('.png')) {
        result.push({ name: file.name })
      }
      else if (file.isDirectory()) {
        const children = this.getDirectoryTree(filePath)
        if (children.length > 0) {
          result.push({ name: file.name, children })
        }
      }
    })

    return result
  },

  async getData(notification, payload) {
    try {
      const response = await fetch(payload.url)
      Log.debug(`[MMM-MyStandings] ${payload.url} fetched`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      this.sendSocketNotification(notification, {
        result: data,
        uniqueID: payload.uniqueID,
      })
    }
    catch (error) {
      Log.error(`[MMM-MyStandings] Could not load data: ${error}`)
    }
  },

  async getSNETData(notification, payload) {
    var queryYear = new Date().getFullYear()
    var standings = []
    while (standings.length === 0 && queryYear > 2020) {
      try {
        const response = await fetch(payload.url + queryYear)
        Log.debug(`[MMM-MyStandings] ${payload.url} fetched`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data['data']['teams']) {
          standings = data['data']['teams']
        }
        if (standings.length === 0) {
          queryYear = queryYear - 1
        }
      }
      catch (error) {
        Log.error(`[MMM-MyStandings] Could not load data: ${error}`)
      }
    }
    this.sendSocketNotification(`STANDINGS_RESULT_SNET-${queryYear}_${notification.split('-')[1]}`, {
      result: standings,
      uniqueID: payload.uniqueID,
    })
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function (notification, payload) {
    if (notification == 'MMM-MYSTANDINGS-GET-LOCAL-LOGOS') {
      this.localLogos = {}
      var fsTree = this.getDirectoryTree('./modules/MMM-MyStandings/logos')
      fsTree.forEach((league) => {
        if (league.children) {
          var logoFiles = []
          league.children.forEach((file) => {
            logoFiles.push(file.name)
          })
          this.localLogos[league.name] = logoFiles
        }
      })

      this.localLogosCustom = {}
      fsTree = this.getDirectoryTree('./modules/MMM-MyStandings/logos_custom')
      fsTree.forEach((league) => {
        if (league.children) {
          var logoFiles = []
          league.children.forEach((file) => {
            logoFiles.push(file.name)
          })
          this.localLogosCustom[league.name] = logoFiles
        }
      })

      this.sendSocketNotification('MMM-MYSTANDINGS-LOCAL-LOGO-LIST', { uniqueID: payload.uniqueID, logos: this.localLogos, logosCustom: this.localLogosCustom })
    }
    else if (payload.url.includes('stats-api.sportsnet.ca/web_standings')) {
      this.getSNETData(notification, payload)
    }
    else if (notification.startsWith('STANDINGS_RESULT')) {
      this.getData(notification, payload)
    }
  },
})
