-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagicItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemType" TEXT NOT NULL DEFAULT 'GUN',
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "ownerId" INTEGER,
    CONSTRAINT "MagicItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MagicItem" ("defense", "id", "itemType", "name", "ownerId", "strength") SELECT "defense", "id", "itemType", "name", "ownerId", "strength" FROM "MagicItem";
DROP TABLE "MagicItem";
ALTER TABLE "new_MagicItem" RENAME TO "MagicItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
