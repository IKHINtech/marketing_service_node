const SuperDao = require("./superDao");
const models = require("../models");
const SubProject = models.sub_project;
const logger = require("../config/logger");
const Project = models.project;
const SubProjectAdditionalInfo = models.sub_project_additional_info
const SubProjectAdditionalInfoDetail = models.sub_project_additional_info_detail
const SubProjectFacility = models.sub_project_facility
const SubProjectFacilityDao = require('../dao/subProjectFacilityDao')
const SubProjectAdditionalInfoDao = require('../dao/subProjectAdditionalInfoDao')
const SubProjectAdditionalInfoDetailDao = require("../dao/subProjectAdditionalInfoDetailDao")
const { v4: uuidv4 } = require("uuid");



class SubProjectDao extends SuperDao {
  constructor() {
    super(SubProject);
    this.infoService = new SubProjectAdditionalInfoDao()
    this.facilityService = new SubProjectFacilityDao()
    this.detailService = new SubProjectAdditionalInfoDetailDao()
  }
  async getDataTableData(
    where,
    limit,
    offset,
    order = [["created_at", "DESC"]]
  ) {
    return SubProject.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: Project,
      where,
      order,
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        logger.error(e);
        console.log(e);
        return [];
      });
  }
  async findByCode(code) {
    return SubProject.findOne({ where: { code } });
  }
  async isNameExists(code) {
    return SubProject.count({
      where: { code },
    }).then((count) => {
      if (count != 0) {
        return true;
      } else {
        return false;
      }
    });
  }
  async create(data) {
    try {
      const result = await SubProject.create(
        data,
        {
          include: [
            {
              model: SubProjectAdditionalInfo,
              include: [SubProjectAdditionalInfoDetail]
            },
            SubProjectFacility,
          ]
        }
      )
      return result;
    } catch (e) {
      logger.error(e)
    }
  }
  async updateById(data, id) {
    try {
      const result = await SubProject.update(data, { where: { id } })

      let sub_project_info = []
      let sub_project_facility = []
      if (data.sub_project_additional_infos.length != 0) {
        for (let i of data.sub_project_additional_infos) {
          i.id === undefined ? i.id = uuidv4() : i.id
          i.sub_project_id === undefined ? i.sub_project_id = data.id : i.sub_project_id
          sub_project_info.push(i.id)
          let detail_info = []
          await this.infoService.updateOrCreate(i, { id: i.id })

          if (i.sub_project_additional_info_details.length != 0) {
            for (let y of i.sub_project_additional_info_details) {
              y.id === undefined ? y.id = uuidv4() : y.id
              y.sub_project_additional_info_id === undefined ? y.sub_project_additional_info_id = i.id : y.sub_project_additional_info_id
              detail_info.push(y.id)
              await this.detailService.updateOrCreate(y, { id: y.id })
            }
            if (detail_info.length != 0) {
              const exclude = await this.detailService.exclude(i.id, detail_info)
              for (const del of exclude) {
                const delData = await this.detailService.deleteByWhere({ id: del.id })
                console.log(delData)
              }
            }
          } else {
            const include = await this.detailService.findBy(y.id)
            for (const del of include) {
              const delData = await this.detailService.deleteByWhere({ id: del.id })
              console.log(delData)
            }
          }

        }

        if (sub_project_info.length != 0) {
          const exclude = await this.infoService.exclude(data.id, sub_project_info)
          for (const del of exclude) {
            const delData = await this.infoService.deleteByWhere({ id: del.id })
            console.log(delData)
          }
        }

      } else {
        const include = await this.infoService.findBy(data.id)
        for (const del of include) {
          const delData = await this.infoService.deleteByWhere({ id: del.id })
          console.log(delData)
        }
      }

      if (data.sub_project_facilities.length != 0) {
        for (let f of data.sub_project_facilities) {
          f.id === undefined ? f.id = uuidv4() : f.id
          f.sub_project_id === undefined ? f.sub_project_id = data.id : f.sub_project_id
          sub_project_facility.push(f.id)
          await this.facilityService.updateOrCreate(f, { id: f.id })
        }

        if (sub_project_facility.length != 0) {
          const exclude = await this.facilityService.exclude(data.id, sub_project_facility)
          for (const del of exclude) {
            const delData = await this.facilityService.deleteByWhere({ id: del.id })
            console.log(delData)
          }
        }
      } else {
        const include = await this.facilityService.findBy(data.id)
        for (const del of include) {
          const delData = await this.facilityService.deleteByWhere({ id: del.id })
          console.log(delData)
        }
      }
      return result
    }
    catch (e) {
      logger.error(e)
    }
  }
  async findById(id) {
    return this.Model.findOne({
      where: { id },
      include: [
        {
          model: SubProjectAdditionalInfo,
          include: [SubProjectAdditionalInfoDetail]

        },
        SubProjectFacility
      ]
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        logger.error(e);
        console.log(e);
      });
  }
}

module.exports = SubProjectDao;
