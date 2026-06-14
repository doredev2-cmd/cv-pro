import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, UserCircle, Code, Download, X, Network, Server, ShieldCheck, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mission: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nouvelle proposition de mission de ${formData.name}`);
    const body = encodeURIComponent(`Nom / Entreprise : ${formData.name}\n\nMission proposée :\n${formData.mission}`);
    window.location.href = `mailto:doredev2@gmail.com?subject=${subject}&body=${body}`;
    setIsContactModalOpen(false);
    setFormData({ name: '', mission: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.fromTo('.hero-anim', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      // About Animations
      gsap.fromTo('.about-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
        }}
      );

      // Experience Timeline
      gsap.fromTo('.timeline-card',
        { x: (index) => index % 2 === 0 ? -50 : 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
        }}
      );
      
      gsap.fromTo('.timeline-dot',
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)', scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
        }}
      );

      // Skills Pattern 3 - Tags pondérés
      gsap.fromTo('.skill-tag',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
        }}
      );

      // Formation
      gsap.fromTo('.formation-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
            trigger: '#formation',
            start: 'top 80%',
        }}
      );

      // Contact
      gsap.fromTo('.contact-icon',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
        }}
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-background text-secondary font-sans min-h-screen">
      
      {/* NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 rounded-[2rem] px-6 py-3 flex items-center gap-8 ${navScrolled ? 'bg-background/60 backdrop-blur-xl border border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="font-sans font-bold text-lg tracking-tight">HKD.</div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#about" className="link-hover hover:text-accent transition-colors">À propos</a>
          <a href="#experience" className="link-hover hover:text-accent transition-colors">Expérience</a>
          <a href="#skills" className="link-hover hover:text-accent transition-colors">Compétences</a>
          <a href="#contact" className="link-hover hover:text-accent transition-colors">Contact</a>
        </div>
        <button onClick={() => window.print()} className="magnetic-btn hidden md:flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-glow transition-all">
          <Download size={16} />
          <span>CV</span>
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="hero-anim w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent/50 mb-8 shadow-glow overflow-hidden bg-graphite flex items-center justify-center">
            <img src="/profile.jpg" alt="Henry Konan Doré" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="hero-anim text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(123,97,255,0.3)]">
            Henry Konan Doré
          </h1>
          
          <h2 className="hero-anim text-2xl md:text-4xl font-serif italic text-accent mb-10">
            Ingénieur télécoms, Entrepreneur,<br className="hidden md:block" /> Développeur web et application
          </h2>
          
          <div className="hero-anim flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-mono text-secondary/70 mb-12">
            <span>5+ ans d'expérience</span>
            <span className="text-accent/50">|</span>
            <span>20+ projets</span>
            <span className="text-accent/50">|</span>
            <span>Worldwide</span>
          </div>
          
          <div className="hero-anim flex flex-col sm:flex-row gap-4">
            <button onClick={() => window.print()} className="magnetic-btn px-8 py-4 bg-accent text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-glow transition-all">
              <Download size={20} />
              Télécharger CV
            </button>
            <a href="#contact" className="magnetic-btn px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all">
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start about-anim">
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <h2 className="text-5xl md:text-6xl font-serif italic text-white">À propos</h2>
          </div>
          <div className="hidden md:block col-span-1 w-[2px] h-full bg-accent/50 mx-auto"></div>
          <div className="md:col-span-7">
            <p className="text-xl md:text-2xl leading-relaxed text-secondary/90">
              Entrepreneur passionné par le digital, je crée des expériences web immersives qui marquent les esprits. Ma vision : allier design minimaliste et performances techniques.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif italic text-center mb-24 text-white">La Timeline Vivante</h2>
          
          <div className="relative">
            {/* Vertical Line Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-accent/30 -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Exp 1 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="timeline-card w-full md:w-[45%] order-2 md:order-1 bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/30 transition-all hover:scale-[1.01] hover:shadow-glow">
                  <div className="font-mono text-accent mb-2">Expérience Récente</div>
                  <h3 className="text-2xl font-bold mb-4">Responsable Support Technique & Développeur</h3>
                  <ul className="text-sm leading-relaxed space-y-3 text-secondary/80">
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Gestion des infrastructures informatiques</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Administration de bases de données</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Support technique aux utilisateurs</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Sécurisation des systèmes et données</li>
                  </ul>
                </div>
                <div className="timeline-dot hidden md:block w-4 h-4 rounded-full bg-accent absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-glow z-10 order-2"></div>
                <div className="w-full md:w-[45%] order-3"></div>
              </div>

              {/* Exp 2 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="w-full md:w-[45%] order-1 hidden md:block"></div>
                <div className="timeline-dot hidden md:block w-4 h-4 rounded-full bg-accent absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-glow z-10 order-2"></div>
                <div className="timeline-card w-full md:w-[45%] order-3 bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/30 transition-all hover:scale-[1.01] hover:shadow-glow mt-8 md:mt-0">
                  <div className="font-mono text-accent mb-2">Expérience Intermédiaire</div>
                  <h3 className="text-2xl font-bold mb-4">Ingénieur Réseaux & Systèmes</h3>
                  <ul className="text-sm leading-relaxed space-y-3 text-secondary/80">
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Installation et configuration de réseaux informatiques</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Maintenance des équipements et systèmes</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Formation en informatique (bureautique, réseaux, systèmes)</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Assistance technique aux utilisateurs</li>
                  </ul>
                </div>
              </div>

              {/* Exp 3 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="timeline-card w-full md:w-[45%] order-2 md:order-1 bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/30 transition-all hover:scale-[1.01] hover:shadow-glow mt-8 md:mt-0">
                  <div className="font-mono text-accent mb-2">Expérience Fondatrice</div>
                  <h3 className="text-2xl font-bold mb-4">Administrateur Réseaux & Cybersécurité</h3>
                  <ul className="text-sm leading-relaxed space-y-3 text-secondary/80">
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Installation et configuration de réseaux LAN/WAN (Câblage, interconnexion)</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Configuration de routeurs (Cisco, D-Link), Notions TCP/IP, adressage IP, Dépannage réseau</li>
                    <li className="flex items-start gap-3"><span className="text-accent mt-1">▹</span> Sécurisation des systèmes (Gestion des accès, authentification, Bonnes pratiques)</li>
                  </ul>
                </div>
                <div className="timeline-dot hidden md:block w-4 h-4 rounded-full bg-accent absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-glow z-10 order-2"></div>
                <div className="w-full md:w-[45%] order-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-32 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif italic mb-16 text-center text-white">Domaines d'Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category 1 */}
            <div className="skill-tag bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/50 transition-all hover:-translate-y-2 hover:shadow-glow group">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Network size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Réseaux</h3>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Installation et configuration LAN/WAN</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Câblage réseau et interconnexion</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Configuration de routeurs (Cisco, D-Link)</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Notions TCP/IP, adressage IP</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Dépannage réseau</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="skill-tag bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/50 transition-all hover:-translate-y-2 hover:shadow-glow group">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Server size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Systèmes & Web</h3>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Administration Windows Server & Linux</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Gestion des utilisateurs et droits d’accès</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Sauvegarde et restauration des données</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Conception de sites et applications web</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="skill-tag bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/50 transition-all hover:-translate-y-2 hover:shadow-glow group">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Sécurité informatique</h3>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Sécurisation des systèmes et réseaux</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Gestion des accès et authentification</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Bonnes pratiques de cybersécurité</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="skill-tag bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-accent/50 transition-all hover:-translate-y-2 hover:shadow-glow group">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Wrench size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Support & Maintenance</h3>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Diagnostic et résolution des pannes</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Maintenance hardware & software</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Installation systèmes (Windows, Linux, Mac)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATION */}
      <section id="formation" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif italic text-center mb-16 text-white">Les Fondations</h2>
          
          <div className="space-y-6">
            <div className="formation-card bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Diplôme d'Ingénieur en Télécommunications</h3>
                <div className="text-secondary/70">École d'Ingénieurs</div>
              </div>
              <div className="font-mono text-accent">2022</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 bg-accent relative overflow-hidden text-background">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-serif italic mb-12">Travaillons ensemble</h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <a href="mailto:doredev2@gmail.com" className="contact-icon flex flex-col items-center gap-3 link-hover">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center backdrop-blur-md text-background">
                <Mail size={24} />
              </div>
              <span className="font-mono text-sm font-semibold">doredev2@gmail.com</span>
            </a>
            <a href="#" className="contact-icon flex flex-col items-center gap-3 link-hover">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center backdrop-blur-md text-background">
                <UserCircle size={24} />
              </div>
              <span className="font-mono text-sm font-semibold">LinkedIn</span>
            </a>
            <a href="#" className="contact-icon flex flex-col items-center gap-3 link-hover">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center backdrop-blur-md text-background">
                <Code size={24} />
              </div>
              <span className="font-mono text-sm font-semibold">GitHub</span>
            </a>
            <a href="tel:622760072" className="contact-icon flex flex-col items-center gap-3 link-hover">
              <div className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center backdrop-blur-md text-background">
                <Phone size={24} />
              </div>
              <span className="font-mono text-sm font-semibold">622 76 00 72</span>
            </a>
          </div>
          
          <button onClick={() => setIsContactModalOpen(true)} className="magnetic-btn inline-block px-10 py-5 bg-background text-white rounded-full text-xl font-bold hover:shadow-[0_0_30px_rgba(10,10,20,0.4)] transition-all">
            Envoyer un message
          </button>
        </div>
      </section>

      {/* CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-graphite w-full max-w-lg rounded-[2rem] p-8 border border-white/10 shadow-glow relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-serif italic mb-6 text-white">Parlez-moi de votre projet</h3>
            <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-mono text-secondary/70 mb-2">Nom ou Entreprise</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(123,97,255,0.2)] transition-all"
                  placeholder="Ex: TechCorp / Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-secondary/70 mb-2">La mission</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.mission}
                  onChange={(e) => setFormData({...formData, mission: e.target.value})}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-[0_0_10px_rgba(123,97,255,0.2)] transition-all resize-none"
                  placeholder="Décrivez brièvement le projet ou la mission..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:shadow-glow transition-all">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-background pt-16 pb-8 px-6 rounded-t-[4rem] -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold mb-1">Henry Konan Doré</div>
            <div className="text-sm text-secondary/50 font-mono">Fait avec le vibe coding © 2026</div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-sm text-secondary/80">En ligne & Disponible</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
