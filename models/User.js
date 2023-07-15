const {model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {

    checkPass(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            }
        },
        sequelize, // This is the same as `sequelize: sequelize`
        timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
        freezeTableName: true, // Don't pluralize the table name
        underscored: true, // Use snake_case rather than camelCase column names
        modelName: 'user', // Use {modelName} rather than 'User' as the model name
    }
);

module.exports = User;
        