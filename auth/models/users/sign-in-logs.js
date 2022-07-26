const signInSchema = (sequelize, DataTypes) => sequelize.define('dddd', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    method: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    date: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
});
module.exports =signInSchema;