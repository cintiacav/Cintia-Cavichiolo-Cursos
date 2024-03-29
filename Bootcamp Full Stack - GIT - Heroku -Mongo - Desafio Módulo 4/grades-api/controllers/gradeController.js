import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grades = db.grades;
const create = async (req, res) => {
  try {
    const grade = new Grades(req.body);
    await grade.save();
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  try {
    const name = req.query.name;
    //condicao para o filtro no findAll
    var condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};
    const gradesBank = await Grades.find(condition, {}); //findAll
    let grades = gradesBank.map((grade) => {
      return {
        id: grade._id,
        name: grade.name,
        subject: grade.subject,
        type: grade.type,
        value: grade.value,
        lastModified: grade.lastModified,
      };
    });
    res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(req.params);
    const gradesBank = await Grades.findOne({ _id: id }, {});
    let grades = {
      id: gradesBank._id,
      name: gradesBank.name,
      subject: gradesBank.subject,
      type: gradesBank.type,
      value: gradesBank.value,
      lastModified: gradesBank.lastModified,
    };
    res.send(grades);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Dados para atualizacao vazio',
      });
    }
    const id = req.params.id;
    const student = await Grades.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(student);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Grades.deleteOne(req.body);
    res.send(`DELETE /grade - ${id}`);
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await Grades.deleteMany();
    res.send(`DELETE /grade - all`);
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
