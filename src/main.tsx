import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main>
      <section className='hero'>
        <h1>Brasserie du Château de Durbuy</h1>
        <p>Bières du domaine, brassées au cœur d’un lieu d’histoire.</p>
      </section>

      <section className='section'>
        <h2>Le Lieu</h2>
        <p>Au pied du château, la brasserie s’inscrit dans le rythme du domaine : les pierres, les jardins, les saisons et le temps long.</p>
      </section>

      <section className='section'>
        <h2>La Brasserie</h2>
        <p>Une production volontairement limitée, pensée pour accompagner le lieu plutôt que le dépasser.</p>
      </section>

      <section className='section'>
        <h2>Bières du domaine</h2>
        <p>Une collection de bières brassées au domaine avec retenue et précision.</p>
      </section>

      <section className='section'>
        <h2>La brasserie & les jardins</h2>
        <p>Le château est un espace privé et ne se visite pas. La brasserie et les jardins sont accessibles sur réservation.</p>
      </section>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
