export function initSectionReveals() {
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (!revealTargets.length) {
    return () => undefined;
  }

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('reveal'));
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.14,
    },
  );

  revealTargets.forEach((target) => observer.observe(target));

  return () => observer.disconnect();
}
