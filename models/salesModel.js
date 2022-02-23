const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT t1.sale_id saleId, t2.date date,
  t1.product_id productId, t1.quantity
  FROM StoreManager.sales_products t1
  INNER JOIN StoreManager.sales t2
  ON t1.sale_id = t2.id
  ORDER BY saleId;`;

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT t2.date date,
  t1.product_id productId, t1.quantity
  FROM StoreManager.sales_products t1
  INNER JOIN StoreManager.sales t2
  ON t1.sale_id = t2.id AND t1.sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = { getAll, getById };
