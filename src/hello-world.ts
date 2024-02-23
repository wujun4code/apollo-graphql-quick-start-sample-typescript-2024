
export const typeDefs = `#graphql
  type Demo {
    foo: String!
    bar: Int!
  }

  type Query {
    demos: [Demo]!
  }
`;

const demos = [
    { foo: "hello world!", bar: 1 },
    { foo: "hello apollo!", bar: 2 },
    { foo: "hello graphql!", bar: 3 },
];

export const resolvers = {
    Query: {
        demos: () => demos,
    },
}