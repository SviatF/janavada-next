export default function ArticleBody({ html }) {
  if (!html) return null;
  return <div className="article-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
