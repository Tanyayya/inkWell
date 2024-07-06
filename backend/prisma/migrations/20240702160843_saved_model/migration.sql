-- CreateTable
CREATE TABLE "Saved" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "Saved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_post_fkey" FOREIGN KEY ("post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
