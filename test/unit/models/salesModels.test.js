const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Testa a Camada Model para products', () => {
  describe('Testa se ao fazer um get em /sales, a rota retorna', () => {
    before(async () => {
      const expectReturn = [
        {
            "saleId": 1,
            "date": "2022-02-28T15:31:03.000Z",
            "productId": 1,
            "quantity": 5
        },
        {
            "saleId": 1,
            "date": "2022-02-28T15:31:03.000Z",
            "productId": 2,
            "quantity": 10
        },
        {
            "saleId": 2,
            "date": "2022-02-28T15:31:03.000Z",
            "productId": 3,
            "quantity": 15
        }
    ]
    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.a('object');
    });

    it('retorna um array de objetos', async ()=> {
      const result = await salesModel.getAll();
      for(let i = 0; i < result.length; i += 1) {
        expect(result[i]).to.be.a('object');
      }
    });
  });

  describe('Testa se ao fazer um get em /sales/:id',
  () => {
    before(async () => {
      const expectReturn = [
        {
            "date": "2022-02-28T15:31:03.000Z",
            "productId": 1,
            "quantity": 5
        },
        {
            "date": "2022-02-28T15:31:03.000Z",
            "productId": 2,
            "quantity": 10
        }
    ]

    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.a('object');
    });

    it('Possuem as propriedades date, productId, quantity', async () => {
      const result = await salesModel.getById(1);
      for(let i = 0; i < result.length; i += 1) {
        expect(result[i]).to.have.property('date');
        expect(result[i]).to.have.property('productId');
        expect(result[i]).to.have.property('quantity');
      }
    });
  });

  describe('Testa se é possível cadastrar uma venda',
  () => {
    before(async () => {
      const expectReturn = [{ insertId: 3 }]

    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna o Id da venda cadastrada.', async () => {
      const [result] = await salesModel.createSale();
      expect(result.insertId).to.be.a('number');
    });
  });

  describe('Testa se é possível registrar uma venda',
  () => {
    const requestBody ={
        id: 1,
        productId: 1,
        quantity: 6
    };

    before(async () => {
      const expectReturn = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna o a quantidade de linhas afetas.', async () => {
      const result = await salesModel.registerSales(requestBody);
      expect(result.affectedRows).to.be.a('number');
    });
  });

  describe('Verifica se é possível deletar o produto de uma venda', () => {

    before(async () => {
      const expectReturn = undefined;
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('ao chamar a função deleteSalesProducts', async () => {
      const response = await salesModel.deleteSalesProducts(1);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('Verifica se é possível deletar uma venda', () => {

    before(async () => {
      const expectReturn = undefined;
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('ao chamar a função deleteSale', async () => {
      const response = await salesModel.deleteSale(1);
      expect(response).to.be.equal(undefined);
    });
  });
});

