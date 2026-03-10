import { seedContent } from '@/content/data';
import { listPublishedContent } from '@/lib/cms';
import { securityMapData } from '@/data/securityMap';

export interface AssistantSource {
  title: string;
  route: string;
  excerpt: string;
}

export interface AssistantReply {
  text: string;
  sources: AssistantSource[];
}

const sitePages: AssistantSource[] = [
  { title: 'Landing', route: '/', excerpt: 'Entry point to professional and personal universes.' },
  { title: 'Professional', route: '/professional', excerpt: 'Technology, cybersecurity, and engineering knowledge.' },
  { title: 'Personal', route: '/personal', excerpt: 'Philosophy, books, anime, and reflective essays.' },
  { title: 'Security Map', route: '/security-mindmap', excerpt: 'Interactive cybersecurity roles map across categories and subdomains.' },
  { title: 'Games', route: '/games', excerpt: 'Lightweight cyber-playground mini games.' },
  { title: 'Submitting', route: '/submitting', excerpt: 'Manual email submission instructions.' },
];

const blockedTerms = ['admin', 'password', 'token', 'secret', 'private', 'internal'];
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();

export function sanitizeUserText(value: string) {
  return normalize(value).slice(0, 220);
}

function sanitizeDisplay(text: string) {
  return text.replace(/[<>`]/g, '').slice(0, 900);
}

async function loadPublishedSources(): Promise<AssistantSource[]> {
  try {
    const rows = await listPublishedContent();
    return rows.slice(0, 120).map((item) => ({
      title: item.title,
      route: item.topic?.universe === 'professional' ? `/professional/topic/${item.topic?.slug || ''}` : `/personal/post/${item.slug}`,
      excerpt: `${item.excerpt || ''} ${item.body.slice(0, 260)}`.trim(),
    }));
  } catch {
    return seedContent.filter((item) => item.status === 'published').slice(0, 80).map((item) => ({
      title: item.title,
      route: `/personal/post/${item.slug}`,
      excerpt: `${item.excerpt || ''} ${item.body.slice(0, 260)}`.trim(),
    }));
  }
}

export async function querySiteAssistant(rawQuery: string): Promise<AssistantReply> {
  const query = sanitizeUserText(rawQuery);
  if (!query) {
    return {
      text: 'I can summarize the information available on this website. Ask about Security Map categories, roles, Professional topics, Personal posts, or Games.',
      sources: sitePages.slice(0, 4),
    };
  }

  if (blockedTerms.some((term) => query.includes(term))) {
    return {
      text: 'I cannot provide hidden, private, or admin-only information. I only summarize publicly available website content.',
      sources: sitePages.slice(0, 2),
    };
  }

  const mapSources: AssistantSource[] = securityMapData.nodes.slice(0, 1200).map((node) => ({
    title: node.label,
    route: '/security-mindmap',
    excerpt: `${node.type} in ${node.categoryId}. ${node.description}`,
  }));

  const contentSources = await loadPublishedSources();
  const sources = [...sitePages, ...contentSources, ...mapSources];

  const terms = query.split(' ').filter(Boolean);
  const scored = sources
    .map((item) => {
      const hay = normalize(`${item.title} ${item.excerpt}`);
      const score = terms.reduce((acc, term) => acc + (hay.includes(term) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.item);

  if (!scored.length) {
    return {
      text: 'I could not find that information on this website. Please try broader keywords or navigate to Security Map, Professional, or Personal pages.',
      sources: [],
    };
  }

  const summary = scored.map((s) => `• ${sanitizeDisplay(s.title)}: ${sanitizeDisplay(s.excerpt).slice(0, 150)}`).join('\n');
  return {
    text: `Website summary for “${sanitizeDisplay(query)}”:\n${summary}\n\nI only provide summaries from public website content.`,
    sources: scored,
  };
}
