import {
  CreateDistributorInput,
  DistributorDTO,
  UpdateDistributorInput,
} from "../domain/distributor/distributorTypes";
export interface interfaceDistributor {
  findAll(): Promise<DistributorDTO[]>;
  findById(id: string): Promise<DistributorDTO | null>;
  create(data: CreateDistributorInput): Promise<DistributorDTO>;
  update(id: string, data: UpdateDistributorInput): Promise<DistributorDTO>;
  delete(id: string): Promise<void>;
}
