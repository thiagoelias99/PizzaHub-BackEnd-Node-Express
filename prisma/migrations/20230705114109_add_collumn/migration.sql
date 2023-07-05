-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pizzas_ingredients" (
    "pizzaId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "ingredient_quantity" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("pizzaId", "ingredientId"),
    CONSTRAINT "pizzas_ingredients_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pizzas_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pizzas_ingredients" ("createdAt", "ingredientId", "pizzaId") SELECT "createdAt", "ingredientId", "pizzaId" FROM "pizzas_ingredients";
DROP TABLE "pizzas_ingredients";
ALTER TABLE "new_pizzas_ingredients" RENAME TO "pizzas_ingredients";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
