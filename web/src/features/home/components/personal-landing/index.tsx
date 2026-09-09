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
  accent: 'cyan' | 'violet' | 'blue'
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

const MODEL_ROWS: readonly ModelRow[] = [
  {
    model: 'gpt-6-astra',
    displayName: 'GPT-6 Astra',
    provider: 'OpenAI',
    input: '$10.00',
    output: '$50.00',
    context: '2M',
    status: 'Available',
    accent: 'cyan',
  },
  {
    model: 'gpt-5.6-sol',
    displayName: 'GPT-5.6 Sol',
    provider: 'OpenAI',
    input: '$4.00',
    output: '$20.00',
    context: '1M',
    status: 'Available',
    accent: 'violet',
  },
  {
    model: 'gpt-5.6-terra',
    displayName: 'GPT-5.6 Terra',
    provider: 'OpenAI',
    input: '$1.20',
    output: '$6.00',
    context: '1M',
    status: 'Available',
    accent: 'blue',
  },
  {
    model: 'gpt-5.6-luna',
    displayName: 'GPT-5.6 Luna',
    provider: 'OpenAI',
    input: '$0.60',
    output: '$2.40',
    context: '512K',
    status: 'Available',
    accent: 'cyan',
  },
  {
    model: 'gpt-5.5',
    displayName: 'GPT-5.5',
    provider: 'OpenAI',
    input: '$2.00',
    output: '$8.00',
    context: '1M',
    status: 'Available',
    accent: 'violet',
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
            <Link to='/' className='landing-brand bit2-site-brand'>
              <img
                src='/bit2-app-icon.png'
                alt=''
                aria-hidden
                width='40'
                height='40'
              />
              <span className='bit2-wordmark'>
                <strong>bit2</strong>
                <span>.ai</span>
                <small>{t('AI relay gateway')}</small>
              </span>
            </Link>

            <nav
              className='landing-nav-links'
              aria-label={t('Main navigation')}
            >
              <a href='#models'>{t('Models')}</a>
              <a href='#pricing'>{t('Pricing')}</a>
              <a href='#architecture'>{t('Architecture')}</a>
              <a href='#docs'>{t('API Docs')}</a>
              <a href='#status' className='landing-status-link'>
                <i aria-hidden />
                {t('Status')}
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
          <section className='relay-hero'>
            <div className='relay-hero-grid' aria-hidden />
            <div
              className='relay-hero-glow relay-hero-glow--cyan'
              aria-hidden
            />
            <div
              className='relay-hero-glow relay-hero-glow--violet'
              aria-hidden
            />
            <div className='landing-container relay-hero-inner'>
              <div className='relay-hero-copy'>
                <p className='relay-badge'>
                  <span className='relay-badge-dot' aria-hidden />
                  {t('Frontier model routing, ready for production')}
                </p>
                <h1>
                  {t('One unified API for every GPT workflow.')}
                  <span>{t('Route faster. Build with confidence.')}</span>
                </h1>
                <p className='relay-hero-description'>
                  {t(
                    'Connect your application to GPT-6 and GPT-5.6 through one OpenAI-compatible gateway with clear routing, usage controls, and a console your team can understand.'
                  )}
                </p>
                <div className='relay-hero-actions'>
                  {primaryAction}
                  <a
                    href='#docs'
                    className='landing-button landing-button--secondary'
                  >
                    {t('Read API documentation')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
                <div className='relay-hero-facts'>
                  <span>
                    <strong>01</strong>
                    {t('One familiar endpoint')}
                  </span>
                  <span>
                    <strong>02</strong>
                    {t('Configured fallbacks')}
                  </span>
                  <span>
                    <strong>03</strong>
                    {t('Visible usage data')}
                  </span>
                </div>
              </div>

              <div
                className='relay-console'
                aria-label={t('Developer integration preview')}
              >
                <div className='relay-console-topbar'>
                  <div className='relay-window-dots' aria-hidden>
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className='relay-console-path'>
                    bit2.ai / relay-overview
                  </span>
                  <span className='relay-console-live'>
                    <i aria-hidden />
                    {t('Active router')}
                  </span>
                </div>

                <div className='relay-console-heading'>
                  <div>
                    <p className='relay-overline'>
                      {t('Live routing workspace')}
                    </p>
                    <h2>{t('One endpoint. Multiple model paths.')}</h2>
                  </div>
                  <span className='relay-console-version'>v1.0</span>
                </div>

                <div className='relay-flow'>
                  <div className='relay-flow-column relay-flow-column--source'>
                    <p className='relay-flow-label'>{t('Your application')}</p>
                    <div className='relay-source-card'>
                      <span className='relay-panel-icon relay-panel-icon--cyan'>
                        <LandingIcon name='book' />
                      </span>
                      <div>
                        <strong>OpenAI SDK</strong>
                        <code>api.bit2.ai/v1</code>
                      </div>
                      <span className='relay-connected'>{t('Connected')}</span>
                    </div>
                    <div className='relay-source-card relay-source-card--muted'>
                      <span className='relay-source-mini'>
                        <LandingIcon name='lock' />
                      </span>
                      <div>
                        <strong>{t('Project API key')}</strong>
                        <code>sk-bit2-••••••••</code>
                      </div>
                    </div>
                  </div>

                  <div className='relay-flow-core'>
                    <span
                      className='relay-flow-line relay-flow-line--left'
                      aria-hidden
                    />
                    <span
                      className='relay-flow-line relay-flow-line--right'
                      aria-hidden
                    />
                    <div
                      className='relay-core-orbit relay-core-orbit--one'
                      aria-hidden
                    />
                    <div
                      className='relay-core-orbit relay-core-orbit--two'
                      aria-hidden
                    />
                    <div className='relay-core-mark'>
                      <img
                        src='/bit2-app-icon.png'
                        alt=''
                        aria-hidden
                        width='62'
                        height='62'
                      />
                    </div>
                    <strong>bit2.ai</strong>
                    <span>{t('Smart relay router')}</span>
                    <small>
                      <i aria-hidden />
                      {t('Healthy')}
                    </small>
                  </div>

                  <div className='relay-flow-column relay-flow-column--routes'>
                    <p className='relay-flow-label'>{t('Available routes')}</p>
                    {MODEL_ROWS.slice(0, 3).map((row) => {
                      let routeLatency = '28ms'
                      if (row.model === 'gpt-6-astra') routeLatency = '38ms'
                      if (row.model === 'gpt-5.6-sol') routeLatency = '42ms'

                      return (
                        <div
                          key={row.model}
                          className={`relay-route-card relay-route-card--${row.accent}`}
                        >
                          <span className='relay-route-provider'>
                            {row.provider.slice(0, 2)}
                          </span>
                          <div>
                            <strong>{row.displayName}</strong>
                            <code>{row.model}</code>
                          </div>
                          <span className='relay-route-latency'>
                            {routeLatency}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className='relay-console-footer'>
                  <span>
                    <i aria-hidden />
                    {t('Requests flowing normally')}
                  </span>
                  <span>
                    {t('Fallbacks')} <strong>03</strong>
                  </span>
                  <span>
                    {t('Last check')} <strong>12s</strong>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            id='status'
            className='relay-stats-strip'
            aria-label={t('Platform status')}
          >
            <div className='landing-container relay-stats-grid'>
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

          <section
            id='models'
            className='landing-section relay-section relay-models-section'
          >
            <div className='landing-container'>
              <div className='relay-section-heading'>
                <div>
                  <p className='relay-overline'>{t('Model directory')}</p>
                  <h2>{t('Frontier models, one clean endpoint.')}</h2>
                </div>
                <p>
                  {t(
                    'Latest GPT models, presented with the details your team needs to choose a route.'
                  )}
                </p>
              </div>

              <div className='relay-table-shell'>
                <div className='relay-table-toolbar'>
                  <span className='relay-toolbar-title'>
                    <i aria-hidden />
                    {t('Supported frontier models')}
                  </span>
                  <span className='relay-toolbar-note'>
                    {t('Demo pricing')}
                  </span>
                </div>
                <div className='relay-table-scroll'>
                  <table className='relay-model-table'>
                    <thead>
                      <tr>
                        <th>{t('Model')}</th>
                        <th>{t('Provider')}</th>
                        <th>{t('Input / 1M tokens')}</th>
                        <th>{t('Output / 1M tokens')}</th>
                        <th>{t('Context window')}</th>
                        <th>{t('Status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODEL_ROWS.map((row) => (
                        <tr key={row.model}>
                          <td>
                            <span
                              className={`relay-model-mark relay-model-mark--${row.accent}`}
                            >
                              <LandingIcon name='sparkle' />
                            </span>
                            <div>
                              <strong>{row.displayName}</strong>
                              <code>{row.model}</code>
                            </div>
                          </td>
                          <td>
                            <span className='relay-provider-pill'>
                              {row.provider}
                            </span>
                          </td>
                          <td className='relay-price'>{row.input}</td>
                          <td className='relay-price'>{row.output}</td>
                          <td className='relay-muted-cell'>{row.context}</td>
                          <td>
                            <span className='relay-status-pill'>
                              <i aria-hidden />
                              {t(row.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='relay-table-caption'>
                  <LandingIcon name='sparkle' />
                  {t(
                    'Demo prices are placeholders for this product preview. Confirm your configured rates before launch.'
                  )}
                </div>
              </div>
            </div>
          </section>

          <section
            id='architecture'
            className='landing-section relay-section relay-architecture-section'
          >
            <div className='landing-container'>
              <div className='relay-section-heading relay-section-heading--stacked'>
                <p className='relay-overline'>
                  {t('Developer experience & features')}
                </p>
                <h2>{t('A routing layer designed for real traffic.')}</h2>
                <p>
                  {t(
                    'Three controls give every production request a clearer path from your application to the right model.'
                  )}
                </p>
              </div>
              <div className='relay-advantage-grid'>
                {ADVANTAGE_ITEMS.map((item) => (
                  <article key={item.number} className='relay-advantage-card'>
                    <div className='relay-advantage-topline'>
                      <span>{item.number}</span>
                      <span className='relay-advantage-icon'>
                        <LandingIcon name={item.icon} />
                      </span>
                    </div>
                    <p className='relay-card-eyebrow'>{t(item.eyebrow)}</p>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.description)}</p>
                    <div
                      className={`relay-mini-visual relay-mini-visual--${item.number}`}
                      aria-hidden
                    >
                      {item.number === '01' && (
                        <>
                          <i />
                          <i />
                          <i />
                          <b />
                          <b />
                        </>
                      )}
                      {item.number === '02' && (
                        <>
                          <i />
                          <i />
                          <i />
                          <i />
                          <span />
                        </>
                      )}
                      {item.number === '03' && (
                        <>
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                          <b />
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id='pricing'
            className='landing-section relay-section relay-pricing-section'
          >
            <div className='landing-container'>
              <div className='relay-section-heading relay-section-heading--center'>
                <p className='relay-overline'>{t('Pricing tiers')}</p>
                <h2>{t('Simple, flexible pricing.')}</h2>
                <p>
                  {t(
                    'Start with a small prototype, then move to the plan that matches your traffic and team.'
                  )}
                </p>
              </div>
              <div className='relay-pricing-grid'>
                {PLAN_ITEMS.map((plan) => (
                  <article
                    key={plan.name}
                    className={`relay-plan-card${plan.featured ? ' is-featured' : ''}`}
                  >
                    {plan.featured && (
                      <span className='relay-plan-badge'>
                        {t('Most popular')}
                      </span>
                    )}
                    <p className='relay-card-eyebrow'>{t(plan.name)}</p>
                    <h3>{t(plan.name)}</h3>
                    <p className='relay-plan-description'>
                      {t(plan.description)}
                    </p>
                    <div className='relay-plan-price'>
                      <strong>{plan.price}</strong>
                      <span>{t(plan.cadence)}</span>
                    </div>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span>✓</span>
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
                      className={
                        plan.featured
                          ? 'landing-button landing-button--primary'
                          : 'landing-button landing-button--secondary'
                      }
                    >
                      {t(plan.action)}
                      <LandingIcon name='arrow' />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id='steps'
            className='landing-section relay-section relay-quickstart-section'
          >
            <div className='landing-container relay-quickstart-grid'>
              <div className='relay-quickstart-copy'>
                <p className='relay-overline'>{t('Quick start')}</p>
                <h2>{t('Move from SDK to first request in minutes.')}</h2>
                <p>
                  {t(
                    'Keep the integration you already know. Point your client at the Bit2 endpoint, add a key, and start testing your GPT workflow.'
                  )}
                </p>
                <div className='relay-check-list'>
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
              </div>
              <div id='docs' className='relay-code-window'>
                <div className='relay-code-topbar'>
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <strong>Python</strong>
                  <span className='relay-code-status'>{t('Ready to run')}</span>
                </div>
                <pre>
                  <code>
                    <span className='relay-code-comment'>
                      # {t('Compatible with the official OpenAI SDKs')}
                    </span>
                    {'\n'}
                    <span className='relay-code-keyword'>from</span> openai{' '}
                    <span className='relay-code-keyword'>import</span> OpenAI
                    {'\n\n'}
                    client = OpenAI({'\n'}
                    {'  '}api_key=
                    <span className='relay-code-string'>
                      &quot;sk-bit2-your-key&quot;
                    </span>
                    ,{'\n'}
                    {'  '}base_url=
                    <span className='relay-code-string'>
                      &quot;https://api.bit2.ai/v1&quot;
                    </span>
                    {'\n'}){'\n\n'}
                    response = client.chat.completions.create({'\n'}
                    {'  '}model=
                    <span className='relay-code-string'>
                      &quot;gpt-6-astra&quot;
                    </span>
                    ,{'\n'}
                    {'  '}messages=[{'{'}
                    <span className='relay-code-string'>&quot;role&quot;</span>:{' '}
                    <span className='relay-code-string'>&quot;user&quot;</span>,{' '}
                    <span className='relay-code-string'>
                      &quot;content&quot;
                    </span>
                    :{' '}
                    <span className='relay-code-string'>&quot;Hello&quot;</span>
                    {'}'}]{'\n'})
                  </code>
                </pre>
                <div className='relay-code-footer'>
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

          <section
            id='faq'
            className='landing-section relay-section relay-faq-section'
          >
            <div className='landing-container relay-faq-grid'>
              <div className='relay-section-heading relay-section-heading--stacked'>
                <p className='relay-overline'>{t('FAQ')}</p>
                <h2>{t('A few useful answers before you start')}</h2>
                <p>
                  {t(
                    'Your deployment remains the source of truth for models, pricing, and policies.'
                  )}
                </p>
              </div>
              <div className='relay-faq-list'>
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

          <section id='start' className='relay-cta-section'>
            <div className='landing-container'>
              <div className='relay-cta-box'>
                <div className='relay-cta-orbit' aria-hidden />
                <div>
                  <p className='relay-overline'>{t('Ready to build?')}</p>
                  <h2>
                    {t('Start your next GPT workflow with a clearer route.')}
                  </h2>
                  <p>
                    {t(
                      'Create a key, connect your first request, and keep the entire path visible from the start.'
                    )}
                  </p>
                </div>
                <div className='relay-cta-actions'>
                  {primaryAction}
                  <a
                    href='#docs'
                    className='landing-button landing-button--outline'
                  >
                    {t('Read the docs')}
                    <LandingIcon name='arrow' />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className='landing-footer relay-footer'>
          <div className='landing-container relay-footer-grid'>
            <section className='relay-footer-brand'>
              <Link to='/' className='landing-brand bit2-site-brand'>
                <img
                  src='/bit2-app-icon.png'
                  alt=''
                  aria-hidden
                  width='40'
                  height='40'
                />
                <span className='bit2-wordmark'>
                  <strong>bit2</strong>
                  <span>.ai</span>
                  <small>{t('AI relay gateway')}</small>
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
              <span>© 2026 bit2.ai. {t('All rights reserved.')}</span>
              <span>{t('Built for thoughtful AI products.')}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
