const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Title = require("../models/title").Title;

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

const Employee = require("../models/employee").Employee;
const EmployeeType = require("./employee");

const { FromDateToDateVal } = require("../validators/fromdatetodate.validator");

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

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represent titles",
  extensions: {
    validations: {
      CREATE: [FromDateToDateVal],
      UPDATE: [FromDateToDateVal],
      DELETE: [],
    },
  },
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
      title: { type: GraphQLString },
      from_date: { type: GraphQLDateTime },
      to_date: { type: GraphQLDateTime },
    }),
});

gnx.connect(Title, TitleType, "title", "titles");

module.exports = TitleType;
