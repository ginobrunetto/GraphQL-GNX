const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Employee = require("../models/employee").Employee;

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

const {
  CantRepeatDni,
  MustBeOlderThanEighteen,
} = require("../validators/employee.validator");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = graphql;

const GenderType = require("./enums/gender.enum");

const graphqlIsoDate = require("graphql-iso-date");
const { GraphQLDate } = graphqlIsoDate;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represent employees",
  extensions: {
    validations: {
      CREATE: [CantRepeatDni, MustBeOlderThanEighteen],
      UPDATE: [CantRepeatDni, MustBeOlderThanEighteen],
      DELETE: [],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      dni: { type: GraphQLInt },
      birth_date: { type: GraphQLDate },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      gender: { type: GenderType },
      hire_date: { type: GraphQLDate },
    }),
});

gnx.connect(Employee, EmployeeType, "employee", "employees");

module.exports = EmployeeType;
