import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FlaskConical,
  Maximize2,
  Menu,
  Microscope,
  X,
  Send,
  MessageSquare,
  Award,
} from 'lucide-react';
import {
  calculations,
  costs,
  designChecks,
  equipment,
  heroMetrics,
  navItems,
  processSteps,
  teamMembers,
  theoryItems,
  detailedSpecs,
} from './data/projectContent';

import designImage from './assets/distillation-column-original.png';
import graphImage from './assets/mccabe-thiele-diagram.png';
import renderImage from './assets/distillation-unit-render.png';
import detailImage from './assets/distillation-unit-detail.png';
import actualImage from './assets/distillation-unit-actual.jpg';

function App() {
  const [imageOpen, setImageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Product Purchase interactive states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [material, setMaterial] = useState<'SS304' | 'SS316'>('SS304');
  const [capacity, setCapacity] = useState<'10k' | '50k' | '100k'>('100k');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to Shandong Jinta Machinery Group Co., Ltd. I can help you with specifications, pricing, and shipping for our Bioethanol Distillation Units. How can I help you today?',
      time: '02:30',
    },
  ]);

  const galleryImages = [
    { url: actualImage, alt: 'Actual Distillation Column Installation' },
    { url: renderImage, alt: 'Industrial Distillation Plant 3D Render' },
    { url: designImage, alt: 'Proposed Distillation Column Technical Drawing' },
    { url: detailImage, alt: 'Distillation Column Stainless Steel Piping Detail' },
    { url: graphImage, alt: 'Supporting McCabe-Thiele Calculations Graph' },
  ];

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    let base = 1500000;
    if (capacity === '50k') base = 1000000;
    if (capacity === '10k') base = 650000;
    
    let materialAdder = material === 'SS316' ? 350000 : 0;
    if (capacity === '50k' && material === 'SS316') materialAdder = 250000;
    if (capacity === '10k' && material === 'SS316') materialAdder = 150000;

    return base + materialAdder;
  }, [capacity, material]);

  const priceDisplay = useMemo(() => {
    if (capacity === '100k') return 'US$1,500,000.00-3,000,000.00';
    if (capacity === '50k') return 'US$1,000,000.00-1,800,000.00';
    return 'US$650,000.00-1,100,000.00';
  }, [capacity]);

  const capacityText = useMemo(() => {
    if (capacity === '100k') return '100,000 L/day';
    if (capacity === '50k') return '50,000 L/day';
    return '10,000 L/day';
  }, [capacity]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setInquirySubmitted(true);
    }, 1200);
  };

  const suggestedQuestions = [
    'What is the delivery time?',
    'Can I customize the tray design?',
    'Are you an audited supplier?',
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text, time: timeStr };
    
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Thank you for your message! Our sales engineer will get back to you shortly with detailed files and drawings. You can also send an inquiry via our form for an official quote.";
      const query = text.toLowerCase();
      
      if (query.includes('delivery') || query.includes('time') || query.includes('how long')) {
        botResponse = "Our standard production time is 60–90 days depending on the customization options. Shipping to Europe/America takes approximately 20–30 days.";
      } else if (query.includes('tray') || query.includes('sieve') || query.includes('design') || query.includes('custom')) {
        botResponse = "Yes! We support sieve trays, bubble cap trays, and valve trays. Our engineering team can adapt the tray number and spacing to your specific purity requirements (up to 99.9% bioethanol).";
      } else if (query.includes('audited') || query.includes('gold') || query.includes('certific') || query.includes('who are')) {
        botResponse = "Yes, Shandong Jinta Machinery Group is a Gold Member since 2014 and has been audited by leading certification bodies. We have over 560 employees, ISO9001 and ASME certifications, and 20+ years of experience.";
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse, time: timeStr }]);
      setIsTyping(false);
      
      // Auto-scroll chat container to bottom
      setTimeout(() => {
        const container = document.getElementById('chat-messages-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 50);
    }, 1000);
  };


  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    document.body.style.overflow = imageOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [imageOpen]);

  const leadingCalculations = useMemo(() => calculations.slice(0, 3), []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="scroll-meter" style={{ width: `${scrollProgress}%` }} />
        <a className="brand" href="#top" aria-label="CORN4CES home">
          <span className="brand-mark">C4</span>
          <span>
            <strong>CORN4CES</strong>
            <small>Technical Design Report</small>
          </span>
        </a>

        <button
          className="icon-button menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <nav className={menuOpen ? 'nav-list is-open' : 'nav-list'} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="deck-flow" id="top">
        <section className="slide hero-section cover-slide">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="slide-topline cover-topline">
                <span>Section 01</span>
                <strong>Project cover</strong>
              </div>
              <p className="eyebrow">Food engineering project presentation</p>
              <h1>Corn Bioethanol Distillation Unit Design</h1>
              <p className="hero-lede">
                A technical site for the CORN4CES project: converting corn-based fermentation output
                into high-purity ethanol using fractional distillation, McCabe-Thiele design and
                standard process calculations.
              </p>
              <div className="hero-actions" aria-label="Primary sections">
                <a className="primary-link" href="#results">
                  Explore Design <ChevronRight size={18} />
                </a>
                <a className="secondary-link" href="#design">
                  Open design drawing <ArrowUpRight size={17} />
                </a>
              </div>
            </div>

            <div className="hero-panel" aria-label="Project design basis">
              <div className="panel-kicker">
                <Microscope size={18} />
                Design basis
              </div>
              <dl>
                <div>
                  <dt>Feed</dt>
                  <dd>xF = 0.065</dd>
                </div>
                <div>
                  <dt>Distillate</dt>
                  <dd>xD = 0.895</dd>
                </div>
                <div>
                  <dt>Bottom</dt>
                  <dd>xB = 0.0039</dd>
                </div>
                <div>
                  <dt>Reflux</dt>
                  <dd>Ropt = 3.41</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="slide content-section metric-slide results-slide" id="results" aria-label="Key design metrics">
          <div className="slide-topline">
            <span>Section 02</span>
            <strong>Key results</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">Design outcome</p>
            <h2>The final column dimensions are ready for presentation</h2>
            <p>
              This slide gives the audience the answer first: production basis, product flow,
              column height and tray diameter. The following slides explain how these values were
              obtained.
            </p>
          </div>

          <div className="metric-band">
            {heroMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article className="metric-card" key={metric.label}>
                  <Icon size={22} />
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.note}</small>
                </article>
              );
            })}
          </div>

          <div className="speaker-note">
            <span>Design Insight</span>
            <p>
              We lead with key capacity and final column dimensions to establish the engineering target.
              The subsequent sections outline the chemical process, theoretical basis, and calculations.
            </p>
          </div>
        </section>

        <section className="slide content-section process-slide" id="overview">
          <div className="slide-topline">
            <span>Section 03</span>
            <strong>Process route</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">01 / Process overview</p>
            <h2>From corn starch to distillate ethanol</h2>
            <p>
              The project follows the industrial route for corn ethanol: starch conversion,
              fermentation and purification. The design site keeps the process visible before moving
              into the engineering calculations.
            </p>
          </div>

          <div className="process-track">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="slide content-section muted-section theory-slide" id="theory">
          <div className="slide-topline">
            <span>Section 04</span>
            <strong>Separation basis</strong>
          </div>
          <div className="section-heading compact">
            <p className="eyebrow">02 / Distillation theory</p>
            <h2>The separation logic behind the design</h2>
          </div>

          <div className="theory-grid">
            {theoryItems.map((item) => {
              const Icon = item.icon;
              return (
                <article className="theory-card" key={item.title}>
                  <Icon size={23} />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="slide content-section split-section solution-slide" id="solution">
          <div className="slide-topline">
            <span>Section 05</span>
            <strong>Calculation defense</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">03 / Solution area</p>
            <h2>Engineering calculations, organized for reading</h2>
            <p>
              The calculation section is intentionally structured like a technical defense: basis,
              balance, reflux, operating lines and final column dimensions.
            </p>
          </div>

          <div className="calculation-highlight">
            {leadingCalculations.map((calc) => (
              <article className="result-card" key={calc.title}>
                <span>{calc.title}</span>
                <strong>{calc.result}</strong>
                <p>{calc.purpose}</p>
              </article>
            ))}
          </div>

          <div className="solution-grid">
            <div className="formula-list">
              {calculations.map((calc, index) => (
                <details className="formula-card" key={calc.title} open={index < 2}>
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{calc.title}</h3>
                      <p>{calc.purpose}</p>
                    </div>
                    <strong>{calc.result}</strong>
                  </summary>
                  <ol>
                    {calc.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>

            <aside className="graph-panel" aria-label="McCabe-Thiele diagram">
              <div>
                <p className="eyebrow">Supporting figure</p>
                <h3>McCabe-Thiele diagram</h3>
                <p>
                  Used to read the theoretical tray count and minimum reflux basis. It supports the
                  solution, while the proposed design drawing remains the primary visual.
                </p>
              </div>
              <img src={graphImage} alt="McCabe-Thiele diagram used for the corn ethanol distillation calculation" />
            </aside>
          </div>
        </section>

        <section className="slide content-section design-section design-slide" id="design">
          <div className="slide-topline">
            <span>Section 06</span>
            <strong>Proposed design</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">04 / Recommended design</p>
            <h2>Proposed distillation unit drawing</h2>
            <p>
              This drawing is inserted directly from the submitted Word document. It is preserved as
              the original PNG asset; the site only frames it and adds a zoom control.
            </p>
          </div>

          <div className="drawing-layout">
            <figure className="drawing-frame">
              <img src={designImage} alt="Original proposed distillation column design drawing" />
              <figcaption>Original proposed design drawing, unchanged.</figcaption>
            </figure>

            <div className="drawing-notes">
              <button className="primary-link button-link" type="button" onClick={() => setImageOpen(true)}>
                <Maximize2 size={18} />
                View larger
              </button>
              {designChecks.map((check) => (
                <p key={check}>
                  <CheckCircle2 size={18} />
                  {check}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="slide content-section muted-section equipment-slide" id="equipment">
          <div className="slide-topline">
            <span>Section 07</span>
            <strong>Equipment package</strong>
          </div>
          <div className="section-heading compact">
            <p className="eyebrow">05 / Equipment and specifications</p>
            <h2>Hardware defined by the column calculation</h2>
          </div>

          <div className="equipment-grid">
            {equipment.map((item) => {
              const Icon = item.icon;
              return (
                <article className="equipment-card" key={item.name}>
                  <div>
                    <Icon size={23} />
                    <h3>{item.name}</h3>
                  </div>
                  <ul>
                    {item.specs.map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="slide content-section purchase-section purchase-slide" id="purchase">
          <div className="slide-topline">
            <span>Section 08</span>
            <strong>Direct Purchase / Inquiry</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">07 / Commercial Configurator</p>
            <h2>Order Bioethanol Distillation System</h2>
            <p>
              Direct source from audited manufacturing facilities. Configure unit specifications, calculate estimated costs, and request custom proposals.
            </p>
          </div>

          <div className="product-layout">
            {/* Left: Gallery */}
            <div className="product-gallery">
              <div className="gallery-main-wrap">
                <img src={galleryImages[activeImageIndex].url} alt={galleryImages[activeImageIndex].alt} className="gallery-main-img" />
                <button className="gallery-nav-btn prev" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft size={20} />
                </button>
                <button className="gallery-nav-btn next" onClick={nextImage} aria-label="Next image">
                  <ChevronRight size={20} />
                </button>
                <button className="gallery-zoom-btn" onClick={() => setZoomOpen(true)} title="Zoom image">
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="gallery-thumbnails">
                {galleryImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`gallery-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    type="button"
                  >
                    <img src={img.url} alt={img.alt} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Configurator */}
            <div className="product-info-panel">
              <span className="product-tag">Industrial Equipment</span>
              <h3 className="product-title">Alcohol Distillery Unit (material: corn, tapioca, potato)</h3>
              
              <div className="product-price-section">
                <div className="price-lead">
                  <span>Price Range</span>
                  <strong>{priceDisplay}</strong>
                </div>
                <div className="moq-badge">1 Piece (MOQ)</div>
              </div>

              {/* Dynamic Configurator */}
              <div className="product-configurator">
                <div className="config-group">
                  <label>Material Option:</label>
                  <div className="config-options">
                    <button 
                      type="button"
                      className={`config-btn ${material === 'SS304' ? 'active' : ''}`}
                      onClick={() => setMaterial('SS304')}
                    >
                      Stainless Steel 304
                    </button>
                    <button 
                      type="button"
                      className={`config-btn ${material === 'SS316' ? 'active' : ''}`}
                      onClick={() => setMaterial('SS316')}
                    >
                      Stainless Steel 316 (Premium)
                    </button>
                  </div>
                </div>

                <div className="config-group">
                  <label>Daily Production Capacity:</label>
                  <div className="config-options">
                    <button 
                      type="button"
                      className={`config-btn ${capacity === '10k' ? 'active' : ''}`}
                      onClick={() => setCapacity('10k')}
                    >
                      10,000 L/day
                    </button>
                    <button 
                      type="button"
                      className={`config-btn ${capacity === '50k' ? 'active' : ''}`}
                      onClick={() => setCapacity('50k')}
                    >
                      50,000 L/day
                    </button>
                    <button 
                      type="button"
                      className={`config-btn ${capacity === '100k' ? 'active' : ''}`}
                      onClick={() => setCapacity('100k')}
                    >
                      100,000 L/day
                    </button>
                  </div>
                </div>

                <div className="config-summary">
                  <div className="summary-row">
                    <span>Selected Specs:</span>
                    <strong>{capacityText} | {material === 'SS304' ? 'SS304' : 'SS316'}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Est. Ex-Work Price:</span>
                    <strong className="accent-text">${calculatedPrice.toLocaleString()}.00 USD</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button type="button" className="primary-link purchase-action-btn inquiry" onClick={() => setInquiryOpen(true)}>
                  <Send size={18} /> Send Inquiry
                </button>
                <button type="button" className="secondary-link purchase-action-btn chat" onClick={() => setChatOpen(true)}>
                  <MessageSquare size={18} /> Chat Now
                </button>
              </div>

              {/* Supplier Info Card */}
              <div className="supplier-card">
                <div className="supplier-header">
                  <span className="supplier-logo-mark">Jinta</span>
                  <div>
                    <h4>Shandong Jinta Machinery Group Co., Ltd.</h4>
                    <span className="supplier-link">Manufacturer & Factory <ChevronRight size={12} /></span>
                  </div>
                </div>
                <div className="supplier-badges">
                  <span className="badge gold">
                    <Award size={14} /> Gold Member Since 2014
                  </span>
                  <span className="badge audited">
                    <CheckCircle2 size={14} /> Audited Supplier
                  </span>
                </div>
                <div className="supplier-details">
                  <div>
                    <span>Established</span>
                    <strong>2001-05-08</strong>
                  </div>
                  <div>
                    <span>Employees</span>
                    <strong>565 People</strong>
                  </div>
                  <div>
                    <span>Certification</span>
                    <strong>ISO9001, ASME</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Table from Reference Image 2 */}
          <div className="specs-table-section">
            <h3>3.2 List of Equipment and Specifications</h3>
            <div className="specs-accordion-container">
              {detailedSpecs.map((spec, sIdx) => (
                <div className="spec-group-accordion" key={sIdx}>
                  <h4 className="spec-group-title">{spec.category}</h4>
                  <div className="specs-detail-table-wrap">
                    <table className="specs-table-detail">
                      <thead>
                        <tr>
                          <th>Equipment / Parameter</th>
                          <th>Technical Specifications</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spec.items.map((item, iIdx) => (
                          <tr key={iIdx}>
                            <td>{item.parameter}</td>
                            <td>
                              {item.parameter === 'Material of Construction' ? (
                                material === 'SS304' ? 'Stainless Steel 304' : 'Stainless Steel 316'
                              ) : item.parameter === 'Production capacity' || item.parameter === 'Production Capacity' ? (
                                capacity === '100k' ? '100,000 L per day (96-99.9% ethanol)' :
                                capacity === '50k' ? '50,000 L per day (96-99.9% ethanol)' :
                                '1,000 - 10,000 L per day (96-99.9% ethanol)'
                              ) : item.parameter === 'Column Diameter' ? (
                                capacity === '100k' ? '1.45 m' :
                                capacity === '50k' ? '1.10 m' :
                                '0.65 m'
                              ) : item.parameter === 'Column Height' ? (
                                capacity === '100k' ? '14 m' :
                                capacity === '50k' ? '12.5 m' :
                                '9 m'
                              ) : item.parameter === 'Tray Number' ? (
                                capacity === '100k' ? '25' :
                                capacity === '50k' ? '22' :
                                '18'
                              ) : item.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="slide content-section economics-section economics-slide" id="economics">
          <div className="slide-topline">
            <span>Section 09</span>
            <strong>Economic summary</strong>
          </div>
          <div className="section-heading">
            <p className="eyebrow">08 / Process economics</p>
            <h2>Capital cost summary</h2>
            <p>
              The economics section condenses the project table into a presentation-ready cost
              summary while keeping the calculation basis visible.
            </p>
          </div>

          <div className="cost-layout">
            <div className="total-cost">
              <FlaskConical size={26} />
              <span>Total module cost</span>
              <strong>334,788,282.00 TL</strong>
              <p>CBM plus contingency and fee for the proposed distillation unit.</p>
            </div>

            <div className="cost-table-wrap">
              <table className="cost-table">
                <thead>
                  <tr>
                    <th>Cost item</th>
                    <th>Value</th>
                    <th>Calculation basis</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((cost) => (
                    <tr key={cost.item}>
                      <td>{cost.item}</td>
                      <td>{cost.value}</td>
                      <td>{cost.calculation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="slide content-section team-section team-slide" id="team">
          <div className="slide-topline">
            <span>Section 10</span>
            <strong>Project Team</strong>
          </div>
          <div className="section-heading compact">
            <p className="eyebrow">09 / About us</p>
            <h2>Group 4</h2>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-member" key={member}>
                <span>{member.slice(0, 1)}</span>
                <p>{member}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>CORN4CES</span>
        <p>Corn bioethanol distillation unit interactive design report.</p>
      </footer>

      {imageOpen && (
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="Original design drawing">
          <button className="icon-button close-modal" type="button" aria-label="Close drawing" onClick={() => setImageOpen(false)}>
            <X size={21} />
          </button>
          <img src={designImage} alt="Original proposed distillation column design drawing enlarged" />
        </div>
      )}

      {zoomOpen && (
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="Zoomed gallery image">
          <button className="icon-button close-modal" type="button" aria-label="Close zoom" onClick={() => setZoomOpen(false)}>
            <X size={21} />
          </button>
          <img src={galleryImages[activeImageIndex].url} alt={galleryImages[activeImageIndex].alt} />
        </div>
      )}

      {inquiryOpen && (
        <div className="image-modal form-modal" role="dialog" aria-modal="true" aria-label="Send Inquiry Form">
          <div className="modal-content-card">
            <button className="icon-button close-modal-btn" type="button" aria-label="Close" onClick={() => { setInquiryOpen(false); setInquirySubmitted(false); }}>
              <X size={19} />
            </button>
            
            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="inquiry-form">
                <h3>Send Inquiry to Shandong Jinta</h3>
                <p className="form-subtitle">Product: Alcohol Distillery Unit ({capacityText} | {material === 'SS304' ? 'SS304' : 'SS316'})</p>
                
                <div className="form-group">
                  <label htmlFor="fullname">Full Name *</label>
                  <input type="text" id="fullname" required placeholder="John Doe" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input type="email" id="email" required placeholder="john@company.com" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" placeholder="BioFuels Inc." />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message Requirement *</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={4}
                    defaultValue={`Hi, I am interested in your Alcohol Distillery Unit with a capacity of ${capacityText} and material ${material === 'SS304' ? 'SS304' : 'SS316'}. Please send me a detailed quotation and shipping terms. Thanks!`}
                  />
                </div>
                
                <button type="submit" className="primary-link submit-btn" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            ) : (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} className="success-icon" />
                </div>
                <h3>Inquiry Sent Successfully!</h3>
                <p>Thank you for contacting Shandong Jinta Machinery Group Co., Ltd. Our engineering and sales team will review your requirements and respond to your email within 24 hours.</p>
                <button type="button" className="primary-link close-success-btn" onClick={() => { setInquiryOpen(false); setInquirySubmitted(false); }}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="chat-simulator-card">
          <div className="chat-header">
            <div className="chat-title-info">
              <div className="online-indicator" />
              <div>
                <h4>Jinta Industrial Sales</h4>
                <span>Typically replies in minutes</span>
              </div>
            </div>
            <button className="chat-close-btn" type="button" onClick={() => setChatOpen(false)} aria-label="Close Chat">
              <X size={16} />
            </button>
          </div>
          
          <div className="chat-messages" id="chat-messages-container">
            {chatMessages.map((msg, mIdx) => (
              <div key={mIdx} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                <p>{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot typing">
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-suggestions">
            {suggestedQuestions.map((q, qIdx) => (
              <button key={qIdx} type="button" className="chat-suggest-btn" onClick={() => handleSendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
          
          <div className="chat-input-wrap">
            <input 
              type="text" 
              placeholder="Ask a technical question..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(chatInput); }}
            />
            <button className="chat-send-btn" type="button" onClick={() => handleSendMessage(chatInput)} aria-label="Send">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

