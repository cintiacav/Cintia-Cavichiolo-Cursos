import mongoose from 'mongoose';
//criação do modelo
const accountSchema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    min: 0,
  },
});
//atribui modelo à coleção (nome da coleção, schema,nome da coleção )
const accountModel = mongoose.model('account', accountSchema, 'account');

export { accountModel };
