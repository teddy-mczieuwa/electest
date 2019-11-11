// require modules
const fs = require('fs')
const path = require('path')

const database = () => {
    const baseDir = path.join(__dirname, '/../.local')

    // create a unique id
    const generateId = (records) => {
        if (records.length > 0) {
            // get the id of the last element in the record and increment it
            return records[records.length - 1].id + 1
        } else {
            return 1
        }
    }

    // parse the date as a string
    const newDate = () => new Date().toString()

    // check whether the record exists
    const checkForRecord = (records, id) => {
        // find a record with an identical ID
        const res = records.find(record => record.id == id)
        if(!res) {
            return {
                msg: 'Record not found'
            }
        } else {
            return res
        }
    }

    //insert record
    const insert = (payload) => {
        return new Promise((resolve, reject) => {
            const id = { id: generateId(payload) }
            const date = { 
                createdAt: newDate(),
                updatedAt: newDate()
            } 
            newRecord = { ...id, ...date, ...newRecord }
            posts.push(newRecord)
            create()
            resolve(newRecord)
        })
    }

    // create record
    const create = ( file, data, callback) => {
        if(!file) return callback('Please select document to add data')
        fs.open(`${baseDir}/${file}.json`, 'wx', (err, fd) => {
            if(!err && fd) {
                // stringify the data
                const stringData = JSON.stringify(data)

                insert(file, stringData)
                // write data to file and close
                // fs.writeFile(fd, stringData, (err) => {
                //     if(!err) {
                //         // close the file
                //         fs.close(fd,(err) => {
                //             if(!err) {
                //                 callback(false)
                //             } else {
                //                 callback('Error closing file')
                //             }
                //         })
                //     } else {
                //         callback('Error writing to new File')
                //     }
                // })

            } else {
                //console.log(err)
                callback('Could not create data, file may already exist')
            }
        })
    }

    // read record
    const read = (file, callback) => {
        // read content from json file
        fs.readFile(`${baseDir}/${file}.json`, 'utf8', (err, data) => {
            callback(err, data)
        })
    }

    // update record
    const update = (file, data, callback) => {
        fs.open(`${baseDir}/${file}.json`, 'r+', (err, fd) => {
            if(!err && fd) {
                 // stringify the data
                 const stringData = JSON.stringify(data)

                 // truncate the data
                 fs.ftruncate(fd, (err) => {
                     if(err) {
                         callback(err)
                     } else {
                         // update data
                         fs.writeFile(fd, stringData, (err) => {
                             if(!err) {
                                fs.close(fd, (err) => {
                                    if(!err) {
                                        callback(false)
                                    } else {
                                        callback('file closed')
                                    }
                                })
                             } else {
                                 callback('Could not update data: ', err)
                             }
                         })
                     }
                 })
            }
        })
    }

    // remove record
    const remove = (file, callback) => {
        fs.unlink(`${baseDir}/${file}.json`, (err) => {
            if(!err) {
                callback(false)
            } else {
                callback('Error deleting file')
            }
        })
    }

    // expose the database queries
    return {
        generateId,
        checkForRecord,
        newDate,
        create,
        read,
        insert,
        update,
        remove
    }
}

module.exports = database()