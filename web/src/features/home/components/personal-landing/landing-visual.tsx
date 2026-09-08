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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LandingIcon } from './landing-icon'

const CODE_TABS = ['cURL', 'Python', 'JavaScript'] as const
type CodeTab = (typeof CODE_TABS)[number]

const CODE_SNIPPETS: Record<CodeTab, string> = {
  cURL: [
    'curl https://your-domain.example/v1/chat/completions \\',
    '  -H "Authorization: Bearer sk-..." \\',
    '  -H "Content-Type: application/json" \\',
    "  -d '{",
    '    "model": "gpt-5.6",',
    '    "messages": [{"role": "user", "content": "Hello"}]',
    "  }'",
  ].join('\n'),
  Python: [
    'from openai import OpenAI',
    '',
    'client = OpenAI(',
    '  api_key="sk-...",',
    '  base_url="https://your-domain.example/v1"',
    ')',
    '',
    'response = client.chat.completions.create(',
    '  model="gpt-5.6",',
    '  messages=[...]',
    ')',
  ].join('\n'),
  JavaScript: [
    'import OpenAI from "openai";',
    '',
    'const client = new OpenAI({',
    '  apiKey: process.env.OPENAI_API_KEY,',
    '  baseURL: "https://your-domain.example/v1",',
    '});',
    '',
    'const response = await client.chat.completions.create({',
    '  model: "gpt-5.6",',
    '  messages: [...],',
    '});',
  ].join('\n'),
}

export function LandingVisual() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<CodeTab>('cURL')

  return (
    <section
      id='developers'
      className='landing-visual'
      aria-label={t('Developer integration preview')}
    >
      <div className='landing-visual-glow' aria-hidden />
      <div className='landing-visual-window'>
        <div className='landing-visual-topbar'>
          <div className='landing-window-dots' aria-hidden>
            <i />
            <i />
            <i />
          </div>
          <span className='landing-visual-path'>
            <span className='landing-visual-path-icon'>
              <LandingIcon name='sparkle' />
            </span>
            {t('GPT playground')}
          </span>
          <span className='landing-visual-live'>
            <i aria-hidden />
            {t('Live')}
          </span>
        </div>

        <div
          className='landing-visual-tabs'
          role='tablist'
          aria-label={t('Code examples')}
        >
          {CODE_TABS.map((tab) => (
            <button
              key={tab}
              type='button'
              role='tab'
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'is-active' : undefined}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <span className='landing-visual-endpoint'>
            <LandingIcon name='shield' />
            {t('OpenAI compatible')}
          </span>
        </div>

        <div className='landing-visual-code'>
          <div className='landing-code-label'>
            <span>{t('Connect in minutes')}</span>
            <button type='button' aria-label={t('Copy code')}>
              <LandingIcon name='copy' />
            </button>
          </div>
          <pre>
            <code>{CODE_SNIPPETS[activeTab]}</code>
          </pre>
        </div>

        <div className='landing-visual-chat'>
          <div className='landing-chat-heading'>
            <span className='landing-chat-avatar'>
              <LandingIcon name='sparkle' />
            </span>
            <div>
              <strong>{t('Chat')}</strong>
              <span>gpt-5.6 · {t('Streaming')}</span>
            </div>
            <span className='landing-chat-badge'>{t('Ready')}</span>
          </div>
          <div className='landing-chat-messages'>
            <div className='landing-chat-message landing-chat-message--user'>
              {t('Summarize the product brief in three clear points.')}
            </div>
            <div className='landing-chat-message landing-chat-message--assistant'>
              <span className='landing-chat-message-label'>
                <LandingIcon name='sparkle' />
                {t('GPT response')}
              </span>
              {t(
                'A focused gateway, a familiar API, and the visibility your team needs to ship with confidence.'
              )}
            </div>
          </div>
          <div className='landing-composer'>
            <span>{t('Ask anything')}</span>
            <button type='button' aria-label={t('Send')}>
              <LandingIcon name='arrow' />
            </button>
          </div>
        </div>

        <div className='landing-visual-footer'>
          <span>
            <i />
            {t('Requests flowing normally')}
          </span>
          <span>{t('Latency')} 812ms</span>
          <span>{t('Tokens')} 352</span>
        </div>
      </div>
    </section>
  )
}
