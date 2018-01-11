module.exports = function(sequelize, DataTypes) {
    var Family = sequelize.define("Family", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        family_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }
    });

    Family.associate = function(models) {
        Family.hasMany(models.User, {
            onDelete: "cascade"
        });
    };

    return Family;
}