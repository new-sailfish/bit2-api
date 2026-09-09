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
import { fireEvent, render, screen, within } from '@testing-library/react'
import i18next from 'i18next'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { PersonalLanding } from '..'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/components/language-switcher', () => ({
  LanguageSwitcher: () => null,
}))

vi.mock('@/components/theme-switch', () => ({
  ThemeSwitch: () => null,
}))

describe('personal landing layout', () => {
  beforeEach(async () => {
    await i18next.changeLanguage('en')
    document.documentElement.lang = 'en'
  })

  afterEach(async () => {
    await i18next.changeLanguage('en')
  })

  test('when signed out, exposes model navigation and demo pricing content', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Models' })
    ).toHaveAttribute('href', '#models')
    expect(
      within(navigation).getByRole('link', { name: 'Architecture' })
    ).toHaveAttribute('href', '#architecture')
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/sign-in'
    )
    expect(
      screen.getAllByRole('link', { name: 'Start for free' }).length
    ).toBeGreaterThan(0)
    expect(document.querySelector('#models')).toBeInTheDocument()
    expect(document.querySelector('#architecture')).toBeInTheDocument()
    expect(document.querySelector('#steps')).toBeInTheDocument()
    expect(document.querySelector('#faq')).toBeInTheDocument()
    expect(screen.getByText('Demo pricing')).toBeInTheDocument()
    expect(screen.getAllByText('GPT-6 Astra').length).toBeGreaterThan(0)
    expect(screen.getAllByText('GPT-5.6 Sol').length).toBeGreaterThan(0)
    expect(
      screen.queryByText(new RegExp(['gpt', '4o'].join('-'), 'i'))
    ).toBeNull()
  })

  test('when signed in, keeps one dashboard action in the top navigation', () => {
    render(<PersonalLanding isAuthenticated />)

    const header = screen.getByRole('banner')
    expect(
      within(header).getAllByRole('link', { name: 'Go to Dashboard' })
    ).toHaveLength(1)
    expect(within(header).queryByRole('link', { name: 'Sign in' })).toBeNull()
  })

  test('does not show duplicate New API logos in the header or footer', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    expect(screen.queryByRole('img', { name: 'New API' })).toBeNull()
  })

  test('uses the warm Bit2 hero artwork and model card presentation', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    expect(document.querySelector('.bit2-warm-landing')).toBeInTheDocument()
    expect(document.querySelector('.warm-hero-art img')).toHaveAttribute(
      'src',
      '/bit2-rabbit.svg'
    )
    expect(screen.getByRole('heading', { name: 'GPT-6 Astra' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GPT-5.6 Luna' })).toBeInTheDocument()
  })

  test('uses the Bit2 rabbit mark for both brand links', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const brandLinks = screen.getAllByRole('link', { name: /bit2\.ai/i })
    expect(brandLinks).toHaveLength(2)
    for (const brandLink of brandLinks) {
      expect(brandLink.querySelector('img')).toHaveAttribute(
        'src',
        '/bit2-logo.svg'
      )
    }
  })

  test('switches the whole page language and document locale together', async () => {
    i18next.addResourceBundle(
      'zhCN',
      'translation',
      {
        'One API, connect every AI model': '一个接口，连接所有 AI 模型',
        'Powerful AI, within reach.': '让强大的 AI 触手可及',
        'Bit2.ai makes powerful AI accessible through one reliable, OpenAI-compatible gateway. Connect your product to GPT-6 and GPT-5.6 with clear routing, transparent pricing, and a console your team can understand.':
          '通过稳定的兼容 OpenAI 网关接入 GPT-6 和 GPT-5.6',
        'Start for free': '免费开始',
        'A few useful answers before you start': '开始前的常见问题',
      },
      true,
      true
    )

    render(<PersonalLanding isAuthenticated={false} />)
    await i18next.changeLanguage('zhCN')

    expect(
      await screen.findByRole('heading', {
        name: /一个接口，连接所有 AI 模型/,
      })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: '免费开始' }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { name: '开始前的常见问题' })
    ).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('zh-CN')
  })

  test('keeps the Python integration example available below the relay hero', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const steps = document.querySelector('#steps')
    expect(steps?.querySelector('code')).toHaveTextContent(
      'from openai import OpenAI'
    )
    expect(steps?.querySelector('code')).toHaveTextContent(
      'client.chat.completions.create'
    )
  })

  test('switches the quickstart code example when a language tab is selected', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const tabs = screen.getByRole('tablist', { name: 'Code examples' })
    expect(
      within(tabs).getByRole('tab', { name: 'Python' })
    ).toHaveAttribute('aria-selected', 'true')

    fireEvent.click(within(tabs).getByRole('tab', { name: 'JavaScript' }))

    expect(
      within(tabs).getByRole('tab', { name: 'JavaScript' })
    ).toHaveAttribute('aria-selected', 'true')
    expect(document.querySelector('#docs code')).toHaveTextContent(
      'const client = new OpenAI'
    )
  })

  test('dismisses the announcement when the close control is activated', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    expect(
      screen.getByText(
        'GPT-6 and GPT-5.6 access is ready for your next prototype.'
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Close announcement' }))

    expect(
      screen.queryByText(
        'GPT-6 and GPT-5.6 access is ready for your next prototype.'
      )
    ).toBeNull()
  })
})
