-- CreateTable
CREATE TABLE "userData" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dataImage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userData" ADD CONSTRAINT "userData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
