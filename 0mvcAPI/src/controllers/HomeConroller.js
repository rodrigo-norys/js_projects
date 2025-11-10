import Student from '../models/Student.js';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
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

export default new HomeController();
