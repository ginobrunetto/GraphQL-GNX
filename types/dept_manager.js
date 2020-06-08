const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Deptmanager = require("../models/dept_manager").Deptmanager;

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

const DeptmanagerType = new GraphQLObjectType({
  name: "DeptmanagerType",
  description: "Represent department managers",
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
      manager: {
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

gnx.connect(Deptmanager, DeptmanagerType, "deptmanager", "deptmanagers");

module.exports = DeptmanagerType;
