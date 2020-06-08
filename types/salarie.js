const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Salarie = require("../models/salarie").Salarie;

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

const Employee = require("../models/employee").Employee;
const EmployeeType = require("./employee");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = graphql;

const graphqlIsoDate = require("graphql-iso-date");
const { GraphQLDateTime } = graphqlIsoDate;

const SalarieType = new GraphQLObjectType({
  name: "SalarieType",
  description: "Represent salaries",

  fields: () =>
    Object.assign(AuditableObjectFields, {
      id: { type: GraphQLID },
      employee: {
        type: EmployeeType,
        extensions: {
          relation: {
            connectionField: "empId",
          },
        },
        resolve(parent, args) {
          return Employee.findById(parent.empId);
        },
      },
      salary: { type: GraphQLInt },
      from_date: { type: GraphQLDateTime },
      to_date: { type: GraphQLDateTime },
    }),
});

gnx.connect(Salarie, SalarieType, "salarie", "salaries");

module.exports = SalarieType;
