module.exports = function(sequelize, DataTypes) {
    var Chore = sequelize.define("Chore", {
        chore: {
            type: datatype.STRING,
            allowNull: false
        },
        date_entered: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_completed: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
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
            allowNull: false,
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