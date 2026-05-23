import { assistantKnowledge } from '@/data/assistantKnowledge';

export interface AssistantSource { title: string; route: string; excerpt: string }
export interface AssistantReply { text: string; sources: AssistantSource[] }

const blockedTerms = ['admin password','token','secret','private key','system prompt','env'];
const normalize = (v:string)=>v.toLowerCase().replace(/[^a-z0-9\s/-]/g,' ').replace(/\s+/g,' ').trim();
const tokenize = (v:string)=>normalize(v).split(' ').filter(Boolean);

function score(query:string, hay:string){
  const q=tokenize(query); const h=normalize(hay);
  return q.reduce((acc,t)=> acc + (h===t?6:h.startsWith(t)?4:h.includes(t)?2:0),0);
}

function relatedSuggestions(query:string){
  const q=normalize(query);
  if (q.includes('cissp') || q.includes('certification') || q.includes('career')) return ['/security-mindmap','/compliance-frameworks','/professional'];
  if (q.includes('privacy') || q.includes('grc') || q.includes('iso') || q.includes('pci') || q.includes('nist')) return ['/compliance-frameworks','/security-mindmap'];
  if (q.includes('ai security')) return ['/professional','/compliance-frameworks'];
  return ['/','/professional','/personal','/security-mindmap','/compliance-frameworks'];
}

export async function querySiteAssistant(rawQuery: string): Promise<AssistantReply> {
  const query = normalize(rawQuery).slice(0,240);
  if (!query) return { text:'Hi — I can guide you across X1 pages, cybersecurity/compliance topics, and games. Try “CISSP”, “NIST”, “IAM”, or “cybersecurity career”.', sources: assistantKnowledge.slice(0,4).map(i=>({title:i.title,route:i.route,excerpt:i.description})) };
  if (blockedTerms.some(t=>query.includes(t))) return { text:'I can only help with public X1 content and safe navigation guidance.', sources: [] };

  const ranked = assistantKnowledge.map((item)=>{
    const hay = [item.title,item.description,...item.categories,...item.tags,...item.keywords,...(item.synonyms||[]),...(item.related||[])].join(' ');
    return { item, s: score(query, hay) };
  }).sort((a,b)=>b.s-a.s);

  const top = ranked.filter(r=>r.s>0).slice(0,5).map(r=>({title:r.item.title,route:r.item.route,excerpt:r.item.description}));
  if (!top.length) {
    const fallbackRoutes = relatedSuggestions(query);
    const fallback = assistantKnowledge.filter(k=>fallbackRoutes.includes(k.route)).slice(0,4).map(i=>({title:i.title,route:i.route,excerpt:i.description}));
    return { text:`I could not find an exact X1 match for “${query}”, but these pages are the best next step.`, sources:fallback };
  }

  return { text:`Here are the most relevant X1 results for “${query}”. I can also explain terms in simple language and suggest a learning path.`, sources: top };
}
