DELETE FROM "Items";
DELETE FROM "InventoryItems";
ALTER TABLE "Items" ADD COLUMN category VARCHAR(255);
COPY "Items" FROM 'items.csv' DELIMITER ',' CSV;
\copy "Items" from '/Users/rkpandey/Documents/neighbor-cook/items.csv' DELIMITER ',' CSV;

# 03/02/2014
ALTER TABLE "Histories" ADD COLUMN initiator VARCHAR(16);