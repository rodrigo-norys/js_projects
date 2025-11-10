import { Sequelize, Model } from "sequelize";

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'This field cannot be empty'
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'This field cannot be empty'
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.getDataValue('filename')}`
        },
      }
    }, {
      sequelize,
      tableName: 'photos'
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' })
  }
}
