import Student from "../models/Student";

export default async (req, res, next) => {
  try {
    const { student_id } = req.body;

    const teste = await Student.findByPk(student_id)
    console.log(teste)

    if (!teste) {
      return res.status(400).json({
        errors: ['xdddd']
      });
    }
    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: ['Erro interno do servidor.'] });
  }
}
