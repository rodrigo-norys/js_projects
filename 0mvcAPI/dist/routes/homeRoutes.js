"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _HomeConrollerjs = require('../controllers/HomeConroller.js'); var _HomeConrollerjs2 = _interopRequireDefault(_HomeConrollerjs);

const router = new (0, _express.Router)();

router.get('/', _HomeConrollerjs2.default.index);

exports. default = router;
