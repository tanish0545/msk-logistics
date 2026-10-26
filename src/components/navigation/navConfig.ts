export interface DropdownItem {
  label: string;
  path: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  isExternal?: boolean;
  externalUrl?: string | null;
  target?: string;
}

/**
 * Centralized configuration for Vessel Schedule external tracking URL.
 * When client approves and supplies the exact vessel-tracking or terminal schedule URL,
 * update `externalUrl` below.
 * When `externalUrl` is null, the system guides users to the port terminal advisory portal.
 */
export const VESSEL_SCHEDULE_CONFIG = {
  label: 'Vessel Schedule',
  // Client-approved external vessel-tracking or terminal schedule URL
  // Temporary configuration: JNPT / Nhava Sheva official port terminal directory
  externalUrl: 'https://www.jnport.gov.in/',
  fallbackPath: '/vessel-schedule',
  isExternal: false,
  openInNewTab: true,
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Export Packaging',
        path: '/services/export-packaging',
        description: 'Industrial timber crating, skidding & barrier foil wrapping',
      },
      {
        label: 'Container Stuffing',
        path: '/services/container-stuffing',
        description: 'Precision weight distribution & multi-axle loading plans',
      },
      {
        label: 'Cargo Lashing & Securing',
        path: '/services/cargo-lashing',
        description: 'High-tensile straps, steel wire, turnbuckles & timber chocking',
      },
      {
        label: 'Export Packing Solutions',
        path: '/export-packing-solutions',
        description: 'Complete container arrangement vs client-arranged container',
      },
    ],
  },
  {
    id: 'import-export',
    label: 'Import & Export',
    path: '/import-export',
  },
  {
    id: 'container-guide',
    label: 'Container Guide',
    path: '/container-guide',
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    path: '/warehouse',
  },
  {
    id: 'vessel-schedule',
    label: 'Vessel Schedule',
    path: VESSEL_SCHEDULE_CONFIG.externalUrl || VESSEL_SCHEDULE_CONFIG.fallbackPath,
    isExternal: Boolean(VESSEL_SCHEDULE_CONFIG.externalUrl),
    externalUrl: VESSEL_SCHEDULE_CONFIG.externalUrl,
    target: VESSEL_SCHEDULE_CONFIG.externalUrl ? '_blank' : undefined,
  },
  {
    id: 'operations',
    label: 'Operations',
    path: '/operations',
  },
  {
    id: 'knowledge',
    label: 'Knowledge',
    path: '/knowledge',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
  },
];

export const QUOTE_CTA = {
  path: '/request-quote',
  line1: 'GET A',
  line2: 'QUOTE',
};
