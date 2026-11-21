type undeStr = undefined | string;

export type dataProductsTypes = {
  _id: undeStr;
  username: undeStr;
  name: undeStr;
  price: number | undefined,
  description: undeStr;
  url_image: undeStr;
  url_message: undeStr;
};

export type responseProducts = { products: Array<dataProductsTypes> };
