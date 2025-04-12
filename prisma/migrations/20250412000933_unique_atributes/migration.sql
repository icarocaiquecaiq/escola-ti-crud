/*
  Warnings:

  - A unique constraint covering the columns `[adventurousName]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MagicItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_adventurousName_key" ON "Character"("adventurousName");

-- CreateIndex
CREATE UNIQUE INDEX "MagicItem_name_key" ON "MagicItem"("name");
