import { IPizza, IPizzaCreate, IPizzaQueryProps } from "../../models/Pizza";

import { dao } from "../prisma/dao/PizzaDAO";

class PizzaRepository {

    static async create(pizza: IPizzaCreate) {
        return await dao.create(pizza);
    }

    static async read(query: IPizzaQueryProps) {
        return await dao.read(query);
    }

    static async readById(id: string) {
        return await dao.readById(id);
    }

    static async update(pizza: IPizza) {
        return await dao.update(pizza);
    }

    static async destroy(id: string) {
        return await dao.destroy(id);
    }
}

export { PizzaRepository };