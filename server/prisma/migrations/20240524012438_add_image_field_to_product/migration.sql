-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" BYTEA,
ALTER COLUMN "imageUrl" DROP NOT NULL;
