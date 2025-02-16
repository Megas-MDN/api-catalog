-- CreateTable
CREATE TABLE "user" (
    "idUser" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "imageProfile" VARCHAR(300),
    "isFromGoogle" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "store" (
    "idStore" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "description" TEXT,
    "adress" VARCHAR(300),
    "coordinates" VARCHAR(300),
    "imageProfile" VARCHAR(300),
    "imageCoverProfile" VARCHAR(300),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "store_pkey" PRIMARY KEY ("idStore")
);

-- CreateTable
CREATE TABLE "userStore" (
    "idUser" INTEGER NOT NULL,
    "idStore" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "catalog" (
    "idCatalog" SERIAL NOT NULL,
    "idStore" INTEGER NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "catalog_pkey" PRIMARY KEY ("idCatalog")
);

-- CreateTable
CREATE TABLE "product" (
    "idProduct" SERIAL NOT NULL,
    "idCatalog" INTEGER NOT NULL,
    "name" TEXT,
    "brand" TEXT,
    "barcode" TEXT,
    "price" DECIMAL(65,30) DEFAULT 0,
    "priceAcquisition" DECIMAL(65,30) DEFAULT 0,
    "qtd" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("idProduct")
);

-- CreateTable
CREATE TABLE "catalogProduct" (
    "idCatalog" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tag" (
    "idTag" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tag_pkey" PRIMARY KEY ("idTag")
);

-- CreateTable
CREATE TABLE "productTag" (
    "idProduct" INTEGER NOT NULL,
    "idTag" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "image" (
    "idImage" SERIAL NOT NULL,
    "src" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "image_pkey" PRIMARY KEY ("idImage")
);

-- CreateTable
CREATE TABLE "productImage" (
    "idImage" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userStore_idUser_idStore_key" ON "userStore"("idUser", "idStore");

-- CreateIndex
CREATE UNIQUE INDEX "catalogProduct_idProduct_idCatalog_key" ON "catalogProduct"("idProduct", "idCatalog");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productTag_idProduct_idTag_key" ON "productTag"("idProduct", "idTag");

-- CreateIndex
CREATE UNIQUE INDEX "image_src_key" ON "image"("src");

-- CreateIndex
CREATE UNIQUE INDEX "productImage_idProduct_idImage_key" ON "productImage"("idProduct", "idImage");

-- AddForeignKey
ALTER TABLE "userStore" ADD CONSTRAINT "userStore_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStore" ADD CONSTRAINT "userStore_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "store"("idStore") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog" ADD CONSTRAINT "catalog_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "store"("idStore") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_idCatalog_fkey" FOREIGN KEY ("idCatalog") REFERENCES "catalog"("idCatalog") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogProduct" ADD CONSTRAINT "catalogProduct_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogProduct" ADD CONSTRAINT "catalogProduct_idCatalog_fkey" FOREIGN KEY ("idCatalog") REFERENCES "catalog"("idCatalog") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productTag" ADD CONSTRAINT "productTag_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productTag" ADD CONSTRAINT "productTag_idTag_fkey" FOREIGN KEY ("idTag") REFERENCES "tag"("idTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_idImage_fkey" FOREIGN KEY ("idImage") REFERENCES "image"("idImage") ON DELETE RESTRICT ON UPDATE CASCADE;
