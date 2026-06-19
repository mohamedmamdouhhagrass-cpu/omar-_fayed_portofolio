import { useState, useEffect, useRef } from 'react'
import omarPhoto from './image'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface Particle { id: number; x: number; y: number; vx: number; vy: number; size: number }

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    particlesRef.current = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const p = particlesRef.current
      p.forEach(pt => {
        pt.x += pt.vx; pt.y += pt.vy
        if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1
        if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1
      })
      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - dist / 120)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y)
            ctx.stroke()
          }
        }
      }
      p.forEach(pt => {
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59,130,246,0.5)'; ctx.fill()
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="neural-canvas" />
}

const services = [
  { icon: '🤖', title: 'ML Model Development', desc: 'Building and deploying machine learning models tailored to your needs using state-of-the-art algorithms.' },
  { icon: '📊', title: 'Data Analysis & Visualization', desc: 'Transforming raw data into actionable insights through comprehensive analysis and visual storytelling.' },
  { icon: '⚡', title: 'AI Solutions & Automation', desc: 'Developing intelligent automation systems that streamline workflows and drive operational efficiency.' },
  { icon: '🔧', title: 'Data Preprocessing & Feature Engineering', desc: 'Cleaning, transforming, and engineering features to maximize the performance of your ML pipelines.' },
]

const navLinks = ['home', 'about', 'services', 'contact']

export default function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      for (const id of navLinks) {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 80 && r.bottom > 80) { setActive(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav>
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <div className="nav-dot" />
          Omar Fayed
        </div>
        <ul className="nav-links">
          {navLinks.map(id => (
            <li key={id}>
              <a className={active === id ? 'active' : ''} onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(id => (
          <a key={id} className={active === id ? 'active' : ''} onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section id="home">
        <NeuralBackground />
        <div className="hero-inner">
          <div className="hero-badge">🧠 Machine Learning Engineer</div>
          <div className="avatar-ring">
            <img src={omarPhoto} alt="Omar Fayed" />
          </div>
          <h1 className="hero-name">Omar Fayed</h1>
          <p className="hero-role">Turning Data Into Intelligence</p>
          <p className="hero-tagline">
            Passionate ML engineer building smart AI-driven solutions — from model development to real-world deployment.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo('services')}>View Services</button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>Get In Touch</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-inner">
          <div className="about-img-wrap">
            <img src={omarPhoto} alt="Omar Fayed" />
            <div className="about-img-accent">🧠</div>
          </div>
          <div className="about-text">
            <p className="section-label">About Me</p>
            <h2 className="section-title">Building Intelligent Solutions</h2>
            <p>
              I'm Omar Fayed, a Machine Learning Engineer passionate about building smart solutions powered by artificial intelligence and data analysis. I specialize in developing ML models, extracting patterns from data, and turning ideas into practical applications that solve real-world problems.
            </p>
            <p>
              I'm always striving to grow my skills and keep up with the latest advancements in AI and data science — from deep learning architectures to production-ready pipelines.
            </p>
            <div className="stats-row">
              <div className="stat-item"><strong>ML</strong><span>Model Dev</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><strong>AI</strong><span>Solutions</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><strong>Data</strong><span>Engineering</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="services-inner">
          <div className="services-header">
            <p className="section-label">What I Do</p>
            <h2 className="section-title">Services</h2>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <p className="section-label">Let's Connect</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-sub">
            Have a project in mind or want to collaborate? Reach out through any of the channels below.
          </p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/omar-fayed-654b2a334" target="_blank" rel="noreferrer" className="social-btn linkedin">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href="https://github.com/omar-fayed" target="_blank" rel="noreferrer" className="social-btn github">
              <GitHubIcon /> GitHub
            </a>
            <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noreferrer" className="social-btn whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Omar Fayed · Machine Learning Engineer</p>
      </footer>
    </>
  )
}
