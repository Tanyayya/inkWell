-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishedDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT;
