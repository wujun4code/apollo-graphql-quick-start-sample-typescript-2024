import { RESTDataSource } from '@apollo/datasource-rest';

export class ReqresDataSource extends RESTDataSource {
    override baseURL = 'https://reqres.in';

    listUsers = async (page: number) => {
        if (!page) page = 1;
        const response = await this.get(`/api/users`, {
            params: {
                page: page.toString(),
            },
        });
        return response.data;
    }
}

export interface ContextValue {
    dataSources: {
        reqres: ReqresDataSource;
    };
}

export const cacheDefs = `#graphql

`;

export const typeDefs = `#graphql
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type User {
    id: Int!
    email: String!
    first_name: String!
    last_name: String!
    avatar: String!
  }

  type Query {
    users(page: Int!): [User!]!
  }
`;


export const resolvers = {
    Query: {
        users: async (parent, args, { dataSources }, info) => {
            return dataSources.reqres.listUsers(args.page);
        },
    },
}