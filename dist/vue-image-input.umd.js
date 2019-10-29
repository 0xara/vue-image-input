(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ImageInput = {}));
}(this, (function (exports) { 'use strict';

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

    var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var ImageHandler = function (_FileHandler) {
            _inherits(ImageHandler, _FileHandler);

            function ImageHandler(vueInstance, field) {
                    _classCallCheck$1(this, ImageHandler);

                    return _possibleConstructorReturn(this, (ImageHandler.__proto__ || Object.getPrototypeOf(ImageHandler)).call(this, vueInstance, field));
            }

            _createClass$1(ImageHandler, [{
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

    //

    var script = {

        name: 'ImageInput',

        model: {
            prop: 'value',
            event: 'change'
        },

        props: {
            accept: {},
            src: {},
            placeHolder: {},
            value: ''
        },

        data: function data() {
            return {
                imageSrc: '',
                imageHandler: new ImageHandler(this, 'imageSrc'),
                defaultPlaceHolder: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%20viewBox%3D\'0%200%201400%20933\'%3E%3Cdefs%3E%3Csymbol%20id%3D\'a\'%20viewBox%3D\'0%200%2090%2066\'%20opacity%3D\'0.3\'%3E%3Cpath%20d%3D\'M85%205v56H5V5h80m5-5H0v66h90V0z\'%2F%3E%3Ccircle%20cx%3D\'18\'%20cy%3D\'20\'%20r%3D\'6\'%2F%3E%3Cpath%20d%3D\'M56%2014L37%2039l-8-6-17%2023h67z\'%2F%3E%3C%2Fsymbol%3E%3C%2Fdefs%3E%3Cuse%20xlink%3Ahref%3D\'%23a\'%20width%3D\'20%25\'%20x%3D\'40%25\'%2F%3E%3C%2Fsvg%3E'
            };
        },


        computed: {
            errors: function errors() {
                return this.imageHandler.errorsBag;
            }
        },

        watch: {
            src: function src(nVal) {
                if (!nVal) {
                    this.$emit('change', '');
                    this.imageSrc = this.getPlaceHolder();

                    return;
                }

                if (nVal != this.imageSrc) {
                    this.imageSrc = nVal;
                }
            },
            errors: function errors(nVal) {
                if (!nVal.length) return;

                this.$emit('change', '');
                this.$emit('error', nVal);
                this.imageSrc = this.getPlaceHolder();
            },
            value: function value(nVal) {
                if (nVal) return;

                this.imageSrc = this.getPlaceHolder();
            }
        },

        created: function created() {
            this.imageSrc = this.src || this.getPlaceHolder();
        },


        methods: {
            onImageChange: function onImageChange(e) {
                var image = this.imageHandler.createImage(e);
                this.$emit('change', image);
            },
            handleOpenFileSelector: function handleOpenFileSelector($e) {
                $(this.$el).find('input[type=file]').trigger('click');
            },
            getPlaceHolder: function getPlaceHolder() {
                return this.placeHolder || this.defaultPlaceHolder;
            }
        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { style: { border: '2px dashed #E0E0E0', 'border-radius': '10px', 'padding': '10px' }, on: { "dragover": function dragover($event) {
            $event.preventDefault();$event.stopPropagation();
          }, "drop": function drop($event) {
            $event.preventDefault();$event.stopPropagation();return _vm.onImageChange($event);
          }, "click": function click($event) {
            $event.stopPropagation();return _vm.handleOpenFileSelector($event);
          } } }, [_c('input', { staticStyle: { "display": "none" }, attrs: { "accept": _vm.accept, "type": "file", "name": "image" }, on: { "change": _vm.onImageChange } }), _vm._v(" "), _c('img', { staticStyle: { "width": "100%" }, attrs: { "src": _vm.imageSrc } })]);
    };
    var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */

    /* style inject SSR */

    var ImageInput = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

    // install function executed by Vue.use()
    function install(Vue) {
      if (install.installed) return;
      install.installed = true;
      Vue.component(ImageInput.name, ImageInput);
    }

    // Create module definition for Vue.use()
    var plugin = {
      install: install

      // To auto-install when vue is found
      /* global window global */
    };var GlobalVue = null;
    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }
    if (GlobalVue) {
      GlobalVue.use(plugin);
    }

    // Inject install function into component - allows component
    // to be registered via Vue.use() as well as Vue.component()
    ImageInput.install = install;

    // It's possible to expose named exports when writing components that can
    // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
    // export const RollupDemoDirective = component;

    exports.default = ImageInput;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
