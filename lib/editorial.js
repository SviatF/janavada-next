export const EDITORIAL_DESK = {
  name: 'JanaVada Editorial Desk',
  slug: 'janavada-editorial-desk',
  entityType: 'organization',
  role: 'Editorial Desk',
  bio: "JanaVada Editorial Desk is the publication identity used for articles produced or reviewed through JanaVada's editorial workflow when no verified individual contributor is publicly identified.",
};

export const ARTICLE_TYPES = ['NEWS', 'ANALYSIS', 'EXPLAINER', 'OPINION', 'FACT_CHECK'];

export function getArticleType(article = {}) {
  if (ARTICLE_TYPES.includes(article.article_type)) return article.article_type;
  if (article.category === 'opinion') return 'OPINION';
  if (article.category === 'explainers') return 'EXPLAINER';
  const text = ((article.title || '') + ' ' + (article.body || '')).toLowerCase();
  if (text.includes('fact check') || text.includes('fact-check')) return 'FACT_CHECK';
  if (article.bharat_nova_analysis || /analysis|reality check|what it means|why it matters|verdict/.test(text)) return 'ANALYSIS';
  return 'NEWS';
}

export function articleTypeLabel(type, lang = 'en') {
  const hi = { NEWS: 'समाचार', ANALYSIS: 'विश्लेषण', EXPLAINER: 'व्याख्या', OPINION: 'राय', FACT_CHECK: 'तथ्य-जांच' };
  return lang === 'hi' ? (hi[type] || type) : type.replace('_', ' ');
}

export function formatISTDateTime(value, lang = 'en') {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit',
    hour12: true, timeZone: 'Asia/Kolkata',
  }).format(date) + ' IST';
}

export function meaningfulModifiedDate(article = {}) {
  return article.updated_date_custom || null;
}

export const TRUST_PAGES = {
  about: {
    en: {
      title: 'About JanaVada',
      description: 'How JanaVada reports, verifies and explains the stories shaping India.',
      intro: "JanaVada is an India-focused digital publication covering technology, artificial intelligence, business, the economy, startups, government policy and other developments shaping India's future.",
      sections: [
        { title: 'Who We Are', paragraphs: ["JanaVada is built around a simple editorial idea: reporting is more useful when readers also understand the context, consequences and practical implications behind a headline."] },
        { title: 'Our Mission', paragraphs: ["We don't just report what happened. We explain what it means for India.", "Our aim is to combine reporting, analysis, context and practical implications so readers can make better sense of fast-moving events."] },
        { title: 'What We Cover', bullets: ['India', 'Technology', 'Artificial Intelligence', 'Business', 'Economy', 'Startups', 'Finance', 'Government Policy'] },
        { title: 'How We Work', paragraphs: ['Our editorial workflow is designed around source discovery → source verification → factual review → editorial analysis → publication → corrections when necessary. JanaVada may use software and AI-assisted tools in research organization, drafting support, translation or workflow automation; publisher responsibility for accuracy and transparency remains with JanaVada.'] },
        { title: 'Editorial Independence', paragraphs: ['Editorial conclusions are based on available evidence and editorial judgement. Advertising, commercial relationships or outside pressure should not determine factual conclusions. Sponsored or commercial material must be distinguishable from editorial content.'] },
        { title: 'Corrections', paragraphs: ['Material factual errors should be corrected transparently rather than silently hidden. See our Corrections Policy for the process.'] },
        { title: 'Fact Checking', paragraphs: ['Central claims, statistics, announcements and quotations should be checked against primary or otherwise credible sources before publication. See our Fact-Checking Policy.'] },
      ],
    },
    hi: {
      title: 'जनवादा के बारे में',
      description: 'जनवादा भारत को प्रभावित करने वाली खबरों की रिपोर्टिंग, सत्यापन और व्याख्या कैसे करता है।',
      intro: 'जनवादा भारत-केंद्रित डिजिटल प्रकाशन है जो टेक्नोलॉजी, आर्टिफिशियल इंटेलिजेंस, बिज़नेस, अर्थव्यवस्था, स्टार्टअप्स, सरकारी नीति और भारत के भविष्य को प्रभावित करने वाले विषयों को कवर करता है।',
      sections: [
        { title: 'हम कौन हैं', paragraphs: ['जनवादा का संपादकीय विचार सरल है: खबर तभी अधिक उपयोगी होती है जब पाठक उसके संदर्भ, परिणाम और व्यावहारिक प्रभाव को भी समझें।'] },
        { title: 'हमारा मिशन', paragraphs: ['हम सिर्फ यह नहीं बताते कि क्या हुआ। हम समझाते हैं कि इसका भारत के लिए क्या मतलब है।', 'हम रिपोर्टिंग, विश्लेषण, संदर्भ और व्यावहारिक प्रभाव को एक साथ प्रस्तुत करने का प्रयास करते हैं।'] },
        { title: 'हम क्या कवर करते हैं', bullets: ['भारत', 'टेक्नोलॉजी', 'आर्टिफिशियल इंटेलिजेंस', 'बिज़नेस', 'अर्थव्यवस्था', 'स्टार्टअप्स', 'फाइनेंस', 'सरकारी नीति'] },
        { title: 'हम कैसे काम करते हैं', paragraphs: ['हमारा संपादकीय वर्कफ़्लो स्रोत खोज → स्रोत सत्यापन → तथ्य समीक्षा → संपादकीय विश्लेषण → प्रकाशन → आवश्यक होने पर सुधार के क्रम पर आधारित है। जनवादा शोध संगठन, ड्राफ्टिंग सहायता, अनुवाद या वर्कफ़्लो ऑटोमेशन में सॉफ्टवेयर और AI-सहायता वाले टूल इस्तेमाल कर सकता है; सटीकता और पारदर्शिता की जिम्मेदारी प्रकाशक की रहती है।'] },
        { title: 'संपादकीय स्वतंत्रता', paragraphs: ['संपादकीय निष्कर्ष उपलब्ध साक्ष्यों और संपादकीय निर्णय पर आधारित होते हैं। विज्ञापन या व्यावसायिक संबंधों को तथ्यात्मक निष्कर्ष तय नहीं करने चाहिए।'] },
        { title: 'सुधार', paragraphs: ['महत्वपूर्ण तथ्यात्मक त्रुटियों को पारदर्शी रूप से सुधारा जाना चाहिए। प्रक्रिया के लिए हमारी Corrections Policy देखें।'] },
        { title: 'तथ्य-जांच', paragraphs: ['मुख्य दावे, आंकड़े, घोषणाएं और उद्धरण प्रकाशन से पहले प्राथमिक या अन्य विश्वसनीय स्रोतों से जांचे जाने चाहिए।'] },
      ],
    },
  },
  'editorial-policy': {
    en: {
      title: 'Editorial Policy',
      description: "JanaVada's standards for reporting, analysis, attribution and editorial independence.",
      intro: 'This policy explains the standards JanaVada applies to reporting, analysis, explainers, opinion and fact-checking.',
      sections: [
        { title: 'Accuracy Before Speed', paragraphs: ['We aim to publish information that has been checked against credible evidence. Being first is not a reason to publish an unverified central claim.'] },
        { title: 'Primary Sources', paragraphs: ['Government notifications, regulator documents, court records, company filings, official statements, original datasets and primary research are preferred when available and relevant.'] },
        { title: 'News, Analysis and Opinion', paragraphs: ['Straight news should prioritize verifiable facts. Analysis may interpret verified facts and explain implications. Opinion must be clearly identified as subjective argument. Fact checks must identify the specific claim being tested.'] },
        { title: 'Attribution and Links', paragraphs: ['Material claims originating elsewhere should be attributed. Contextual links should help readers inspect source material or understand related JanaVada coverage.'] },
        { title: 'AI-Assisted Workflow', paragraphs: ['JanaVada may use AI-assisted tools for workflow support, research organization, drafting assistance or translation. Such tools do not become a source of authority. Central factual claims should still be verified against credible sources, and JanaVada remains responsible for published material.'] },
        { title: 'Editorial Independence', paragraphs: ['Commercial considerations should not determine factual conclusions. Sponsored or paid material must not be disguised as independent editorial reporting.'] },
      ],
    },
    hi: {
      title: 'संपादकीय नीति',
      description: 'रिपोर्टिंग, विश्लेषण, स्रोत उल्लेख और संपादकीय स्वतंत्रता के लिए जनवादा के मानक।',
      intro: 'यह नीति बताती है कि जनवादा समाचार, विश्लेषण, एक्सप्लेनर, राय और तथ्य-जांच में किन मानकों का पालन करता है।',
      sections: [
        { title: 'गति से पहले सटीकता', paragraphs: ['हम केंद्रीय दावों को विश्वसनीय साक्ष्यों से जांचने के बाद प्रकाशित करने का लक्ष्य रखते हैं। केवल सबसे पहले होने के लिए अपुष्ट दावा प्रकाशित नहीं किया जाना चाहिए।'] },
        { title: 'प्राथमिक स्रोत', paragraphs: ['सरकारी नोटिफिकेशन, नियामक दस्तावेज, अदालत रिकॉर्ड, कंपनी फाइलिंग, आधिकारिक बयान, मूल डेटा और प्राथमिक शोध को जहां संभव हो प्राथमिकता दी जाती है।'] },
        { title: 'समाचार, विश्लेषण और राय', paragraphs: ['समाचार में सत्यापन योग्य तथ्य प्राथमिक हैं। विश्लेषण सत्यापित तथ्यों की व्याख्या कर सकता है। राय को स्पष्ट रूप से राय के रूप में चिह्नित किया जाना चाहिए।'] },
        { title: 'स्रोत और लिंक', paragraphs: ['दूसरे स्रोत से आए महत्वपूर्ण दावों का उल्लेख किया जाना चाहिए। लिंक पाठकों को मूल स्रोत या संबंधित जनवादा कवरेज तक पहुंचने में मदद करते हैं।'] },
        { title: 'AI-सहायता वाला वर्कफ़्लो', paragraphs: ['जनवादा वर्कफ़्लो, शोध संगठन, ड्राफ्टिंग सहायता या अनुवाद में AI टूल इस्तेमाल कर सकता है। AI स्वयं प्रामाणिक स्रोत नहीं है; प्रमुख तथ्य विश्वसनीय स्रोतों से सत्यापित होने चाहिए।'] },
        { title: 'संपादकीय स्वतंत्रता', paragraphs: ['व्यावसायिक हितों को तथ्यात्मक निष्कर्ष तय नहीं करने चाहिए। प्रायोजित सामग्री को स्वतंत्र संपादकीय रिपोर्टिंग के रूप में छिपाया नहीं जाना चाहिए।'] },
      ],
    },
  },
  'fact-checking-policy': {
    en: {
      title: 'Fact-Checking Policy',
      description: 'How JanaVada verifies claims, figures, announcements and source material.',
      intro: 'Fact checking at JanaVada focuses on the claims that materially affect the meaning of a story.',
      sections: [
        { title: 'Verification Standard', paragraphs: ['Central factual claims should be checked against primary evidence whenever possible. If primary evidence is unavailable, multiple credible and independent sources may be used.'] },
        { title: 'Numbers and Data', paragraphs: ['Statistics should be traced to their original dataset, report or official release where practicable. Units, dates, comparison periods and methodology should not be stripped of context.'] },
        { title: 'Quotes and Announcements', paragraphs: ['Quotes should be checked against transcripts, recordings, official posts or reliable contemporaneous reporting. Announcements should be distinguished from completed outcomes.'] },
        { title: 'Uncertainty', paragraphs: ['When facts remain disputed, preliminary or unknown, the article should say so rather than present inference as established fact.'] },
        { title: 'Source Hierarchy', bullets: ['Government, regulator or official institution', 'Company official announcement or filing', 'Primary research or original data', 'Reuters, AP or established news organization', 'High-quality secondary source'] },
      ],
    },
    hi: {
      title: 'तथ्य-जांच नीति',
      description: 'जनवादा दावों, आंकड़ों, घोषणाओं और स्रोत सामग्री को कैसे सत्यापित करता है।',
      intro: 'जनवादा में तथ्य-जांच उन दावों पर केंद्रित होती है जो कहानी के अर्थ को महत्वपूर्ण रूप से प्रभावित करते हैं।',
      sections: [
        { title: 'सत्यापन मानक', paragraphs: ['जहां संभव हो, प्रमुख तथ्यात्मक दावों को प्राथमिक साक्ष्य से जांचा जाना चाहिए। प्राथमिक साक्ष्य न मिलने पर कई विश्वसनीय और स्वतंत्र स्रोत इस्तेमाल किए जा सकते हैं।'] },
        { title: 'आंकड़े और डेटा', paragraphs: ['आंकड़ों को जहां संभव हो मूल डेटा, रिपोर्ट या आधिकारिक रिलीज तक ट्रेस किया जाना चाहिए। तारीख, इकाई और तुलना अवधि का संदर्भ नहीं हटाया जाना चाहिए।'] },
        { title: 'उद्धरण और घोषणाएं', paragraphs: ['उद्धरण ट्रांसक्रिप्ट, रिकॉर्डिंग, आधिकारिक पोस्ट या विश्वसनीय समकालीन रिपोर्टिंग से जांचे जाने चाहिए। घोषणा और वास्तविक परिणाम में अंतर स्पष्ट होना चाहिए।'] },
        { title: 'अनिश्चितता', paragraphs: ['यदि कोई तथ्य विवादित, प्रारंभिक या अज्ञात है, तो लेख को यह स्पष्ट रूप से बताना चाहिए।'] },
        { title: 'स्रोत प्राथमिकता', bullets: ['सरकार, नियामक या आधिकारिक संस्था', 'कंपनी की आधिकारिक घोषणा या फाइलिंग', 'प्राथमिक शोध या मूल डेटा', 'Reuters, AP या स्थापित समाचार संस्था', 'उच्च गुणवत्ता वाला द्वितीयक स्रोत'] },
      ],
    },
  },
  'corrections-policy': {
    en: {
      title: 'Corrections Policy',
      description: 'How JanaVada handles factual corrections, clarifications and material updates.',
      intro: 'Accuracy is an ongoing responsibility. When a material factual error is identified, JanaVada aims to correct it transparently.',
      sections: [
        { title: 'Material Corrections', paragraphs: ['A correction note should identify what was wrong and what was changed. Material factual errors should not be silently rewritten in a way that hides the original problem.'] },
        { title: 'Clarifications', paragraphs: ['A clarification may be added when the original wording was technically accurate but could materially mislead readers without additional context.'] },
        { title: 'Updates', paragraphs: ['Routine additions to a developing story may be labelled as updates. The modified timestamp should change only when a meaningful editorial change has been made.'] },
        { title: 'How to Request a Correction', paragraphs: ['Send the article URL, the disputed statement and supporting evidence to editorial@janavada.com with “Correction” in the subject line.'] },
      ],
    },
    hi: {
      title: 'सुधार नीति',
      description: 'जनवादा तथ्यात्मक सुधार, स्पष्टीकरण और महत्वपूर्ण अपडेट कैसे संभालता है।',
      intro: 'सटीकता एक निरंतर जिम्मेदारी है। महत्वपूर्ण तथ्यात्मक गलती मिलने पर जनवादा पारदर्शी सुधार का लक्ष्य रखता है।',
      sections: [
        { title: 'महत्वपूर्ण सुधार', paragraphs: ['Correction note में यह स्पष्ट होना चाहिए कि क्या गलत था और क्या बदला गया। महत्वपूर्ण तथ्यात्मक त्रुटि को चुपचाप इस तरह नहीं बदला जाना चाहिए कि मूल समस्या छिप जाए।'] },
        { title: 'स्पष्टीकरण', paragraphs: ['यदि मूल शब्द तकनीकी रूप से सही हों लेकिन अतिरिक्त संदर्भ के बिना भ्रामक हो सकते हों, तो clarification जोड़ा जा सकता है।'] },
        { title: 'अपडेट', paragraphs: ['विकसित होती कहानी में सामान्य additions को update कहा जा सकता है। modified timestamp केवल सार्थक संपादकीय बदलाव पर बदलना चाहिए।'] },
        { title: 'सुधार का अनुरोध', paragraphs: ['लेख का URL, विवादित कथन और supporting evidence editorial@janavada.com पर “Correction” subject के साथ भेजें।'] },
      ],
    },
  },
  'ethics-policy': {
    en: {
      title: 'Ethics Policy',
      description: "JanaVada's principles on fairness, transparency, privacy, conflicts and responsible publication.",
      intro: 'These principles guide editorial decisions where accuracy alone is not enough.',
      sections: [
        { title: 'Fairness and Context', paragraphs: ['Relevant context should not be intentionally omitted to create a misleading impression. Serious allegations should be presented with appropriate attribution and, where practical, the position of the affected party.'] },
        { title: 'Privacy and Harm', paragraphs: ['Publication decisions should consider legitimate privacy interests, the risk of unnecessary harm and the special vulnerability of minors and victims.'] },
        { title: 'Conflicts of Interest', paragraphs: ['Material conflicts that could reasonably affect editorial judgement should be avoided or disclosed.'] },
        { title: 'No Fabricated Authority', paragraphs: ['JanaVada should not invent journalists, credentials, quotes, statistics, citations, awards, offices or professional experience. A contributor is represented as a Person in structured data only when that identity is genuinely verified.'] },
        { title: 'Corrections and Accountability', paragraphs: ['Readers should have a clear way to raise factual concerns. Material corrections should be visible and documented.'] },
      ],
    },
    hi: {
      title: 'नैतिकता नीति',
      description: 'निष्पक्षता, पारदर्शिता, गोपनीयता, हितों के टकराव और जिम्मेदार प्रकाशन पर जनवादा के सिद्धांत।',
      intro: 'जहां केवल सटीकता पर्याप्त नहीं होती, वहां ये सिद्धांत संपादकीय निर्णय का मार्गदर्शन करते हैं।',
      sections: [
        { title: 'निष्पक्षता और संदर्भ', paragraphs: ['भ्रामक प्रभाव पैदा करने के लिए महत्वपूर्ण संदर्भ जानबूझकर नहीं हटाया जाना चाहिए। गंभीर आरोपों को उचित attribution और जहां संभव हो प्रभावित पक्ष की स्थिति के साथ प्रस्तुत किया जाना चाहिए।'] },
        { title: 'गोपनीयता और हानि', paragraphs: ['प्रकाशन निर्णय में वैध privacy interests, अनावश्यक नुकसान के जोखिम और minors तथा victims की विशेष vulnerability को ध्यान में रखना चाहिए।'] },
        { title: 'हितों का टकराव', paragraphs: ['ऐसे महत्वपूर्ण conflicts जो संपादकीय judgement को प्रभावित कर सकते हैं, उनसे बचना या उन्हें disclose करना चाहिए।'] },
        { title: 'गढ़ी हुई authority नहीं', paragraphs: ['जनवादा पत्रकार, credentials, quotes, statistics, citations, awards, offices या professional experience गढ़ने से बचता है। Structured data में Person तभी इस्तेमाल होना चाहिए जब पहचान वास्तव में सत्यापित हो।'] },
        { title: 'सुधार और जवाबदेही', paragraphs: ['पाठकों के पास तथ्यात्मक चिंता उठाने का स्पष्ट तरीका होना चाहिए। महत्वपूर्ण सुधार visible और documented होने चाहिए।'] },
      ],
    },
  },
};
