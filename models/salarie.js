const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salarieFields = {
  empId: Schema.Types.ObjectId,
  salary: Number,
  from_date: Date,
  to_date: Date,
};

const salarieSchema = new Schema(salarieFields);

const Salarie = mongoose.model("Salarie", salarieSchema);
if (!Salarie.collection.collection) {
  Salarie.createCollection();
}
module.exports = { Salarie, salarieFields };