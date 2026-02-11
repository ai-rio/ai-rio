import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Testing Infrastructure', () => {
  it('vitest is working', () => {
    expect(1 + 1).toBe(2)
  })

  it('react testing library is working', () => {
    render(<div>Hello AI.RIO</div>)
    expect(screen.getByText('Hello AI.RIO')).toBeInTheDocument()
  })

  it('jest-dom matchers are available', () => {
    const div = document.createElement('div')
    expect(div).toBeEmptyDOMElement()
  })
})
