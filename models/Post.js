const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: { // This is the column that will hold the post id
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: { // This is the column that will hold the post title
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: { // This is the column that will hold the post body
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: { // This is the foreign key column for the relation
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize, // This is the same as `sequelize: sequelize`
        timestamps: true, // Add the timestamp attributes (updatedAt, createdAt)
        freezeTableName: true, // Don't pluralize the table name
        underscored: true, // Use snake_case rather than camelCase column names
        modelName: 'post', 
    }
);

module.exports = Post;