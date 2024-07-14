-- CreateTable
CREATE TABLE "RealTimePost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "likes" TEXT[],

    CONSTRAINT "RealTimePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRealTimePosts" (
    "userId" TEXT NOT NULL,
    "realTimePostId" TEXT NOT NULL,

    CONSTRAINT "UserRealTimePosts_pkey" PRIMARY KEY ("userId","realTimePostId")
);

-- AddForeignKey
ALTER TABLE "UserRealTimePosts" ADD CONSTRAINT "UserRealTimePosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRealTimePosts" ADD CONSTRAINT "UserRealTimePosts_realTimePostId_fkey" FOREIGN KEY ("realTimePostId") REFERENCES "RealTimePost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
