import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Header = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
  searchTerm,
  setSearchTerm,
}) => {
  const [active, setActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [registerActive, setRegisterActive] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const handleRegisterPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const handleRegisterConfirmPasswordChange = (event) => {
    setRegisterConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
    } else {
      setError('');
      console.log('Inicio de sesión exitoso');
      setEmail('');
      setPassword('');
      setLoginActive(false);
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (
      registerEmail === '' ||
      registerPassword === '' ||
      registerConfirmPassword === ''
    ) {
      setRegisterError('Todos los campos son obligatorios');
    } else if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
    } else {
      setRegisterError('');
      console.log('Registro exitoso');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setRegisterActive(false);
    }
  };

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onDecrementProduct = (product) => {
    const updatedProducts = allProducts
      .map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setAllProducts(updatedProducts);
    setTotal(total - product.price);
    setCountProducts(countProducts - 1);
  };

  const onAddProduct = (product) => {
    const updatedProducts = allProducts.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    console.log('Product price:', product.price);

    setAllProducts(updatedProducts);
    setTotal(total + product.price);
    setCountProducts(countProducts + 1);

    Swal.fire({
      icon: 'success',
      title: 'Your product is added to the cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onCleanCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, empty it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);

        Swal.fire({
          title: 'Deleted!',
          text: 'your purchase has been canceled.',
          icon: 'success',
        });
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoginClick = () => {
    setLoginActive(true);
    setRegisterActive(false);
  };

  const handleRegisterClick = () => {
    setLoginActive(false);
    setRegisterActive(true);
  };

  return (
    <header>
      <h1></h1>
      <div className="search-container">
        <input
          type="search"
          id="buscar"
          name="buscar"
          placeholder="¿Qué estás Buscando?"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <i className="fa fa-search busca" id="lupa"></i>
      </div>

      <div className="container-icon">
        <div className="container-icon-registro">
          <div className="container-icon-in">
            <div className="container-register-icon" onClick={handleLoginClick}>
              <img
                className="icon-logIn"
                src="https://static.vecteezy.com/system/resources/previews/007/033/146/non_2x/profile-icon-login-head-icon-vector.jpg"
                alt="LogIn"
              />
            </div>
            <h3>log in</h3>
          </div>
        </div>

        {loginActive && (
          <div className="header-logIn">
            <div
              className="logIn-close"
              onClick={() => {
                setLoginActive(false);
                setRegisterActive(false);
              }}
            >
              <img
                className="icon-close"
                src="https://icon-library.com/images/icon-close/icon-close-16.jpg"
                alt="Cerrar"
              />
            </div>

            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Correo electrónico:
                <input
                  className="correo"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              <br />
              <label>
                Contraseña:
                <input
                  className="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <br />
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button className="btn-submit">Iniciar sesión</button>
              <button
                className="btn-forget"
                onClick={() => console.log('Olvidaste tu contraseña?')}
              >
                Olvidaste tu contraseña?
              </button>

              <div className="divisor">
                <h3>_______ o ________</h3>
              </div>

              <button
                type="button"
                className="btn-create"
                onClick={handleRegisterClick}
              >
                Crear una cuenta
              </button>
            </form>
          </div>
        )}

        {registerActive && (
          <div className="header-logIn">
            <div
              className="logIn-close"
              onClick={() => {
                setLoginActive(false);
                setRegisterActive(false);
              }}
            >
              <img
                className="icon-close"
                src="https://icon-library.com/images/icon-close/icon-close-16.jpg"
                alt="Cerrar"
              />
            </div>
            <h2> Register </h2>
            <form onSubmit={handleRegisterSubmit}>
              <label>
                Correo electrónico:
                <input
                  className="correo"
                  type="email"
                  value={registerEmail}
                  onChange={handleRegisterEmailChange}
                />
              </label>
              <br />
              <label>
                Contraseña:
                <input
                  className="password"
                  type="password"
                  value={registerPassword}
                  onChange={handleRegisterPasswordChange}
                />
              </label>
              <br />
              <label>
                Confirmar Contraseña:
                <input
                  className="password"
                  type="password"
                  value={registerConfirmPassword}
                  onChange={handleRegisterConfirmPasswordChange}
                />
              </label>
              <br />
              {registerError && (
                <div style={{ color: 'red' }}>{registerError}</div>
              )}
              <button className="btn-submit">Registrar</button>
            </form>
          </div>
        )}

        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <img
            className="icon-cart"
            src="https://cdn.pixabay.com/photo/2013/07/12/14/53/cart-148964_1280.png"
            alt="Carrito"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
        <div
          className={`container-cart-products ${active ? '' : 'hidden-cart'}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <button onClick={() => onDecrementProduct(product)}>
                        -
                      </button>
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <button onClick={() => onAddProduct(product)}>+</button>
                      <p className="titulo-producto-carrito">
                        {product.nameProduct}
                      </p>
                      <span className="precio-producto-carrito">
                        $ {product.price}
                      </span>
                    </div>
                    <img
                      className="icon-close"
                      src="https://icon-library.com/images/icon-close/icon-close-16.jpg"
                      alt="Cerrar"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>

              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>

              <button className="btn-pago">Pagar</button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
