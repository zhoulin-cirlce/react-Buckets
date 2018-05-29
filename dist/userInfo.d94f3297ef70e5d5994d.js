webpackJsonp([1],{

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(69);

var _userInfo = __webpack_require__(123);

var _react3 = __webpack_require__(301);

var _react4 = _interopRequireDefault(_react3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(4).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserInfo = function (_Component) {
    _inherits(UserInfo, _Component);

    function UserInfo() {
        _classCallCheck(this, UserInfo);

        return _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).apply(this, arguments));
    }

    _createClass(UserInfo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$userInfo = this.props.userInfo,
                userInfo = _props$userInfo.userInfo,
                isLoading = _props$userInfo.isLoading,
                errMsg = _props$userInfo.errMsg;

            return _react2.default.createElement(
                'div',
                null,
                isLoading ? '请求中...' : errMsg ? errMsg : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h2',
                        null,
                        '\u4E2A\u4EBA\u8D44\u6599'
                    ),
                    _react2.default.createElement('img', { src: _react4.default }),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            '\u59D3\u540D\uFF1A',
                            userInfo.name
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            '\u5E74\u9F84\uFF1A',
                            userInfo.age
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            '\u7231\u597D\uFF1A',
                            userInfo.like
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            '\u6027\u522B\uFF1A',
                            userInfo.female
                        )
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this2.props.getUserInfo();
                        } },
                    '\u67E5\u770B\u4E2A\u4EBA\u8D44\u6599'
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);

    return UserInfo;
}(_react.Component);

var _default = (0, _reactRedux.connect)(function (state) {
    return { userInfo: state.userInfo };
}, { getUserInfo: _userInfo.getUserInfo })(UserInfo);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(4).default;

    var leaveModule = __webpack_require__(4).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(UserInfo, 'UserInfo', '/Users/zhoulin/Documents/circle/react-Buckets/src/pages/UserInfo/UserInfo.js');
    reactHotLoader.register(_default, 'default', '/Users/zhoulin/Documents/circle/react-Buckets/src/pages/UserInfo/UserInfo.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e95322b7610fb8d077c3359fc7a38a41.png";

/***/ })

});
//# sourceMappingURL=userInfo.d94f3297ef70e5d5994d.js.map