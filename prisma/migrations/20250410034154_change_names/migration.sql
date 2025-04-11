/*
  Warnings:

  - You are about to drop the column `defence` on the `MagicItem` table. All the data in the column will be lost.
  - Added the required column `defense` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strength` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `MagicItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adventurousName" TEXT NOT NULL,
    "class" TEXT NOT NULL DEFAULT 'WARRIOR',
    "level" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL
);
INSERT INTO "new_Character" ("adventurousName", "class", "id", "level", "name") SELECT "adventurousName", "class", "id", "level", "name" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE TABLE "new_MagicItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "ownerId" INTEGER,
    CONSTRAINT "MagicItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MagicItem" ("id", "itemType", "name", "ownerId", "strength") SELECT "id", "itemType", "name", "ownerId", "strength" FROM "MagicItem";
DROP TABLE "MagicItem";
ALTER TABLE "new_MagicItem" RENAME TO "MagicItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
