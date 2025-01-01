const AllProduct = async () => {
  const data = await fetch("https://fakestoreapi.in/api/products");
  const res = await data.json();
  return res;
};

export default AllProduct;
