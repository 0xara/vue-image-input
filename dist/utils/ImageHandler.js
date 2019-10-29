import FileHandler from './FileHandler.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageHandler = function (_FileHandler) {
        _inherits(ImageHandler, _FileHandler);

        function ImageHandler(vueInstance, field) {
                _classCallCheck(this, ImageHandler);

                return _possibleConstructorReturn(this, (ImageHandler.__proto__ || Object.getPrototypeOf(ImageHandler)).call(this, vueInstance, field));
        }

        _createClass(ImageHandler, [{
                key: 'createImage',
                value: function createImage(e) {

                        this.errorsBag = [];

                        var file = FileHandler.getFilesFirst(e);

                        if (!file) return;

                        var isValidType = this.isMimeTypeValid(file, '.jpg, .jpeg,.png, .bmp');

                        var isValidSize = this.isSizeValid(file, 1);

                        if (!isValidType || !isValidSize) return;

                        var reader = _get(ImageHandler.prototype.__proto__ || Object.getPrototypeOf(ImageHandler.prototype), 'getReader', this).call(this, file);

                        reader.readAsDataURL(file);

                        return file;
                }
        }, {
                key: 'removeImage',
                value: function removeImage() {
                        _get(ImageHandler.prototype.__proto__ || Object.getPrototypeOf(ImageHandler.prototype), 'removeFile', this).call(this);
                }
        }, {
                key: 'getErrorMessages',
                value: function getErrorMessages() {

                        var errorMessages = _get(ImageHandler.prototype.__proto__ || Object.getPrototypeOf(ImageHandler.prototype), 'getErrorMessages', this).call(this);

                        errorMessages['fileDimensions'] = 'ابعاد فایل انتخابی اشتباه است!';

                        return errorMessages;
                }
        }], [{
                key: 'validateImageDimensions',
                value: function validateImageDimensions(file) {
                        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                            _ref$width = _ref.width,
                            _ref$height = _ref.height;

                        var _URL = window.URL || window.webkitURL;

                        var image = new Image();

                        image.onload = function () {
                                alert("The image width is " + this.width + " and image height is " + this.height);
                        };

                        image.src = _URL.createObjectURL(file);
                }
        }]);

        return ImageHandler;
}(FileHandler);

export default ImageHandler;
