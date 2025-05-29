import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

export default function ProductsList() {
    const [addedProducts, setAddedProducts] = useState([]);

    function addToCart(product) {
        const isAlreadyAdded = addedProducts.some(p => p.name === product.name);
        if (isAlreadyAdded) return;

        setAddedProducts(curr => [...curr, { ...product, quantity: 1 }]);
    }

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
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </details>
        </div>
    );
}

// 📌 Milestone 3: Modificare il carrello
// Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
// Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
// Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
// Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
// Sotto alla lista del carrello, mostra il totale da pagare:
// Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.
// Obiettivo: Gestire l’aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.