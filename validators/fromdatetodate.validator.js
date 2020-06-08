const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const FromDateToDateVal = {
  validate: async function (typeName, originalObject, materializedObject) {
    if (materializedObjec.from_date <= materializedObjec.to_date) {
      throw new FromDateToDateError(typeName);
    }
  },
};

class FromDateToDateError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be older than to_date",
      "Creation failed because to_date is older than from_date"
    );
  }
}

module.exports = {
  FromDateToDateVal,
};
