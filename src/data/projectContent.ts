import {
  ChartLine,
  Droplets,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Leaf,
  Ruler,
  Thermometer,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Metric = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type TheoryItem = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export type Calculation = {
  title: string;
  purpose: string;
  result: string;
  lines: string[];
};

export type Equipment = {
  name: string;
  specs: string[];
  icon: LucideIcon;
};

export type CostItem = {
  item: string;
  value: string;
  calculation: string;
};

export const navItems = [
  { href: '#top', label: 'Cover' },
  { href: '#results', label: 'Results' },
  { href: '#overview', label: 'Process' },
  { href: '#theory', label: 'Theory' },
  { href: '#solution', label: 'Solution' },
  { href: '#design', label: 'Design' },
  { href: '#equipment', label: 'Equipment' },
  { href: '#purchase', label: 'Purchase' },
  { href: '#economics', label: 'Economics' },
  { href: '#team', label: 'Team' },
];

export const heroMetrics: Metric[] = [
  {
    label: 'Production capacity',
    value: '100,000 L/day',
    note: 'Corn ethanol distillation unit',
    icon: Factory,
  },
  {
    label: 'Distillate flow',
    value: '72.464 kmol/h',
    note: 'xD = 0.895',
    icon: Droplets,
  },
  {
    label: 'Column height',
    value: '14 m',
    note: '0.5 m tray spacing',
    icon: Ruler,
  },
  {
    label: 'Tray diameter',
    value: '1.45 m',
    note: 'Sieve tray column',
    icon: Gauge,
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Grinding',
    detail: 'Corn is ground into meal to release starch for downstream conversion.',
  },
  {
    title: 'Liquefaction',
    detail: 'Heat and enzymes break starch into soluble dextrins.',
  },
  {
    title: 'Saccharification',
    detail: 'Glucoamylase converts dextrins into fermentable glucose.',
  },
  {
    title: 'Fermentation',
    detail: 'Yeast converts glucose into ethanol and carbon dioxide.',
  },
  {
    title: 'Distillation',
    detail: 'Fractional distillation concentrates ethanol from the fermentation broth.',
  },
  {
    title: 'Co-product Use',
    detail: 'Remaining solids are processed into distillers dried grains with solubles.',
  },
];

export const theoryItems: TheoryItem[] = [
  {
    title: 'Corn as feedstock',
    detail:
      'Corn is suitable for bioethanol because it is abundant and rich in starch, making it efficient for sustainable fuel production.',
    icon: Leaf,
  },
  {
    title: 'Fractional distillation',
    detail:
      'The column separates ethanol and water through repeated vapor-liquid contact on trays, supported by reflux.',
    icon: Waves,
  },
  {
    title: 'Azeotrope limit',
    detail:
      'Ethanol and water form an azeotropic mixture near 95.6% ethanol, so conventional distillation has a practical purity limit.',
    icon: FlaskConical,
  },
  {
    title: 'McCabe-Thiele design',
    detail:
      'The graphical method determines theoretical stages from equilibrium and operating lines for the ethanol-water system.',
    icon: ChartLine,
  },
];

export const calculations: Calculation[] = [
  {
    title: 'Ethanol Amount',
    purpose: 'Convert daily ethanol capacity into molar distillate flow.',
    result: 'D = 72.464 kmol/h',
    lines: [
      'Capacity = 100,000 L/day ethanol',
      'Density estimate = 0.8 g/mL',
      'M ethanol = 46.07 g/mol',
      'D = 100,000 L/day x 0.8 g/mL x 10^3 mL/L x 1 mol/46 g x 1 kmol/10^3 mol x 1 day/24 h',
      'D = 72.464 kmol/h',
    ],
  },
  {
    title: 'Mole Fraction Calculations',
    purpose: 'Convert mass percentages into ethanol mole fractions for feed, distillate and bottom streams.',
    result: 'xF = 0.065, xD = 0.895, xB = 0.0039',
    lines: [
      'X = n ethanol / (n ethanol + n water)',
      'xF = (15/46.07) / [(15/46.07) + (85/18.02)] = 0.065',
      'xD = (95.6/46.07) / [(95.6/46.07) + (4.4/18.02)] = 0.895',
      'xB = (1/46.07) / [(1/46.07) + (99/18.02)] = 0.0039',
    ],
  },
  {
    title: 'Overall Mass Balance',
    purpose: 'Find feed and bottom stream flow rates from component balance.',
    result: 'F = 1056.84 kmol/h, B = 984.37 kmol/h',
    lines: [
      'F = D + B',
      'F x xF = (D x xD) + (B x xB)',
      '(72.464 + B) x 0.065 = (72.464 x 0.895) + (B x 0.0039)',
      'B = 984.37 kmol/h',
      'F = 1056.84 kmol/h',
    ],
  },
  {
    title: 'Reflux Ratio',
    purpose: 'Select an operating reflux ratio from the minimum reflux rate.',
    result: 'Rmin = 3.1, Ropt = 3.41',
    lines: [
      'From McCabe-Thiele graph: xD / (Rmin + 1) = 0.2183',
      '0.895 / (Rmin + 1) = 0.2183',
      'Rmin = 3.1',
      'Rmax = 2 x Rmin = 6.2',
      'Ropt = 1.1 x Rmin = 3.41',
    ],
  },
  {
    title: 'Operating Lines',
    purpose: 'Define rectifying and stripping section lines for stage construction.',
    result: 'Rectifying: y = 0.773x + 0.203; Stripping: y = 4.08x - 0.012',
    lines: [
      'Rectifying line: y = [R x / (R + 1)] + [xD / (R + 1)]',
      'y = 3.41x / 4.41 + 0.895 / 4.41',
      'y = 0.773x + 0.203',
      'L = R x D = 247.1 kmol/h',
      'V = L + D = 319.57 kmol/h',
      "L' = L + F = 1303.94 kmol/h",
      "Stripping line: y = L'x / V - BxB / V = 4.08x - 0.012",
    ],
  },
  {
    title: 'Tray Diameter',
    purpose: 'Estimate tray diameter from vapor volumetric flow and density relation.',
    result: 'D tray = 1.45 m',
    lines: [
      'V = (R + 1)D = (3.41 + 1) x 72.464 = 319.57 kmol/h',
      'MW mixture = (0.501 x 46.07) + (0.499 x 18.02) = 32.1 g/mol',
      'Vapor mass flow = 319.57 kmol/h x 32.1 kg/kmol = 10258.2 kg/h = 2.8494 kg/s',
      'rho vapor = 0.8 kg/m3; rho liquid = 950 kg/m3',
      'Qv = 2.8495 / 0.8 = 3.562 m3/s',
      'Diameter = 1.45 m',
    ],
  },
  {
    title: 'Tray Number',
    purpose: 'Convert theoretical trays from McCabe-Thiele into actual trays.',
    result: 'N actual = 25 trays',
    lines: [
      'Theoretical tray number from McCabe-Thiele diagram = 20',
      'Tray efficiency E0 = 0.8',
      'N actual = Number of theoretical trays / E0',
      'N actual = 20 / 0.8 = 25',
    ],
  },
  {
    title: 'Column Height',
    purpose: 'Calculate total column height from actual trays, tray spacing and clearances.',
    result: 'H = 14 m',
    lines: [
      'H = [(N - 1) x S] + H clearance',
      'N = 25 actual trays',
      'S = 0.5 m tray spacing',
      'H clearance = 2 m',
      'H = [(25 - 1) x 0.5] + 2 = 14 m',
    ],
  },
];

export const equipment: Equipment[] = [
  {
    name: 'Distillation Column',
    icon: Factory,
    specs: [
      'Stainless Steel 304/316',
      'Column diameter = 1.45 m',
      'Column height = 14 m',
      'Tray number = 25',
      'Continuous sieve tray column',
      'Atmospheric pressure around 101.3 kPa',
    ],
  },
  {
    name: 'Condenser',
    icon: Thermometer,
    specs: ['Total condenser', 'Shell-and-tube heat exchanger', 'Cooling water as medium'],
  },
  {
    name: 'Reflux System',
    icon: Droplets,
    specs: ['Liquid reflux', 'Return location at top tray', 'Ropt = 3.41'],
  },
  {
    name: 'Reboiler',
    icon: Flame,
    specs: ['Kettle reboiler', 'Saturated steam heating medium', 'Bottom temperature range 95-105 C'],
  },
  {
    name: 'Control Valves',
    icon: Gauge,
    specs: ['Distillate control valve', 'Steam flow control valve', 'Bottom product control valve'],
  },
];

export const costs: CostItem[] = [
  {
    item: 'Equipment cost',
    value: '68,775,000.00 TL',
    calculation: '1,500,000.00 USD x 45.85 TL',
  },
  {
    item: 'Total direct cost',
    value: '209,048,490.00 TL',
    calculation: 'CP + CM + CL',
  },
  {
    item: 'Total indirect cost',
    value: '74,670,393.00 TL',
    calculation: 'CFIT + CO + CE',
  },
  {
    item: 'Bare module cost',
    value: '283,718,883.00 TL',
    calculation: 'Direct + indirect project expenses',
  },
  {
    item: 'Total module cost',
    value: '334,788,282.00 TL',
    calculation: 'CBM + contingency and fee',
  },
];

export const teamMembers = [
  'Ayten Almina Pakel - 21290998',
  'Ebru Kocabas - 21290423',
  'Pelin Turan - 22290541',
  'Zeynep Irem Celik - 21290624',
  'Zeynep Sena Beyazkaya - 21290566',
];

export const designChecks = [
  'Original drawing is inserted as a PNG asset, not redrawn.',
  'All labels, colors, arrows and measurements remain unchanged.',
  'The white technical drawing area is preserved for readability.',
  'Zoom view is provided for mobile and presentation use.',
];

export type DetailedSpecItem = {
  parameter: string;
  value: string;
};

export type DetailedSpec = {
  category: string;
  items: DetailedSpecItem[];
};

export const detailedSpecs: DetailedSpec[] = [
  {
    category: 'Distillation Column',
    items: [
      { parameter: 'Material of Construction', value: 'Stainless Steel (304 / 316)' },
      { parameter: 'Column Diameter', value: '1.45 m' },
      { parameter: 'Column Height', value: '14.0 m' },
      { parameter: 'Tray Spacing', value: '0.5 m' },
      { parameter: 'Tray Number', value: '25' },
      { parameter: 'Feed Tray Location', value: 'Middle Section (Tray 12)' },
      { parameter: 'Production Capacity', value: '1,000 - 100,000 L/day (96 - 99.9% Ethanol)' },
      { parameter: 'Type', value: 'Continuous Tray Distillation Column' },
      { parameter: 'Tray Type', value: 'Sieve Trays' },
      { parameter: 'Operating Pressure', value: 'Atmospheric (101.3 kPa)' },
      { parameter: 'Operating Temp. (Top)', value: '78 - 85 °C' },
      { parameter: 'Operating Temp. (Bottom)', value: '95 - 105 °C' },
      { parameter: 'Average Column Temp.', value: '80 °C' },
    ],
  },
  {
    category: 'Condenser (Total Condenser)',
    items: [
      { parameter: 'Type', value: 'Shell-and-Tube Heat Exchanger' },
      { parameter: 'Cooling Medium', value: 'Cooling Water' },
    ],
  },
  {
    category: 'Reflux System',
    items: [
      { parameter: 'Reflux Phase', value: 'Liquid' },
      { parameter: 'Reflux Return Location', value: 'Top Tray' },
    ],
  },
  {
    category: 'Reboiler',
    items: [
      { parameter: 'Type', value: 'Kettle Reboiler' },
      { parameter: 'Heating Medium', value: 'Saturated Steam' },
    ],
  },
  {
    category: 'Control Valves',
    items: [
      { parameter: 'Valves Included', value: 'Distillate Control Valve, Steam Flow Control Valve, Bottom Product Control Valve' },
    ],
  },
];
