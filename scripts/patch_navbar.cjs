const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, '..', 'src', 'components', 'navigation', 'Navbar.tsx');
let code = fs.readFileSync(navbarPath, 'utf8');

// 1. Add imports if not present
if (!code.includes("Services3DHubDropdown")) {
  code = code.replace(
    "import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';",
    "import { ChevronDown, ChevronRight, Menu, X, Ship, Plane, Box, Layers, Link2, AlertTriangle } from 'lucide-react';\r\nimport { Services3DHubDropdown } from './Services3DHubDropdown';\r\nimport { CartingDropdownSection } from './CartingDropdownSection';"
  );
}

// 2. Replace desktop services dropdown
const desktopStart = code.indexOf('{isServices ? (');
const desktopEnd = code.indexOf('/* COMPANY OVERVIEW DROPDOWN');

if (desktopStart !== -1 && desktopEnd !== -1) {
  // Also adjust the parent div class for alignment
  const parentDivSnippet = code.slice(desktopStart - 250, desktopStart);
  const updatedParentSnippet = parentDivSnippet.replace(
    "${isCompany ? 'right-0 min-w-[310px]' : 'left-0 w-[360px]'",
    "${isCompany ? 'right-0 min-w-[310px]' : 'left-1/2 -translate-x-[36%] w-auto'"
  );
  code = code.slice(0, desktopStart - 250) + updatedParentSnippet + code.slice(desktopStart);

  // Recalculate indexes after shift
  const newStart = code.indexOf('{isServices ? (');
  const newEnd = code.indexOf('/* COMPANY OVERVIEW DROPDOWN');

  const replacement = `{isServices ? (
                        /* SERVICES DROPDOWN — OPTION 01 INTERACTIVE LOGISTICS HUB (3D HUB) */
                        <Services3DHubDropdown onClose={() => setServicesDropdownOpen(false)} />
                      ) : (\r\n                        `;

  code = code.slice(0, newStart) + replacement + code.slice(newEnd);
  console.log('[SUCCESS] Replaced desktop services dropdown with Option 01 3D Hub.');
} else {
  console.error('[ERROR] Could not find desktop services dropdown block.');
}

// 3. Replace mobile services block
const mobileStart = code.indexOf('{isServices ? (', code.indexOf('isSubOpen && ('));
const mobileEnd = code.indexOf('/* MOBILE COMPANY VIEW (PRESERVED) */');

if (mobileStart !== -1 && mobileEnd !== -1) {
  const mobileReplacement = `{isServices ? (
                          /* MOBILE SERVICES VIEW WITH RESPONSIVE STACK & CARTING TREE */
                          <div className="space-y-3 py-1">
                            <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold px-2">
                              Specialized Services
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {[
                                { name: 'Ocean Cargo', path: '/services/ocean-cargo', icon: Ship },
                                { name: 'Air Cargo', path: '/services/air-cargo', icon: Plane },
                                { name: 'Container Stuffing Logistics', path: '/services/container-stuffing', icon: Box },
                                { name: 'Special Project Cargo Handling', path: '/services/special-project', icon: Layers },
                                { name: 'Cargo Lashing', path: '/services/cargo-lashing', icon: Link2 },
                                { name: 'Hazardous Cargo', path: '/services/hazardous-cargo', icon: AlertTriangle },
                              ].map((s) => {
                                const Icon = s.icon;
                                return (
                                  <Link
                                    key={s.path}
                                    to={s.path}
                                    className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] text-[#334155] hover:text-[#B62825] hover:bg-white font-medium transition-colors border border-transparent hover:border-[#E2E8F0]"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="w-6 h-6 rounded-full bg-red-50 text-[#B62825] flex items-center justify-center shrink-0">
                                      <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate">{s.name}</span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#E2E2E2] my-2" />

                            {/* Mobile Carting Tree (Exact Preserved Component) */}
                            <CartingDropdownSection />

                            {/* Divider */}
                            <div className="border-t border-[#E2E2E2] my-2" />

                            <Link
                              to="/services"
                              className="block py-1 px-2 text-[13px] font-semibold text-[#B62825] hover:text-[#9E2220]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              View All Services Directory &rarr;
                            </Link>
                          </div>
                        ) : (\r\n                          `;

  code = code.slice(0, mobileStart) + mobileReplacement + code.slice(mobileEnd);
  console.log('[SUCCESS] Replaced mobile services block.');
} else {
  console.error('[ERROR] Could not find mobile services block.');
}

fs.writeFileSync(navbarPath, code, 'utf8');
console.log('[DONE] Navbar.tsx updated successfully.');

