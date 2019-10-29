
class FileHandler {
    constructor(vueInstance, field) {
        this.vm = vueInstance;
        this.field = field;
        this.errorsBag = [];
    }


    static getFiles(e) {
        const files = e.target.files || e.dataTransfer.files;

        if (!files.length) return [];

        return files;
    }

    static getFilesFirst(e) {
        const files = FileHandler.getFiles(e);

        if(!files.length) return null;

        return files[0];
    }

    getReader(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            this.vm[this.field] = e.target.result;
        };

        return reader;
    }

    removeFile() {
        this.vm[this.field] = '';
    }


    static validateSize(file, maxFileSize = 1) {
        return file.size <= maxFileSize * 1024 * 1024;
    }

    isSizeValid(file, maxFileSize = 1) {
        const isValid = FileHandler.validateSize(file, maxFileSize);

        if(!isValid) this.pushError('fileSize');

        return isValid;
    }


    static validateMimeType(file, acceptedFiles = '') {
        if(!acceptedFiles) return true;

        acceptedFiles = acceptedFiles.split(',');

        const mimeType = file.type;
        const baseMimeType = mimeType.replace(/\/.*$/, '');

        for (let $i = 0; $i < acceptedFiles.length; $i++) {
            let validType = acceptedFiles[$i];

            validType = validType.trim();

            if (validType.charAt(0) === '.') {
                if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                    return true;
                }
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                if (baseMimeType === validType.replace(/\/.*$/, '')) {
                    return true;
                }
            } else if (mimeType === validType) {
                return true;
            }
        }

        return false;
    }

    isMimeTypeValid(file, acceptedFiles = '') {
        const isValid = FileHandler.validateMimeType(file, acceptedFiles);

        if(!isValid) this.pushError('mimeType');

        return isValid;
    }

    pushError(key) {
        this.errorsBag.push(this.getErrorMessages()[key]);
    }

    getErrorMessages() {
        return this.errorMessages || {
            mimeType: 'نوع فایل انتخابی اشتباه است!',
            fileSize: 'سایز فایل انتخابی اشتباه است!',
            fileDimensions: 'ابعاد فایل انتخابی اشتباه است!'
        };
    }
}


export default FileHandler;
