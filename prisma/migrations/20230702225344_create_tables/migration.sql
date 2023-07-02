-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "pizzas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "pizzas_ingredients" (
    "pizzaId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("pizzaId", "ingredientId"),
    CONSTRAINT "pizzas_ingredients_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizzas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pizzas_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
