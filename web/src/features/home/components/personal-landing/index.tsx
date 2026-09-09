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

type FeatureItem = {
  icon: LandingIconName
  eyebrow: string
  title: string
  description: string
}

type PricingItem = {
  model: string
  label: string
  description: string
  input: string
  output: string
  tag: string
  featured?: boolean
}

const FEATURE_ITEMS: ReadonlyArray<FeatureItem> = [
  {
    icon: 'openai',
    eyebrow: 'Drop-in compatible',
    title: 'OpenAI-compatible by default',
    description:
      'Keep your existing SDK and point base_url to New API. Your application can start calling GPT models with minimal changes.',
  },
  {
    icon: 'routing',
    eyebrow: 'Built for production',
    title: 'A clearer path to the right model',
    description:
      'Use routing rules, fallbacks, and model aliases to keep each request reliable as your traffic and use cases grow.',
  },
  {
    icon: 'monitor',
    eyebrow: 'Visible by design',
    title: 'Usage you can actually see',
    description:
      'Inspect requests, latency, tokens, and spend in one console so teams can move quickly without losing control.',
  },
  {
    icon: 'lock',
    eyebrow: 'Team-ready',
    title: 'Keys for every project',
    description:
      'Create separate API keys for products, environments, or teammates and keep access boundaries easy to understand.',
  },
  {
    icon: 'shield',
    eyebrow: 'Privacy-conscious',
    title: 'A safer layer for AI traffic',
    description:
      'Centralize authentication and upstream access behind one managed gateway, with the controls your deployment already needs.',
  },
  {
    icon: 'sparkle',
    eyebrow: 'Try before you ship',
    title: 'A playground for every prompt',
    description:
      'Compare GPT responses, tune parameters, and validate an idea in the console before wiring it into your product.',
  },
]

const PRICING_ITEMS: ReadonlyArray<PricingItem> = [
  {
    model: 'GPT-6 Astra',
    label: 'Reasoning',
    description: 'Designed for deliberate answers, analysis, and coding tasks.',
    input: '$8.00',
    output: '$24.00',
    tag: 'Reasoning · code · analysis',
  },
  {
    model: 'GPT-5.6 Sol',
    label: 'Multimodal workhorse',
    description: 'A balanced choice for chat, vision, and complex workflows.',
    input: '$3.00',
    output: '$12.00',
    tag: 'Vision · tools · production',
    featured: true,
  },
  {
    model: 'GPT-5.6 Terra',
    label: 'Best value',
    description: 'Fast, affordable, and ready for everyday product features.',
    input: '$0.60',
    output: '$2.40',
    tag: 'Chat · extraction · batch',
  },
  {
    model: 'GPT-5.6 Luna',
    label: 'Best value',
    description: 'Fast, affordable, and ready for everyday product features.',
    input: '$0.30',
    output: '$1.20',
    tag: 'Chat · extraction · batch',
  },
  {
    model: 'GPT-5.5',
    label: 'Reasoning',
    description: 'Designed for deliberate answers, analysis, and coding tasks.',
    input: '$2.00',
    output: '$8.00',
    tag: 'Reasoning · code · analysis',
  },
]

const STEP_ITEMS = [
  {
    number: '01',
    title: 'Create an API key',
    description:
      'Open the console, create a key for your project, and keep it separate from production secrets while you prototype.',
  },
  {
    number: '02',
    title: 'Replace base_url',
    description:
      'Keep the OpenAI SDK you already use. Change one endpoint, then leave your model name and request shape intact.',
  },
  {
    number: '03',
    title: 'Ship your GPT workflow',
    description:
      'Send the request, inspect usage, and promote the same integration when your application is ready for real traffic.',
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
      'The prices shown here are demonstration prices for the new landing page, not a billing promise. Replace them with the actual channel and model pricing configured in your deployment before publishing.',
  },
  {
    question: 'Can I inspect usage after a request?',
    answer:
      'Yes. The console is designed to make request logs, token usage, latency, and spend easier to review while you develop and operate your GPT applications.',
  },
  {
    question: 'Can I start with a small prototype?',
    answer:
      'Yes. Create a separate key, point a local project at the gateway, and use the playground or a small OpenAI SDK example to validate the workflow before scaling it out.',
  },
] as const

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      ['GPT models', '#models'],
      ['Features', '#features'],
      ['Pricing', '#models'],
    ],
  },
  {
    title: 'Developers',
    links: [
      ['Quick start', '#steps'],
      ['API documentation', 'https://docs.newapi.pro'],
      ['Playground', '#developers'],
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

export function PersonalLanding(props: PersonalLandingProps) {
  const { i18n, t } = useTranslation()
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    const locale = toIntlLocale(activeLanguage)
    if (locale) document.documentElement.lang = locale
  }, [activeLanguage])

  const primaryAction = props.isAuthenticated ? (
    <Link to='/dashboard' className='landing-button landing-button--primary'>
      {t('Go to Dashboard')}
      <LandingIcon name='arrow' />
    </Link>
  ) : (
    <Link to='/sign-up' className='landing-button landing-button--primary'>
      {t('Start for free')}
      <LandingIcon name='arrow' />
    </Link>
  )

  return (
    <div className='personal-landing bit2-landing'>
      <div className='landing-shell'>
        {announcementVisible && (
          <div className='landing-announcement' role='status'>
            <div className='landing-container landing-announcement-inner'>
              <span className='landing-announcement-dot' aria-hidden />
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

        <header className='landing-nav'>
          <div className='landing-container landing-nav-inner'>
            <Link to='/' className='landing-brand bit2-landing-brand'>
              <span className='bit2-brand'>
                <img
                  src='/bit2-app-icon.png'
                  alt=''
                  aria-hidden
                  width='42'
                  height='42'
                />
                <span className='bit2-brand-copy'>
                  比特兔<small>bit2.ai</small>
                </span>
              </span>
            </Link>

            <nav
              className='landing-nav-links'
              aria-label={t('Main navigation')}
            >
              <a href='#models'>{t('Models')}</a>
              <a href='#features'>{t('Why New API')}</a>
              <a href='#steps'>{t('How it works')}</a>
              <a href='#faq'>{t('FAQ')}</a>
              <a
                href='https://docs.newapi.pro'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('Docs')}
              </a>
            </nav>

            <div className='landing-nav-actions'>
              <LanguageSwitcher />
              <ThemeSwitch />
              {props.isAuthenticated ? (
                <Link
                  to='/dashboard'
                  className='landing-button landing-button--primary landing-nav-dashboard'
                >
                  {t('Go to Dashboard')}
                  <LandingIcon name='arrow' />
                </Link>
              ) : (
                <>
                  <Link to='/sign-in' className='landing-login'>
                    {t('Sign in')}
                  </Link>
                  {primaryAction}
                </>
              )}
            </div>
          </div>
        </header>

        <main>
          <section className='landing-hero'>
            <div className='landing-hero-noise' aria-hidden />
            <div className='landing-container landing-hero-inner'>
              <div className='landing-hero-copy'>
                <p className='landing-eyebrow landing-eyebrow--hero'>
                  <LandingIcon name='sparkle' />
                  {t('GPT-6 / GPT-5.6 API gateway')}
                </p>
                <h1>
                  {t('Build with the next generation of GPT.')}
                  <span>{t('Move from idea to production faster.')}</span>
                </h1>
                <p className='landing-hero-description'>
                  {t(
                    'A focused API gateway for GPT applications: one familiar endpoint, transparent controls, and a console that keeps every request in view.'
                  )}
                </p>
                <div className='landing-hero-actions'>
                  {primaryAction}
                  <a
                    className='landing-button landing-button--secondary'
                    href='#models'
                  >
                    {t('Explore GPT-6 and GPT-5.6 models')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
                <div className='landing-hero-meta'>
                  <span>
                    <i aria-hidden />
                    {t('OpenAI SDK compatible')}
                  </span>
                  <span>
                    <i aria-hidden />
                    {t('Usage-based controls')}
                  </span>
                  <span>
                    <i aria-hidden />
                    {t('Built for teams')}
                  </span>
                </div>
              </div>

              <div className='bit2-illustration' id='developers'>
                <span className='bit2-note'>
                  {t('Simple. Fast. Friendly.')}
                </span>
                <div className='bit2-halo' aria-hidden />
                <img
                  src='/bit2-mascot.png'
                  alt=''
                  width='1254'
                  height='1254'
                  fetchPriority='high'
                />
                <div className='bit2-model-chip bit2-model-chip--astra'>
                  GPT-6 <strong>Astra</strong>
                </div>
                <div className='bit2-model-chip bit2-model-chip--sol'>
                  GPT-5.6 <strong>Sol</strong>
                </div>
                <div className='bit2-model-chip bit2-model-chip--terra'>
                  GPT-5.6 <strong>Terra</strong>
                </div>
              </div>
            </div>
          </section>

          <section
            className='landing-trust-strip'
            aria-label={t('GPT platform highlights')}
          >
            <div className='landing-container landing-trust-inner'>
              <span className='landing-trust-label'>
                {t('GPT-6 and GPT-5.6, ready for production')}
              </span>
              <div className='landing-trust-items'>
                <span>
                  <LandingIcon name='openai' />
                  OpenAI
                </span>
                <span>
                  <LandingIcon name='routing' />
                  {t('One endpoint')}
                </span>
                <span>
                  <LandingIcon name='monitor' />
                  {t('Live usage')}
                </span>
                <span>
                  <LandingIcon name='shield' />
                  {t('Team controls')}
                </span>
              </div>
            </div>
          </section>

          <section
            id='models'
            className='landing-section landing-models-section'
          >
            <div className='landing-container'>
              <div className='landing-section-heading'>
                <p className='landing-eyebrow'>{t('Model pricing')}</p>
                <h2>{t('Explore GPT-6 and GPT-5.6 models')}</h2>
                <p>
                  {t(
                    'Simple, readable reference prices for the first version of this page. Connect your own channels and billing rules when you are ready.'
                  )}
                </p>
              </div>

              <div className='landing-pricing-note'>
                <span className='landing-note-icon' aria-hidden>
                  <LandingIcon name='sparkle' />
                </span>
                <p>
                  <strong>{t('Demo pricing')}</strong>
                  {t(
                    'These numbers are placeholders for visual preview only. Confirm the actual price configured for each model before launch.'
                  )}
                </p>
                <a
                  href='https://docs.newapi.pro'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('Read the docs')}
                  <LandingIcon name='arrow' />
                </a>
              </div>

              <div className='landing-pricing-grid'>
                {PRICING_ITEMS.map((item) => (
                  <article
                    key={item.model}
                    className={`landing-price-card${item.featured ? ' is-featured' : ''}`}
                  >
                    <div className='landing-price-card-top'>
                      <span className='landing-model-icon' aria-hidden>
                        <LandingIcon name='openai' />
                      </span>
                      <span className='landing-price-label'>
                        {t(item.label)}
                      </span>
                    </div>
                    <h3>{item.model}</h3>
                    <p className='landing-price-description'>
                      {t(item.description)}
                    </p>
                    <div className='landing-price-values'>
                      <div>
                        <span>{t('Input / 1M tokens')}</span>
                        <strong>{item.input}</strong>
                      </div>
                      <div>
                        <span>{t('Output / 1M tokens')}</span>
                        <strong>{item.output}</strong>
                      </div>
                    </div>
                    <div className='landing-price-footer'>
                      <span>{t(item.tag)}</span>
                      <Link
                        to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
                      >
                        {props.isAuthenticated
                          ? t('Open console')
                          : t('Try this model')}
                        <LandingIcon name='arrow' />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id='features'
            className='landing-section landing-features-section'
          >
            <div className='landing-container'>
              <div className='landing-section-heading landing-section-heading--left'>
                <p className='landing-eyebrow'>{t('Why New API')}</p>
                <h2>{t('Everything you need to ship with GPT')}</h2>
                <p>
                  {t(
                    'A professional surface for developers who want the speed of a familiar API and the control of a real gateway.'
                  )}
                </p>
              </div>
              <div className='landing-feature-grid'>
                {FEATURE_ITEMS.map((feature, index) => (
                  <article key={feature.title} className='landing-feature'>
                    <div className='landing-feature-topline'>
                      <span className='landing-feature-index'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className='landing-feature-icon' aria-hidden>
                        <LandingIcon name={feature.icon} />
                      </span>
                    </div>
                    <p className='landing-feature-eyebrow'>
                      {t(feature.eyebrow)}
                    </p>
                    <h3>{t(feature.title)}</h3>
                    <p className='landing-feature-description'>
                      {t(feature.description)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id='steps' className='landing-section landing-steps-section'>
            <div className='landing-container'>
              <div className='landing-section-heading'>
                <p className='landing-eyebrow'>{t('Quick start')}</p>
                <h2>{t('Three steps from idea to GPT request')}</h2>
                <p>
                  {t(
                    'Use the workflow you already know. The first integration can stay small, readable, and easy to roll back.'
                  )}
                </p>
              </div>

              <div className='landing-steps-layout'>
                <div className='landing-step-list'>
                  {STEP_ITEMS.map((step) => (
                    <article key={step.number} className='landing-step'>
                      <span className='landing-step-number'>{step.number}</span>
                      <div>
                        <h3>{t(step.title)}</h3>
                        <p>{t(step.description)}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className='landing-migration-card'>
                  <div className='landing-migration-header'>
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <strong>{t('OpenAI SDK')}</strong>
                    <span className='landing-migration-status'>
                      {t('Ready to run')}
                    </span>
                  </div>
                  <pre>
                    <code>
                      <span className='landing-code-muted'>from</span> openai{' '}
                      <span className='landing-code-muted'>import</span> OpenAI
                      {'\n\n'}
                      client = OpenAI({'\n'}
                      {'  '}api_key=
                      <span className='landing-code-string'>
                        &quot;sk-...&quot;
                      </span>
                      ,{'\n'}
                      {'  '}base_url=
                      <span className='landing-code-string'>
                        &quot;https://your-domain.example/v1&quot;
                      </span>
                      {'\n'}){'\n\n'}
                      response = client.chat.completions.create({'\n'}
                      {'  '}model=
                      <span className='landing-code-string'>
                        &quot;gpt-5.6&quot;
                      </span>
                      ,{'\n'}
                      {'  '}messages=[...]
                      {'\n'})
                    </code>
                  </pre>
                  <div className='landing-migration-footer'>
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
            </div>
          </section>

          <section id='faq' className='landing-section landing-faq-section'>
            <div className='landing-container landing-faq-layout'>
              <div className='landing-section-heading landing-section-heading--left'>
                <p className='landing-eyebrow'>{t('FAQ')}</p>
                <h2>{t('A few useful answers before you start')}</h2>
                <p>
                  {t(
                    'This page is a starting point for the product story. Your deployment remains the source of truth for models, pricing, and policies.'
                  )}
                </p>
              </div>
              <div className='landing-faq-list'>
                {FAQ_ITEMS.map((item) => (
                  <details key={item.question}>
                    <summary>
                      <span>{t(item.question)}</span>
                      <span className='landing-faq-plus' aria-hidden>
                        +
                      </span>
                    </summary>
                    <p>{t(item.answer)}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id='start' className='landing-cta-section'>
            <div className='landing-container'>
              <div className='landing-cta-box'>
                <span className='landing-cta-orb' aria-hidden>
                  <LandingIcon name='sparkle' />
                </span>
                <div>
                  <p className='landing-eyebrow landing-eyebrow--light'>
                    {t('Ready when you are')}
                  </p>
                  <h2>{t('Make your next GPT feature feel effortless.')}</h2>
                  <p>
                    {t(
                      'Create a key, connect your first request, and keep the entire workflow visible from the start.'
                    )}
                  </p>
                </div>
                <div className='landing-cta-actions'>
                  {primaryAction}
                  <a
                    href='https://docs.newapi.pro'
                    className='landing-button landing-button--outline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('Read the docs')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className='landing-footer'>
          <div className='landing-container landing-footer-grid'>
            <section className='landing-footer-brand'>
              <Link to='/' className='landing-brand bit2-footer-brand'>
                <span className='bit2-brand'>
                  <img
                    src='/bit2-app-icon.png'
                    alt=''
                    aria-hidden
                    width='42'
                    height='42'
                  />
                  <span className='bit2-brand-copy'>
                    比特兔<small>bit2.ai</small>
                  </span>
                </span>
              </Link>
              <p>
                {t(
                  'A clear, professional gateway for connecting GPT models to the products your team is building.'
                )}
              </p>
              <div className='landing-social-links'>
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
              <section key={column.title} className='landing-footer-column'>
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
            <div className='landing-copyright'>
              <span>
                © 2026 bit2.ai. {t('All rights reserved.')}
              </span>
              <span>{t('Built for thoughtful AI products.')}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
