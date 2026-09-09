/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { useHomePageContent } from '../use-home-page-content'

const mocks = vi.hoisted(() => ({
  getHomePageContent: vi.fn(),
}))

vi.mock('../../api', () => ({
  getHomePageContent: mocks.getHomePageContent,
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe('useHomePageContent', () => {
  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('falls back to the built-in landing page without an error toast when the optional endpoint fails', async () => {
    mocks.getHomePageContent.mockRejectedValueOnce(new Error('Not Found'))

    const { result } = renderHook(() => useHomePageContent())

    await waitFor(() => expect(result.current.isLoaded).toBe(true))

    expect(result.current.content).toBe('')
    expect(result.current.isUrl).toBe(false)
    const { toast } = await import('sonner')
    expect(toast.error).not.toHaveBeenCalled()
  })
})
