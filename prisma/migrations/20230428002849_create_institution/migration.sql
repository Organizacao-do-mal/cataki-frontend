-- CreateTable
CREATE TABLE "Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "street" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "complement" TEXT,
    "zipCode" TEXT NOT NULL,
    "image" TEXT,
    "lat" INTEGER,
    "lng" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
