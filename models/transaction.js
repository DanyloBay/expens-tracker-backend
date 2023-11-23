const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const validDate = /^\d{2}-\d{2}-\d{4}$/;

const transactionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      // 16-10-2009
      match: validDate,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleMongooseError);

const Transaction = model("transaction", transactionSchema);

const addSchema = Joi.object({
  text: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.string().required(),
});

const schemas = {
  addSchema,
};

module.exports = {
  Transaction,
  schemas,
};

// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
// const path = require("path");

// const transactionsPath = path.join(__dirname, "transactions.json");

// const getAll = async () => {
//   const data = await fs.readFile(transactionsPath);
//   return JSON.parse(data);
// };

// const getById = async (id) => {
//   const transactions = await getAll();
//   const result = transactions.find((transaction) => transaction.id === id);
//   return result || null;
// };

// const addTransaction = async (data) => {
//   const transactions = await getAll();
//   const newTransaction = { id: nanoid(), ...data };
//   transactions.push(newTransaction);
//   await fs.writeFile(transactionsPath, JSON.stringify(transactions, null, 2));
//   return newTransaction;
// };

// const updateById = async (id, data) => {
//   const transactions = await getAll();
//   const index = transactions.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   transactions[index] = { id, ...data };
//   await fs.writeFile(transactionsPath, JSON.stringify(transactions, null, 2));
//   return transactions[index];
// };

// const deleteById = async (id) => {
//   const transactions = await getAll();
//   const index = transactions.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = transactions.splice(index, 1);
//   await fs.writeFile(transactionsPath, JSON.stringify(transactions, null, 2));
//   return result;
// };

// module.exports = {
//     getAll,
//     getById,
//     addTransaction,
//     updateById,
//     deleteById,
// };
