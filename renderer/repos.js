const fs = require('fs')
const path = require('path')

var repoFactory = function() {
    var repos = this

    // get the database location
    const dir = path.join(__dirname, '../.local')

    // read contents of the directory
    const files = fs.readdirSync(dir)

    // initialize repoList
    const repoList = []


    files.forEach((file) => {
        const name = file.split('.')[0]
        let repoObject = {name, source: file}
        repoList.push(repoObject)
    })

    repoList.forEach((repo) => {
        repos[repo.name] = require(`${dir}/${repo.source}`)
    })
}


module.exports = new repoFactory