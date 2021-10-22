import 'reflect-metadata';

import express from 'express';
import Container from 'typedi';
import ProductCategoryController from "./controllers/ProductCategoryController";

require('dotenv').config();

const main = async () => {

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  const productCategoryController = Container.get(ProductCategoryController);

  app.get('/productCategories', (req, res) => productCategoryController.getAllProductCategories(req, res));
  app.post('/productCategory', (req, res) => productCategoryController.addOrUpdate(req, res));

  app.listen(port, () => {
    console.log('Server started');
  });
};

main().catch(err => {
  console.error(err);
});