export type Certification = {
  id: string;
  name: string;
  definition: string;
  bestFor: string;
  careerPath: string;
  domains: string[];
  tracks: string[];
  priority?: number;
  priorityReason?: string;
  objective?: string;
};

export type CertificationTrack = {
  id: string;
  title: string;
  description: string;
  certifications: string[];
};

export const certifications: Certification[] = [
  { id:'cissp', name:'CISSP', definition:'Advanced cybersecurity leadership and architecture certification.', bestFor:'Security managers, architects, and CISO-track professionals.', careerPath:'Senior Security Engineer → Security Architect → Security Manager/CISO.', domains:['Security architecture','Risk management','Operations'], tracks:['leadership-ciso','grc-compliance'], priority:8, objective:'Executive-level security leadership capability.' },
  { id:'cism', name:'CISM', definition:'ISACA certification focused on information security management.', bestFor:'Security governance and program managers.', careerPath:'Security Analyst → Security Manager → CISO office.', domains:['Governance','Risk','Program management'], tracks:['leadership-ciso','grc-compliance'], priority:2, objective:'Manage security programs aligned to business outcomes.' },
  { id:'cisa', name:'CISA', definition:'Audit-focused certification for information systems assurance.', bestFor:'IT auditors and compliance assurance roles.', careerPath:'IT Auditor → Senior Auditor → Audit Manager.', domains:['Audit','Controls testing','Governance'], tracks:['grc-compliance','it-audit-assurance'], priority:4 },
  { id:'crisc', name:'CRISC', definition:'Risk and control-focused ISACA certification.', bestFor:'Risk managers and GRC specialists.', careerPath:'GRC Analyst → Risk Manager → Enterprise Risk Lead.', domains:['Risk','Controls','Governance'], tracks:['leadership-ciso','grc-compliance'], priority:3 },
  { id:'cgeit', name:'CGEIT', definition:'Enterprise IT governance certification.', bestFor:'IT governance and transformation leaders.', careerPath:'IT Governance Lead → Enterprise Governance Director.', domains:['IT governance','Value delivery','Performance'], tracks:['it-governance-architecture'] },
  { id:'ccsp', name:'CCSP', definition:'Cloud security architecture and operations certification.', bestFor:'Cloud security engineers and architects.', careerPath:'Cloud Engineer → Cloud Security Architect.', domains:['Cloud architecture','Data protection','Cloud operations'], tracks:['cloud-security'] },
  { id:'iso-27001-li', name:'ISO/IEC 27001 Lead Implementer', definition:'Implementation certification for ISO 27001 ISMS.', bestFor:'ISMS implementers and security consultants.', careerPath:'GRC Specialist → ISMS Lead Implementer.', domains:['ISMS design','Control deployment','Governance'], tracks:['leadership-ciso','grc-compliance'], priority:1 },
  { id:'iso-27001-la', name:'ISO/IEC 27001 Lead Auditor', definition:'Auditing certification for ISO 27001 management systems.', bestFor:'Internal and external ISMS auditors.', careerPath:'Compliance Analyst → Lead Auditor.', domains:['Auditing','Evidence','Corrective actions'], tracks:['grc-compliance','it-audit-assurance'] },
  { id:'iso-22301-li', name:'ISO/IEC 22301 Lead Implementer', definition:'BCMS implementation certification.', bestFor:'Business continuity and resilience managers.', careerPath:'BC Analyst → Resilience Program Lead.', domains:['BCMS','Resilience planning','Recovery'], tracks:['business-continuity-resilience'], priority:5 },
  { id:'iso-22301-la', name:'ISO/IEC 22301 Lead Auditor', definition:'BCMS auditing and assurance certification.', bestFor:'Resilience auditors and assurance teams.', careerPath:'Resilience Specialist → Lead Auditor.', domains:['BCMS audit','Testing','Evidence'], tracks:['it-audit-assurance','business-continuity-resilience'] },
  { id:'cippe', name:'CIPP/E', definition:'Privacy law and governance certification for Europe.', bestFor:'DPO and privacy compliance professionals.', careerPath:'Privacy Analyst → DPO/Privacy Lead.', domains:['Privacy law','Data rights','Regulatory compliance'], tracks:['privacy-dpo'], priority:6 },
  { id:'cipm', name:'CIPM', definition:'Operational privacy program management certification.', bestFor:'Privacy program managers.', careerPath:'Privacy Ops Specialist → Privacy Program Manager.', domains:['Privacy operations','Governance','Program metrics'], tracks:['privacy-dpo'], priority:6 },
  { id:'aigp', name:'AIGP', definition:'AI governance and policy certification.', bestFor:'AI governance officers and compliance leads.', careerPath:'GRC/Privacy Specialist → AI Governance Lead.', domains:['AI governance','Policy','Risk'], tracks:['ai-governance'], priority:7 },
  { id:'iso-42001-li', name:'ISO/IEC 42001 Lead Implementer', definition:'AIMS implementation certification for responsible AI.', bestFor:'AI governance implementers.', careerPath:'AI Risk Analyst → AIMS Program Lead.', domains:['AIMS','AI controls','Assurance'], tracks:['ai-governance'], priority:7 },
  { id:'iso-42001-la', name:'ISO/IEC 42001 Lead Auditor', definition:'AIMS auditing certification.', bestFor:'AI assurance and audit roles.', careerPath:'AI Compliance Analyst → AI Lead Auditor.', domains:['AI audit','Assurance','Evidence'], tracks:['ai-governance'] },
  { id:'security-plus', name:'CompTIA Security+', definition:'Foundational cybersecurity certification.', bestFor:'Entry-level cybersecurity practitioners.', careerPath:'IT Support → SOC Analyst.', domains:['Network security','Threats','Incident basics'], tracks:['technical-soc'] },
  { id:'cysa-plus', name:'CompTIA CySA+', definition:'Cyber defense and SOC analytics certification.', bestFor:'SOC analysts and defenders.', careerPath:'SOC Analyst → Detection Engineer.', domains:['Threat detection','Incident response','Analytics'], tracks:['technical-soc'] },
  { id:'casp-securityx', name:'CompTIA CASP+ / SecurityX', definition:'Advanced enterprise security practitioner certification.', bestFor:'Senior defenders and technical leads.', careerPath:'Security Engineer → Lead Security Engineer.', domains:['Enterprise security','Architecture','Operations'], tracks:['technical-soc'] },
  { id:'ceh', name:'CEH', definition:'Ethical hacking fundamentals and offensive techniques.', bestFor:'Penetration testing entry/mid-level roles.', careerPath:'Security Analyst → Ethical Hacker.', domains:['Offensive testing','Recon','Exploitation basics'], tracks:['offensive-security'] },
  { id:'oscp', name:'OSCP', definition:'Hands-on penetration testing certification.', bestFor:'Practical offensive security practitioners.', careerPath:'Jr Pentester → Senior Pentester/Red Teamer.', domains:['Hands-on exploitation','Privilege escalation','Reporting'], tracks:['offensive-security'] },
  { id:'cdpse', name:'CDPSE', definition:'Data privacy engineering certification.', bestFor:'Engineers implementing privacy by design.', careerPath:'Security/Software Engineer → Privacy Engineer.', domains:['Privacy engineering','Data protection','System design'], tracks:['privacy-dpo'] },
  { id:'itil4', name:'ITIL 4 Foundation', definition:'IT service management fundamentals.', bestFor:'IT operations and service managers.', careerPath:'IT Ops Analyst → Service Manager.', domains:['Service management','Process','Continual improvement'], tracks:['it-governance-architecture'] },
  { id:'pmp', name:'PMP', definition:'Project management leadership certification.', bestFor:'Program and transformation managers.', careerPath:'Project Manager → Program Manager.', domains:['Project governance','Delivery','Stakeholder management'], tracks:['it-governance-architecture'] },
  { id:'togaf', name:'TOGAF', definition:'Enterprise architecture framework certification.', bestFor:'Enterprise architects and transformation leads.', careerPath:'Solution Architect → Enterprise Architect.', domains:['Architecture','Governance','Transformation'], tracks:['it-governance-architecture'] },
];

export const certificationTracks: CertificationTrack[] = [
  { id:'leadership-ciso', title:'Leadership & CISO Track', description:'Leadership-oriented certifications for CISO pathway.', certifications:['cissp','cism','crisc','iso-27001-li'] },
  { id:'grc-compliance', title:'GRC / Compliance Track', description:'Governance, risk, compliance, and audit-aligned progression.', certifications:['cism','crisc','cisa','iso-27001-li','iso-27001-la'] },
  { id:'it-audit-assurance', title:'IT Audit / Assurance Track', description:'Independent control assurance and management-system auditing.', certifications:['cisa','iso-27001-la','iso-22301-la'] },
  { id:'privacy-dpo', title:'Privacy / DPO Track', description:'Privacy governance and data protection practitioner path.', certifications:['cippe','cipm','cdpse'] },
  { id:'ai-governance', title:'AI Governance Track', description:'Responsible AI governance and assurance certifications.', certifications:['aigp','iso-42001-li','iso-42001-la'] },
  { id:'business-continuity-resilience', title:'Business Continuity / Resilience Track', description:'Operational continuity and resilience credentials.', certifications:['iso-22301-li','iso-22301-la'] },
  { id:'cloud-security', title:'Cloud Security Track', description:'Cloud-focused cybersecurity specialization.', certifications:['ccsp'] },
  { id:'technical-soc', title:'Technical Cybersecurity / SOC Track', description:'Detection, response, and security operations progression.', certifications:['security-plus','cysa-plus','casp-securityx'] },
  { id:'offensive-security', title:'Offensive Security Track', description:'Penetration testing and red-team foundational path.', certifications:['ceh','oscp'] },
  { id:'it-governance-architecture', title:'IT Governance / Architecture / Transformation Track', description:'Enterprise governance and transformation certifications.', certifications:['cgeit','itil4','pmp','togaf'] },
];

export const recommendedRoadmap = [
  'ISO 27001 Lead Implementer','CISM','CRISC','CISA','ISO 22301 Lead Implementer','CIPP/E or CIPM','AIGP or ISO 42001 Lead Implementer','CISSP',
];
