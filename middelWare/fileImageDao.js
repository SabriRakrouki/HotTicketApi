
const fileImage = {
    filename: '',
    fileId: '',
}
const fileArray = [];

const fileImageDao = {
    setFile: (val) => {
        console.log(val)


    },
    getFile: () => {
        return fileImage
    },
    setMultiFile: (val) => {

        fileArray.push(val)
    }
    , getMultiFilies: () => {
        return fileArray
    }, removeArrayFiles: () => {
        fileArray = [];
    }

}
module.exports = { fileImageDao }
