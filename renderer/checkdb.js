// const _data = require('./db')

const _data  = require('./dbService')

const repos = require('./repos')

console.log(repos.posts)

//_data.deleteRecord(3)

//_data.insertRecord({title:'NodeConfEU', content: 'Microservices'})

//_data.updateRecord(2,{title:"NodeConf",content:"A new thing with nodejs"})
 //_data.findRecords()
 //_data.findRecordById(3)

// _data.read('test', (err, data) => {
//     if(!err && data) {
//         console.log(JSON.parse(data))
//     } else {
//         console.log(err)
//     }
// })

// _data.update('another',{"atesnother":"data"}, (err) => {
//     if(!err) {
//         return
//     } else {
//         console.log('Error: ', err)
//     }
// })

// _data.remove('another', (err) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log('Removed file')
//     }
// })

// _data.create('movies', {'name': 'mechanic'}, (err) => {
//     if(!err) {
//         console.log(false)
//     } else {
//         console.log(err)
//     }
// })