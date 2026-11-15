export type dataProductsTypes = {
  _id: string;
  username: string;
  name: string;
  description: string;
  url_image: string;
  url_message: string;
};

export type responseProducts = { products: Array<dataProductsTypes> };
