-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adventurousName" TEXT NOT NULL,
    "class" TEXT NOT NULL DEFAULT 'WARRIOR',
    "level" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "defence" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "MagicItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
