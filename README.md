# MSK Logistics Pvt. Ltd. — Commercial Website

A modern, high-performance, responsive corporate website built for **MSK Logistics Pvt. Ltd.**, a premier industrial logistics service provider specializing in:
- **Export Packaging & Industrial Crating**
- **Container Stuffing & Weight-Balance Coordination**
- **Cargo Lashing and Securing**

Operating from Navi Mumbai, adjacent to the Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva) maritime gateway.

---

## 1. Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler & Dev Server:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7
- **Motion & Micro-interactions:** `motion`
- **Iconography:** Lucide React
- **Design Tokens:**
  - Primary Red: `#B62825`
  - Charcoal: `#343434`
  - Soft Off-White: `#F5F5F3`
  - Hairline Border Gray: `#E2E2E2`
  - Muted Neutral: `#666666`

---

## 2. Project Structure
```
C:\MSK-Logistics
├── public
│   ├── favicon.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images
│   │   ├── logo
│   │   │   └── msk-logistics-logo.png
│   │   ├── services
│   │   │   ├── export-packaging.webp
│   │   │   ├── container-stuffing.webp
│   │   │   ├── cargo-lashing.webp
│   │   │   ├── industrial-cargo-crating.webp
│   │   │   ├── export-pallets.webp
│   │   │   └── container-interior.webp
│   │   └── general
│   │       └── logistics-hero-poster.webp
│   └── videos
│       ├── logistics-hero1.mp4  # Sequence clip 02: Packaging & stuffing prep
│       ├── logistics-hero2.mp4  # Sequence clip 01: Heavy yard operations
│       └── logistics-hero3.mp4  # Sequence clip 03: Port-bound cargo lashing
├── src
│   ├── components
│   │   ├── export-solutions
│   │   │   ├── ComparisonTable.tsx
│   │   │   └── SolutionCards.tsx
│   │   ├── forms
│   │   │   └── QuoteRequestForm.tsx
│   │   ├── hero
│   │   │   ├── HeroVideo.tsx
│   │   │   └── HeroVideoSequence.tsx
│   │   ├── layout
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── services
│   │       └── ServiceCard.tsx
│   ├── data
│   │   └── company.ts
│   ├── pages
│   │   ├── AboutPage.tsx
│   │   ├── CargoLashingPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ContainerStuffingPage.tsx
│   │   ├── ExportPackagingPage.tsx
│   │   ├── ExportPackingSolutionsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── HowItWorksPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── QuoteRequestPage.tsx
│   │   └── ServicesPage.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Installation & Local Development

### Prerequisites
- Node.js >= 20
- npm >= 10

### Installation
```bash
# Navigate to project root
cd C:\MSK-Logistics

# Install dependencies
npm install
```

### Run Local Development Server
```bash
npm run dev
```
The application will be available at:
`http://localhost:5173`

### Production Build
```bash
npm run build
```
Build output is generated into the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 4. The Two Export Packing Arrangements

The website prominently clarifies the two operational models:

### Option A — Complete Export Packing Solution
- **Customer Supplies:** Cargo or manufactured goods to be packed.
- **MSK Arranges:** Container sourcing & positioning (subject to quotation and availability).
- **MSK Performs:** Agreed packaging, container stuffing, and cargo lashing work.
- **Pricing:** Itemized quotation covering container sourcing, positioning fees, and labor/materials.

### Option B — Client-Arranged Container
- **Customer Supplies:** Cargo or goods **AND** the shipping container (sourced via shipping line or leasing provider).
- **MSK Arranges:** No container supply charges.
- **MSK Performs:** Agreed packaging, container stuffing, and cargo lashing on the client's supplied container.
- **Pricing:** Quotation based strictly on packaging materials, stuffing, and lashing labor.

---

## 5. Quote Request Form Integration

The quote request form at `/request-quote` implements a 6-step guided submission workflow:
1. **Arrangement Selection:** Pre-selected via URL parameter (`?solution=complete` or `?solution=client-arranged`).
2. **Company & Contact:** Validates required fields, phone numbers, and email formats.
3. **Cargo Details:** Weight, package count, dimensions, and handling notes.
4. **Conditional Container Step:** Dynamically adjusts required questions based on Option A vs Option B.
5. **Schedule & Location:** Packaging dates and operational facility address.
6. **Review & Consent:** Transparent responsibility check and explicit consent acknowledgement.

### Connecting to a Backend CRM or Email Webhook
To connect real form submissions to a backend server, webhook, or CRM:
1. Open `.env` (or copy `.env.example` to `.env`).
2. Set `VITE_ENQUIRY_API_URL="https://your-api.com/v1/enquiry"`.
3. The form sends a JSON payload via `POST` with all field values, timestamp, and source metadata.
4. If `VITE_ENQUIRY_API_URL` is empty, requests are safely stored in browser local storage (`msk_quote_requests`) and direct phone (`+91 81045 92823`) and email (`accounts@msklogisticsolution.com`) contacts are presented.

---

## 6. Verified Business Information

- **Company Name:** MSK Logistics Pvt. Ltd.
- **Address:** JNPT Township Colony, Sector - 3, Building No. B/48, Office No. 3, Navi Mumbai 400702, Maharashtra, India.
- **Phone:** `+91 81045 92823`
- **Email:** `accounts@msklogisticsolution.com`
- **Maritime Gateway:** Nhava Sheva (JNPT), Navi Mumbai

---

## 7. Media Folders & Branded Watermarking

All photographs and technical graphics are organized into designated public directories:

- `public/images/logo/`: Official client brand logo assets (`msk-logistics-logo.png`).
- `public/images/shipments/flat-rack/`: Flat Rack shipment cargo graphics.
- `public/images/shipments/breakbulk/`: Breakbulk project cargo & heavy lift graphics.
- `public/images/shipments/open-top/`: Open Top overheight cargo graphics.
- `public/images/containers/`: Technical diagrams & photos for 20ft, 40ft, High Cube, Open Top, Flat Rack, and Reefer containers.
- `public/images/warehouse/open/`: Open-yard staging and buffer yard graphics.
- `public/images/warehouse/shaded/`: Covered shed and weather-protected staging graphics.

### MSK Logo Corner Tag (Watermark)
Every shipment gallery and container guide image includes a consistent, non-destructive corner watermark tag implemented via `<BrandedImage />` (`src/components/common/BrandedImage.tsx`). It overlays the authentic MSK logo with a subtle contrast pill, maintaining 100% logo aspect ratio without altering original files or impeding user zoom/lightbox interaction.

---

## 8. Missing Client-Supplied Photographs Checklist

Until genuine on-site project photographs are supplied by the client, the website serves high-fidelity, clearly qualified representative technical graphics with explicit disclaimers. 

The complete programmatic inventory is tracked in [`src/data/assetChecklist.ts`](file:///c:/MSK-Logistics/src/data/assetChecklist.ts):

| Category | Expected Asset Filename | Status | Replacement Requirement |
| :--- | :--- | :--- | :--- |
| **Brand Logo** | `msk-logistics-logo.png` | **Client-Supplied (Active)** | 600px+ transparent PNG (Verified) |
| **Flat Rack Shipment** | `flat-rack-heavy-machinery-lashing.svg` | Representative Graphic | Genuine photo: Heavy machinery on 40ft Flat Rack |
| **Flat Rack Shipment** | `flat-rack-oversized-cargo-chocking.svg` | Representative Graphic | Genuine photo: Cylindrical boiler/vessel on timber cradle |
| **Flat Rack Shipment** | `flat-rack-structural-skids.svg` | Representative Graphic | Genuine photo: Modular structural skids on Flat Rack |
| **Breakbulk Shipment** | `breakbulk-heavy-equipment-rigging.svg` | Representative Graphic | Genuine photo: Non-containerized heavy rigging & deck lashing |
| **Breakbulk Shipment** | `breakbulk-project-cargo-stowage.svg` | Representative Graphic | Genuine photo: Vessel cargo hold stowage & wire lashing |
| **Breakbulk Shipment** | `breakbulk-industrial-skidded-units.svg` | Representative Graphic | Genuine photo: Transformer / power skid on multi-axle trailer |
| **Open Top Shipment** | `open-top-overheight-cargo-tarpaulin.svg` | Representative Graphic | Genuine photo: Over-height cargo with TIR tarpaulin lashing |
| **Open Top Shipment** | `open-top-crane-loading-machinery.svg` | Representative Graphic | Genuine photo: Vertical overhead crane loading |
| **Open Top Shipment** | `open-top-bow-securing-lashing.svg` | Representative Graphic | Genuine photo: Roof bow securing and tarpaulin fitting |
| **Container Guide** | `20ft-standard-dry-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Container Guide** | `40ft-standard-dry-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Container Guide** | `40ft-high-cube-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Container Guide** | `open-top-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Container Guide** | `flat-rack-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Container Guide** | `reefer-container.svg` | Representative Technical Drawing | Client-supplied container photo (optional) |
| **Open Warehouse** | `open-yard-staging-area.svg` | Representative Graphic | Authentic photo of client's open yard facility |
| **Open Warehouse** | `open-yard-container-buffer.svg` | Representative Graphic | Authentic photo of client's container buffer yard |
| **Shaded Warehouse** | `shaded-packing-shed.svg` | Representative Graphic | Authentic photo of covered packing shed |
| **Shaded Warehouse** | `covered-cargo-staging-bay.svg` | Representative Graphic | Authentic photo of covered cargo staging bay |

---

## 9. Client Confirmations Required Before Launch

1. **Vessel Schedule External URL:**
   - Client must provide the approved vessel-tracking portal URL (e.g. shipping line portal, port tracking dashboard, or terminal schedule).
   - Once provided, configure `VESSEL_SCHEDULE_CONFIG.externalUrl` in [`src/components/navigation/navConfig.ts`](file:///c:/MSK-Logistics/src/components/navigation/navConfig.ts). The navbar will immediately route directly to the external link in a secure new tab.
2. **Warehouse Services & Facilities:**
   - Confirm whether Open Yard and Shaded Warehouse staging are actively commercialized services or staging grounds for export packing.
   - Confirm exact yard addresses, security certifications, and operating hours before making active service promises.
3. **Genuine Project Cargo Photographs:**
   - Supply authentic project photos for Flat Rack, Breakbulk, and Open Top jobs to replace representative graphics.
4. **Operations & Knowledge Page Scope:**
   - Approve final editorial and operational scope for the Operations and Knowledge sections.
5. **Entity Legal Name:**
   - Clarify preference between "MSK Logistics Pvt. Ltd." (corporate title) and "MSK Logistic Solution" (artwork wording on logo).
