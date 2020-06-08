const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Deptemployee = require("../models/dept_employee").Deptemployee;

const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

const Employee = require("../models/employee").Employee;
const Department = require("../models/department").Department;
const EmployeeType = require("./employee");
const DepartmentType = require("./department");

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

const DeptemployeeType = new GraphQLObjectType({
  name: "DeptemployeeType",
  description: "Represent dpartment's employees",
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
      department: {
        type: DepartmentType,
        extensions: {
          relation: {
            connectionField: "deptId",
          },
        },
        resolve(parent, args) {
          return Department.findById(parent.deptId);
        },
      },
      from_date: { type: GraphQLDateTime },
      to_date: { type: GraphQLDateTime },
    }),
});

gnx.connect(Deptemployee, DeptemployeeType, "Deptemployee", "Deptemployees");

module.exports = DeptemployeeType;
