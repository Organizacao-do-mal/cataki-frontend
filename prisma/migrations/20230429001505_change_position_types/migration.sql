-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Institution" (
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
    "lat" TEXT,
    "lng" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Institution" ("complement", "createdAt", "description", "email", "houseNumber", "id", "image", "lat", "lng", "name", "password", "street", "zipCode") SELECT "complement", "createdAt", "description", "email", "houseNumber", "id", "image", "lat", "lng", "name", "password", "street", "zipCode" FROM "Institution";
DROP TABLE "Institution";
ALTER TABLE "new_Institution" RENAME TO "Institution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
