//khusus ke database tidak peduli business rule / validasi dan lain-lain
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export function findAllProductsRepo() {
  return prisma.product.findMany({
    orderBy: { id: "asc" },
  });
}

export function findProductByIdRepo(id: number) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export function createProductRepo(data: Prisma.ProductCreateInput) {
  return prisma.product.create({ data });
}

export function updateProductRepo(id: number, data: Prisma.ProductUpdateInput) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export function deleteProductRepo(id: number) {
  return prisma.product.delete({
    where: { id },
  });
}
