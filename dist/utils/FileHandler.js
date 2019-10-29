var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileHandler = function () {
    function FileHandler(vueInstance, field) {
        _classCallCheck(this, FileHandler);

        this.vm = vueInstance;
        this.field = field;
        this.errorsBag = [];
    }

    _createClass(FileHandler, [{
        key: 'getReader',
        value: function getReader(file) {
            var _this = this;

            var reader = new FileReader();

            reader.onload = function (e) {
                _this.vm[_this.field] = e.target.result;
            };

            return reader;
        }
    }, {
        key: 'removeFile',
        value: function removeFile() {
            this.vm[this.field] = '';
        }
    }, {
        key: 'isSizeValid',
        value: function isSizeValid(file) {
            var maxFileSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var isValid = FileHandler.validateSize(file, maxFileSize);

            if (!isValid) this.pushError('fileSize');

            return isValid;
        }
    }, {
        key: 'isMimeTypeValid',
        value: function isMimeTypeValid(file) {
            var acceptedFiles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            var isValid = FileHandler.validateMimeType(file, acceptedFiles);

            if (!isValid) this.pushError('mimeType');

            return isValid;
        }
    }, {
        key: 'pushError',
        value: function pushError(key) {
            this.errorsBag.push(this.getErrorMessages()[key]);
        }
    }, {
        key: 'getErrorMessages',
        value: function getErrorMessages() {
            return this.errorMessages || {
                mimeType: 'نوع فایل انتخابی اشتباه است!',
                fileSize: 'سایز فایل انتخابی اشتباه است!',
                fileDimensions: 'ابعاد فایل انتخابی اشتباه است!'
            };
        }
    }], [{
        key: 'getFiles',
        value: function getFiles(e) {
            var files = e.target.files || e.dataTransfer.files;

            if (!files.length) return [];

            return files;
        }
    }, {
        key: 'getFilesFirst',
        value: function getFilesFirst(e) {
            var files = FileHandler.getFiles(e);

            if (!files.length) return null;

            return files[0];
        }
    }, {
        key: 'validateSize',
        value: function validateSize(file) {
            var maxFileSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            return file.size <= maxFileSize * 1024 * 1024;
        }
    }, {
        key: 'validateMimeType',
        value: function validateMimeType(file) {
            var acceptedFiles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (!acceptedFiles) return true;

            acceptedFiles = acceptedFiles.split(',');

            var mimeType = file.type;
            var baseMimeType = mimeType.replace(/\/.*$/, '');

            for (var $i = 0; $i < acceptedFiles.length; $i++) {
                var validType = acceptedFiles[$i];

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
    }]);

    return FileHandler;
}();

export default FileHandler;
