module.exports = function(sequelize, DataTypes) {
    var Chore = sequelize.define("Chore", {
        chore: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_entered: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_completed: {
            type: DataTypes.DATE,
        },
        due_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        chore_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        }

    });

    Chore.associate = function(models) {
        Chore.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Chore;
}