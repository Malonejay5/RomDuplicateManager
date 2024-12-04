const fs = require('fs')

let romFiles = fs.readdirSync('../home/pi/RetroPie/roms')

// This functions checks for Duplcate files names
let checkFiles = async (files) => {

    let duplicates = [] // array for duplicates 
    for (let i = 0; i < files.length; i++) {
        let innerFiles = fs.readdirSync(`${romFiles}/${files[i]}`, 'utf-8')
        for (let u = 0; u < innerFiles.length; u++){
            let uniqueFiles = new Set() // create new set for unique files
            console.log(`Checking ${innerFiles[u]}`)
            if( uniqueFiles.has(innerFiles[u])) { 
                console.log('Duplicate Found!')
                duplicates.push(innerFiles[u])
            } 
                //console.log('No Duplicates Found')
                uniqueFiles.add(innerFiles[u])
        }
    }
    return duplicates
}
 
let deleteFiles = async () => {
    console.log('Starting...')
    let duplicateFiles = await checkFiles(romFiles)
    if (duplicateFiles.length > 0) {
        for (let i = 0; i < duplicateFiles.length; i++){
            fs.unlink(`./${duplicateFiles[i]}`)
            console.log(`./${duplicateFiles[i]}`)
        }
    } else {
        console.log('No Duplicates Found')

    }
}

deleteFiles()


