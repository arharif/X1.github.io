import { assistantKnowledge } from '@/data/assistantKnowledge';
import { resolveAssistantSection } from '@/components/site-assistant/assistantContext';

export interface AssistantSource { title: string; route: string; excerpt: string }
export interface AssistantReply { text: string; sources: AssistantSource[]; quickActions?: { label: string; route?: string; prompt?: string }[] }

const blockedTerms = ['admin password', 'token', 'secret', 'private key', 'system prompt', 'env'];
const normalize = (v: string) => v.toLowerCase().replace(/[^a-z0-9\s/-]/g, ' ').replace(/\s+/g, ' ').trim();
const tokenize = (v: string) => normalize(v).split(' ').filter(Boolean);

function score(query: string, hay: string) {
  const q = tokenize(query); const h = normalize(hay);
  return q.reduce((acc, t) => acc + (h === t ? 8 : h.startsWith(t) ? 5 : h.includes(t) ? 2 : 0), 0);
}

const quickBySection = {
  security: [{ label: 'Explore Security Map', route: '/security-mindmap' }, { label: 'Compare GRC and SOC roles', prompt: 'Compare GRC and SOC roles' }, { label: 'Recommend a cybersecurity path', prompt: 'Recommend me a learning path for cybersecurity' }],
  games: [{ label: 'Explore Games', route: '/games' }, { label: 'Take a quiz', prompt: 'Recommend me a quiz' }],
  professional: [{ label: 'Start with Cybersecurity Career', route: '/security-mindmap' }, { label: 'Compare frameworks', prompt: 'What is the difference between ISO 27001 and SOC 2?' }],
  landing: [{ label: 'Recommend a path', prompt: 'Where should I start?' }, { label: 'Explore Compliance Frameworks', route: '/compliance-frameworks' }],
};

export async function querySiteAssistant(rawQuery: string, pathname = '/'): Promise<AssistantReply> {
  const query = normalize(rawQuery).slice(0, 240);
  const section = resolveAssistantSection(pathname);
  const contextual = (quickBySection as Record<string, AssistantReply['quickActions']>)[section] ?? [{ label: 'Guide me through the platform', prompt: 'What content is available on this website?' }];

  if (!query) return {
    text: 'I can explain this page, recommend learning paths, compare frameworks (ISO 27001 vs SOC 2), suggest quizzes, and guide you to the best next page.',
    sources: assistantKnowledge.slice(0, 5).map((i) => ({ title: i.title, route: i.route, excerpt: i.description })),
    quickActions: contextual,
  };
  if (blockedTerms.some((t) => query.includes(t))) return { text: 'I can only help with public X1 content and safe navigation guidance.', sources: [], quickActions: contextual };

  const ranked = assistantKnowledge.map((item) => {
    const hay = [item.title, item.description, ...item.categories, ...item.tags, ...item.keywords, ...(item.synonyms || []), ...(item.related || [])].join(' ');
    return { item, s: score(query, hay) };
  }).sort((a, b) => b.s - a.s);

  const top = ranked.filter((r) => r.s > 0).slice(0, 5).map((r) => ({ title: r.item.title, route: r.item.route, excerpt: r.item.description }));
  const explainPage = query.includes('explain this page') || query.includes('summarize');

  const text = top.length
    ? explainPage
      ? `You're on ${section}. Summary: ${top[0]?.excerpt}. Next, explore ${top.slice(1, 3).map((s) => s.title).join(' and ')} for a stronger learning path.`
      : `Best X1 matches for “${query}”: ${top.map((t) => t.title).join(', ')}. I can also compare topics and suggest your next step.`
    : `I did not find an exact match for “${query}”. I recommend starting with Security Map for role clarity, then Compliance Frameworks for GRC and standards, then Games & Quizzes for practice.`;

  return { text, sources: top, quickActions: contextual };
}
