import 'reflect-metadata';
import { container } from './inversify.config';

import express from 'express';
import { IProductCategoryController } from './config/interfaces';
import TYPES from './config/types';

require('dotenv').config();

const main = async () => {

  const app = express();
  const port = process.env.PORT || 3000;

  const productCategoryController = container.get<IProductCategoryController>(TYPES.IProductCategoryController);

  app.use(express.json());

  app.get('/productCategories', (req, res) => productCategoryController.getAllProductCategories(req, res));
  app.post('/productCategory', (req, res) => productCategoryController.addProductCategory(req, res));


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch(err => {
  console.error(err);
});
