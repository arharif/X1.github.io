import { ContentRecord } from '@/content/types';

const normalizeText = (value?: string | null) => (value || '').toLowerCase().trim();

export function searchContent(items: ContentRecord[], query: string, tag = '') {
  const normalizedQuery = normalizeText(query);
  const normalizedTag = normalizeText(tag);

  return items.filter((item) => {
    const blob = normalizeText(`${item.title} ${item.excerpt} ${item.body} ${item.contentType}`);
    const queryOk = normalizedQuery ? blob.includes(normalizedQuery) : true;
    const tagOk = normalizedTag ? (item.tags || []).some((itemTag) => normalizeText(itemTag) === normalizedTag) : true;
    return queryOk && tagOk;
  });
}
