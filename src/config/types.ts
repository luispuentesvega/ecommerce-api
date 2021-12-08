const TYPES = {
  IDbClient: Symbol.for('IDbClient'),
  IProductCategoryRepository: Symbol.for('IProductCategoryRepository'),
  IProductCategoryService: Symbol.for('IProductCategoryService'),
  IProductCategoryController: Symbol.for('IProductCategoryController')
};

export type QueryData<T> = {
  data: Array<T>;
  count: number;
};

export type DbResult<T> = {
  Items: Array<T>;
  Count: number;
  ScannedCount: number;
};

export default TYPES;
