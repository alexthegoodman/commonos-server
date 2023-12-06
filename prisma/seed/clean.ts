import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function clean() {
  // await prisma
  //   .raw(
  //     `
  //   SELECT
  //     *
  //   FROM
  //     pg_catalog.pg_tables
  //   WHERE
  //     schemaname != 'pg_catalog'
  //   AND schemaname != 'information_schema';
  // `
  //   )
  //   .then((data) => {
  //     console.info("data", data);
  //   });

  // await prisma.raw("TRUNCATE AnnotationMeta;");

  await prisma.type.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.flow.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.drawing.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.presentation.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.sheet.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.sound.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.video.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.document.deleteMany({
    where: { id: { not: "" } },
  });
  await prisma.user.deleteMany({
    where: { id: { not: "" } },
  });
}

clean()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.info("cleaned only");
  });
