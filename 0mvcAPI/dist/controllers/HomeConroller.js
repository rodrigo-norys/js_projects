"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Studentjs = require('../models/Student.js'); var _Studentjs2 = _interopRequireDefault(_Studentjs);

class HomeController {
  async index(req, res) {
    const newStudent = await _Studentjs2.default.create({
      name: 'Rodrigo',
      lastName: 'Norys',
      email: 'rodrigo.norys@gmail.com',
      age: 31,
      weight: 76,
      height: 1.74,
    });
    res.json(newStudent);
  }
}

exports. default = new HomeController();
