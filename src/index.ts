import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers, ContextValue, ReqresDataSource } from './reqres.js';

import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    cache: new InMemoryLRUCache(),
    plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 30 }), responseCachePlugin()],
});

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                reqres: new ReqresDataSource({ cache }),
            },
        };
    },
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);