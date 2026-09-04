import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  Sparkles,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

import profileImg from './assets/profile.jpg';
import heroBgImg from './assets/hero_bg.png';
import therapySessionImg from './assets/therapy_session.png';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Mobile Navigation State
  const [navOpen, setNavOpen] = useState(false);

  // Breathing Exercise State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Hazır');
  const [breathSeconds, setBreathSeconds] = useState(4);

  // Stress Test State
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState([]);
  const [testResult, setTestResult] = useState(null);

  // Contact Form State
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Accordion State
  const [activeFAQ, setActiveFAQ] = useState(null);

  const questions = [
    { text: "Son haftalarda kendimi huzursuz, kaygılı veya gergin hissettim.", category: "Anksiyete" },
    { text: "Uyumakta zorluk çekiyorum veya sabahları yorgun uyanıyorum.", category: "Fiziksel" },
    { text: "Normalde zevk aldığım aktivitelere karşı ilgimi kaybettim.", category: "Depresyon" },
    { text: "Günlük sorumluluklarımı (iş, okul, aile) yerine getirmekte zorlanıyorum.", category: "İşlevsellik" },
    { text: "Geleceğe dair umutsuz hissediyorum veya her şeyin kötü gideceğini düşünüyorum.", category: "Bilişsel" },
    { text: "Zihnimi sakinleştirmekte veya düşüncelerimi durdurmakta güçlük çekiyorum.", category: "Zihinsel" }
  ];

  // Theme Toggle Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Breathing Loop Effect
  useEffect(() => {
    let interval = null;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              switch (currentPhase) {
                case 'Hazır':
                case 'Bekle':
                  return 'Nefes Al';
                case 'Nefes Al':
                  return 'Tut';
                case 'Tut':
                  return 'Nefes Ver';
                case 'Nefes Ver':
                  return 'Bekle';
                default:
                  return 'Hazır';
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('Hazır');
      setBreathSeconds(4);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  // Handlers
  const handleAnswer = (score) => {
    const updatedScores = [...scores, score];
    setScores(updatedScores);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = updatedScores.reduce((a, b) => a + b, 0);
      let classification = '';
      let feedback = '';

      if (totalScore <= 5) {
        classification = 'Düşük Seviye Stres';
        feedback = 'Hayatınızdaki stres seviyesi şu an için sağlıklı ve yönetilebilir bir sınırda görünüyor. Zihinsel esnekliğinizi korumak için kendinize zaman ayırmaya devam edin.';
      } else if (totalScore <= 11) {
        classification = 'Orta Seviye Stres';
        feedback = 'Hayatınızda fark edilebilir bir stres ve kaygı birikimi var. Zaman zaman kendinizi tükenmiş hissediyor olabilirsiniz. Dinlenme rutinlerinizi gözden geçirmek faydalı olabilir.';
      } else {
        classification = 'Yüksek Seviye Stres';
        feedback = 'Yoğun bir stres ve kaygı döneminden geçiyor olabilirsiniz. Bu durum günlük yaşam kalitenizi ve uykularınızı olumsuz etkiliyor olabilir. Profesyonel bir destek almak rahatlamanıza yardımcı olabilir.';
      }
      setTestResult({ score: totalScore, classification, feedback });
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestion(0);
    setScores([]);
    setTestResult(null);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div>
      {/* HEADER & NAVBAR (TEMİZ SADEMENÜ) */}
      <header className="glass-heavy" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              backgroundColor: 'var(--accent-burgundy)', 
              color: '#fff', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              fontFamily: 'Outfit', 
              fontWeight: '700',
              fontSize: '1.2rem',
              letterSpacing: '1px'
            }}>MKY</span>
            <div>
              <h1 className="brand-title" style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>M. Kutluhan Yalçın</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', margin: 0, fontWeight: 500, letterSpacing: '0.5px' }}>KLİNİK PSİKOLOG</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#hakkimda" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Hakkımda</a>
            <a href="#hizmetler" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Hizmetler</a>
            <a href="#nefes" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={16} /> Nefes Egzersizi</a>
            <a href="#test" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Stres Testi</a>
            <a href="#iletisim" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>İletişim</a>
            
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}
              title="Karanlık / Aydınlık Mod"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <a href="#iletisim" className="btn btn-primary" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>Randevu Al</a>
          </nav>

          <div className="mobile-nav-toggle" style={{ display: 'none', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setNavOpen(!navOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="glass-heavy" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="#hakkimda" onClick={() => setNavOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>Hakkımda</a>
              <a href="#hizmetler" onClick={() => setNavOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>Hizmetler</a>
              <a href="#nefes" onClick={() => setNavOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>Nefes Egzersizi</a>
              <a href="#test" onClick={() => setNavOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>Stres Testi</a>
              <a href="#iletisim" onClick={() => setNavOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem' }}>İletişim</a>
              <a href="#iletisim" onClick={() => setNavOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>Randevu Al</a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        padding: '180px 0 100px 0', 
        backgroundImage: `linear-gradient(to bottom, rgba(242, 246, 244, 0.4), var(--bg-primary)), url("${heroBgImg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', opacity: 0.85, zIndex: 1 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '50px', background: 'rgba(45, 106, 79, 0.12)', color: 'var(--accent-burgundy)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
                <Sparkles size={14} />
                <span>Kabul ve Kararlılık Odaklı Psikoterapi</span>
              </div>
              <h2 style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 700 }}>
                Zihinsel Esneklik ve <br />
                <span style={{ color: 'var(--accent-burgundy)' }}>İçsel Huzura</span> Doğru
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '540px' }}>
                Hayatın getirdiği zorlukları güvenli ve yargısız bir alanda birlikte ele alıyoruz. Bilimsel temelli modern terapi yöntemleriyle kendinizi yeniden keşfedin.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#iletisim" className="btn btn-primary">
                  İlk Seansı Planla <ArrowRight size={16} />
                </a>
                <a href="#nefes" className="btn btn-secondary">
                  Nefes Egzersizi Yap
                </a>
              </div>
            </div>
            
            {/* PORTRE KARTI (KENDİ FOTOĞRAFINIZ) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="glass card" style={{ maxWidth: '420px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
                <img 
                  src={profileImg} 
                  alt="Uzm. Kln. Psk. M. Kutluhan Yalçın" 
                  style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '18px' }} 
                />
                <div style={{ padding: '16px 8px 8px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Uzm. Kln. Psk. M. Kutluhan Yalçın</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Klinik Psikolog & Terapi Uzmanı</p>
                  </div>
                  <span style={{ padding: '6px 12px', borderRadius: '50px', background: 'rgba(45, 106, 79, 0.12)', color: 'var(--accent-burgundy)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Aktif Danışan Kabulü
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEFES EGZERSİZİ */}
      <section id="nefes" style={{ padding: '100px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 className="section-title">Meditatif Nefes Alanı</h2>
          <p className="section-subtitle">
            Şu an kaygılı, gergin veya yorgun hissediyorsanız, zihninizi sakinleştirmek için 4-4-4-4 Kutu Nefesi egzersizini deneyebilirsiniz.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass card" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px' }}>
              <div 
                className={isBreathing ? "breathing-ring" : ""}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '3px solid var(--accent-gold)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '40px',
                  transition: 'all 0.5s ease',
                  backgroundColor: 'rgba(45, 106, 79, 0.05)'
                }}
              >
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-burgundy)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'Outfit',
                  fontWeight: '600'
                }}>
                  {isBreathing ? (
                    <>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.8 }}>{breathPhase}</span>
                      <span style={{ fontSize: '1.8rem', lineHeight: '1.1' }}>{breathSeconds}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '1rem' }}>Hazır</span>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                {isBreathing ? (
                  <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {breathPhase === 'Nefes Al' && 'Yavaşça burnunuzdan derin bir nefes alın...'}
                    {breathPhase === 'Tut' && 'Nefesinizi sakince tutun...'}
                    {breathPhase === 'Nefes Ver' && 'Nefesinizi ağzınızdan yavaşça üfleyerek verin...'}
                    {breathPhase === 'Bekle' && 'Akciğerleriniz boşken sakince bekleyin...'}
                  </p>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Rahat bir pozisyona geçin, omuzlarınızı gevşetin ve hazır olduğunuzda Başlat butonuna tıklayın.
                  </p>
                )}
              </div>

              <button 
                onClick={() => setIsBreathing(!isBreathing)} 
                className="btn btn-primary"
                style={{ minWidth: '180px', justifyContent: 'center' }}
              >
                {isBreathing ? 'Egzersizi Durdur' : 'Egzersizi Başlat'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STRES TESTİ */}
      <section id="test" style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <h2 className="section-title">Hızlı Stres Ölçeği</h2>
          <p className="section-subtitle">
            Günlük hayatınızdaki stres yükünü ölçmek için hazırladığımız bu kısa ve tamamen anonim testi doldurabilirsiniz.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-heavy card" style={{ width: '100%', maxWidth: '680px', padding: '40px' }}>
              {!testStarted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <AlertCircle size={48} style={{ color: 'var(--accent-gold)', marginBottom: '16px' }} />
                  <h3 style={{ marginBottom: '12px' }}>Stres Seviyenizi Değerlendirin</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    Bu test tanı koyma amacı gütmez, sadece son 1 aydaki stres eğilimlerinizi fark etmeniz için bilimsel kriterlere göre hazırlanmıştır.
                  </p>
                  <button onClick={() => setTestStarted(true)} className="btn btn-primary">
                    Testi Başlat
                  </button>
                </div>
              ) : testResult ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <CheckCircle size={48} style={{ color: 'var(--accent-gold)', marginBottom: '16px' }} />
                  <h3 style={{ marginBottom: '8px' }}>Testiniz Tamamlandı</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Skorunuz: <strong>{testResult.score} / 18</strong></p>
                  
                  <div style={{ 
                    background: 'rgba(45, 106, 79, 0.1)', 
                    padding: '24px', 
                    borderRadius: '12px', 
                    margin: '24px 0',
                    borderLeft: '4px solid var(--accent-burgundy)'
                  }}>
                    <h4 style={{ color: 'var(--accent-burgundy)', marginBottom: '8px', fontSize: '1.2rem' }}>{testResult.classification}</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{testResult.feedback}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button onClick={resetTest} className="btn btn-secondary">
                      Tekrar Test Et
                    </button>
                    <a href="#iletisim" className="btn btn-primary">
                      Seans Hakkında Görüş
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ background: 'var(--border-color)', height: '4px', borderRadius: '2px', marginBottom: '32px' }}>
                    <div style={{ 
                      background: 'var(--accent-burgundy)', 
                      height: '100%', 
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                    Soru {currentQuestion + 1} / {questions.length} • {questions[currentQuestion].category}
                  </p>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '32px', color: 'var(--text-primary)' }}>
                    {questions[currentQuestion].text}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: "Hiçbir zaman", value: 0 },
                      { label: "Nadiren", value: 1 },
                      { label: "Sıklıkla", value: 2 },
                      { label: "Her zaman", value: 3 }
                    ].map((opt) => (
                      <button 
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="btn btn-secondary"
                        style={{ justifyContent: 'space-between', padding: '16px 24px', borderRadius: '12px', textAlign: 'left' }}
                      >
                        <span>{opt.label}</span>
                        <ChevronRight size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HAKKIMDA */}
      <section id="hakkimda" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                backgroundImage: `url("${profileImg}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '8px solid var(--bg-primary)',
                boxShadow: '0 10px 30px var(--shadow-color)'
              }}></div>
            </div>

            <div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 24px 0' }}>Uzm. Klinik Psikolog M. Kutluhan Yalçın</h2>
              <p style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.05rem' }}>
                Lisans ve yüksek lisans eğitimlerimi klinik psikoloji üzerine tamamladıktan sonra, uzun yıllardır bireylerin zihinsel sağlık ve içsel denge yolculuklarında profesyonel destek vermekteyim.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Çalışmalarımda Kabul ve Kararlılık Terapisi (ACT), Bilişsel Davranışçı Terapi (BDT) ve EMDR yaklaşımlarını eklektik bir çerçevede uygulayarak güvenli bir terapi alanı sunuyorum.
              </p>

              <h4 style={{ marginBottom: '12px' }}>Eğitim ve Sertifikalar</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><BookOpen size={16} style={{ color: 'var(--accent-gold)' }} /> Klinik Psikoloji Yüksek Lisansı</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><BookOpen size={16} style={{ color: 'var(--accent-gold)' }} /> EMDR I. & II. Düzey Eğitimi</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><BookOpen size={16} style={{ color: 'var(--accent-gold)' }} /> Kabul ve Kararlılık Terapisi Süpervizyonu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" style={{ padding: '100px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-subtitle">Bilimsel temelli ve kişiye özel yapılandırılan psikoterapi süreçleri.</p>

          <div className="grid-3">
            {[
              { title: "Bireysel Psikoterapi", desc: "Depresyon, kaygı bozuklukları, travma ve günlük yaşam stresleriyle başa çıkmanız için kişiye özel terapi seansları." },
              { title: "Online Terapi", desc: "Dünyanın her yerinden, güvenli dijital platformlar üzerinden seans alma imkanı ile sınırları ortadan kaldıran terapi seçeneği." },
              { title: "Çift & Aile Danışmanlığı", desc: "İlişkilerde iletişim sorunları, çatışmalar ve uyum zorluklarını çözmeye yönelik çift odaklı destek." }
            ].map((srv, idx) => (
              <div key={idx} className="glass card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ 
                    backgroundColor: 'rgba(45, 106, 79, 0.1)', 
                    color: 'var(--accent-burgundy)', 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <Activity size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{srv.desc}</p>
                </div>
                <a href="#iletisim" style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'var(--accent-burgundy)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Detaylı Bilgi <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLETİŞİM & SSS */}
      <section id="iletisim" style={{ padding: '100px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 12px 0' }}>Sıkça Sorulan Sorular</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Terapi süreci ve randevular hakkında aklınıza takılabilecek temel konular.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { q: "Seanslar ne kadar sürüyor?", a: "Standart bireysel psikoterapi seansları 45 ila 50 dakika arasında sürmektedir." },
                  { q: "Seans sıklığı nasıl belirlenir?", a: "Genellikle başlangıçta haftada 1 seans olarak planlanır. İlerleme durumuna göre 15 günde bire geçiş yapılabilir." },
                  { q: "Online terapi yüz yüze terapi kadar etkili midir?", a: "Yapılan bilimsel çalışmalar, online terapinin birçok danışan grubu için en az yüz yüze seanslar kadar verimli olduğunu göstermektedir." }
                ].map((faq, idx) => (
                  <div key={idx} className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <button 
                      onClick={() => toggleFAQ(idx)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        fontFamily: 'Outfit',
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronRight size={18} style={{ transform: activeFAQ === idx ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--accent-gold)' }} />
                    </button>
                    {activeFAQ === idx && (
                      <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Randevu Formu */}
            <div className="glass-heavy card" style={{ borderRadius: '24px' }}>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Randevu Ön Başvurusu</h3>
              
              {contactSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={48} style={{ color: 'var(--accent-gold)', marginBottom: '16px' }} />
                  <h4 style={{ marginBottom: '8px' }}>Başvurunuz Alındı</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    En kısa sürede seans detayları ve takvim planlaması için sizinle iletişime geçeceğim.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input 
                      type="text" 
                      placeholder="Ad Soyad"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                    <input 
                      type="tel" 
                      placeholder="Telefon"
                      required
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="E-posta"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                  <textarea 
                    rows="3"
                    placeholder="Kısa mesajınız..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                    Ön Başvuruyu Gönder
                  </button>
                </form>
              )}

              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} style={{ color: 'var(--accent-gold)' }} /> +90 (555) 000 00 00</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} style={{ color: 'var(--accent-gold)' }} /> info@mkutlahanyalcin.com</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} style={{ color: 'var(--accent-gold)' }} /> Caferağa Mah. Moda Cad. No: 120, Kadıköy / İstanbul</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', padding: '40px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span>© {new Date().getFullYear()} Uzm. Kln. Psk. M. Kutluhan Yalçın. Tüm hakları saklıdır.</span>
        </div>
      </footer>
    </div>
  );
}
