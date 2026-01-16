import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOES,
  createEmptyBoard,
  getRandomTetromino,
  rotateTetromino,
  checkCollision,
  mergeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  type Cell,
  type Tetromino,
  type TetrominoType,
} from './tetris'

describe('Tetris Game Logic', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard()
      expect(board).toHaveLength(BOARD_HEIGHT)
      expect(board[0]).toHaveLength(BOARD_WIDTH)
    })

    it('should create a board with all cells unfilled', () => {
      const board = createEmptyBoard()
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell.filled).toBe(false)
          expect(cell.color).toBe('')
        })
      })
    })
  })

  describe('getRandomTetromino', () => {
    it('should return a valid tetromino', () => {
      const tetromino = getRandomTetromino()
      expect(tetromino).toBeDefined()
      expect(tetromino.type).toMatch(/^[IOTSZJL]$/)
      expect(tetromino.shape).toBeDefined()
      expect(tetromino.color).toBeDefined()
      expect(tetromino.position).toBeDefined()
    })

    it('should position tetromino at the top center of the board', () => {
      const tetromino = getRandomTetromino()
      expect(tetromino.position.y).toBe(0)
      expect(tetromino.position.x).toBeGreaterThanOrEqual(0)
      expect(tetromino.position.x).toBeLessThan(BOARD_WIDTH)
    })

    it('should return different tetrominoes on multiple calls', () => {
      const tetrominoes = new Set<TetrominoType>()
      for (let i = 0; i < 50; i++) {
        tetrominoes.add(getRandomTetromino().type)
      }
      // Should get at least 3 different types in 50 attempts
      expect(tetrominoes.size).toBeGreaterThanOrEqual(3)
    })
  })

  describe('rotateTetromino', () => {
    it('should rotate I-piece correctly', () => {
      const iPiece: Tetromino = {
        type: 'I',
        shape: TETROMINOES.I.shape.map(row => [...row]),
        color: TETROMINOES.I.color,
        position: { x: 0, y: 0 },
      }
      
      const rotated = rotateTetromino(iPiece)
      // After rotation, horizontal I becomes vertical
      expect(rotated[0][2]).toBe(1)
      expect(rotated[1][2]).toBe(1)
      expect(rotated[2][2]).toBe(1)
      expect(rotated[3][2]).toBe(1)
    })

    it('should rotate T-piece correctly', () => {
      const tPiece: Tetromino = {
        type: 'T',
        shape: TETROMINOES.T.shape.map(row => [...row]),
        color: TETROMINOES.T.color,
        position: { x: 0, y: 0 },
      }
      
      const rotated = rotateTetromino(tPiece)
      expect(rotated).toHaveLength(3)
      expect(rotated[0]).toHaveLength(3)
    })

    it('should not mutate the original tetromino', () => {
      const original: Tetromino = {
        type: 'T',
        shape: TETROMINOES.T.shape.map(row => [...row]),
        color: TETROMINOES.T.color,
        position: { x: 0, y: 0 },
      }
      const originalShape = original.shape.map(row => [...row])
      
      rotateTetromino(original)
      
      expect(original.shape).toEqual(originalShape)
    })
  })

  describe('checkCollision', () => {
    let board: Cell[][]
    let tetromino: Tetromino

    beforeEach(() => {
      board = createEmptyBoard()
      tetromino = {
        type: 'O',
        shape: TETROMINOES.O.shape.map(row => [...row]),
        color: TETROMINOES.O.color,
        position: { x: 4, y: 0 },
      }
    })

    it('should return false when there is no collision', () => {
      expect(checkCollision(board, tetromino)).toBe(false)
    })

    it('should detect collision with left wall', () => {
      tetromino.position.x = 0
      expect(checkCollision(board, tetromino, -1, 0)).toBe(true)
    })

    it('should detect collision with right wall', () => {
      tetromino.position.x = BOARD_WIDTH - 2
      expect(checkCollision(board, tetromino, 1, 0)).toBe(true)
    })

    it('should detect collision with bottom', () => {
      tetromino.position.y = BOARD_HEIGHT - 2
      expect(checkCollision(board, tetromino, 0, 1)).toBe(true)
    })

    it('should detect collision with filled cells', () => {
      board[5][5] = { filled: true, color: 'red' }
      tetromino.position = { x: 4, y: 4 }
      expect(checkCollision(board, tetromino)).toBe(true)
    })

    it('should allow piece at top of board', () => {
      tetromino.position = { x: 4, y: -1 }
      expect(checkCollision(board, tetromino, 0, 1)).toBe(false)
    })
  })

  describe('mergeTetromino', () => {
    let board: Cell[][]
    let tetromino: Tetromino

    beforeEach(() => {
      board = createEmptyBoard()
      tetromino = {
        type: 'O',
        shape: TETROMINOES.O.shape.map(row => [...row]),
        color: 'yellow',
        position: { x: 4, y: 5 },
      }
    })

    it('should merge tetromino into board', () => {
      const newBoard = mergeTetromino(board, tetromino)
      
      expect(newBoard[5][4].filled).toBe(true)
      expect(newBoard[5][5].filled).toBe(true)
      expect(newBoard[6][4].filled).toBe(true)
      expect(newBoard[6][5].filled).toBe(true)
    })

    it('should set correct color for merged cells', () => {
      const newBoard = mergeTetromino(board, tetromino)
      
      expect(newBoard[5][4].color).toBe('yellow')
      expect(newBoard[5][5].color).toBe('yellow')
    })

    it('should not mutate original board', () => {
      const originalBoard = board.map(row => [...row])
      mergeTetromino(board, tetromino)
      
      expect(board).toEqual(originalBoard)
    })

    it('should not merge cells outside board bounds', () => {
      tetromino.position = { x: -1, y: 0 }
      const newBoard = mergeTetromino(board, tetromino)
      
      // Should not throw error and should handle gracefully
      expect(newBoard).toBeDefined()
    })
  })

  describe('clearLines', () => {
    let board: Cell[][]

    beforeEach(() => {
      board = createEmptyBoard()
    })

    it('should clear a full line', () => {
      // Fill bottom line
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }

      const { newBoard, linesCleared } = clearLines(board)
      
      expect(linesCleared).toBe(1)
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => !cell.filled)).toBe(true)
    })

    it('should clear multiple full lines', () => {
      // Fill bottom 3 lines
      for (let y = BOARD_HEIGHT - 3; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          board[y][x] = { filled: true, color: 'red' }
        }
      }

      const { newBoard, linesCleared } = clearLines(board)
      
      expect(linesCleared).toBe(3)
    })

    it('should not clear incomplete lines', () => {
      // Fill bottom line except one cell
      for (let x = 0; x < BOARD_WIDTH - 1; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }

      const { newBoard, linesCleared } = clearLines(board)
      
      expect(linesCleared).toBe(0)
      expect(newBoard[BOARD_HEIGHT - 1][0].filled).toBe(true)
    })

    it('should maintain board height after clearing lines', () => {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }

      const { newBoard } = clearLines(board)
      
      expect(newBoard).toHaveLength(BOARD_HEIGHT)
    })

    it('should add empty lines at top after clearing', () => {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = { filled: true, color: 'red' }
      }

      const { newBoard } = clearLines(board)
      
      expect(newBoard[0].every(cell => !cell.filled)).toBe(true)
    })
  })

  describe('calculateScore', () => {
    it('should return 0 for no lines cleared', () => {
      expect(calculateScore(0, 1)).toBe(0)
    })

    it('should calculate correct score for single line', () => {
      expect(calculateScore(1, 1)).toBe(100)
      expect(calculateScore(1, 2)).toBe(200)
    })

    it('should calculate correct score for double lines', () => {
      expect(calculateScore(2, 1)).toBe(300)
      expect(calculateScore(2, 3)).toBe(900)
    })

    it('should calculate correct score for triple lines', () => {
      expect(calculateScore(3, 1)).toBe(500)
    })

    it('should calculate correct score for tetris (4 lines)', () => {
      expect(calculateScore(4, 1)).toBe(800)
      expect(calculateScore(4, 5)).toBe(4000)
    })

    it('should scale score with level', () => {
      expect(calculateScore(1, 10)).toBe(1000)
      expect(calculateScore(4, 10)).toBe(8000)
    })
  })

  describe('calculateLevel', () => {
    it('should start at level 1', () => {
      expect(calculateLevel(0)).toBe(1)
      expect(calculateLevel(5)).toBe(1)
      expect(calculateLevel(9)).toBe(1)
    })

    it('should increase level every 10 lines', () => {
      expect(calculateLevel(10)).toBe(2)
      expect(calculateLevel(19)).toBe(2)
      expect(calculateLevel(20)).toBe(3)
      expect(calculateLevel(50)).toBe(6)
    })

    it('should handle large numbers of lines', () => {
      expect(calculateLevel(100)).toBe(11)
      expect(calculateLevel(999)).toBe(100)
    })
  })

  describe('getDropSpeed', () => {
    it('should return correct speed for level 1', () => {
      expect(getDropSpeed(1)).toBe(1000)
    })

    it('should decrease speed as level increases', () => {
      expect(getDropSpeed(2)).toBe(900)
      expect(getDropSpeed(3)).toBe(800)
      expect(getDropSpeed(5)).toBe(600)
    })

    it('should have a minimum speed', () => {
      expect(getDropSpeed(10)).toBe(100)
      expect(getDropSpeed(20)).toBe(100)
      expect(getDropSpeed(100)).toBe(100)
    })

    it('should never go below 100ms', () => {
      for (let level = 1; level <= 100; level++) {
        expect(getDropSpeed(level)).toBeGreaterThanOrEqual(100)
      }
    })
  })
})