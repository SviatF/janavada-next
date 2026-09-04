export const CATEGORIES = [
  { slug: 'india-news', en: 'India News', hi: 'भारत समाचार' },
  { slug: 'business', en: 'Business', hi: 'व्यापार' },
  { slug: 'economy', en: 'Economy', hi: 'अर्थव्यवस्था' },
  { slug: 'technology', en: 'Technology', hi: 'प्रौद्योगिकी' },
  { slug: 'ai', en: 'AI', hi: 'एआई' },
  { slug: 'startups', en: 'Startups', hi: 'स्टार्टअप्स' },
  { slug: 'government-schemes', en: 'Government Schemes', hi: 'सरकारी योजनाएं' },
  { slug: 'finance', en: 'Finance', hi: 'वित्त' },
  { slug: 'education', en: 'Education', hi: 'शिक्षा' },
  { slug: 'jobs', en: 'Jobs', hi: 'नौकरियां' },
  { slug: 'world', en: 'World', hi: 'विश्व' },
  { slug: 'opinion', en: 'Opinion', hi: 'राय' },
  { slug: 'explainers', en: 'Explainers', hi: 'समझें' },
];

export const CATEGORY_SLUGS = new Set(CATEGORIES.map(c => c.slug));

export function getCategoryLabel(slug, lang = 'en') {
  const c = CATEGORIES.find(x => x.slug === slug);
  return c?.[lang] || c?.en || slug;
}

export const CATEGORY_DESCRIPTIONS = {
  'india-news': {
    en: 'Comprehensive coverage of the latest happenings across India, from politics to society.',
    hi: 'राजनीति से लेकर समाज तक, पूरे भारत की ताज़ा खबरों का व्यापक कवरेज।',
  },
  business: {
    en: "In-depth analysis of India's business landscape, corporate news, and market movements.",
    hi: 'भारत के व्यापार परिदृश्य, कॉर्पोरेट समाचार और बाजार की गतिविधियों का गहन विश्लेषण।',
  },
  economy: {
    en: "Economic indicators, policy analysis, and fiscal developments shaping India's future.",
    hi: 'भारत के भविष्य को आकार देने वाले आर्थिक संकेतक, नीति विश्लेषण और राजकोषीय विकास।',
  },
  technology: {
    en: "Cutting-edge technology news from India's vibrant tech ecosystem.",
    hi: 'भारत के जीवंत तकनीकी इकोसिस्टम से अत्याधुनिक प्रौद्योगिकी समाचार।',
  },
  ai: {
    en: 'Artificial intelligence developments, research, and their impact on Indian industries.',
    hi: 'कृत्रिम बुद्धिमत्ता के विकास, अनुसंधान और भारतीय उद्योगों पर उनका प्रभाव।',
  },
  startups: {
    en: "India's startup ecosystem — funding rounds, launches, and founder stories.",
    hi: 'भारत का स्टार्टअप इकोसिस्टम — फंडिंग राउंड, लॉन्च और संस्थापकों की कहानियां।',
  },
};
