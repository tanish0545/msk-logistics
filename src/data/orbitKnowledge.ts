/**
 * MSK ORBIT AI Knowledge Base & System Grounding
 * Strictly grounded in verified MSK Logistics documentation and assets.
 */

export const ORBIT_SYSTEM_INSTRUCTION = `
You are MSK ORBIT, the intelligent logistics AI assistant for MSK Logistics Pvt. Ltd. (Western India's maritime cargo handling specialist operating out of Nhava Sheva / JNPT and Mundra).

IDENTITY & BRAND:
- Name: MSK ORBIT
- Tagline: Your Intelligent Logistics Assistant
- Company: MSK Logistics Pvt. Ltd.
- Founded: May 2019 at Nhava Sheva (JNPT), Navi Mumbai, Maharashtra, India.
- Slogan: "Beyond Logistics, We Deliver Trust."
- Certifications: ISO 9001:2015 Certified.
- Primary Port Gateways: Nhava Sheva (Jawaharlal Nehru Port - JNPT) and Mundra.
- Core Identity: Specialist in Export Packing, Container Stuffing, Cargo Lashing, Over-Dimensional Cargo (ODC) handling, and Port Staging Warehousing.

LANGUAGE & CONVERSATION:
- Support professional English and natural Hinglish (Hindi written in Latin/English alphabet).
- If the user addresses you in Hinglish (e.g. "Namaste", "Stuffing kaise hoti hai?", "Warehouse kahan hai?"), reply in warm, respectful, fluent Hinglish while keeping technical terms accurate.
- If the user speaks English, reply in clear, professional English.
- Maintain context across follow-up questions in the conversation.

VERIFIED COMPANY CAPABILITIES & FACTS:
1. Ocean Cargo:
   - Dedicated maritime container coordination and vessel schedule alignment at Nhava Sheva (JNPT) and Mundra.
   - Dedicated FCL container coordination and LCL consolidation handling.
   - Quayside container terminal gate-in management timed to shipping-line cut-offs.
   - Customs clearance assistance for EXIM and SEZ consignments.

2. Air Cargo:
   - Time-critical air cargo handling and expedited export transfers.
   - Certified lightweight timber skidding, Euro/standard palletisation for air freight ULD standards.
   - VCI barrier foil vacuum packing and moisture encapsulation.
   - Airport terminal positioning and customs processing.

3. Container Stuffing Logistics:
   - Precision stuffing operations conducted near Punjab and Polaris CFS facilities at Nhava Sheva.
   - Mathematical weight-distribution planning to prevent container floor or axle overweight penalties.
   - Mobile crane rigging for heavy industrial modules, factory skids, and OEM yard boxes.
   - Handling of 20ft/40ft standard dry vans, High Cube, Flat Rack, and Open Top containers.

4. Special Project Cargo Handling:
   - Specialist in Over-Dimensional Cargo (ODC) and Break Bulk Cargo (BBC) rigging.
   - Heavy industrial machinery lashing on flat racks, platform containers, and vessel decks.
   - Securing with heavy-duty turnbuckles, certified wire ropes, and cross-webbing.
   - Low-bed multi-axle trailer haulage and mobile crane positioning.
   - Field execution across heavy industrial machinery exports and complex turnkey projects.

5. Cargo Lashing & Timber Chocking:
   - Certified marine cargo lashing meeting strict maritime transport standards.
   - ISPM-15 heat-treated hardwood timber chocking, wedges, and bulkhead blocking.
   - Heavy-duty 5,000 kg breaking strength polyester ratchet straps and Grade 80 lashing chains.
   - Container doorway safety nets and ship hold tie-downs.
   - Execution across high-value industrial machinery, power equipment, and heavy engineering exports.

6. Dual-Zone Warehouse (Independent dedicated facility, NOT a services category):
   - Section A: Open Yard — hardstanding open-air staging for container buffer holding, loaded on wheels and buffer services, low-bed trailer laydown, Conex CFS connection, and ODC/BBC laydown before terminal gate opening.
   - Section B: Shaded Warehouse & Aryan Shed — covered packing bays with overhead metal roof shelter protecting moisture-sensitive goods, Euro pallet fabrication, forklift access lanes, and VCI barrier foil vacuum packing.

7. Export Solutions:
   - Option 01: Client-Arranged Container & Cargo (Client provides both; MSK executes agreed packing, stuffing, and lashing).
   - Option 02: Client Cargo, Container to Be Arranged (Client arranges container separately; MSK executes packing work).
   - CRITICAL RULE: MSK Logistics does NOT supply or sell shipping containers.

8. Container Guide Technical Specifications:
   - 20ft Standard Dry (20GP): 5.90m L × 2.35m W × 2.39m H (Door: 2.28m H) • Payload ~28,200 kg • Tare 2,230 kg • Cube 33.2 CBM
   - 40ft Standard Dry (40GP): 12.03m L × 2.35m W × 2.39m H (Door: 2.28m H) • Payload ~26,700 kg • Tare 3,750 kg • Cube 67.7 CBM
   - 40ft High Cube (40HC): 12.03m L × 2.35m W × 2.70m H (Door: 2.58m H) • Payload ~26,500 kg • Tare 3,900 kg • Cube 76.4 CBM
   - Flat Rack (20FR / 40FR): Heavy-duty steel base with collapsible end walls for oversized, top-heavy, or out-of-gauge machinery.
   - Open Top (20OT / 40OT): Removable tarpaulin and roof bows for overhead crane loading.
   - Reefer: Temperature-controlled container cargo.

9. Operating Offices & Contacts:
   - Main Commercial Branch: Office No-A-428, 4th Floor, Balaji Bhawan, Plot No-42A, Sector 11, CBD Belapur, Navi Mumbai 400 614, Maharashtra, India.
   - Registered Operations Office: JNPT Township Colony, Sector - 3, Building No. B/48, Office No. 3, Navi Mumbai 400702, Maharashtra, India.
   - Direct Operations Desk: +91 81045 92823 (regular business hours).
   - 24×7 Emergency Operations Desk: 8108672929 (urgent vessel cut-off escalations and night moves).
   - Email: info@msklogisticsolution.com, accounts@msklogisticsolution.com.

STRICT CONVERSATIONAL RULES & BOUNDARIES:
1. ALWAYS identify yourself as MSK ORBIT, the AI logistics assistant for MSK Logistics.
2. NEVER invent freight rates, dollar/rupee quotations, vessel schedules, container availability, specific delivery transit times, or custom certifications.
3. If an exporter or client asks for pricing or a quotation, invite them to use the "Request a Quote" form (/request-quote) or contact the Operations Desk (+91 81045 92823).
4. When technical or commercial details are outside verified records, clearly state that the information requires direct confirmation with our operations desk at JNPT (+91 81045 92823) or emergency desk (8108672929).
5. Always maintain a professional, courteous, industrial tone with clear, concise bullet points where helpful.
6. Remember that Warehouse is an independent operational facility and NOT one of the 5 Services categories.
`;

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  route?: string;
  isExternal?: boolean;
}

export const ORBIT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'explore-services',
    label: 'Explore Services',
    prompt: 'Can you overview all specialized export services provided by MSK Logistics?',
    route: '/services',
  },
  {
    id: 'container-guide',
    label: 'Container Guide',
    prompt: 'What container types does MSK handle, and can I see the ISO technical specs?',
    route: '/container-guide',
  },
  {
    id: 'warehouse-enquiry',
    label: 'Warehouse Enquiry',
    prompt: 'Explain the Open Yard and Shaded Warehouse facilities available at JNPT.',
    route: '/warehouse',
  },
  {
    id: 'request-quote',
    label: 'Request a Quote',
    prompt: 'How can I submit a request for quote for my export cargo?',
    route: '/request-quote',
  },
  {
    id: 'ocean-cargo',
    label: 'Ocean Cargo',
    prompt: 'Tell me about MSK Ocean Cargo and vessel coordination at Nhava Sheva (JNPT).',
    route: '/services/ocean-cargo',
  },
  {
    id: 'air-cargo',
    label: 'Air Cargo',
    prompt: 'How does MSK Logistics handle time-critical air freight and aircraft palletisation?',
    route: '/services/air-cargo',
  },
  {
    id: 'container-stuffing',
    label: 'Container Stuffing',
    prompt: 'What are MSK container stuffing capabilities at Punjab and Polaris CFS?',
    route: '/services/container-stuffing',
  },
  {
    id: 'cargo-lashing',
    label: 'Cargo Lashing',
    prompt: 'What certified lashing, chocking, and securing methods does MSK use for sea freight?',
    route: '/services/cargo-lashing',
  },
  {
    id: 'contact-operations',
    label: 'Contact Operations',
    prompt: 'How can I reach the MSK Direct Operations Desk or 24×7 Emergency line?',
    route: '/contact',
  },
];

/**
 * Intelligent Grounded Knowledge Fallback Responses
 * Used when no live API key is configured or offline, ensuring visitors receive 100% verified, helpful answers in both English and Hinglish.
 */
export function getLocalGroundedResponse(prompt: string): string {
  const p = prompt.toLowerCase();

  // 1. Greetings & Hinglish Hellos
  if (p === 'hi' || p === 'hello' || p === 'hey' || p.includes('namaste') || p.includes('kaise ho') || p.includes('kya haal')) {
    const isHinglish = p.includes('namaste') || p.includes('kaise ho') || p.includes('kya haal');
    if (isHinglish) {
      return `**Namaste! Main hoon MSK ORBIT, MSK Logistics ka AI assistant.**\n\n` +
        `Main Nhava Sheva (JNPT) aur Mundra ports par hamari specialized export cargo services ke baare mein verified jankari de sakta hoon:\n` +
        `• **5 Services:** Ocean Cargo, Air Cargo, Container Stuffing, Special Project Cargo (ODC), Cargo Lashing\n` +
        `• **Warehouse Facilities:** Open Yard & Shaded Warehouse (Aryan Shed)\n` +
        `• **Container Specs:** 20GP, 40GP, 40HC, Flat Rack & Open Top\n` +
        `• **Operations Desk:** +91 81045 92823 | 24×7 Emergency: 8108672929\n\n` +
        `Aap kis service ya cargo requirement ke baare mein jaanna chahte hain?`;
    }
    return `**Hello! I am MSK ORBIT, your intelligent AI logistics assistant for MSK Logistics Pvt. Ltd.**\n\n` +
      `I can provide verified information regarding our Western India maritime cargo operations at Nhava Sheva (JNPT) and Mundra:\n` +
      `• **5 Dedicated Services:** Ocean Cargo, Air Cargo, Container Stuffing Logistics, Special Project Cargo Handling (ODC), and Certified Cargo Lashing.\n` +
      `• **Warehouse Staging:** Open Yard buffer storage and Shaded Warehouse (Aryan Shed) packing bays.\n` +
      `• **ISO Container Specs:** 20ft/40ft Dry, High Cube, Flat Rack, and Open Top.\n` +
      `• **Direct Assistance:** Operations Desk (+91 81045 92823) & 24×7 Emergency Hotline (8108672929).\n\n` +
      `How can I assist your cargo shipment today?`;
  }

  // 2. Services Overview
  if (p.includes('service') || p.includes('services') || p.includes('kya kaam') || p.includes('kaise help')) {
    return `**MSK Logistics provides five specialized export handling services:**\n\n` +
      `1. **Ocean Cargo:** Marine container coordination, FCL/LCL staging, and vessel schedule alignment at JNPT.\n` +
      `2. **Air Cargo:** Expedited export transfers, ULD-compliant skidding, and airport terminal positioning.\n` +
      `3. **Container Stuffing Logistics:** Precision weight distribution and stuffing operations at Punjab & Polaris CFS facilities.\n` +
      `4. **Special Project Cargo Handling:** Out-of-gauge (ODC) & Break Bulk Cargo (BBC) rigging and multi-axle trailer transport.\n` +
      `5. **Cargo Lashing:** Certified marine lashing, hardwood timber chocking, safety nets, and high-tensile ratchet straps.\n\n` +
      `*Note: Warehouse facilities (Open Yard & Shaded Warehouse) are maintained independently under our dedicated facility network.*`;
  }

  // 3. Special Project Cargo & ODC
  if (p.includes('odc') || p.includes('project cargo') || p.includes('over dimensional') || p.includes('heavy') || p.includes('break bulk')) {
    return `**Special Project Cargo & Over-Dimensional Cargo (ODC) Handling:**\n\n` +
      `MSK Logistics is a recognized specialist in heavy industrial machinery rigging and transport via Nhava Sheva (JNPT) and Mundra:\n` +
      `• **Flat-Rack Rigging:** Securing oversized and top-heavy plant equipment on 20ft/40ft Flat Rack (FR) and platform containers.\n` +
      `• **Heavy Marine Securing:** High-tensile steel wire ropes, turnbuckles, welded base stoppers, and heavy ratchet binders.\n` +
      `• **Port Gate & Low-Bed Staging:** Multi-axle hydraulic trailers, mobile crane rigging, and buffer yard laydown before vessel cut-offs.\n` +
      `• **Engineering Standards:** Executed according to international cargo securing codes and marine surveyor requirements.\n\n` +
      `For specialized ODC drawings or feasibility checks, please submit a [Request for Quote](/request-quote) or contact our direct desk at **+91 81045 92823**.`;
  }

  // 4. Ocean Cargo
  if (p.includes('ocean') || p.includes('sea') || p.includes('samundar') || p.includes('jahaz') || p.includes('vessel')) {
    return `**Ocean Cargo Solutions (Nhava Sheva / JNPT & Mundra):**\n\n` +
      `MSK Logistics manages complete quayside coordination for maritime exports:\n` +
      `• Port terminal gate-in timing aligned directly with shipping line vessel cut-offs.\n` +
      `• Dedicated FCL container coordination and LCL consolidation staging.\n` +
      `• Container staging and marine interchange protocol verification.\n` +
      `• Customs clearance support for EXIM and SEZ shipments.\n\n` +
      `For ocean schedules or terminal gate status, explore our [Vessel Schedule Portal](/vessel-schedule) or [Request a Quote](/request-quote).`;
  }

  // 5. Air Cargo
  if (p.includes('air') || p.includes('plane') || p.includes('flight') || p.includes('hawa')) {
    return `**Air Cargo Logistics & Expedited Transfers:**\n\n` +
      `For high-value, time-critical air consignments, MSK Logistics delivers:\n` +
      `• Certified lightweight wooden skidding and custom palletisation for air freight ULD standards.\n` +
      `• VCI barrier foil and vacuum encapsulation protecting sensitive aviation and electronic components.\n` +
      `• Transit buffer staging and direct hand-off to airport cargo terminals.\n` +
      `• Customs clearance assistance for Air EXIM and SEZ goods.`;
  }

  // 6. Container Stuffing
  if (p.includes('stuffing') || p.includes('loading') || p.includes('bharna') || p.includes('cfs') || p.includes('punjab') || p.includes('polaris')) {
    return `**Container Stuffing Logistics Services:**\n\n` +
      `Meticulous loading and securing executed across Nhava Sheva facilities:\n` +
      `• Stuffing operations conducted at leading CFS yards including **Punjab and Polaris**.\n` +
      `• Mathematical weight-distribution planning to protect container floor and road axle ratings.\n` +
      `• Mobile crane positioning and rigging for heavy machinery and skids.\n` +
      `• Handling of standard 20ft/40ft dry boxes, High Cube, Flat Rack, and Open Top containers.`;
  }

  // 7. Cargo Lashing & Chocking
  if (p.includes('lashing') || p.includes('securing') || p.includes('chocking') || p.includes('bandhna') || p.includes('strap') || p.includes('belt')) {
    return `**Certified Marine Cargo Lashing & Securing:**\n\n` +
      `Engineered restraint solutions countering rolling and pitching forces during sea voyages:\n` +
      `• Heavy-duty 5,000 kg breaking strength polyester ratchet straps and Grade 80 lashing chains.\n` +
      `• ISPM-15 heat-treated hardwood timber chocking, floor wedges, and plywood partitions.\n` +
      `• Vessel hold cross-webbing networks and container doorway safety nets.\n` +
      `• Comprehensive execution across major manufacturing, power generation, and infrastructure consignments.`;
  }

  // 8. Warehouse
  if (p.includes('warehouse') || p.includes('yard') || p.includes('open yard') || p.includes('shaded') || p.includes('godown') || p.includes('storage')) {
    return `**Dual-Zone Warehouse & Staging Infrastructure (Nhava Sheva):**\n\n` +
      `• **Section A: Open Yard:** Hardstanding open-air staging for container buffer holding, loaded on wheels and buffer services, Conex CFS connection, and heavy low-bed trailer maneuvering for ODC/BBC units before port gate opening.\n` +
      `• **Section B: Shaded Warehouse & Aryan Shed:** Sheltered warehouse bays with overhead metal roof protection, indoor pallet fabrication, forklift transit lanes, and VCI barrier foil packing bays.\n\n` +
      `Learn more on our dedicated [Warehouse Page](/warehouse).`;
  }

  // 9. Container Guide & Specs
  if (p.includes('container guide') || p.includes('specs') || p.includes('dimensions') || p.includes('size') || p.includes('20gp') || p.includes('40gp') || p.includes('40hc') || p.includes('flat rack') || p.includes('open top')) {
    return `**Technical Container Guide:**\n\n` +
      `We support complete ISO container handling:\n` +
      `• **20ft Standard Dry (20GP):** 5.90m × 2.35m × 2.39m (Door: 2.28m H) • Payload ~28,200 kg\n` +
      `• **40ft Standard Dry (40GP):** 12.03m × 2.35m × 2.39m • Payload ~26,700 kg\n` +
      `• **40ft High Cube (40HC):** 12.03m × 2.35m × 2.70m • Payload ~26,500 kg\n` +
      `• **20ft & 40ft Flat Rack (FR):** Open-sided for out-of-gauge (OOG) machinery.\n` +
      `• **Open Top (OT):** Removable roof bows for overhead crane loading.\n\n` +
      `*Note: MSK Logistics packs and secures cargo in client or shipping-line containers; we do not supply containers.* Detailed specifications available on our [Container Guide](/container-guide).`;
  }

  // 10. Pricing / Quotes / Rates
  if (p.includes('quote') || p.includes('pricing') || p.includes('cost') || p.includes('rate') || p.includes('charges') || p.includes('price') || p.includes('kitna') || p.includes('rupees') || p.includes('kharcha')) {
    return `**Transparent Quotation Process:**\n\n` +
      `MSK Logistics prepares itemized quotations based strictly on agreed work scope (cargo dimensions, tare weights, required timber grade, CFS facility, and securing hardware).\n\n` +
      `To receive an official quotation:\n` +
      `1. Complete our online form: [Request a Quote](/request-quote)\n` +
      `2. Or email your shipment packing list to: [info@msklogisticsolution.com](mailto:info@msklogisticsolution.com)\n` +
      `3. For immediate assistance, call our Direct Operations Desk: **+91 81045 92823**`;
  }

  // 11. Contact & Emergency Phone
  if (p.includes('contact') || p.includes('phone') || p.includes('emergency') || p.includes('address') || p.includes('branch') || p.includes('number') || p.includes('call') || p.includes('sampark') || p.includes('kahan')) {
    return `**MSK Logistics Contact Directory:**\n\n` +
      `• **Direct Operations Desk:** [+91 81045 92823](tel:+918104592823) *(Regular Business Hours)*\n` +
      `• **24×7 Emergency Desk:** [8108672929](tel:8108672929) *(24×7 Active for night moves & port escalations)*\n` +
      `• **Email:** [info@msklogisticsolution.com](mailto:info@msklogisticsolution.com)\n\n` +
      `**Operating Facilities:**\n` +
      `• **Main Commercial Branch:** Balaji Bhawan, Office A-428, Sector 11, CBD Belapur, Navi Mumbai 400614\n` +
      `• **Registered Operations Office:** Building B/48, Office 3, JNPT Township Colony, Sector 3, Navi Mumbai 400702\n\n` +
      `Visit our [Contact Page](/contact) to send an online message or view map directions.`;
  }

  return `I am MSK ORBIT, your intelligent logistics assistant. I can provide verified details on our **5 export services** (Ocean Cargo, Air Cargo, Container Stuffing, Special Project Cargo, Cargo Lashing), our **Open Yard & Shaded Warehouse** facilities, container specifications, and how to reach our operations desk.\n\n` +
    `How can I help you today? You can choose a quick action below or type your inquiry.`;
}

