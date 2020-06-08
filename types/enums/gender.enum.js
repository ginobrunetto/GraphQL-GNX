const graphql = require('graphql');

const {
  GraphQLEnumType,
} = graphql;

const GenderType = new GraphQLEnumType({
  name: 'GenderType',
  values: {
    M: {
      value: 'Masculine',
    },
    F: {
      value: 'Femenine',
    }
  },
});

module.exports = GenderType;
