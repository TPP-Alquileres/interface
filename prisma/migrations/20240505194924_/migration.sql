/*
  Warnings:

  - You are about to drop the column `ammount` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "tenantId" INTEGER,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Contract_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Contract" ("createdAt", "description", "documentUrl", "endDate", "id", "ownerId", "startDate", "tenantId", "updatedAt") SELECT "createdAt", "description", "documentUrl", "endDate", "id", "ownerId", "startDate", "tenantId", "updatedAt" FROM "Contract";
DROP TABLE "Contract";
ALTER TABLE "new_Contract" RENAME TO "Contract";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
