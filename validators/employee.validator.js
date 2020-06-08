const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee");

const CantRepeatDni = {
  validate: async function (typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({
      name: materializedObject.dni,
    });

    if (EmployeeFinded && EmployeeFinded._id != materializedObject.id) {
      throw new DniUsedError(typeName);
    }
  },
};

class DniUsedError extends GNXError {
  constructor(typeName) {
    super(typeName, "Dni cant be repeated", "Cant use Dni twice");
  }
}

const MustBeOlderThanEighteen = {
  validate: async function (typeName, originalObject, materializedObject) {
    function calculateAge(birthday) {
      var ageDif = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDif);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    const age = calculateAge(materializedObject.birth_date);

    if (age && age < 18) {
      throw new NotOldEnoughtError(typeName);
    }
  },
};

class NotOldEnoughtError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employee must be older than 18",
      "Employee is not old enought"
    );
  }
}

module.exports = {
  CantRepeatDni,
  MustBeOlderThanEighteen,
};