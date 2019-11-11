const fs = require('fs')
const path = require('path')
const repos = require('./repos')

const db = (model) => {

    const filename = path.join(__dirname, `/../.local/${model}.json`)
    let records = require(filename)
    


    // generate a new id
    const _generateId = (array) => {
        if (array.length > 0) {
            // get the last item in the array and increment it by 1
            return array[array.length - 1].id + 1
        } else {
            // returns 1 if there is no existing record
            return 1
        }
    }

    // create a new date
    const _newDate = () => new Date().toString()


    // checks whether a record exists 
    const _mustBeInArray = (array, id) => {
        return new Promise((resolve, reject) => {
            // compare id passed in with the id in the array
            const row = array.find(r => r.id == id)
            if (!row) {
                reject({
                    message: 'record does not exist',
                })
            }
            resolve(row)
        })
    }

    const _writeJSONFile = (filename, content) => {

        // set base dir here
        //const baseDir = path.join(__dirname, '/.local')

        //open the file
        fs.open(filename,'r+', (err, fd) => {
            if(!err && fd) {
                // write to the file
                fs.writeFile(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
                    if (!err) {
                        //close the file
                        fs.close(fd, (err) => {
                            if(err) {
                                console.log('Error closing the file')
                            } else {
                                console.log('file closed')
                            }
                        })
                        
                    } else {
                        console.log('error writing file ',err)
                    }
                })
            } else {
                console.log('error opening file ',err)
            }
            
        })
    }


    // get all records
    const findRecords= () => {
    return new Promise((resolve, reject) => {
        // check for the length of the array
        if (records.length === 0) {
            resolve({
                message: 'no records',
            })
        }
            resolve(records)
        })
    }


    // get single record by id
    const findRecordById = (id) => {
        return new Promise((resolve, reject) => {
            _mustBeInArray(records, id)
            .then(record => {
                console.dir(record,{color:'orange'})
                resolve(record)
            })
            .catch(err => reject(err))
        })
    }


    // insert a new record 
    const insertRecord = (newRecord) => {
        return new Promise((resolve, reject) => {
            const id = { id: _generateId(records) }
            const date = { 
                createdAt: _newDate(),
                updatedAt: _newDate()
            } 
            newRecord = { ...id, ...date, ...newRecord }
            console.log(newRecord)
            records.push(newRecord)
            _writeJSONFile(filename, records)
            resolve(newRecord)
        })
    }

    // update currently existing record
    const updateRecord = (id, newRecord) => {
        return new Promise((resolve, reject) => {
            _mustBeInArray(records, id)
            .then(post => {
                const index = records.findIndex(p => p.id == post.id)
                id = { id: post.id }
                const date = {
                    createdAt: post.createdAt,
                    updatedAt: _newDate()
                } 
                records[index] = { ...id, ...date, ...newRecord }
                _writeJSONFile(filename, records)
                resolve(records[index])
            })
            .catch(err => reject(err))
        })
    }


    // delete a single record
    const deleteRecord = (id) => {
        console.log(typeof id)
        return new Promise((resolve, reject) => {
            _mustBeInArray(records, id)
            .then(() => {
                records = records.filter(p => p.id !== id)
                _writeJSONFile(filename, records)
                console.log(records)
                resolve(records)
            })
            .catch(err => reject(err))
        })
    }


    return {
        findRecords,
        findRecordById,
        insertRecord,
        updateRecord,
        deleteRecord
    }
}

module.exports = db


