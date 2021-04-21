import express from 'express';
import { accountModel } from '../models/accountModel.js';
const accountRouter = express();

//4
accountRouter.post('/account', async (req, res) => {
  try {
    const accountDB = await accountModel.find(
      { conta: req.body.conta, agencia: req.body.agencia },
      {}
    );

    if (accountDB.length === 0) {
      res.status(404).send('Agência e conta não encontradas!');
    }

    if (!req.body.valor) {
      res.status(404).send('Parâmetro Valor não encontrado!');
    }

    const accountAux = accountDB[0];
    accountAux.balance += parseInt(req.body.valor);

    const accountSave = new accountModel(accountAux);
    await accountSave.save();
    res.send(accountSave);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//5
accountRouter.patch('/account', async (req, res) => {
  try {
    const accountDB = await accountModel.find(
      { conta: req.body.conta, agencia: req.body.agencia },
      {}
    );

    if (accountDB.length === 0) {
      res.status(404).send('Agência e conta não encontradas!');
    }
    if (!req.body.valor) {
      res.status(404).send('Parâmetro Valor não encontrado!');
    }
    const accountAux = accountDB[0];

    if (accountAux.balance < parseInt(req.body.valor) + 1) {
      //desconta valor e tarifa
      res.status(404).send('Saldo insuficiente!');
    }
    accountAux.balance -= parseInt(req.body.valor) + 1;

    if (accountAux.balance < 0) {
      //desconta valor e tarifa e não pode ficar negativo
      res.status(404).send('Saldo insuficiente!');
    }
    const accountSave = new accountModel(accountAux);
    await accountSave.save();
    res.send(accountSave);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//6
accountRouter.get('/account', async (req, res) => {
  try {
    const account = await accountModel.find(req.body, { balance: 1 });
    if (account.length === 0) {
      res.status(404).send('Agência e conta não encontradas!');
    }

    res.send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//7
accountRouter.delete('/account', async (req, res) => {
  try {
    const account = await accountModel.deleteOne(req.body);
    if (account.deletedCount === 0) {
      res.status(404).send('Account não encontrada para exclusão!');
    }

    const accounts = await accountModel.find(
      { agencia: req.body.agencia },
      { conta: 1 }
    );
    console.log(accounts);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
//8
accountRouter.patch('/transferAccount', async (req, res) => {
  try {
    const accountDBOrigem = await accountModel.find(
      { conta: req.body.contaOrigem },
      {}
    );

    const accountDBDestino = await accountModel.find(
      { conta: req.body.contaDestino },
      {}
    );

    if (accountDBOrigem.length === 0 || accountDBDestino.length === 0) {
      res
        .status(404)
        .send('Agência e conta origem e/ou destino não encontrada(s)!');
    }
    if (!req.body.valor) {
      res.status(404).send('Parâmetro Valor não encontrado!');
    }
    const accountOrigemAux = accountDBOrigem[0];
    const accountDestinoAux = accountDBDestino[0];

    let tarifa = 0;
    if (accountOrigemAux.agencia !== accountDestinoAux.agencia) {
      tarifa = 8;
    }

    if (accountOrigemAux.balance < parseInt(req.body.valor) + tarifa) {
      //desconta valor e tarifa
      res.status(404).send('Saldo insuficiente!');
    }

    accountOrigemAux.balance -= parseInt(req.body.valor) + tarifa;

    if (accountOrigemAux.balance < 0) {
      //desconta valor e tarifa e não pode ficar negativo
      res.status(404).send('Saldo insuficiente!');
    }
    accountDestinoAux.balance += parseInt(req.body.valor);
    const accountOrigemSave = new accountModel(accountOrigemAux);
    console.log(accountOrigemSave);
    await accountOrigemSave.save();
    const accountDestinoSave = new accountModel(accountDestinoAux);
    await accountDestinoSave.save();
    console.log(accountDestinoSave);
    res.send(accountOrigemSave);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//9
accountRouter.get('/averageBalance', async (req, res) => {
  try {
    const average = await accountModel.aggregate([
      {
        $match: {
          agencia: req.body.agencia,
        },
      },
      {
        $group: {
          _id: '$agencia',
          media: {
            $avg: '$balance',
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    if (average.length === 0) {
      res.status(404).send('Agência não encontrada!');
    }

    res.send(average);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//10
accountRouter.get('/lowestBalance', async (req, res) => {
  try {
    if (!req.body.limit) {
      res.status(404).send('Parâmetro Limit não encontrado!');
    }

    const account = await accountModel.aggregate([
      {
        $sort: {
          balance: 1,
        },
      },
      {
        $limit: parseInt(req.body.limit),
      },
      {
        $project: {
          _id: 0,
          name: 0,
        },
      },
    ]);

    res.send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//11
accountRouter.get('/highestBalance', async (req, res) => {
  try {
    if (!req.body.limit) {
      res.status(404).send('Parâmetro Limit não encontrado!');
    }

    const account = await accountModel.aggregate([
      {
        $sort: {
          balance: -1,
        },
      },
      {
        $limit: parseInt(req.body.limit),
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res.send(account);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//12
accountRouter.get('/privateAgency', async (req, res) => {
  try {
    const account = await accountModel.aggregate([
      {
        $sort: {
          balance: -1,
        },
      },
      {
        $group: {
          _id: '$agencia',
          name: { $first: '$name' },
          agencia: { $first: '$agencia' },
          conta: { $first: '$conta' },
          balance: { $first: '$balance' },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          agencia: 1,
          conta: 1,
          balance: 1,
        },
      },
    ]);

    for (let i = 0; i < account.length; i++) {
      let accountAux = account[i];
      accountAux.agencia = 99;
      const accountSave = new accountModel(accountAux);
      accountSave.save();
    }
    const accountPrivate = await accountModel.find({ agencia: 99 }, {});

    res.send(accountPrivate);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export { accountRouter };
