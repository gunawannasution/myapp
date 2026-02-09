import {
  CreateDistributorInput,
  DistributorDTO,
  UpdateDistributorInput,
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

  async create(input: CreateDistributorInput): Promise<DistributorDTO> {
    return this.repo.create(input);
  }

  async update(
    id: String,
    input: UpdateDistributorInput,
  ): Promise<DistributorDTO> {
    return this.repo.update(id, input);
  }
  async remove(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
