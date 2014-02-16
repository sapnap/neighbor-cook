DELETE FROM "Items";
DELETE FROM "InventoryItems";
ALTER TABLE "Items" ADD COLUMN category VARCHAR(255);
COPY "Items" FROM 'items.csv' DELIMITER ',' CSV;
