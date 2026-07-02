-- DropIndex
DROP INDEX "orders_stripePaymentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripePaymentId_productId_key" ON "orders"("stripePaymentId", "productId");

