import {
  CreateDistributorInput,
  DistributorDTO,
} from "../domain/distributor/distributorTypes";
import { interfaceDistributor } from "../repositories/InterfaceDistributor";

export class DistributorServices {
  constructor(private repo: interfaceDistributor) {}

  async getAll(): Promis<DistributorDTO[]> {
    return this.repo.findAll();
  }

  async getById(id: string): Promise<DistributorDTO | null> {
    return this.repo.findById(id);
  }

  async create(form: { name: string }): Promise<DistributorDTO> {
    const payload: CreateDistributorInput = {
      name: form.name,
    };
    return this.repo.create(payload);
  }

  async update(id: string, form: { name: string }): Promise<DistributorDTO> {
    return this.repo.update(id, { name: form.name });
  }

  async remove(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
