-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokenResetPassword" TEXT,
ADD COLUMN     "tokenResetPasswordExpira" TIMESTAMP(3),
ADD COLUMN     "tokenVerificacion" TEXT,
ADD COLUMN     "tokenVerificacionExpira" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenVerificacion_key" ON "users"("tokenVerificacion");

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenResetPassword_key" ON "users"("tokenResetPassword");
