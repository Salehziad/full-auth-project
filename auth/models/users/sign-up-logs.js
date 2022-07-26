const signUpSchema = (sequelize, DataTypes) => sequelize.define('dddd', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
});
module.exports = signUpSchema;