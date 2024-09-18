import Hapi from '@hapi/hapi';
import prisma from './plugins/prisma';
import { defineRoutes } from './routes';

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    });
    return server;
};

export const initializeServer = async () => {
    const server = getServer();

    await server.register([prisma]);

    await defineRoutes(server);

    await server.initialize();
    return server;
};

export const startServer = async () => {
    const server = getServer();

    await server.register([prisma]);

    await defineRoutes(server);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};
