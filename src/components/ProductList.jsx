import React from 'react';
import { data } from '../data';
import Swal from 'sweetalert2';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
  searchTerm,
}) => {
  const onAddProduct = (product) => {
    let productExists = false;

    const products = allProducts.map((item) => {
      if (item.id === product.id) {
        productExists = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (productExists) {
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      setAllProducts([...products]);
    } else {
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      setAllProducts([...allProducts, product]);
    }

    Swal.fire({
      icon: 'success',
      title: 'product added to shopping cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const filteredProducts = data.filter((product) =>
    product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredProducts); // Debugging: Verificar los productos filtrados

  return (
    <div className="container-items">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img src={product.img} alt={product.nameProduct} />
            </figure>
            <div className="info-product">
              <h2>{product.nameProduct}</h2>
              <p className="price">${product.price}</p>
              <button
                className="btn-add-cart"
                onClick={() => onAddProduct(product)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No se encontraron artículos</p>
      )}
    </div>
  );
};
