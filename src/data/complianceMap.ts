export type MapNodeType = 'center' | 'layer' | 'framework' | 'certification';

export type MapNode = {
  id: string;
  label: string;
  type: MapNodeType;
  layer?: string;
  description: string;
  details?: {
    definition?: string;
    purpose?: string[];
    scope?: string[];
    domains?: string[];
    requirements?: string[];
    metrics?: string[];
    cheatSheet?: string;
    modelRole?: string;
    bestFor?: string;
    careerPath?: string;
    suggestedPriority?: string;
    frameworks?: string[];
    certifications?: string[];
    whyMatters?: string;
    useCases?: string[];
  };
};

export const mapCenterId = 'unified-compliance-framework';

export const complianceMapNodes: MapNode[] = [
  { id: mapCenterId, label: 'Unified Compliance Framework', type: 'center', description: 'Central operating model linking governance, controls, risk, privacy, resilience, AI, assurance, and technical execution.', details: { purpose: ['Unify frameworks into one maturity map', 'Connect controls to people and certifications'], frameworks: ['ISO 27001', 'NIST CSF', 'COBIT', 'NIST 800-53'], certifications: ['CISSP', 'CISM', 'CISA'] } },
  { id:'governance-layer', label:'Governance Layer', type:'layer', description:'Defines strategy, accountability, and oversight.', details:{ frameworks:['COBIT 2019','ISO 27001','NIST CSF'], certifications:['CISM','CGEIT'], whyMatters:'Ensures cyber decisions align to business value and risk appetite.', useCases:['Board reporting model','Policy governance'] }},
  { id:'security-control-layer', label:'Security Control Layer', type:'layer', description:'Implements operational and technical security safeguards.', details:{ frameworks:['ISO 27002','NIST SP 800-53','CIS Controls','PCI DSS'], certifications:['CISSP','Security+'], whyMatters:'Turns policy into measurable controls.', useCases:['Control baseline rollout','Technical hardening program'] }},
  { id:'risk-authorization-layer', label:'Risk & Authorization Layer', type:'layer', description:'Formal risk acceptance and authorization workflows.', details:{ frameworks:['NIST RMF'], certifications:['CRISC','CISA'], whyMatters:'Creates auditable risk decisions.', useCases:['ATO package preparation','Risk exception governance'] }},
  { id:'privacy-layer', label:'Privacy Layer', type:'layer', description:'Protects personal data and regulatory rights.', details:{ frameworks:['GDPR','ISO 27701'], certifications:['CIPP/E','CIPM','CDPSE'], whyMatters:'Reduces privacy violations and legal exposure.', useCases:['DSAR operations','DPIA governance'] }},
  { id:'resilience-layer', label:'Resilience Layer', type:'layer', description:'Ensures continuity and operational resilience.', details:{ frameworks:['ISO 22301','DORA'], certifications:['ISO 22301 Lead Implementer','ISO 22301 Lead Auditor'], whyMatters:'Maintains service continuity under disruption.', useCases:['BCP testing','ICT resilience program'] }},
  { id:'ai-governance-layer', label:'AI Governance Layer', type:'layer', description:'Governs AI risk and trustworthiness.', details:{ frameworks:['NIST AI RMF','ISO 42001'], certifications:['AIGP','ISO 42001 Lead Implementer','ISO 42001 Lead Auditor'], whyMatters:'Controls AI safety, bias, accountability, and oversight.', useCases:['AI model risk register','AIMS controls'] }},
  { id:'assurance-audit-layer', label:'Assurance & Audit Layer', type:'layer', description:'Independent validation of controls and trust posture.', details:{ frameworks:['SOC 2'], certifications:['CISA','ISO 27001 Lead Auditor'], whyMatters:'Builds client trust through auditable evidence.', useCases:['SOC 2 Type II readiness','Internal audit planning'] }},
  { id:'technical-security-layer', label:'Technical Security Layer', type:'layer', description:'Hands-on detection, response, and offensive/defensive capability.', details:{ certifications:['CySA+','OSCP','CEH','CCSP','CASP+ / SecurityX'], whyMatters:'Improves real-world defensive execution.', useCases:['SOC threat detection','Red/blue team maturity'] }},
  { id:'iso-27001', label:'ISO 27001', type:'framework', layer:'Governance Layer', description:'ISMS requirements standard.' },
  { id:'iso-27002', label:'ISO 27002', type:'framework', layer:'Security Control Layer', description:'Security control guidance.' },
  { id:'nist-csf', label:'NIST CSF', type:'framework', layer:'Governance Layer', description:'Outcome-based cybersecurity framework.' },
  { id:'nist-800-53', label:'NIST SP 800-53', type:'framework', layer:'Security Control Layer', description:'Security and privacy control catalog.' },
  { id:'nist-rmf', label:'NIST RMF', type:'framework', layer:'Risk & Authorization Layer', description:'System risk lifecycle framework.' },
  { id:'nist-ai-rmf', label:'NIST AI RMF', type:'framework', layer:'AI Governance Layer', description:'AI risk management framework.' },
  { id:'iso-42001', label:'ISO 42001', type:'framework', layer:'AI Governance Layer', description:'AIMS standard for AI governance.' },
  { id:'pci-dss', label:'PCI DSS', type:'framework', layer:'Security Control Layer', description:'Payment card security standard.' },
  { id:'soc-2', label:'SOC 2', type:'framework', layer:'Assurance & Audit Layer', description:'Trust services attestation framework.' },
  { id:'gdpr', label:'GDPR', type:'framework', layer:'Privacy Layer', description:'EU privacy regulation.' },
  { id:'iso-27701', label:'ISO 27701', type:'framework', layer:'Privacy Layer', description:'Privacy information management system extension.' },
  { id:'dora', label:'DORA', type:'framework', layer:'Resilience Layer', description:'Digital operational resilience act.' },
  { id:'iso-22301', label:'ISO 22301', type:'framework', layer:'Resilience Layer', description:'Business continuity management standard.' },
  { id:'cis-controls', label:'CIS Controls', type:'framework', layer:'Security Control Layer', description:'Prioritized critical security safeguards.' },
  { id:'cobit-2019', label:'COBIT 2019', type:'framework', layer:'Governance Layer', description:'Enterprise IT governance model.' },
  ...[
    'CISSP','CISM','CISA','CRISC','CGEIT','CCSP','ISO 27001 Lead Implementer','ISO 27001 Lead Auditor','ISO 22301 Lead Implementer','ISO 22301 Lead Auditor','CIPP/E','CIPM','AIGP','ISO 42001 Lead Implementer','ISO 42001 Lead Auditor','Security+','CySA+','CASP+ / SecurityX','CEH','OSCP','CDPSE','ITIL 4 Foundation','PMP','TOGAF'
  ].map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g,'-'), label:name, type:'certification' as const, description:`Professional certification: ${name}.`, details:{ definition:`${name} validates role-aligned competencies for security, governance, audit, privacy, or resilience programs.`, bestFor:'Practitioners and leaders building security maturity.', careerPath:'Analyst → Engineer/Consultant → Manager/Architect → Governance/Audit leadership.', domains:['Security governance','Risk','Controls','Audit','Privacy'], suggestedPriority:'Foundation first, then specialist and leadership certifications.' } }))
];
