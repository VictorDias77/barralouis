import { useState } from "react"
import "./App.css"

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [addedMessage, setAddedMessage] = useState(false)

  const products = [
    {
      id: 1,
      name: "Mesa e cadeira infantil",
      price: 3190,
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
    },
    {
      id: 2,
      name: "Sofa Branco",
      price: 2790,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
      id: 3,
      name: "Cabeceira Para Cama De Casal",
      price: 3890,
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
    }
  ]

  function addToCart(product) {
    setCart([...cart, product])

    setAddedMessage(true)

    setTimeout(() => {
      setAddedMessage(false)
    }, 2000)
  }

  function removeFromCart(index) {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <img src="/logo.jpeg" alt="Barra Louis" className="logo-img" />

        <div className="cart-icon" onClick={() => setCartOpen(true)}>
          🛒 ({cart.length})
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Elegância urbana redefinida</h2>
        <p>
          A BarraLouis traz peças exclusivas para quem vive estilo, atitude e presença.
        </p>
      </section>

      {/* PRODUTOS */}
      <section className="products">
        <h3>Nossa Coleção</h3>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-image"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <h4>{product.name}</h4>
              <p>R$ {product.price}</p>
              <button onClick={() => addToCart(product)}>
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

{/* SIDEBAR */}
<div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>

  <div className="cart-header">
    <h3>Seu Carrinho</h3>
    <button className="close-btn" onClick={() => setCartOpen(false)}>
      X
    </button>
  </div>

  <div className="cart-items">
    {cart.length === 0 ? (
      <p>Seu carrinho está vazio.</p>
    ) : (
      cart.map((item, index) => (
        <div key={index} className="cart-item">
          <span>{item.name}</span>
          <span>R$ {item.price}</span>
          <button onClick={() => removeFromCart(index)}>
            Remover
          </button>
        </div>
      ))
    )}
  </div>

  <div className="cart-footer">
    <h4 className="total">Total: R$ {total}</h4>

    {cart.length > 0 && (
      <a
        href={`https://wa.me/5598992314502?text=Olá,%20tenho%20interesse%20nos%20seguintes%20produtos:%0A${cart
          .map(item => `- ${item.name} (R$ ${item.price})`)
          .join("%0A")}%0A%0ATotal:%20R$%20${total}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-cart-btn"
      >
        Finalizar pelo WhatsApp
      </a>
    )}
  </div>

</div>

      {/* OVERLAY */}
      {cartOpen && (
        <div
          className="overlay"
          onClick={() => setCartOpen(false)}
        ></div>
      )}

      {/* MENSAGEM DE PRODUTO ADICIONADO */}
      {addedMessage && (
        <div className="added-popup">
          Produto adicionado ao carrinho!
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Barra Louis — Todos os direitos reservados
      </footer>

    </div>
  );
}

export default App;
