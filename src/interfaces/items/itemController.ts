import * as Hapi from "@hapi/hapi";
import { Item } from './item';

let items: Item[] = [];
let idCounter = 1;

export class ItemController {
    async getAll(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        return h.response(items).code(200);
    }

    async create(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const { name, price } = request.payload as { name: string, price: number };

        if (price === undefined) {
            return h.response({
                errors: [{ field: 'price', message: 'Field "price" is required' }]
            }).code(400);
        }

        if (price < 0) {
            return h.response({
                errors: [{ field: 'price', message: 'Field "price" cannot be negative' }]
            }).code(400);
        }

        const newItem: Item = { id: idCounter++, name, price };
        items.push(newItem);

        return h.response(newItem).code(201);
    }

    async getById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const id = parseInt(request.params.id);
        const item = items.find(i => i.id === id);

        if (!item) {
            return h.response().code(404);
        }

        return h.response(item).code(200);
    }

    async update(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const id = parseInt(request.params.id);
        const { name, price } = request.payload as { name: string, price: number };

        if (price < 0) {
            return h.response({
                errors: [{ field: 'price', message: 'Field "price" cannot be negative' }]
            }).code(400);
        }

        const item = items.find(i => i.id === id);

        if (!item) {
            return h.response().code(404);
        }

        item.name = name;
        item.price = price;

        return h.response(item).code(200);
    }

    async delete(request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const id = parseInt(request.params.id);
        const index = items.findIndex(i => i.id === id);

        if (index === -1) {
            return h.response().code(404);
        }

        items.splice(index, 1);
        return h.response().code(204);
    }
}
