export const Url = "http://localhost:8000";

export const AdminUrl = `${Url}/api/auth/login`;

export const ImageUrl = "http://localhost:8000/images/products/images/";

export const caticons = "http://localhost:8000/images/categories/icons/";

export const ProductUrl =
  "http://localhost:8000/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8";

export const categoriesUrl = "http://localhost:8000/api/categories";
export const subcategoriesUrl = (id: string) =>
  `http://localhost:8000/api/subcategories?category=${id}`;

export const NewProductUrl = "http://localhost:8000/api/products";

export const ProductUrldetails = (productId: string) =>
  `http://localhost:8000/api/products/${productId}`;

export const signUpUrl = "http://localhost:8000/api/auth/signup";