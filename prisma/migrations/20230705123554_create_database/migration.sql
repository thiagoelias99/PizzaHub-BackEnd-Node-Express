-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "value_per_unit" DECIMAL NOT NULL,
    "deleted_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "pizzas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "selling_price" DECIMAL NOT NULL,
    "deleted_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "pizzas_ingredients" (
    "pizza_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "ingredient_quantity" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("pizza_id", "ingredient_id"),
    CONSTRAINT "pizzas_ingredients_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pizzas_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
