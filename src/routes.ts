import { Server } from "@hapi/hapi";
import itemRoutes from './interfaces/items/itemRoutes';

export const defineRoutes = async (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            };
        }
    });

    await server.register(itemRoutes);
};
