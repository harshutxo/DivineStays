import { PrismaClient } from "@prisma/client";
import { properties } from "../app/data";

const prisma = new PrismaClient();

async function main() {
  for (const [index, p] of properties.entries()) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        address: p.address,
        area: p.area,
        near: p.near,
        tag: p.tag,
        description: p.description,
        features: p.features,
        mapQuery: `${p.address}`,
        sortOrder: index,
      },
      create: {
        slug: p.slug,
        name: p.name,
        address: p.address,
        area: p.area,
        near: p.near,
        tag: p.tag,
        description: p.description,
        features: p.features,
        mapQuery: `${p.address}`,
        verified: true,
        isPublished: true,
        sortOrder: index,
      },
    });
  }
  console.log(`Seeded ${properties.length} properties.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
