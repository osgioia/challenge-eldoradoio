import { ItemController } from "./itemController";
import * as Hapi from "@hapi/hapi";

const controller = new ItemController();

const itemRoutes = {
    name: "items",
    register: async (server: Hapi.Server) => {
        server.route([
            {
                method: 'GET',
                path: '/items',
                handler: controller.getAll,
                options: {
                    tags: ['api']
                }
            },
            {
                method: 'POST',
                path: '/items',
                handler: controller.create,
                options: {
                    tags: ['api']
                }
            },
            {
                method: 'GET',
                path: '/items/{id}',
                handler: controller.getById,
                options: {
                    tags: ['api']
                }
            },
            {
                method: 'PUT',
                path: '/items/{id}',
                handler: controller.update,
                options: {
                    tags: ['api']
                }
            },
            {
                method: 'DELETE',
                path: '/items/{id}',
                handler: controller.delete,
                options: {
                    tags: ['api']
                }
            }
        ]);
    }
}

export default itemRoutes;
