import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import casual from 'casual';

const typeDefs = [
  readFileSync(resolve(__dirname, 'schema.gql')).toString(),
];

// const schemaString = fs.readFileSync('./data/schema.gql', 'utf8');

const executableSchema = makeExecutableSchema({
  typeDefs,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: {
    Person() {
      return {
        id: casual.integer,
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
      };
    },
    BaseUserSummary() {
      return {
        id: casual.integer,
        firstName: casual.first_name,
        lastName: casual.last_name,
        email: casual.email,
      };
    },
    Address() {
      return {
        streetAddressLine1: casual.address1,
        streetAddressLine2: casual.address2,
        city: casual.city,
        stateCode: casual.stateAbbr,
        postalCode: casual.zip,
      };
    },
    Plan() {
      return {
        id: casual.integer,
        name: casual.word,
      };
    },
    Sponsor() {
      return {
        id: casual.integer,
        name: casual.company_name,
      };
    },
  },
});

export default executableSchema;
