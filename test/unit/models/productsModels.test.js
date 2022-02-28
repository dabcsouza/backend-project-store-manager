const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Testa a Camada Model para products', () => {
  describe('Testa se ao fazer um get em /products, a rota retorna', () => {
    before(async () => {
      const expectReturn = [
        {
            id: 1,
            name: 'Martelo de Thor',
            quantity: 10,
        },
        {
            id: 2,
            name: 'Traje de encolhimento',
            quantity: 20,
        },
        {
            id: 3,
            name: 'Escudo do Capitão América',
            quantity: 30,
        },
    ];
    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.a('object');
    });

    it('retorna um array de objetos', async ()=> {
      const result = await productsModel.getAll();
      for(let i = 0; i < result.length; i += 1) {
        expect(result[i]).to.be.a('object');
      }
    });
  });

  describe('Testa se ao fazer uma consulta por nome, a função retorna', () => {
    before(async () => {
      const expectReturn = [
        {
            id: 1,
            name: 'Martelo de Thor',
            quantity: 10,
        }
    ];
    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const result = await productsModel.getByName('Martelo de Thor');
      expect(result).to.be.a('object');
    });
  });

  describe('Testa se ao fazer um get em /products/:id',
  () => {
    before(async () => {
      const expectReturn = [
        {
            id: 1,
            name: 'Martelo de Thor',
            quantity: 10,
        }
    ];

    sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.be.a('object');
    });

    it('Retorna um o id passado na rota', async () => {
      const result = await productsModel.getById(1);
      expect(result.id).to.be.equal(1);
    });

    it('Retorna o nome do produto', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.have.property('name');
    });
  });

  describe('Testa se ao fazer um put em /products', () => {
    const requestBody = {
      name: 'produto',
      quantity: 10,
    };

    before(async () => {
      const expectReturn = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna o id do produto atualizado.', async () => {
      const result = await productsModel.update(requestBody);
      expect(result.insertId).to.be.a('number');
    });
  });
  describe('Testa se ao fazer um post em /products', () => {
    const requestBody = {
      name: 'produto',
      quantity: 10,
    };

    before(async () => {
      const expectReturn = [{ insertId: 3 }];
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna o id do produto cadastrado.', async () => {
      const result = await productsModel.create(requestBody);
      expect(result).to.be.a('number');
    });
  });

  describe('testa se é possível excluir um produto', () => {
    before(async () => {
      const expectReturn = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(expectReturn);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('e tem como retorno a quantidade de linhas afetadas.', async () => {
      const result = await productsModel.exclude(1);
      expect(result).to.be.equal(1);
    });
  });
});

