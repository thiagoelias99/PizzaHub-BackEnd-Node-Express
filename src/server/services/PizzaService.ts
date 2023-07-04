import { PizzaRepository } from "../../database/repository/PizzaRepository";
import { IPizzaCreate, IPizzaQueryProps } from "../../models/Pizza";

class PizzaService {

    async createRegister(pizza: IPizzaCreate) {
        return await PizzaRepository.create(pizza);
    }

    async getAll(query: IPizzaQueryProps) {
        return await PizzaRepository.read(query);         
    }

    async getById(id: string) {
        return await PizzaRepository.readById(id);
    }

    async update(id: string, pizza: IPizzaCreate) {
        return await PizzaRepository.update({ id, ...pizza });
    }

    async destroy(id: string) {
        return await PizzaRepository.destroy(id);
    }
}

export { PizzaService };