const { Record } = require('../models');

class RecordService {
  constructor(model) {
    this.model = model;
  }

  /**
   * @desc An asynchronous function that talks to 'records' collection in the database
   * to filter documents using MongoDB's aggregate framework. The filtering steps are;
   *  1 - `$match` to filter documents by createdAt field and used as a first stage to optimize the query performance,
   *  2 - `$addFields` to add a field that contains total count value calculated from counts array items,
   *  3 - `$match` to filter documents by totalCount value,
   *  4 - `$project` to select required fields.
   * @param {object} object An object containing filter keys
   * @returns Mongoose's aggregate object 
   */
  async findByDateAndTotalCount({ startDate, endDate, minCount, maxCount }) {
    return this.model.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
      },
      {
        $addFields: {
          totalCount: { $sum: "$counts" }
        }
      },
      {
        $match: {
          totalCount: { $gte: minCount, $lte: maxCount }
        }
      },
      {
        $project: {
          '_id': 0,
          value: 0,
          counts: 0
        }
      }
    ]);
  }
}

module.exports = new RecordService(Record);