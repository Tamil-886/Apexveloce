/**
 * APEX VELOCE - Automotive Journal & Blog Engine
 * Dynamic article routing, rendering, related posts, and social sharing
 */

(function () {
  'use strict';

  const BLOG_ARTICLES = {
  'matte-wrap-maintenance': {
    id: 'matte-wrap-maintenance',
    title: 'How to Maintain Your Matte Wrap: 7 Pro Secrets',
    shortTitle: 'Matte Wrap Maintenance',
    category: 'VEHICLE WRAP GUIDE',
    badgeClass: 'badge-primary',
    icon: 'fa-solid fa-car-side',
    date: 'September 5, 2026',
    readTime: '6 min read',
    author: 'Julian Vance',
    authorRole: 'FOUNDER & MASTER INSTALLER',
    authorBio: 'Julian has wrapped over 1,200 hypercars and luxury vehicles. He conducts masterclasses for professional automotive restylers nationwide.',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Discover the exact pH-neutral washing regimens and ceramic sealants required to keep matte and satin vinyl free of glossy spots and oil stains.',
    ctaTitle: 'Ready to Wrap Your Vehicle?',
    ctaText: 'Book your private studio consultation with Julian and the Apex team to review sample books, cast vinyl swatches, and 3D concept renders.',
    ctaBtnText: 'Book Wrap Consultation',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        Matte and satin vehicle wraps provide an unmistakable, menacing aesthetic that commands attention on any street or show circuit. However, because matte vinyl lacks a reflective high-gloss clear coat, it requires specialized care. Unlike gloss finishes that can be wet-sanded and machine-polished to remove swirl marks, <strong>matte finishes cannot be polished</strong>—doing so will permanently create shiny, uneven patches.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-ban" style="color:var(--primary); font-size:1.1rem;"></i> 1. Never Use Traditional Automotive Waxes or Polishes</h3>
      <p class="mb-4">
        Standard carnauba waxes and abrasive cutting compounds contain fillers and gloss-enhancing polymers designed to fill surface micro-valleys. On a matte or satin surface, these fillers will ruin the diffuse reflection of the film, leaving behind chalky white residue or shiny spots that cannot be washed away. Only use matte-specific quick detailers and ceramic spray sealants formulated without optical brighteners.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-bucket" style="color:var(--primary); font-size:1.1rem;"></i> 2. Adopt the Two-Bucket Hand Wash Regimen</h3>
      <p class="mb-4">
        Automated drive-through brush car washes are the #1 enemy of vinyl wraps. The stiff rotating nylon bristles can catch panel edges, scratch matte cast layers, and lift corners. Instead, always wash by hand using the two-bucket method with grit guards and a dedicated pH-neutral automotive shampoo. Never wash the vehicle in direct midday sunlight when surface panels exceed 110°F (43°C).
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(255, 42, 84, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--primary); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--primary); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-lightbulb"></i> Studio Pro Tip: Spot Cleaning Bird Droppings</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">Bird droppings and tree sap are acidic and will bake into vinyl if exposed to direct sun. Never scrub aggressively! Soak a microfiber towel in warm distilled water or matte detailer, place it over the spot for 3 minutes to soften the residue, and gently wipe away in one smooth motion.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-shield-halved" style="color:var(--primary); font-size:1.1rem;"></i> 3. Apply a Matte-Specific Ceramic Coating</h3>
      <p class="mb-4">
        The best defense against oil marks, environmental contaminants, and road salt is applying a 9H ceramic coating engineered specifically for matte and satin films (such as Gyeon Q² Matte or XPEL Stealth Ceramic). This creates an invisible, hydrophobic barrier that prevents oils from finger smudges from soaking into the microscopic vinyl pores without altering the satin sheen.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-flask" style="color:var(--primary); font-size:1.1rem;"></i> 4. Use Isopropyl Alcohol (IPA) for Oil & Grease Smudges</h3>
      <p class="mb-4">
        If you accidentally get fuel drips around the filler neck, grease, or greasy finger smudges on your matte wrap, use a 70/30 dilution of distilled water and isopropyl alcohol with a clean microfiber towel. IPA evaporates rapidly without leaving behind any oily residue or altering film surface tension.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-wind" style="color:var(--primary); font-size:1.1rem;"></i> 5. Mind Your Pressure Washer Distance and Angle</h3>
      <p class="mb-4">
        Pressure washers are great for pre-rinsing heavy grit, but excessive water pressure can peel vinyl edges. Always keep the nozzle at least 18 inches (45 cm) away from the vehicle body, and never spray perpendicular to wrapped seams or panel gaps. Keep the water spray angle at approximately 45 degrees.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-warehouse" style="color:var(--primary); font-size:1.1rem;"></i> 6. Store Indoors or Use Breathable Satin Vehicle Covers</h3>
      <p class="mb-4">
        Prolonged ultraviolet radiation without protection dries out cast plasticizers over time, leading to micro-cracking and premature fading. When not carving canyon roads, park your wrapped vehicle in a climate-controlled garage or shield it with an indoor breathable satin vehicle dust cover.
      </p>
    `
  },

  'ppf-vs-ceramic-coating': {
    id: 'ppf-vs-ceramic-coating',
    title: 'PPF vs. Ceramic Coating: Which Protection Do You Need?',
    shortTitle: 'PPF vs. Ceramic Coating',
    category: 'PAINT PROTECTION FILM',
    badgeClass: 'badge-cyan',
    icon: 'fa-solid fa-shield-halved',
    date: 'August 28, 2026',
    readTime: '8 min read',
    author: 'Marcus Vance',
    authorRole: 'TECHNICAL DIRECTOR & PPF LEAD',
    authorBio: 'Marcus specializes in custom template design and invisible bulk installations. Certified by XPEL and SunTek with over 10 years of cleanroom experience.',
    authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'An in-depth breakdown comparing impact rock chip resistance, self-healing polymers, hydrophobic clarity, and long-term investment return.',
    ctaTitle: 'Armor Your Supercar with XPEL PPF',
    ctaText: 'Reserve your spot in our ISO-7 cleanroom for custom laser-plotted PPF coverage and 9H ceramic infusion.',
    ctaBtnText: 'Get PPF Armor Proposal',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        Every supercar collector and automotive enthusiast faces the classic protection dilemma: <em>Should you install Paint Protection Film (PPF), coat the vehicle with a Ceramic Matrix, or combine both?</em> While dealerships frequently bundle them under the umbrella of "vehicle protection," they are fundamentally different technologies engineered for distinct threats.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-layer-group" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 1. The Core Distinction: Impact Armor vs. Chemical Shield</h3>
      <p class="mb-4">
        <strong>Paint Protection Film (PPF)</strong> is a thick, 8-mil (200-micron) elastomeric polyurethane membrane. It is engineered primarily as a physical kinetic armor against high-velocity stone chips, road debris, gravel spray, key scratches, and parking scrapes.
      </p>
      <p class="mb-4">
        <strong>Ceramic Coating</strong>, by contrast, is a liquid polymer containing silicon dioxide (SiO2) or silicon carbide (SiC). When hand-applied, it chemically bonds to the clear coat at the molecular level, creating a hard, sacrificial quartz layer measuring roughly 2 to 3 microns. It excels at extreme hydrophobicity, UV oxidation resistance, chemical stain prevention, and high-gloss depth.
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--accent-cyan); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--accent-cyan); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-circle-info"></i> The Rule of Thumb</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">Ceramic coatings CANNOT stop a rock chip flying at 70 mph on the freeway. Only the physical elasticity of thermoplastic polyurethane (PPF) can absorb and disperse that kinetic impact.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 2. Self-Healing Magic: How PPF Repairs Swirls</h3>
      <p class="mb-4">
        Modern top-tier films like XPEL Ultimate Plus feature a proprietary elastomeric clear coat. When micro-swirls or light scratches occur from washing or brushing against bushes, warmth from direct sunlight or hot engine water allows the polyurethane chains to reform, literally erasing the scratches before your eyes in minutes.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-droplet" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 3. Ceramic Coatings: Effortless Washes & Mirror Depth</h3>
      <p class="mb-4">
        While ceramic coatings won't stop stone impacts, they make routine maintenance astonishingly effortless. Water contact angles exceed 110 degrees, creating tight water beads that roll off panels and carry away dirt and road film. You'll spend 70% less time washing and drying your car, and your paint will retain a dripping-wet candy gloss.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-gem" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 4. The Apex Gold Standard: The Ultimate Hybrid Stack</h3>
      <p class="mb-4">
        For high-performance supercars, track weapons, and pristine daily drivers, the gold standard is not choosing one over the other—it is combining both:
      </p>
      <ul style="padding-left:1.5rem; margin-bottom:1.75rem; line-height:1.8; color:var(--text-muted);">
        <li><strong style="color:var(--text-main);">Base Layer:</strong> Full front track-pack or full-body XPEL PPF to absorb rock chips and road hazards.</li>
        <li><strong style="color:var(--text-main);">Top Layer:</strong> Gyeon or Ceramic Pro 9H formulated specifically to bond over PPF film without fogging.</li>
        <li><strong style="color:var(--text-main);">Result:</strong> Unmatched impact armor combined with self-cleaning hydrophobic slip and deep gloss.</li>
      </ul>
    `
  },

  'amg-g63-carbon-edition': {
    id: 'amg-g63-carbon-edition',
    title: 'Behind the Build: 2025 AMG G63 Carbon Edition',
    shortTitle: 'G63 Carbon Edition Build',
    category: 'PROJECT STORY',
    badgeClass: 'badge-gold',
    icon: 'fa-solid fa-wrench',
    date: 'August 14, 2026',
    readTime: '5 min read',
    author: 'Elena Rostova',
    authorRole: 'LEAD COACHWORK & AERO DESIGNER',
    authorBio: 'Elena oversees Apex bespoke aerodynamic packages, carbon composite installations, and custom interior upholstery transformations.',
    authorImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Step inside our cleanroom to follow the 120-hour teardown, custom Matte Military Olive wrap, carbon fiber body kit installation, and Alcantara re-trim.',
    ctaTitle: 'Commission Your Bespoke Build',
    ctaText: 'Have an exotic vehicle or luxury SUV you want reimagined? Schedule a private design review with Elena Rostova and the coachwork team.',
    ctaBtnText: 'Inquire About Custom Builds',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        When a premier client brought us their factory Obsidian Black 2025 Mercedes-AMG G63 with just 42 miles on the odometer, the brief was straightforward yet uncompromising: <em>Transform this iconic boxy silhouette into a menacing, tactical road weapon that looks ready for both high-profile red carpets and the Baja 1000.</em>
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-screwdriver-wrench" style="color:var(--accent-gold); font-size:1.1rem;"></i> Stage 1: The 120-Hour Cleanroom Teardown</h3>
      <p class="mb-4">
        True bespoke restyling requires zero visible seams. Over four days, our master technicians meticulously stripped the vehicle down to bare structural sheet metal in our ISO-7 cleanroom. All four doors, hinges, side exhaust shields, flares, spare wheel carrier, glass trim, and front fascia were labeled and stored in specialized protective cradles.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-palette" style="color:var(--accent-gold); font-size:1.1rem;"></i> Stage 2: Custom Matte Military Olive Exterior Wrap</h3>
      <p class="mb-4">
        We selected an ultra-premium dual-cast Matte Military Olive film with a deep, satin-finished undertone. Because the G-Class features iconic exposed door hinges and square rain gutters, every panel required custom hand-tuck tensioning. Every door jamb, sill plate, and under-hood shut face was wrapped with zero original black paint remaining visible.
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--accent-gold); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--accent-gold); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-star"></i> Engineering Highlight: Dry Carbon Integration</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">To complement the matte green aesthetic, we engineered 2x2 twill pre-preg dry carbon fiber components: ventilated hood cowl, front roof spoiler with integrated high-output LEDs, wide fender arches (+40mm per side), and quad-exhaust tips.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-couch" style="color:var(--accent-gold); font-size:1.1rem;"></i> Stage 3: Interior Re-Trim & Starlight Architecture</h3>
      <p class="mb-4">
        Inside the cockpit, Elena and our upholstery artisans removed the factory roof liner to install an 800-fiber optical starlight headliner with programmable shooting stars. The seat inserts, steering wheel, and dashboard upper binnacle were re-upholstered in genuine black Italian Alcantara with matching Military Olive contrast stitching.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-check-double" style="color:var(--accent-gold); font-size:1.1rem;"></i> Final Delivery & Client Reaction</h3>
      <p class="mb-4">
        Following final 9H ceramic coating over both the matte wrap and exposed carbon weave, the vehicle underwent our 48-point quality audit under 10,000 lumens of CRI 98+ inspection lights. The result? A jaw-dropping one-of-one statement piece that commands unconditional respect on every street.
      </p>
    `
  },

  'super-gloss-pet-films': {
    id: 'super-gloss-pet-films',
    title: 'The Rise of Super-Gloss PET Films and Frozen Satin',
    shortTitle: 'Super-Gloss PET Films',
    category: 'INDUSTRY TRENDS',
    badgeClass: 'badge-primary',
    icon: 'fa-solid fa-fire-flame-curved',
    date: 'August 2, 2026',
    readTime: '7 min read',
    author: 'Julian Vance',
    authorRole: 'FOUNDER & MASTER INSTALLER',
    authorBio: 'Julian has wrapped over 1,200 hypercars and luxury vehicles. He conducts masterclasses for professional automotive restylers nationwide.',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Why modern supercar collectors are choosing ultra-smooth PET liners over traditional calendared films for true zero-orange-peel factory reflections.',
    ctaTitle: 'Inspect Over 300 Swatches in Studio',
    ctaText: 'Visit our Beverly Hills motorstudio to compare physical super-gloss PET and frozen satin swatches under laboratory color-calibrated lighting.',
    ctaBtnText: 'Schedule Swatch Consultation',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        For decades, the biggest criticism levied against automotive vinyl wraps was the dreaded "orange peel" texture. Even the highest-grade cast films from industry titans had microscopic surface irregularities inherited from paper backing liners during the cooling manufacturing phase. Today, that compromise is officially obsolete thanks to <strong>Super-Gloss PET Liner Technology</strong>.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-microchip" style="color:var(--primary); font-size:1.1rem;"></i> 1. The Science of PET Liners vs. Traditional Paper</h3>
      <p class="mb-4">
        Traditional vinyl is cast onto textured release paper. When the heated vinyl cools, it absorbs the texture of the paper fibers, translating into optical waviness. Polyethylene Terephthalate (PET) liners, conversely, are as smooth as optical glass. When vinyl cures against PET, the finish is 100% mirror-smooth, rivaling OEM paint jobs costing upwards of $25,000.
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(255, 42, 84, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--primary); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--primary); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-certificate"></i> Key Benefit: Zero Optical Distortion</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">Stand three inches away from a PET-backed gloss wrap and you will see razor-sharp fluorescent tube reflections without jagged edges or diffusion. It is virtually indistinguishable from multi-stage wet-sanded automotive paint.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-snowflake" style="color:var(--primary); font-size:1.1rem;"></i> 2. The Frozen Satin Revolution</h3>
      <p class="mb-4">
        Alongside super-gloss, high-end exotics are embracing "Frozen Satin" finishes. Unlike standard matte vinyl which absorbs all light, Frozen Satin films feature a silky, low-sheen micro-texture that accentuates body contours, wheel arches, and aerodynamic strakes with liquid highlights while maintaining an ultra-sleek semi-matte body.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-temperature-arrow-up" style="color:var(--primary); font-size:1.1rem;"></i> 3. Advanced Installation Requirements</h3>
      <p class="mb-4">
        Because PET films are thicker and feature low initial tack acrylic adhesive systems, they demand experienced master installers. Edge post-heating must reach exactly 195°F to 205°F (90°C–96°C) using infrared digital pyrometers to erase film memory and prevent edge curl around sharp body lines.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-scale-balanced" style="color:var(--primary); font-size:1.1rem;"></i> 4. Making the Right Choice for Your Vehicle</h3>
      <p class="mb-4">
        Whether you choose a mirror-reflection Liquid Metallic Silver PET wrap or a sinister Frozen Deep Black satin finish, the current generation of films provides 5 to 7 years of outdoor durability while preserving 100% of your factory paint underneath.
      </p>
    `
  },

  'two-bucket-wash-method': {
    id: 'two-bucket-wash-method',
    title: 'Two-Bucket Wash Method: Protecting Ceramic Coatings',
    shortTitle: 'Two-Bucket Wash Method',
    category: 'CAR CARE & DETAILING',
    badgeClass: 'badge-cyan',
    icon: 'fa-solid fa-soap',
    date: 'July 20, 2026',
    readTime: '4 min read',
    author: 'Dmitri Volkov',
    authorRole: 'HEAD OF SURFACE PRESERVATION',
    authorBio: 'Dmitri is an IDA-certified master detailer specializing in paint correction, multi-stage rotary compounding, and ceramic matrix maintenance.',
    authorImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How grit guards, plush microfiber wash mitts, and warm deionized water rinses prevent swirl marks on high-gloss and ceramic-coated vehicles.',
    ctaTitle: 'Schedule an Apex Decontamination Wash',
    ctaText: 'Treat your ceramic-coated or wrapped vehicle to our multi-stage studio hand wash and hydrophobic booster treatment.',
    ctaBtnText: 'Book Preservation Wash',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        Over 90% of vehicle swirl marks, spiderwebs, and micro-marring are not caused by driving on the highway—they are caused by improper hand-washing techniques right in the owner's driveway. Even the hardest 9H ceramic coating or self-healing PPF film can suffer surface scratching if abrasive brake dust and silica grains are dragged across panels with a dirty wash mitt.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-shield-cat" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 1. The Anatomy of the Two-Bucket System</h3>
      <p class="mb-4">
        The two-bucket wash method isolates contamination from your soapy solution using two dedicated 5-gallon containers:
      </p>
      <ul style="padding-left:1.5rem; margin-bottom:1.75rem; line-height:1.8; color:var(--text-muted);">
        <li><strong style="color:var(--text-main);">Bucket 1 (Wash Bucket):</strong> Clean water mixed with high-lubricity, pH-neutral automotive shampoo.</li>
        <li><strong style="color:var(--text-main);">Bucket 2 (Rinse Bucket):</strong> Pure clean water fitted with a bottom <strong>Grit Guard insert</strong>.</li>
      </ul>
      <p class="mb-4">
        Every time your wash mitt glides over a vehicle panel, you plunge it into the <em>Rinse Bucket</em> first, scrubbing it against the grit guard grid. The trapped road dirt settles under the baffles, preventing it from re-entering the clean wash solution.
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--accent-cyan); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--accent-cyan); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-arrows-left-right"></i> Golden Rule: Straight Lines Only</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">Never wipe panels in circular motions! Circular motions turn microscopic scratches into visible halos and swirl marks under sunlight. Always glide your wash mitt in straight, gentle horizontal passes along body lines.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-cloud-showers-heavy" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 2. The Touchless Snow Foam Pre-Wash</h3>
      <p class="mb-4">
        Before your wash mitt touches the paint, spray a thick blanket of pH-neutral snow foam across the entire vehicle using a pressure washer foam cannon. Allow the rich foam to dwell for 4 to 5 minutes. The surfactants encapsulate loose dirt, pollen, and road dust, allowing gravity to pull the grit safely off the clear coat before contact washing.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-wind" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 3. Touchless Drying with Filtered Air</h3>
      <p class="mb-4">
        The drying stage is another common scratch hazard. The safest drying technique for ceramic-coated vehicles is using a dedicated warm-air automotive blower (or clean electric leaf blower). Because the ceramic coating is intensely hydrophobic, water sheets off effortlessly, leaving panels 95% dry without towel friction.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-spray-can-sparkles" style="color:var(--accent-cyan); font-size:1.1rem;"></i> 4. Applying a Ceramic Booster Quarterly</h3>
      <p class="mb-4">
        Finish every third wash by misting a SiO2 ceramic detailer onto a plush 500 GSM microfiber towel and wiping clean. This replenishes sacrificial polymers and ensures your hydrophobic beading remains peak factory-fresh year-round.
      </p>
    `
  },

  'cleanroom-capacity-expansion': {
    id: 'cleanroom-capacity-expansion',
    title: 'Apex Expands Cleanroom Capacity with Dual Light Tunnels',
    shortTitle: 'Cleanroom Expansion',
    category: 'STUDIO NEWS',
    badgeClass: 'badge-gold',
    icon: 'fa-solid fa-building',
    date: 'July 10, 2026',
    readTime: '3 min read',
    author: 'Julian Vance',
    authorRole: 'FOUNDER & MASTER INSTALLER',
    authorBio: 'Julian has wrapped over 1,200 hypercars and luxury vehicles. He conducts masterclasses for professional automotive restylers nationwide.',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    heroBg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    featuredImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'We’ve doubled our cleanroom lab footprint with next-generation medical-grade HEPA air filtration and CRI 98+ full-spectrum inspection tunnels.',
    ctaTitle: 'Tour Our Expanded Beverly Hills Facility',
    ctaText: 'Schedule a private motorstudio tour to view our dual light inspection tunnels and state-of-the-art climate-controlled wrapping bays.',
    ctaBtnText: 'Schedule Studio Tour',
    ctaLink: 'contact.html',
    content: `
      <p class="mb-4">
        Since founding Apex Veloce, our core conviction has been unyielding: <em>World-class automotive restyling is not born in a dusty garage—it requires the clinical precision of an aerospace cleanroom.</em> Today, we are thrilled to officially unveil our multi-million dollar facility expansion at our Beverly Hills headquarters.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-fan" style="color:var(--accent-gold); font-size:1.1rem;"></i> 1. Medical-Grade ISO-7 Positive-Pressure HEPA Filtration</h3>
      <p class="mb-4">
        Our new secondary wrapping lab incorporates industrial laminar air handling with continuous positive air pressure. Airborne particulate matter is filtered down to 0.3 microns, ensuring zero dust nibs, lint, or stray fibers become trapped under your clear PPF or high-gloss wrap films.
      </p>

      <div class="card mb-4" style="background:linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, var(--bg-card) 100%); border-left:4px solid var(--accent-gold); padding:1.75rem; border-radius:var(--radius-md);">
        <h5 style="color:var(--accent-gold); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-lightbulb"></i> Facility Highlight: Dual CRI 98+ Light Tunnels</h5>
        <p style="font-size:0.95rem; margin:0; color:var(--text-main);">We have installed two 360-degree LED inspection tunnels calibrated to 5500K daylight with a Color Rendering Index (CRI) exceeding 98. This lighting matrix reveals micro-swirls, film stretch lines, and edge seams invisible under standard workshop fixtures.</p>
      </div>

      <h3 class="mb-3"><i class="fa-solid fa-temperature-half" style="color:var(--accent-gold); font-size:1.1rem;"></i> 2. Precise Humidity & Thermal Regulation</h3>
      <p class="mb-4">
        Adhesive tack, film pliability, and post-heating curing curves depend critically on ambient humidity. Our new bay features automated climate regulation maintaining an optimal 72°F (22.2°C) temperature and 45% relative humidity 24 hours a day, 365 days a year.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-stopwatch" style="color:var(--accent-gold); font-size:1.1rem;"></i> 3. 50% Faster Turnaround Times for Clients</h3>
      <p class="mb-4">
        With four dedicated cleanroom bays now operational simultaneously, our waitlist times for full-vehicle wraps and track armor packages have been reduced from six weeks to under two weeks, all while maintaining our rigorous 48-point quality control standard.
      </p>

      <h3 class="mb-3"><i class="fa-solid fa-champagne-glasses" style="color:var(--accent-gold); font-size:1.1rem;"></i> 4. Private VIP Client Lounge & Viewing Gallery</h3>
      <p class="mb-4">
        Clients are invited to relax in our newly appointed VIP mezzanine lounge, featuring panoramic acoustic glass overlooking both inspection light tunnels. Enjoy espresso or champagne while watching our master installers transform your pride and joy.
      </p>
    `
  }
};

/**
 * Render blog article dynamically based on article slug/ID
 */
function renderBlogArticle(targetId, updateHistory = false) {
  const article = BLOG_ARTICLES[targetId] || BLOG_ARTICLES['matte-wrap-maintenance'];
  if (!article) return;

  // 1. Update Document Metadata
  document.title = `${article.title} | APEX VELOCE`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', article.excerpt);
  }

  // 2. Update Breadcrumb
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = article.shortTitle || article.title;
  }

  // 3. Update Category Badge
  const categoryBadge = document.getElementById('articleCategoryBadge');
  if (categoryBadge) {
    categoryBadge.className = `badge ${article.badgeClass || 'badge-primary'}`;
    categoryBadge.innerHTML = `<i class="${article.icon}"></i> ${article.category}`;
  }

  // 4. Update Main Title
  const articleTitle = document.getElementById('articleTitle');
  if (articleTitle) {
    articleTitle.textContent = article.title;
  }

  // 5. Update Hero Background
  const heroBanner = document.getElementById('articleHeroBanner');
  if (heroBanner && article.heroBg) {
    heroBanner.style.backgroundImage = `url('${article.heroBg}')`;
  }

  // 6. Update Author Meta Bar in Hero
  const authorImg = document.getElementById('articleAuthorImg');
  if (authorImg) {
    authorImg.src = article.authorImg;
    authorImg.alt = article.author;
  }

  const authorName = document.getElementById('articleAuthorName');
  if (authorName) {
    authorName.textContent = article.author;
  }

  const metaDetails = document.getElementById('articleMetaDetails');
  if (metaDetails) {
    metaDetails.textContent = `${article.authorRole} • ${article.date} • ${article.readTime}`;
  }

  // 7. Update Featured Image
  const featuredImg = document.getElementById('articleFeaturedImg');
  if (featuredImg) {
    featuredImg.src = article.featuredImg;
    featuredImg.alt = article.title;
  }

  // 8. Update Body Content
  const bodyContent = document.getElementById('articleBodyContent');
  if (bodyContent) {
    bodyContent.innerHTML = article.content;
  }

  // 9. Update Author Bio Card
  const authorCard = document.getElementById('articleAuthorCard');
  if (authorCard) {
    authorCard.innerHTML = `
      <div class="d-flex align-center gap-3">
        <img src="${article.authorImg}" alt="${article.author}" style="width:70px; height:70px; border-radius:50%; object-fit:cover; border:2px solid var(--primary); flex-shrink:0;">
        <div>
          <h4 style="margin-bottom:0.25rem;">Written by ${article.author}</h4>
          <span class="badge ${article.badgeClass || 'badge-primary'} mb-2">${article.authorRole}</span>
          <p style="font-size:0.9rem; margin:0; color:var(--text-muted);">${article.authorBio}</p>
        </div>
      </div>
    `;
  }

    // 10. Update Social Share Links
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(article.title + ' - Apex Veloce');

    const shareTwitter = document.getElementById('shareTwitter');
    if (shareTwitter) {
      shareTwitter.href = `https://twitter.com/intent/tweet?text=${currentTitle}&url=${currentUrl}`;
    }

    const shareFacebook = document.getElementById('shareFacebook');
    if (shareFacebook) {
      shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    }

    const shareLinkedIn = document.getElementById('shareLinkedIn');
    if (shareLinkedIn) {
      shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    }

    // 11. Update CTA Banner
    const ctaTitle = document.getElementById('articleCtaTitle');
    if (ctaTitle) ctaTitle.textContent = article.ctaTitle;

    const ctaText = document.getElementById('articleCtaText');
    if (ctaText) ctaText.textContent = article.ctaText;

    const ctaBtn = document.getElementById('articleCtaBtn');
    if (ctaBtn) {
      ctaBtn.textContent = article.ctaBtnText;
      ctaBtn.href = article.ctaLink || 'contact.html';
    }

    // 12. Render Related Articles Grid (3 other articles)
    renderRelatedArticles(article.id);

    // 13. Update Browser History State if requested
    if (updateHistory) {
      try {
        const newUrl = `${window.location.pathname}?id=${article.id}`;
        window.history.pushState({ articleId: article.id }, '', newUrl);
      } catch (e) {
        // file:// safety fallback
      }
    }
  }

  /**
   * Helper to resolve requested article ID from URL search, hash, or sessionStorage
   */
  function getTargetArticleId() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramId = urlParams.get('id') || urlParams.get('post') || urlParams.get('article');
      if (paramId && BLOG_ARTICLES[paramId]) {
        try { sessionStorage.setItem('apex_active_article', paramId); } catch(e) {}
        return paramId;
      }

      if (window.location.hash) {
        const hashId = window.location.hash.replace(/^#/, '').trim();
        if (hashId && BLOG_ARTICLES[hashId]) {
          try { sessionStorage.setItem('apex_active_article', hashId); } catch(e) {}
          return hashId;
        }
      }

      const storedId = sessionStorage.getItem('apex_active_article');
      if (storedId && BLOG_ARTICLES[storedId]) {
        return storedId;
      }
    } catch (e) {
      console.warn('Error resolving article ID:', e);
    }
    return 'matte-wrap-maintenance';
  }

  /**
   * Render 3 related articles from other available posts
   */
  function renderRelatedArticles(currentId) {
    const container = document.getElementById('relatedArticlesGrid');
    if (!container) return;

    const otherArticles = Object.values(BLOG_ARTICLES).filter(a => a.id !== currentId);
    // Pick 3 articles
    const related = otherArticles.slice(0, 3);

    container.innerHTML = related.map(item => `
      <div class="service-card" style="display:flex; flex-direction:column; height:100%;">
        <div class="card-thumb" style="height:190px;">
          <a href="blog-details.html?id=${item.id}" class="related-article-link" data-id="${item.id}">
            <img src="${item.featuredImg}" alt="${item.title}" style="height:100%; object-fit:cover;">
          </a>
          <span class="badge ${item.badgeClass || 'badge-primary'} card-badge">${item.category}</span>
        </div>
        <div class="card-body" style="padding:1.4rem; display:flex; flex-direction:column; flex-grow:1;">
          <div class="d-flex align-center gap-2 mb-2" style="font-size:0.75rem; color:var(--text-dim);">
            <i class="fa-solid fa-calendar"></i> ${item.date} • <i class="fa-solid fa-clock"></i> ${item.readTime}
          </div>
          <a href="blog-details.html?id=${item.id}" class="related-article-link" data-id="${item.id}" style="color:inherit; text-decoration:none;">
            <h4 style="font-size:1.05rem; min-height:2.85rem; line-height:1.35; margin-bottom:0.6rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${item.title}</h4>
          </a>
          <p style="font-size:0.85rem; line-height:1.55; margin-bottom:1.25rem; flex-grow:1; color:var(--text-muted); display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${item.excerpt}</p>
          <div class="card-footer" style="padding-top:1rem; border-top:1px solid var(--border-subtle); margin-top:auto;">
            <a href="blog-details.html?id=${item.id}" class="link-arrow related-article-link" data-id="${item.id}" style="font-size:0.82rem;">Read Article <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `).join('');

    // Intercept clicks on related articles for instant smooth navigation
    container.querySelectorAll('.related-article-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('data-id');
        if (targetId && BLOG_ARTICLES[targetId]) {
          e.preventDefault();
          renderBlogArticle(targetId, true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Initialize immediately and on DOM ready
   */
  function initBlog() {
    const articleId = getTargetArticleId();
    renderBlogArticle(articleId, false);
  }

  // Execute immediately if DOM elements already parsed
  initBlog();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
  }

  // Handle browser back / forward navigation
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.articleId) {
      renderBlogArticle(e.state.articleId, false);
    } else {
      initBlog();
    }
  });

  // Copy article link handler
  const copyBtn = document.getElementById('copyArticleLink');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          if (window.showApexToast) {
            window.showApexToast('Article link copied to clipboard!', 'success');
          } else {
            alert('Article link copied to clipboard!');
          }
        }).catch(() => {
          prompt('Copy this link:', shareUrl);
        });
      } else {
        prompt('Copy this link:', shareUrl);
      }
    });
  }
})();

