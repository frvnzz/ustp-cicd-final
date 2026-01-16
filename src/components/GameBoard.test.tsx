import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GameBoard } from './GameBoard'
import { createEmptyBoard, getRandomTetromino } from '@/lib/tetris'

describe('GameBoard', () => {
  it('should render without crashing', () => {
    const board = createEmptyBoard()
    render(<GameBoard board={board} currentPiece={null} gameOver={false} />)
  })

  it('should render canvas element', () => {
    const board = createEmptyBoard()
    const { container } = render(<GameBoard board={board} currentPiece={null} gameOver={false} />)
    
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should render current piece when provided', () => {
    const board = createEmptyBoard()
    const piece = getRandomTetromino()
    const { container } = render(<GameBoard board={board} currentPiece={piece} gameOver={false} />)
    
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('should render with gameOver state', () => {
    const board = createEmptyBoard()
    const { container } = render(<GameBoard board={board} currentPiece={null} gameOver={true} />)
    
    expect(container.firstChild).toBeInTheDocument()
  })
})