import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

export default function ProductsList() {
    const [addedProducts, setAddedProducts] = useState([]);

    const updateProductQuantity = (name, quantity) => {
        setAddedProducts(curr => curr.map(p => {
            if (p.name === name) {
                return {
                    ...p,
                    quantity
                }
            }
            return p
        }))
    }
    function addToCart(product) {
        const addedProduct = addedProducts.find(p => p.name === product.name);
        if (addedProduct) {
            updateProductQuantity(addedProduct.name, addedProduct.quantity += 1)
            return;
        }
        setAddedProducts(curr => [...curr, { ...product, quantity: 1 }]);
    }

    function removeQantity(product) {
        const delateQantity = addedProducts.find(p => p.name === product.name);
        if (delateQantity) {
            updateProductQuantity(
                delateQantity.name,
                delateQantity.quantity > 1 ? delateQantity.quantity - 1 : 0
            )
            return;
        }
    }

    function removeFromCart(product) {
        setAddedProducts(curr => curr.filter(p => p.name !== product.name))
    }

    const totalPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0)

    return (
        <div className="container">
            <details>
                <summary>Lista Prodotti</summary>
                <section>
                    <ul className="card">
                        {products.map((p, i) => (
                            <li key={i} className="item">
                                <p><strong>Nome:</strong> {p.name}</p>
                                <p><strong>Prezzo:</strong> {p.price.toFixed(2)}€</p>
                                <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </details>

            <details open>
                <summary>Prodotti nel carrello</summary>
                <section>
                    {addedProducts.length === 0 ? (
                        <h2>Carrello vuoto</h2>
                    ) : (
                        <ul className="card">
                            {addedProducts.map((p, i) => (
                                <li key={i} className="item">
                                    <p><strong>Nome:</strong> {p.name}</p>
                                    <p><strong>Prezzo:</strong> {p.price.toFixed(2)}€</p>
                                    <p><strong>Quantità:</strong> {p.quantity}</p>
                                    <button onClick={() => removeQantity(p)}>Rimuovi Quantità</button>
                                    <button onClick={() => addToCart(p)}>Aggiungi quantità</button>
                                    <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <h3>{totalPay.toFixed(2)}€</h3>
                </section>
            </details>
        </div>
    );
}
