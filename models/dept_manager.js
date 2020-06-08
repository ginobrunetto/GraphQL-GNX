const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptmanagerFields = {
  empId: Schema.Types.ObjectId,
  deptId: Schema.Types.ObjectId,
  from_date: Date,
  to_date: Date,
};

const deptmanagerSchema = new Schema(deptmanagerFields);

const Deptmanager = mongoose.model("Deptmanager", deptmanagerSchema);
if (!Deptmanager.collection.collection) {
    Deptmanager.createCollection();
}
module.exports = { Deptmanager, deptmanagerFields };