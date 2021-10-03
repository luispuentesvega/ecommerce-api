import { Router, Request, Response } from 'express';

const { list, addOrUpdate } = require('../controllers/ProductCategory');

const router = Router();

router.get('/', () => console.log('Hello World'));

router.get('/productCategories', async (req: Request, res: Response) => {
  try {
    const productCategories = await list();
    return res.json(productCategories);
  } catch (err) {
    res.status(500).json({
      err: 'Something went wrong'
    });
  }
});

router.post('/productCategories', (req: Request, res: Response) => {
  try {
    const productCategory = req.body;

    const newProductCategory = addOrUpdate(productCategory);
    return res.json(newProductCategory);
  } catch (err) {
    res.status(500).json({
      err: 'Something went wrong'
    });
  }
});


module.exports = router;