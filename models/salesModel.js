const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT t1.sale_id saleId, t2.date date,
  t1.product_id productId, t1.quantity
  FROM StoreManager.sales_products AS t1
  INNER JOIN StoreManager.sales AS t2
  ON t1.sale_id = t2.id
  ORDER BY saleId;`;

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT t2.date AS date,
  t1.product_id AS productId, t1.quantity AS quantity
  FROM StoreManager.sales_products AS t1
  INNER JOIN StoreManager.sales AS t2
  ON t1.sale_id = t2.id AND t1.sale_id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUE (NOW())';
  const result = await connection.execute(query);
  return result;
};

const registerSales = async ({ productId, quantity, id }) => {
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity)
  VALUE (?, ?, ?)`;
  const [response] = await connection.execute(query, [id, productId, quantity]);
  console.log(response);
  return response;
};

const deleteSalesProducts = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  createSale,
  registerSales,
  deleteSalesProducts,
};
