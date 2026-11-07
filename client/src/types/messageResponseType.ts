export type messageResponse = { message: string };

export type errorMessageResponse = { detail: string };

export type authResponseMessage = { isLogged: boolean };

export type tokenResponse = { access_token: string };

type undeStr = undefined | string;

export type productData = {
  name: undeStr;
  url_message: undeStr;
  url_image: undeStr;
  description: undeStr;
  price: null | number;
};

export type productsResponseData = {
  products: productData[];
};
