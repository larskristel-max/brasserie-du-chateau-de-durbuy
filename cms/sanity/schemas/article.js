/**
 * Article schema — the maître brasseur's journal entries.
 *
 * Fields are designed for the editorial register specified in design.md and
 * the suggested-notebook visual treatment chosen on 13 May 2026.
 *
 * Field order in the form reflects the order the maître brasseur writes in:
 * title first, then date, then a brief lede, then the body itself. Image and
 * tags come last because they're optional polish.
 */

export default {
  name: 'article',
  title: 'Article du Carnet',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(120),
      description: 'Le titre de l\'entrée du carnet. Cormorant Garamond, centré.',
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[àáâäãå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôöõ]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
      description: 'Auto-généré à partir du titre. Utilisé dans l\'URL une fois les permaliens activés.',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
      description: 'La date affichée en haut de l\'article (en lettres, format français).',
    },
    {
      name: 'language',
      title: 'Langue',
      type: 'string',
      options: {
        list: [
          { title: 'Français', value: 'fr' },
          { title: 'Nederlands', value: 'nl' },
          { title: 'English', value: 'en' },
          { title: 'Deutsch', value: 'de' },
        ],
        layout: 'radio',
      },
      initialValue: 'fr',
      validation: (Rule) => Rule.required(),
      description: 'La langue de cet article. Un article = une langue. Pour publier en plusieurs langues, créer plusieurs articles.',
    },
    {
      name: 'lede',
      title: 'Chapeau',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(280),
      description: 'Une ou deux phrases d\'introduction, en italique sous le titre. Optionnel mais recommandé.',
    },
    {
      name: 'body',
      title: 'Corps de l\'article',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraphe', value: 'normal' },
            { title: 'Sous-titre', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italique', value: 'em' },
              { title: 'Gras', value: 'strong' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Légende' },
            { name: 'alt', type: 'string', title: 'Texte alternatif (accessibilité)' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'heroImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'caption', type: 'string', title: 'Légende' },
        { name: 'alt', type: 'string', title: 'Texte alternatif (accessibilité)' },
      ],
      description: 'Optionnel. Affichée en pleine largeur en tête d\'article.',
    },
    {
      name: 'tags',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Mots-clés optionnels (ex: "fermentation", "saison", "histoire"). Pas affichés dans v1.',
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Lars Kristel',
      description: 'Affiché en signature à la fin de l\'article.',
    },
  ],
  orderings: [
    {
      title: 'Plus récent en premier',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      language: 'language',
      media: 'heroImage',
    },
    prepare({ title, date, language, media }) {
      return {
        title: title,
        subtitle: `${date}  ·  ${(language || 'fr').toUpperCase()}`,
        media: media,
      };
    },
  },
};
