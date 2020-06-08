const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deptemployeeFields = {
  empId: Schema.Types.ObjectId,
  deptId: Schema.Types.ObjectId,
  from_date: Date,
  to_date: Date,
};

const deptemployeeSchema = new Schema(deptemployeeFields);

const Deptemployee = mongoose.model("Deptemployee", deptemployeeSchema);
if (!Deptemployee.collection.collection) {
    Deptemployee.createCollection();
}
module.exports = { Deptemployee, deptemployeeFields };