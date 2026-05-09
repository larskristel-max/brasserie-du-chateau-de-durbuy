import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import beerBottles from './assets/bieres-bouteilles.png';
import breweryProduction from './assets/brasserie-production.png';
import heroChateau from './assets/hero-chateau.png';
import gardensVisits from './assets/jardins-visites.png';
import placeDomain from './assets/lieu-domaine.png';

const features = [
  'BRASSÉ AU CHÂTEAU DE DURBUY',
  'PRODUCTION ARTISANALE',
  'EMBOUTEILLAGE SUR PLACE',
  'PETITES SÉRIES',
  'BELGIQUE',
];

const beers = [
  ['BLONDE DU CHÂTEAU', '6.4%'],
  ['BOHEMIAN PILSNER', '4.6%'],
  ['IPA SORACHI', '5.3%'],
  ['AMBER ALE', '6.2%'],
];

const visitBlocks = [
  ['DÉGUSTATIONS', 'Découvrir nos bières dans un cadre unique.'],
  ['LES JARDINS DU DOMAINE', 'Accès aux jardins et promenades au bord de l’Ourthe.'],
  ['LA BRASSERIE', 'Découverte de notre savoir-faire et nos installations.'],
  ['ÉVÉNEMENTS PRIVÉS', 'Réceptions, séminaires et célébrations.'],
  ['BIÈRES DU DOMAINE', 'Notre sélection, à emporter ou à offrir.'],
];

function Navigation() {
  return (
    <header className="site-header" aria-label="Navigation principale">
      <a className="brand-mark" href="#top" aria-label="Brasserie du Château de Durbuy — accueil">
        <span>BCD</span>
      </a>
      <nav className="main-nav">
        <a href="#brasserie">LA BRASSERIE</a>
        <a href="#bieres">LES BIÈRES</a>
        <a href="#domaine">LE DOMAINE</a>
        <a href="#informations">INFORMATIONS</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <img className="hero-image" src={heroChateau} alt="Le Château de Durbuy dans son domaine" />
      <div className="hero-copy">
        <p className="eyebrow">Durbuy · Belgique</p>
        <h1 id="hero-title">
          BRASSERIE DU
          <span>CHÂTEAU DE DURBUY</span>
        </h1>
        <p className="hero-subtitle">Le brassage a son rythme, entre tradition et précision. Sans bruit.</p>
      </div>
      <p className="scroll-note">Entrer dans le domaine</p>
    </section>
  );
}

function PlaceSection() {
  return (
    <section id="domaine" className="place-section section-shell" aria-labelledby="place-title">
      <div className="place-image-frame">
        <img src={placeDomain} alt="Les abords du domaine et les anciennes pierres du Château de Durbuy" />
      </div>
      <div className="place-copy">
        <p className="section-kicker">Le domaine précède le geste</p>
        <h2 id="place-title">LE LIEU</h2>
        <p>
          Avant la bière, il y a le lieu.<br />
          Les pierres.<br />
          La rivière.<br />
          Les anciennes écuries<br />
          du château.
        </p>
      </div>
    </section>
  );
}

function BrewerySection() {
  return (
    <section id="brasserie" className="brewery-section" aria-labelledby="brewery-title">
      <div className="brewery-intro section-shell">
        <div>
          <p className="section-kicker">Fermentation traditionnelle</p>
          <h2 id="brewery-title">LA BRASSERIE</h2>
        </div>
        <div className="long-copy">
          <p>
            Installée au cœur du domaine, la brasserie produit des bières de fermentation traditionnelle en petites
            séries.
          </p>
          <p>
            Chaque brassin est élaboré et conditionné sur place, dans le respect du rythme du lieu, des saisons et du
            temps nécessaire à la bière.
          </p>
          <p>Production limitée. Distribution sélective.</p>
        </div>
      </div>
      <div className="brewery-image-wrap">
        <img src={breweryProduction} alt="Installations de brassage dans la brasserie du domaine" />
      </div>
      <ul className="feature-row" aria-label="Caractéristiques de la brasserie">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}

function BeersSection() {
  return (
    <section id="bieres" className="beers-section section-shell" aria-labelledby="beers-title">
      <div className="beers-copy">
        <p className="section-kicker">Bières du domaine</p>
        <h2 id="beers-title">LES BIÈRES</h2>
        <p>Des bières de fermentation traditionnelle, brassées et embouteillées au château.</p>
        <a className="text-cta" href="#informations">DÉCOUVRIR NOS BIÈRES</a>
      </div>
      <figure className="bottle-figure">
        <img src={beerBottles} alt="Bouteilles de bière de la Brasserie du Château de Durbuy" />
      </figure>
      <div className="beer-list" aria-label="Liste des bières">
        {beers.map(([name, abv]) => (
          <div className="beer-item" key={name}>
            <span>{name}</span>
            <span>{abv}</span>
          </div>
        ))}
      </div>
      <p className="transition-line">Le domaine continue après le brassage.</p>
    </section>
  );
}

function VisitsSection() {
  return (
    <section id="informations" className="visits-section" aria-labelledby="visits-title">
      <div className="visits-image">
        <img src={gardensVisits} alt="Jardins du domaine accessibles sur réservation" />
      </div>
      <div className="visits-panel">
        <p className="section-kicker">Sur réservation</p>
        <h2 id="visits-title">
          LA BRASSERIE
          <span>&amp; LES JARDINS</span>
        </h2>
        <p className="visits-lead">
          Dégustations, accès aux jardins et découverte de la brasserie, sur réservation.
        </p>
        <p className="private-note">Le château est un espace privé et ne se visite pas.</p>
        <div className="visit-grid">
          {visitBlocks.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="reservation-line">Informations et réservations sur demande.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>BRASSERIE DU CHÂTEAU DE DURBUY</p>
      <p>Durbuy, Belgique</p>
      <p>Réservations sur demande</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <PlaceSection />
        <BrewerySection />
        <BeersSection />
        <VisitsSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
