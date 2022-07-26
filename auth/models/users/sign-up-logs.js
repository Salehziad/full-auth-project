const signUpSchema = (sequelize, DataTypes) => sequelize.define('dddd', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
module.exports =signUpSchema;