-- CreateTable
CREATE TABLE "users_token" (
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_token_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "users_token" ADD CONSTRAINT "users_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
