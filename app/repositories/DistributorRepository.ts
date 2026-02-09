import {
  CreateDistributorInput,
  DistributorDTO,
  UpdateDistributorInput,
} from "../domain/distributor/distributorTypes";
import { prisma } from "../lib/prisma";
import { interfaceDistributor } from "./InterfaceDistributor";

export class DistibutorRepository implements interfaceDistributor {
  async findAll(): Promise<DistributorDTO[]> {
    return prisma.distributor.findMany();
  }

  async findByd(id: string): Promise<DistributorDTO> {
    return prisma.distribtor.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateDistributorInput): Promise<DistributorDTO> {
    return prisma.distributor.create(data);
  }

  async update(
    id: string,
    data: UpdateDistributorInput,
  ): Promise<DistributorDTO> {
    return prisma.distributor.update({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.distributor.delete({
      where: { id },
    });
  }
}
