import {
  CreateDistributorInput,
  DistributorDTO,
  UpdateDistributorInput,
} from "../domain/distributor/distributorTypes";
import { prisma } from "../lib/prisma";
import { DistributorRepositoryInterface } from "./DistributorRepositoryInterface";

export class DistributorRepository implements DistributorRepositoryInterface {
  async findAll(): Promise<DistributorDTO[]> {
    return prisma.distributor.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findById(id: string): Promise<DistributorDTO | null> {
    return prisma.distributor.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async create(data: CreateDistributorInput): Promise<DistributorDTO> {
    return prisma.distributor.create({
      data: { name: data.name },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateDistributorInput,
  ): Promise<DistributorDTO> {
    return prisma.distributor.update({
      where: { id },
      data: { name: data.name },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.distributor.delete({ where: { id } });
  }
}
