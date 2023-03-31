"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SubProjectAdditionalInfoDetail extends Model {
        static associate(models) {
            this.belongsTo(models.sub_project_additional_info_detail, {
                foreignKey: "sub_project_additional_info_id",
                targetKey: "id",
            });
        }
    }
    SubProjectAdditionalInfoDetail.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            value: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            prioritas: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize: sequelize,
            modelName: "sub_project_additional_info_detail",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );
    return SubProjectAdditionalInfoDetail;

}