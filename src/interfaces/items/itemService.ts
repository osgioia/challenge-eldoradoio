import { PrismaClient } from "@prisma/client";
import { Item } from "./item";
import Boom from "@hapi/boom";

export class ItemService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async create(theDto: Item): Promise<Item> {
        try {
            return await this.prisma.item.create({
                data: {
                    ...theDto
                }
            });
        } catch (error) {
            console.error('Error creating item:', error);
            throw Boom.badImplementation('Failed to create item');
        }
    }

    public async getById(id: number): Promise<Item | null> {
        try {
            const item = await this.prisma.item.findUnique({
                where: { id }
            });
            if (!item) {
                throw Boom.notFound(`Item with id ${id} not found`);
            }
            return item;
        } catch (error) {
            if (!Boom.isBoom(error)) {
                console.error(`Error getting item with id ${id}:`, error);
                throw Boom.badImplementation('Failed to retrieve item');
            }
            throw error;
        }
    }

    public async getAll(): Promise<Item[]> {
        try {
            return await this.prisma.item.findMany();
        } catch (error) {
            console.error('Error getting all items:', error);
            throw Boom.badImplementation('Failed to retrieve items');
        }
    }

    public async update(theDto: Item, id: number): Promise<Item> {
        try {
            const updatedItem = await this.prisma.item.update({
                where: { id },
                data: { ...theDto }
            });
            if (!updatedItem) {
                throw Boom.notFound(`Item with id ${id} not found`);
            }
            return updatedItem;
        } catch (error) {
            if (!Boom.isBoom(error)) {
                console.error(`Error updating item with id ${id}:`, error);
                throw Boom.badImplementation('Failed to update item');
            }
            throw error;
        }
    }

    public async delete(id: number): Promise<Item> {
        try {
            const deletedItem = await this.prisma.item.delete({
                where: { id }
            });
            if (!deletedItem) {
                throw Boom.notFound(`Item with id ${id} not found`);
            }
            return deletedItem;
        } catch (error) {
            if (!Boom.isBoom(error)) {
                console.error(`Error deleting item with id ${id}:`, error);
                throw Boom.badImplementation('Failed to delete item');
            }
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}
