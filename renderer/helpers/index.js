const fs = require('fs')
const path = require('path')

// generate a new id
const generateId = (array) => {
    if (array.length > 0) {
        // get the last item in the array and increment it by 1
        return array[array.length - 1].id + 1
    } else {
        // returns 1 if there is no existing record
        return 1
    }
}

// create a new date
const newDate = () => new Date().toString()


// checks whether a record exists 
function mustBeInArray(array, id) {
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

function writeJSONFile(filename, content) {

    // set base dir here
    const baseDir = path.join(__dirname, '/.local')

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

module.exports = {
    generateId,
    newDate,
    mustBeInArray,
    writeJSONFile,
}