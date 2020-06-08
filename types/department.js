const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Department = require("../models/department").Department;

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

const { DeptNameVal } = require("../validators/department.validator");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent departments",
  extensions: {
    validations: {
      CREATE: [DeptNameVal],
      UPDATE: [DeptNameVal],
      DELETE: [],
    },
  },
  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      dept_name: { type: GraphQLString },
    }),
});

gnx.connect(Department, DepartmentType, "department", "departments");

module.exports = DepartmentType;