const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const getByName = async (name) => {
  const checkName = name.toLowerCase();
  const query = `SELECT id, name, quantity
  FROM StoreManager.products
  WHERE lower(name) = ?;`;
  const [result] = await connection.execute(query, [checkName]);
  return result;
};

const create = async ({ name, quantity }) => {
  const query = `INSERT INTO StoreManager.products (name, quantity) VALUES
  (?, ?)`;
  const [result] = await connection.execute(query, [name, quantity]);
  return result.insertId;
};

const update = async ({ id, name, quantity }) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
};

const exclude = async (id) => {
  const query = `DELETE FROM StoreManager.products
  WHERE id = ?;`;
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

module.exports = { getAll, getById, getByName, create, update, exclude };
