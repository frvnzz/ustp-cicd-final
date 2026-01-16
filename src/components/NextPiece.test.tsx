// NextPiece.test.tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { NextPiece } from './NextPiece'
import { getRandomTetromino } from '@/lib/tetris'

describe('NextPiece', () => {
  it('should render without crashing', () => {
    const piece = getRandomTetromino()
    render(<NextPiece nextPiece={piece} />)
  })

  it('should render canvas element', () => {
    const piece = getRandomTetromino()
    const { container } = render(<NextPiece nextPiece={piece} />)
    
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should render the piece shape', () => {
    const piece = getRandomTetromino()
    const { container } = render(<NextPiece nextPiece={piece} />)
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should handle null piece gracefully', () => {
    const { container } = render(<NextPiece nextPiece={null} />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})