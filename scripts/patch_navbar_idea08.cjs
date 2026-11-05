const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'navigation', 'Navbar.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace import
code = code.replace(
  "import { Services3DHubDropdown } from './Services3DHubDropdown';",
  "import { Services3DContainerDropdown } from './Services3DContainerDropdown';"
);

// Replace JSX usage
code = code.replace(
  "/* SERVICES DROPDOWN — OPTION 01 INTERACTIVE LOGISTICS HUB (3D HUB) */\r\n                        <Services3DHubDropdown onClose={() => setServicesDropdownOpen(false)} />",
  "/* SERVICES DROPDOWN — IDEA 08 3D CONTAINER THEME (INDUSTRIAL LOOK) */\r\n                        <Services3DContainerDropdown onClose={() => setServicesDropdownOpen(false)} />"
);
code = code.replace(
  "/* SERVICES DROPDOWN — OPTION 01 INTERACTIVE LOGISTICS HUB (3D HUB) */\n                        <Services3DHubDropdown onClose={() => setServicesDropdownOpen(false)} />",
  "/* SERVICES DROPDOWN — IDEA 08 3D CONTAINER THEME (INDUSTRIAL LOOK) */\n                        <Services3DContainerDropdown onClose={() => setServicesDropdownOpen(false)} />"
);

// Enhance mobile services section to match the container theme
const oldMobileServices = `                          /* MOBILE SERVICES VIEW WITH RESPONSIVE STACK & CARTING TREE */
                          <div className="space-y-3 py-1">
                            <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold px-2">
                              Specialized Services
                            </div>`;

const newMobileServices = `                          /* MOBILE SERVICES VIEW — 3D CONTAINER INDUSTRIAL LOOK & CARTING TREE */
                          <div className="space-y-3 py-2 bg-[#0C0E14] border border-[#262D3D] rounded-xl p-3 shadow-lg">
                            {/* Mobile Container Header Accent */}
                            <div className="relative rounded-t overflow-hidden bg-[#161B24] p-1.5 flex items-center justify-between border-b border-[#2C3445]">
                              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[repeating-linear-gradient(45deg,#FACC15,#FACC15_6px,#111827_6px,#111827_12px)]" />
                              <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/90 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                                <span>MSKU 2026-HC</span>
                              </div>
                              <div className="text-[9px] font-mono font-bold text-[#FACC15] uppercase tracking-wider">
                                SPECIALIZED SERVICES
                              </div>
                            </div>`;

if (code.includes(oldMobileServices)) {
  code = code.replace(oldMobileServices, newMobileServices);
} else {
  // Try CRLF version
  const oldMobileServicesCRLF = oldMobileServices.replace(/\n/g, '\r\n');
  const newMobileServicesCRLF = newMobileServices.replace(/\n/g, '\r\n');
  if (code.includes(oldMobileServicesCRLF)) {
    code = code.replace(oldMobileServicesCRLF, newMobileServicesCRLF);
  }
}

// Mobile service links styling on dark container theme
const oldMobileLink = `className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] text-[#334155] hover:text-[#B62825] hover:bg-white font-medium transition-colors border border-transparent hover:border-[#E2E8F0]"`;
const newMobileLink = `className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13px] text-gray-200 hover:text-white bg-[#141822]/80 hover:bg-[#1A202C] font-medium transition-colors border border-[#B62825]/30 hover:border-[#B62825]"`;

if (code.includes(oldMobileLink)) {
  code = code.replace(oldMobileLink, newMobileLink);
}

fs.writeFileSync(filePath, code, 'utf8');
console.log("Successfully updated Navbar.tsx for Idea 08 3D Container Theme!");

