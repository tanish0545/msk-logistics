export interface SubmenuItem {
  label: string;
  path: string;
  description?: string;
}

export interface DropdownItem {
  label: string;
  path: string;
  description: string;
  subItems?: SubmenuItem[];
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
  // Official live vessel tracking website
  externalUrl: 'https://www.marinetraffic.com/',
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
    path: '/vessel-schedule',
    isExternal: false,
  },
  {
    id: 'operations',
    label: 'Operations',
    path: '/operations',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
  },
  {
    id: 'company',
    label: 'Company',
    path: '/company/branches',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Our Clients',
        path: '/company/clients',
        description: 'Exporters, manufacturers & logistics partnerships',
      },
      {
        label: 'Our Staff',
        path: '/company/staff',
        description: 'Field rigging crews & operational specialists',
      },
      {
        label: 'Our Branches',
        path: '/company/branches',
        description: 'Main registered branch & port staging facilities',
        subItems: [
          {
            label: 'Main Branch (Belapur)',
            path: '/company/branches#main-branch',
            description: 'Balaji Bhawan, Sector 11, CBD Belapur, Navi Mumbai',
          },
          {
            label: 'Second Branch (JNPT)',
            path: '/company/branches#second-branch',
            description: 'JNPT Township Colony, Sector - 3, Navi Mumbai',
          },
        ],
      },
    ],
  },
];

export const QUOTE_CTA = {
  path: '/request-quote',
  line1: 'GET A',
  line2: 'QUOTE',
};
