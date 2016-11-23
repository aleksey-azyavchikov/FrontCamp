'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnumFieldsValidators = {
    ApiKeyField: 0,
    OtherField: 1
};

var ValidationFactory = function () {
    function ValidationFactory() {
        _classCallCheck(this, ValidationFactory);
    }

    _createClass(ValidationFactory, [{
        key: 'getProxy',
        value: function getProxy(validatorIndex) {
            return new Proxy({}, this.getValidator(validatorIndex));
        }
    }, {
        key: 'getValidator',
        value: function getValidator(validatorIndex) {
            switch (validatorIndex) {
                case 0:
                    {
                        return {
                            set: function set(obj, prop, value) {
                                if (value.length != 32) {
                                    throw new RangeError('Api key should has 32 symbols');
                                }
                                obj[prop] = value;
                                return true;
                            }
                        };
                    }
                case 1:
                default:
                    {
                        return {
                            set: function set(obj, prop, value) {
                                obj[prop] = value;
                            }
                        };
                    }
            }
        }
    }]);

    return ValidationFactory;
}();