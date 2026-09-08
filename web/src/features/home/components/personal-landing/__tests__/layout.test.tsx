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
import type { ReactNode } from 'react'
import { describe, expect, test, vi } from 'vitest'

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
  test('when signed out, exposes model navigation and demo pricing content', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation',
    })
    expect(
      within(navigation).getByRole('link', { name: 'Models' })
    ).toHaveAttribute('href', '#models')
    expect(
      within(navigation).getByRole('link', { name: 'Why New API' })
    ).toHaveAttribute('href', '#features')
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/sign-in'
    )
    expect(
      screen.getAllByRole('link', { name: 'Start for free' }).length
    ).toBeGreaterThan(0)
    expect(document.querySelector('#models')).toBeInTheDocument()
    expect(document.querySelector('#features')).toBeInTheDocument()
    expect(document.querySelector('#steps')).toBeInTheDocument()
    expect(document.querySelector('#faq')).toBeInTheDocument()
    expect(screen.getByText('Demo pricing')).toBeInTheDocument()
    expect(screen.getByText('GPT-6 Astra')).toBeInTheDocument()
    expect(screen.getByText('GPT-5.6 Sol')).toBeInTheDocument()
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

  test('keeps the New API brand visible in the header and footer', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const logos = screen.getAllByRole('img', { name: 'New API' })
    expect(logos).toHaveLength(2)
    for (const logo of logos) {
      expect(logo).toHaveAttribute('src', '/new-api-logo.svg')
    }
  })

  test('keeps the Python integration example available below the mascot hero', () => {
    render(<PersonalLanding isAuthenticated={false} />)

    const steps = document.querySelector('#steps')
    expect(steps?.querySelector('code')).toHaveTextContent(
      'from openai import OpenAI'
    )
    expect(steps?.querySelector('code')).toHaveTextContent(
      'client.chat.completions.create'
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
