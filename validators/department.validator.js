const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Department } = require("../models/department");

const DeptNameVal = {
  validate: async function (typeName, originalObject, materializedObject) {
    const departmentFinded = await Department.findOne({
      name: materializedObject.name,
    });

    if (departmentFinded && departmentFinded._id != materializedObject.id) {
      throw new DeptNameError(typeName);
    }
  },
};

class DeptNameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Dept name duplicated",
      "Creation failed due duplicated name"
    );
  }
}

module.exports = {
  DeptNameVal,
};
