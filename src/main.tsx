import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { initSectionReveals } from './scripts.js';

import beerBottles from './assets/bieres-bouteilles.png';
import breweryProduction from './assets/brasserie-production.png';
import heroChateau from './assets/hero-chateau.png';
import gardensVisits from './assets/jardins-visites.png';
import placeDomain from './assets/lieu-domaine.png';
import logoBrasserie from './assets/logo-brasserie.jpeg';

const reservationsHref = 'mailto:info@brasseriedurbuy.com?subject=Demande%20de%20r%C3%A9servation';

const imageSources = {
  hero: heroChateau,
  place: placeDomain,
  brewery: breweryProduction,
  visits: gardensVisits,
};

const features = [
  'BRASSÉ AU CHÂTEAU DE DURBUY',
  'PRODUCTION ARTISANALE',
  'EMBOUTEILLAGE SUR PLACE',
  'PETITES SÉRIES',
  'BELGIQUE',
];

const beers = [
  ['BLONDE DU CHÂTEAU', '6.4%', 'Fermentation traditionnelle, ronde et lumineuse.'],
  ['BOHEMIAN PILSNER', '4.6%', 'Profil net, céréales fines et amertume délicate.'],
  ['IPA SORACHI', '5.3%', 'Houblon Sorachi, tension fraîche et notes herbacées.'],
  ['AMBER ALE', '6.2%', 'Malt ambré, finale douce et caractère de saison.'],
];

const visitBlocks = [
  ['DÉGUSTATIONS', 'Découvrir nos bières dans un cadre unique.'],
  ['LES JARDINS DU DOMAINE', 'Accès aux jardins et promenades au bord de l’Ourthe.'],
  ['LA BRASSERIE', 'Découverte de notre savoir-faire et nos installations.'],
  ['ÉVÉNEMENTS PRIVÉS', 'Réceptions, séminaires et célébrations.'],
  ['BIÈRES DU DOMAINE', 'Notre sélection, à emporter ou à offrir.'],
];

const navLinks = [
  ['La brasserie', '#brasserie'],
  ['Les Bières', '#bieres'],
  ['Le Domaine', '#domaine'],
  ['Informations', '#informations'],
];

function ContentImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return <img className={className} src={src} alt={alt} loading={loading} />;
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    if (!menuOpen) {
      return undefined;
    }

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }

      if (event.key !== 'Tab' || !first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Navigation principale">
      <a className="brand-mark" href="#top" aria-label="Brasserie du Château de Durbuy — accueil">
        <img src={logoBrasserie} alt="" aria-hidden="true" />
      </a>
      <nav className="main-nav" aria-label="Navigation principale">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
        <a className="nav-reservation" href={reservationsHref} aria-label="Envoyer un email pour demander une réservation">Réservations</a>
      </nav>
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="mobile-menu" data-open={menuOpen} id="mobile-menu" ref={panelRef} aria-hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>{label}</a>
          ))}
          <a className="mobile-reservation" href={reservationsHref} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} aria-label="Envoyer un email pour demander une réservation">Réservations</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <ContentImage src={imageSources.hero} className="hero-image" alt="Lever de soleil sur le Château de Durbuy se reflétant dans l’eau" loading="eager" />
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
    <section id="domaine" className="place-section section-shell" aria-labelledby="place-title" data-reveal>
      <div className="place-image-frame image-grade-frame">
        <ContentImage src={imageSources.place} className="image-grade" alt="Pierres anciennes et dépendances du domaine du Château de Durbuy dans une lumière douce" />
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
    <section id="brasserie" className="brewery-section" aria-labelledby="brewery-title" data-reveal>
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
      <div className="brewery-image-wrap image-grade-frame">
        <ContentImage src={imageSources.brewery} className="image-grade" alt="Cuves et installations de brassage artisanales dans la brasserie du domaine" />
      </div>
      <ul className="feature-row stagger-list" aria-label="Caractéristiques de la brasserie">
        {features.map((feature, index) => (
          <li key={feature} style={{ '--stagger': `${index * 90}ms` } as React.CSSProperties}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}

function BeersSection() {
  return (
    <section id="bieres" className="beers-section section-shell" aria-labelledby="beers-title" data-reveal>
      <div className="beers-copy">
        <p className="section-kicker">Bières du domaine</p>
        <h2 id="beers-title">LES BIÈRES</h2>
        <p>Des bières de fermentation traditionnelle, brassées et embouteillées au château.</p>
        <a className="text-cta" href="#informations">DÉCOUVRIR NOS BIÈRES</a>
      </div>
      <figure className="bottle-figure">
        <img src={beerBottles} alt="Bouteilles étiquetées de la Brasserie du Château de Durbuy" loading="lazy" />
      </figure>
      <div className="beer-list stagger-list" aria-label="Liste des bières">
        {beers.map(([name, abv, detail], index) => (
          <article className="beer-card" key={name} style={{ '--stagger': `${index * 120}ms` } as React.CSSProperties}>
            <div>
              <h3>{name}</h3>
              <p>{detail}</p>
            </div>
            <span>{abv}</span>
          </article>
        ))}
      </div>
      <p className="transition-line">Le domaine continue après le brassage.</p>
    </section>
  );
}

function VisitsSection() {
  return (
    <section id="informations" className="visits-section" aria-labelledby="visits-title" data-reveal>
      <div className="visits-image image-grade-frame">
        <ContentImage src={imageSources.visits} className="image-grade" alt="Jardins verdoyants du domaine accessibles sur réservation autour du Château de Durbuy" />
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
        <div className="visit-grid stagger-list">
          {visitBlocks.map(([title, text], index) => (
            <article key={title} style={{ '--stagger': `${index * 85}ms` } as React.CSSProperties}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="reservation-line reservation-link" href={reservationsHref} aria-label="Envoyer un email pour demander des informations et réserver">
          Informations et réservations sur demande.
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>BRASSERIE DU CHÂTEAU DE DURBUY</p>
      <p>Durbuy, Belgique</p>
      <a href={reservationsHref} aria-label="Envoyer un email pour une demande de réservation">Réservations sur demande</a>
    </footer>
  );
}

function App() {
  useEffect(() => initSectionReveals(), []);

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
