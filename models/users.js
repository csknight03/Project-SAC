module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        Fbid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points_banked: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points_available: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        completed_tasks: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    User.associate = function(models) {
        User.hasMany(models.Chore, {
            onDelete: "cascade"
        });
    };

    User.associate = function(models) {
        User.belongsTo(models.Family, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
};