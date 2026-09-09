/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeSwitch } from '@/components/theme-switch'
import { toIntlLocale } from '@/i18n/languages'

import { LandingIcon, type LandingIconName } from './landing-icon'

type PersonalLandingProps = {
  isAuthenticated: boolean
}

type ModelRow = {
  model: string
  displayName: string
  provider: string
  input: string
  output: string
  context: string
  status: string
  accent: 'orange' | 'blue' | 'violet' | 'mint'
}

type PlanItem = {
  name: string
  description: string
  price: string
  cadence: string
  features: readonly string[]
  action: string
  featured?: boolean
}

type AdvantageItem = {
  number: string
  icon: LandingIconName
  eyebrow: string
  title: string
  description: string
}

type CodeTab = 'Python' | 'JavaScript' | 'cURL'

const MODEL_ROWS: readonly ModelRow[] = [
  {
    model: 'gpt-6-astra',
    displayName: 'GPT-6 Astra',
    provider: 'OpenAI',
    input: '$10.00',
    output: '$50.00',
    context: '2M',
    status: 'Available',
    accent: 'orange',
  },
  {
    model: 'gpt-5.6-sol',
    displayName: 'GPT-5.6 Sol',
    provider: 'OpenAI',
    input: '$4.00',
    output: '$20.00',
    context: '1M',
    status: 'Available',
    accent: 'blue',
  },
  {
    model: 'gpt-5.6-terra',
    displayName: 'GPT-5.6 Terra',
    provider: 'OpenAI',
    input: '$1.20',
    output: '$6.00',
    context: '1M',
    status: 'Available',
    accent: 'violet',
  },
  {
    model: 'gpt-5.6-luna',
    displayName: 'GPT-5.6 Luna',
    provider: 'OpenAI',
    input: '$0.60',
    output: '$2.40',
    context: '512K',
    status: 'Available',
    accent: 'mint',
  },
  {
    model: 'gpt-5.5',
    displayName: 'GPT-5.5',
    provider: 'OpenAI',
    input: '$2.00',
    output: '$8.00',
    context: '1M',
    status: 'Available',
    accent: 'orange',
  },
] as const

const ADVANTAGE_ITEMS: readonly AdvantageItem[] = [
  {
    number: '01',
    icon: 'routing',
    eyebrow: 'API mesh & fallback',
    title: 'Keep every request moving',
    description:
      'Route across configured channels, keep a fallback ready, and change providers without rewriting your product integration.',
  },
  {
    number: '02',
    icon: 'scale',
    eyebrow: 'Token optimization',
    title: 'Make usage easier to control',
    description:
      'Give each project a clear key, model policy, and budget surface so growth does not turn into guesswork.',
  },
  {
    number: '03',
    icon: 'monitor',
    eyebrow: 'Usage analytics',
    title: 'See what production is doing',
    description:
      'Review requests, latency, tokens, and spend in one console built for the people operating AI products.',
  },
] as const

const PLAN_ITEMS: readonly PlanItem[] = [
  {
    name: 'Developer Free',
    description: 'For testing ideas and personal projects.',
    price: '$0',
    cadence: '/ month',
    features: [
      'Standard pay-as-you-go pricing',
      '100 requests / minute',
      '$5 demo credit',
      'Community support',
    ],
    action: 'Get started free',
  },
  {
    name: 'Pro Developer',
    description: 'For growing teams and production APIs.',
    price: '$29',
    cadence: '/ month',
    features: [
      '5% volume discount on tokens',
      '5,000 requests / minute',
      'Smart fallback routing',
      'Priority queueing',
    ],
    action: 'Upgrade to Pro',
    featured: true,
  },
  {
    name: 'Enterprise Mesh',
    description: 'For high-volume business workloads.',
    price: 'Custom',
    cadence: '',
    features: [
      'Custom volume pricing',
      'Dedicated routing policies',
      'Private deployment options',
      'Priority support',
    ],
    action: 'Contact sales',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'Which GPT models can I use?',
    answer:
      'This preview focuses on GPT model access. The model list and availability are controlled by your New API deployment, so you can expose the GPT models that your channels and keys support.',
  },
  {
    question: 'Do I need to rewrite my OpenAI integration?',
    answer:
      'Usually not. New API is designed around an OpenAI-compatible interface. In most SDK integrations, you can keep the existing request code and update base_url plus the API key.',
  },
  {
    question: 'How should I read the prices on this page?',
    answer:
      'The prices shown here are demonstration prices for the landing page, not a billing promise. Replace them with the actual channel and model pricing configured in your deployment before publishing.',
  },
  {
    question: 'Can I inspect usage after a request?',
    answer:
      'Yes. The console is designed to make request logs, token usage, latency, and spend easier to review while you develop and operate your GPT applications.',
  },
] as const

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      ['GPT models', '#models'],
      ['Architecture', '#architecture'],
      ['Pricing', '#pricing'],
    ],
  },
  {
    title: 'Developers',
    links: [
      ['Quick start', '#steps'],
      ['API documentation', 'https://docs.newapi.pro'],
      ['Usage analytics', '#architecture'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Common questions', '#faq'],
      ['GitHub repository', 'https://github.com/QuantumNous/new-api'],
      ['Contact support', 'mailto:support@quantumnous.com'],
    ],
  },
] as const

const HERO_FEATURES = [
  {
    icon: 'shield' as const,
    title: 'API mesh & fallback',
    description: 'Configured fallbacks',
  },
  {
    icon: 'models' as const,
    title: 'Models',
    description: 'One familiar endpoint',
  },
  {
    icon: 'book' as const,
    title: 'OpenAI compatible',
    description: 'Keep your existing request shape',
  },
  {
    icon: 'pie' as const,
    title: 'Transparent pricing',
    description: 'Demo pricing',
  },
] as const

const CODE_SNIPPETS: Record<CodeTab, string> = {
  Python: [
    'from openai import OpenAI',
    '',
    'client = OpenAI(',
    '    api_key="sk-bit2-your-key",',
    '    base_url="https://api.bit2.ai/v1",',
    ')',
    '',
    'response = client.chat.completions.create(',
    '    model="gpt-6-astra",',
    '    messages=[{"role": "user", "content": "Hello"}],',
    ')',
  ].join('\n'),
  JavaScript: [
    'import OpenAI from "openai"',
    '',
    'const client = new OpenAI({',
    '  apiKey: process.env.BIT2_API_KEY,',
    '  baseURL: "https://api.bit2.ai/v1",',
    '})',
    '',
    'const response = await client.chat.completions.create({',
    '  model: "gpt-6-astra",',
    '  messages: [{ role: "user", content: "Hello" }],',
    '})',
  ].join('\n'),
  cURL: [
    'curl https://api.bit2.ai/v1/chat/completions \\',
    '  -H "Authorization: Bearer sk-bit2-your-key" \\',
    '  -H "Content-Type: application/json" \\',
    '  -d \'{',
    '    "model": "gpt-6-astra",',
    '    "messages": [{"role":"user","content":"Hello"}]',
    '  }\'',
  ].join('\n'),
}

export function PersonalLanding(props: PersonalLandingProps) {
  const { i18n, t } = useTranslation()
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('Python')
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    const locale = toIntlLocale(activeLanguage)
    if (locale) document.documentElement.lang = locale
  }, [activeLanguage])

  const primaryAction = props.isAuthenticated ? (
    <Link to='/dashboard' className='warm-button warm-button--primary'>
      {t('Go to Dashboard')}
      <LandingIcon name='arrow' />
    </Link>
  ) : (
    <Link to='/sign-up' className='warm-button warm-button--primary'>
      {t('Start for free')}
      <LandingIcon name='arrow' />
    </Link>
  )

  return (
    <div className='personal-landing bit2-warm-landing'>
      <div className='warm-shell'>
        {announcementVisible && (
          <div className='warm-announcement' role='status'>
            <div className='warm-container warm-announcement-inner'>
              <span className='warm-announcement-mark' aria-hidden>
                <LandingIcon name='sparkle' />
              </span>
              <span>
                {t(
                  'GPT-6 and GPT-5.6 access is ready for your next prototype.'
                )}
              </span>
              <a href='#models'>{t('See demo pricing')}</a>
              <button
                type='button'
                aria-label={t('Close announcement')}
                onClick={() => setAnnouncementVisible(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <header className='warm-nav' role='banner'>
          <div className='warm-container warm-nav-inner'>
            <Link to='/' className='warm-brand'>
              <img
                src='/bit2-logo.svg'
                alt=''
                aria-hidden
                width='44'
                height='44'
              />
              <span>
                <strong>比特兔</strong>
                <small>bit2.ai</small>
              </span>
            </Link>

            <nav className='warm-nav-links' aria-label={t('Main navigation')}>
              <a className='is-active' href='#home'>
                {t('Home')}
              </a>
              <a href='#models'>{t('Models')}</a>
              <a href='#pricing'>{t('Pricing')}</a>
              <a href='#architecture'>{t('Architecture')}</a>
              <a href='#docs'>{t('Documentation')}</a>
            </nav>

            <div className='warm-nav-actions'>
              <LanguageSwitcher />
              <ThemeSwitch />
              {props.isAuthenticated ? (
                <Link
                  to='/dashboard'
                  className='warm-button warm-button--primary warm-nav-dashboard'
                >
                  {t('Go to Dashboard')}
                  <LandingIcon name='arrow' />
                </Link>
              ) : (
                <>
                  <Link to='/sign-in' className='warm-login'>
                    {t('Sign in')}
                  </Link>
                  <Link
                    to='/sign-up'
                    className='warm-button warm-button--primary warm-nav-start'
                  >
                    {t('Start for free')}
                    <LandingIcon name='arrow' />
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main>
          <section id='home' className='warm-hero'>
            <div className='warm-hero-orb warm-hero-orb--one' aria-hidden />
            <div className='warm-hero-orb warm-hero-orb--two' aria-hidden />
            <div className='warm-container warm-hero-grid'>
              <div className='warm-hero-copy'>
                <p className='warm-eyebrow warm-eyebrow--hero'>
                  <span aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  {t('A simpler way to connect to AI')}
                </p>
                <h1>
                  {t('One API, connect every AI model')}
                  <span>{t('Powerful AI, within reach.')}</span>
                </h1>
                <p className='warm-hero-description'>
                  {t(
                    'Bit2.ai makes powerful AI accessible through one reliable, OpenAI-compatible gateway. Connect your product to GPT-6 and GPT-5.6 with clear routing, transparent pricing, and a console your team can understand.'
                  )}
                </p>
                <div className='warm-hero-actions'>
                  {primaryAction}
                  <a href='#docs' className='warm-button warm-button--ghost'>
                    {t('Read API documentation')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
                <div className='warm-hero-proof'>
                  <span>
                    <i aria-hidden />
                    {t('OpenAI compatible')}
                  </span>
                  <span>
                    <i aria-hidden />
                    {t('Configured fallbacks')}
                  </span>
                  <span>
                    <i aria-hidden />
                    {t('Visible usage data')}
                  </span>
                </div>
              </div>

              <div
                className='warm-hero-art'
                aria-label={t('Developer integration preview')}
              >
                <div className='warm-art-backdrop' aria-hidden />
                <div className='warm-art-note warm-art-note--top'>
                  <span>{t('Available routes')}</span>
                  <strong>05</strong>
                </div>
                <img
                  src='/bit2-rabbit.svg'
                  alt=''
                  aria-hidden
                  width='640'
                  height='540'
                />
                <div className='warm-art-note warm-art-note--bottom'>
                  <i aria-hidden />
                  {t('Requests flowing normally')}
                </div>
              </div>
            </div>
            <div className='warm-container warm-hero-baseline' aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </section>

          <section className='warm-feature-ribbon' aria-label={t('Platform status')}>
            <div className='warm-container warm-feature-grid'>
              {HERO_FEATURES.map((feature) => (
                <div key={feature.title} className='warm-feature-item'>
                  <span className='warm-feature-icon'>
                    <LandingIcon name={feature.icon} />
                  </span>
                  <span>
                    <strong>{t(feature.title)}</strong>
                    <small>{t(feature.description)}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section id='status' className='warm-metrics-section'>
            <div className='warm-container warm-metrics-card'>
              <div>
                <span>{t('Global uptime')}</span>
                <strong>99.99%</strong>
                <small>{t('Target')}</small>
              </div>
              <div>
                <span>{t('Route latency')}</span>
                <strong>38ms</strong>
                <small>{t('Demo check')}</small>
              </div>
              <div>
                <span>{t('Active models')}</span>
                <strong>05</strong>
                <small>{t('GPT routes')}</small>
              </div>
              <div>
                <span>{t('Requests today')}</span>
                <strong>12.8K</strong>
                <small>{t('Preview network')}</small>
              </div>
            </div>
          </section>

          <section id='models' className='warm-section warm-models-section'>
            <div className='warm-container'>
              <div className='warm-section-heading warm-section-heading--split'>
                <div>
                  <p className='warm-eyebrow'>{t('Model directory')}</p>
                  <h2>{t('Frontier models, one clean endpoint.')}</h2>
                </div>
                <div>
                  <p>
                    {t(
                      'Latest GPT models, presented with the details your team needs to choose a route.'
                    )}
                  </p>
                  <a className='warm-text-link' href='#pricing'>
                    {t('See demo pricing')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
              </div>

              <div className='warm-model-grid'>
                {MODEL_ROWS.map((row, index) => (
                  <article
                    key={row.model}
                    className={`warm-model-card warm-model-card--${row.accent}${index === 0 ? ' is-featured' : ''}`}
                  >
                    <div className='warm-model-card-top'>
                      <span className='warm-model-provider'>
                        {row.provider}
                      </span>
                      <span className='warm-model-status'>
                        <i aria-hidden />
                        {t(row.status)}
                      </span>
                    </div>
                    <span className='warm-model-symbol' aria-hidden>
                      <LandingIcon name='sparkle' />
                    </span>
                    <h3>{row.displayName}</h3>
                    <code>{row.model}</code>
                    <div className='warm-model-meta'>
                      <span>
                        <small>{t('Context window')}</small>
                        <strong>{row.context}</strong>
                      </span>
                      <span>
                        <small>{t('Input / 1M tokens')}</small>
                        <strong>{row.input}</strong>
                      </span>
                      <span>
                        <small>{t('Output / 1M tokens')}</small>
                        <strong>{row.output}</strong>
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <p className='warm-disclaimer'>
                <LandingIcon name='sparkle' />
                {t(
                  'Demo prices are placeholders for this product preview. Confirm your configured rates before launch.'
                )}
              </p>
            </div>
          </section>

          <section
            id='architecture'
            className='warm-section warm-capability-section'
          >
            <div className='warm-container'>
              <div className='warm-section-heading warm-section-heading--center'>
                <p className='warm-eyebrow'>{t('Developer experience & features')}</p>
                <h2>{t('A routing layer designed for real traffic.')}</h2>
                <p>
                  {t(
                    'Three controls give every production request a clearer path from your application to the right model.'
                  )}
                </p>
              </div>

              <div className='warm-advantage-grid'>
                {ADVANTAGE_ITEMS.map((item) => (
                  <article key={item.number} className='warm-advantage-card'>
                    <div className='warm-advantage-heading'>
                      <span>{item.number}</span>
                      <span className='warm-advantage-icon'>
                        <LandingIcon name={item.icon} />
                      </span>
                    </div>
                    <p className='warm-card-eyebrow'>{t(item.eyebrow)}</p>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.description)}</p>
                    <div className='warm-advantage-visual' aria-hidden>
                      <span />
                      <span />
                      <span />
                      <i />
                    </div>
                  </article>
                ))}
              </div>

              <div className='warm-model-cloud' aria-label={t('Models')}>
                {MODEL_ROWS.map((row) => (
                  <span key={row.model}>
                    <i aria-hidden />
                    {row.displayName}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id='pricing' className='warm-section warm-pricing-section'>
            <div className='warm-container'>
              <div className='warm-section-heading warm-section-heading--center'>
                <p className='warm-eyebrow'>{t('Pricing tiers')}</p>
                <h2>{t('Simple, flexible pricing.')}</h2>
                <p>
                  {t(
                    'Start with a small prototype, then move to the plan that matches your traffic and team.'
                  )}
                </p>
              </div>

              <div className='warm-pricing-grid'>
                {PLAN_ITEMS.map((plan) => (
                  <article
                    key={plan.name}
                    className={`warm-plan-card${plan.featured ? ' is-featured' : ''}`}
                  >
                    {plan.featured && (
                      <span className='warm-plan-badge'>{t('Most popular')}</span>
                    )}
                    <p className='warm-card-eyebrow'>{t(plan.name)}</p>
                    <h3>{t(plan.name)}</h3>
                    <p className='warm-plan-description'>
                      {t(plan.description)}
                    </p>
                    <div className='warm-plan-price'>
                      <strong>{plan.price}</strong>
                      {plan.cadence && <span>{t(plan.cadence)}</span>}
                    </div>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span aria-hidden>✓</span>
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
                      className={`warm-button ${plan.featured ? 'warm-button--primary' : 'warm-button--soft'}`}
                    >
                      {t(plan.action)}
                      <LandingIcon name='arrow' />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id='steps' className='warm-section warm-quickstart-section'>
            <div className='warm-container warm-quickstart-grid'>
              <div className='warm-quickstart-copy'>
                <p className='warm-eyebrow'>{t('Quick start')}</p>
                <h2>{t('Move from SDK to first request in minutes.')}</h2>
                <p>
                  {t(
                    'Keep the integration you already know. Point your client at the Bit2 endpoint, add a key, and start testing your GPT workflow.'
                  )}
                </p>
                <div className='warm-check-list'>
                  <span>
                    <i>01</i>
                    {t('Create a project API key')}
                  </span>
                  <span>
                    <i>02</i>
                    {t('Change one base URL')}
                  </span>
                  <span>
                    <i>03</i>
                    {t('Inspect the request in the console')}
                  </span>
                </div>
                <a className='warm-text-link' href='#docs'>
                  {t('View API docs')}
                  <LandingIcon name='arrow' />
                </a>
              </div>

              <div id='docs' className='warm-code-window'>
                <div className='warm-code-window-top'>
                  <div className='warm-window-dots' aria-hidden>
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>api.bit2.ai / quickstart</span>
                  <b>{t('Ready to run')}</b>
                </div>
                <div
                  className='warm-code-tabs'
                  role='tablist'
                  aria-label={t('Code examples')}
                >
                  {(Object.keys(CODE_SNIPPETS) as CodeTab[]).map((tab) => (
                    <button
                      key={tab}
                      type='button'
                      role='tab'
                      aria-selected={activeCodeTab === tab}
                      className={activeCodeTab === tab ? 'is-active' : undefined}
                      onClick={() => setActiveCodeTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                  <span>
                    <LandingIcon name='shield' />
                    {t('OpenAI compatible')}
                  </span>
                </div>
                <pre>
                  <code>
                    <span className='warm-code-comment'>
                      # {t('Compatible with the official OpenAI SDKs')}
                    </span>
                    {'\n'}
                    {CODE_SNIPPETS[activeCodeTab]}
                  </code>
                </pre>
                <div className='warm-code-footer'>
                  <span>
                    <LandingIcon name='shield' />
                    {t('Keep your existing request shape')}
                  </span>
                  <a
                    href='https://docs.newapi.pro'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('View API docs')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id='faq' className='warm-section warm-faq-section'>
            <div className='warm-container warm-faq-grid'>
              <div className='warm-section-heading warm-section-heading--left'>
                <p className='warm-eyebrow'>{t('FAQ')}</p>
                <h2>{t('A few useful answers before you start')}</h2>
                <p>
                  {t(
                    'Your deployment remains the source of truth for models, pricing, and policies.'
                  )}
                </p>
              </div>
              <div className='warm-faq-list'>
                {FAQ_ITEMS.map((item) => (
                  <details key={item.question}>
                    <summary>
                      <span>{t(item.question)}</span>
                      <b>+</b>
                    </summary>
                    <p>{t(item.answer)}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id='start' className='warm-cta-section'>
            <div className='warm-container'>
              <div className='warm-cta-card'>
                <div className='warm-cta-shape warm-cta-shape--one' aria-hidden />
                <div className='warm-cta-shape warm-cta-shape--two' aria-hidden />
                <div className='warm-cta-copy'>
                  <p className='warm-eyebrow warm-eyebrow--light'>
                    {t('Ready to build?')}
                  </p>
                  <h2>{t('Start your next GPT workflow with a clearer route.')}</h2>
                  <p>
                    {t(
                      'Create a key, connect your first request, and keep the entire path visible from the start.'
                    )}
                  </p>
                </div>
                <div className='warm-cta-actions'>
                  {primaryAction}
                  <a href='#docs' className='warm-button warm-button--outline'>
                    {t('Read the docs')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className='warm-footer'>
          <div className='warm-container warm-footer-grid'>
            <section className='warm-footer-brand'>
              <Link to='/' className='warm-brand'>
                <img
                  src='/bit2-logo.svg'
                  alt=''
                  aria-hidden
                  width='44'
                  height='44'
                />
                <span>
                  <strong>比特兔</strong>
                  <small>bit2.ai</small>
                </span>
              </Link>
              <p>
                {t(
                  'A clear, professional gateway for connecting GPT models to the products your team is building.'
                )}
              </p>
              <div className='warm-social-links'>
                <a
                  href='https://github.com/QuantumNous/new-api'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                >
                  <LandingIcon name='github' />
                </a>
                <a
                  href='https://docs.newapi.pro'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t('Documentation')}
                >
                  <LandingIcon name='book' />
                </a>
                <a
                  href='mailto:support@quantumnous.com'
                  aria-label={t('Contact support')}
                >
                  <LandingIcon name='globe' />
                </a>
              </div>
            </section>
            {FOOTER_COLUMNS.map((column) => (
              <section key={column.title} className='warm-footer-column'>
                <h2>{t(column.title)}</h2>
                {column.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel='noreferrer'
                  >
                    {t(label)}
                  </a>
                ))}
              </section>
            ))}
            <div className='warm-footer-bottom'>
              <span>© 2026 bit2.ai. {t('All rights reserved.')}</span>
              <span>{t('Built for thoughtful AI products.')}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
