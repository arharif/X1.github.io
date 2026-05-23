export type AssistantKnowledgeItem = {
  title: string;
  route: string;
  description: string;
  categories: string[];
  tags: string[];
  keywords: string[];
  synonyms?: string[];
  related?: string[];
};

export const assistantKnowledge: AssistantKnowledgeItem[] = [
  { title:'Landing', route:'/', description:'X1 purpose and platform overview.', categories:['platform'], tags:['x1','purpose'], keywords:['x1','platform','purpose','about'], synonyms:['mission','vision'], related:['technology','curiosities'] },
  { title:'Technology & Innovation', route:'/professional', description:'Technology, AI, cybersecurity, cloud, blockchain, OT/ICS, and innovation learning content.', categories:['technology','cybersecurity'], tags:['ai','cybersecurity','innovation'], keywords:['technology','innovation','cloud','blockchain','ot','ics','engineering'], synonyms:['tech'], related:['security map','compliance'] },
  { title:'Curiosities & Philosophy', route:'/personal', description:'Books, anime, philosophy, science, and personal growth essays.', categories:['curiosity'], tags:['books','anime','philosophy','science'], keywords:['curiosity','philosophy','books','anime','science','growth'], related:['landing'] },
  { title:'Security Map', route:'/security-mindmap', description:'Role-based cybersecurity capability map and learning paths.', categories:['cybersecurity','career'], tags:['security roles','iam','grc'], keywords:['security map','cybersecurity career','iam','soc','blue team','red team','resilience'], synonyms:['security mindmap'], related:['compliance frameworks'] },
  { title:'Compliance Frameworks', route:'/compliance-frameworks', description:'Governance and compliance guidance including NIST, ISO 27001, PCI DSS, privacy, resilience, AI security, and certifications.', categories:['grc','compliance'], tags:['nist','iso 27001','pci dss','privacy','ai security','business continuity'], keywords:['grc','compliance','nist','iso 27001','pci dss','privacy','resilience','business continuity','bcp','dr','ai governance','certification','security certification','cissp'], synonyms:['governance','risk','controls'], related:['security map','technology & innovation'] },
  { title:'Games', route:'/games', description:'Safe interactive games for learning and entertainment.', categories:['games'], tags:['hangman','truth or dare','mystery box'], keywords:['games','quiz','hangman','truth or dare','mystery box'], related:['curiosities'] },
  { title:'Submitting', route:'/submitting', description:'How to submit ideas and contributions.', categories:['contribution'], tags:['submit'], keywords:['submitting','contribute','contact'] },
];
