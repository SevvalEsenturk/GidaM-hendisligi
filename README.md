# Corn Bioethanol Distillation Unit Design (CORN4CES)

An interactive technical design report and commercial configurator for a corn-based bioethanol distillation unit, designed as a Food Engineering project by **Group 4**.

This web application presents key design calculations, McCabe-Thiele stage constructions, chemical process steps, equipment hardware specifications, economic summaries, and a direct inquiry configurator for purchasing industrial distillation columns.

---

## 👥 Project Team (Group 4)
* **Ayten Almina Pakel** - 21290998
* **Ebru Kocabaş** - 21290423
* **Pelin Turan** - 22290541
* **Zeynep İrem Çelik** - 21290624
* **Zeynep Sena Beyazkaya** - 21290566

---

## 📊 Technical Specifications & Design Basis

The distillation unit is designed to process corn starch fermentation output into high-purity ethanol using fractional distillation.

### 1. Key Design Metrics
| Parameter | Value | Note |
|---|---|---|
| **Production Capacity** | 100,000 L/day | Bioethanol target basis |
| **Feed Purity ($x_F$)** | 0.065 | Ethanol mole fraction in feed |
| **Distillate Purity ($x_D$)** | 0.895 | Near the azeotrope limit (95.6 wt%) |
| **Bottom Purity ($x_B$)** | 0.0039 | Ethanol mole fraction in waste |
| **Reflux Ratio ($R_{opt}$)** | 3.41 | Selected operating reflux (1.1 $\times$ $R_{min}$) |
| **Column Height ($H$)** | 14.0 m | With 0.5 m tray spacing + 2 m clearance |
| **Column Diameter ($D$)** | 1.45 m | Sieve tray distillation design |
| **Tray Count ($N_{actual}$)** | 25 Trays | 20 theoretical stages at 80% tray efficiency |

### 2. Process Route Steps
1. **Grinding:** Corn is ground into meal to release starch for downstream conversion.
2. **Liquefaction:** Heat and alpha-amylase enzymes break starch into soluble dextrins.
3. **Saccharification:** Glucoamylase converts dextrins into fermentable glucose.
4. **Fermentation:** Yeast converts glucose into ethanol and carbon dioxide.
5. **Distillation:** Fractional distillation concentrates ethanol from the fermentation broth.
6. **Co-product Use:** Remaining solids are processed into DDGS (Distillers Dried Grains with Solubles).

---

## ⚙️ Equipment Hardware Specifications
* **Distillation Column:** Stainless Steel 304/316 construction, sieve trays, atmospheric pressure operating around 101.3 kPa, top temperature 78–85 °C, bottom temperature 95–105 °C.
* **Condenser:** Total condenser, shell-and-tube heat exchanger, cooling water as medium.
* **Reflux System:** Liquid reflux phase, returned to the top tray.
* **Reboiler:** Kettle reboiler utilizing saturated steam heating.
* **Control Valves:** System includes distillate, steam flow, and bottom product control valves.

---

## 💰 Capital Cost Summary
* **Equipment Cost:** $1,500,000.00 USD (~68,775,000.00 TL)
* **Total Module Cost (CBM):** 334,788,282.00 TL (Including direct, indirect project expenses, contingency, and fees).

---

## 🚀 How to Run the Project Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes bundled with Node.js)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/SevvalEsenturk/GidaM-hendisligi.git
   cd GidaM-hendisligi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser to view the interactive site.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

To observe and view this project live directly on your GitHub repository page:

1. **Install the `gh-pages` deployment tool:**
   ```bash
   npm install gh-pages --save-dev
   ```
2. **Update `vite.config.ts`:**
   Add `base: "/GidaM-hendisligi/"` inside your Vite config.
3. **Add Deploy Scripts in `package.json`:**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. **Deploy:**
   Run the deploy command:
   ```bash
   npm run deploy
   ```
5. **Observe online:**
   Go to your repository settings on GitHub, select **Pages** on the left menu, and you will see your live site link (usually: `https://sevalesenturk.github.io/GidaM-hendisligi/`).
