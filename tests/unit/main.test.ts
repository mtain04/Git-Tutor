import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { main } from '../../src/main.js'
import { menu } from '../../src/menu.js'
import { checkPrerequisites } from '../../src/prerequisites.js'

// Mock dependencies
vi.mock('../../src/prerequisites.js', () => ({
  checkPrerequisites: vi.fn(),
}))

vi.mock('../../src/menu.js', () => ({
  menu: vi.fn(),
}))

describe('Main function', () => {
  let mockConsoleLog: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should execute the complete main flow successfully', async () => {
    const mockCheckPrerequisites = vi.mocked(checkPrerequisites)
    const mockMenu = vi.mocked(menu)
    mockCheckPrerequisites.mockResolvedValue({ hasGit: true, hasDocker: true })
    mockMenu.mockResolvedValue(undefined)
    await main()

    expect(mockCheckPrerequisites).toHaveBeenCalledOnce()
    expect(mockMenu).toHaveBeenCalledOnce()
  })

  it('should call functions in the correct order', async () => {
    const mockCheckPrerequisites = vi.mocked(checkPrerequisites)
    const mockMenu = vi.mocked(menu)
    const callOrder: string[] = []
    mockCheckPrerequisites.mockImplementation(async () => {
      callOrder.push('checkPrerequisites')
      return { hasGit: true, hasDocker: true }
    })
    mockMenu.mockImplementation(async () => {
      callOrder.push('menu')
    })
    await main()

    expect(callOrder).toEqual(['checkPrerequisites', 'menu'])
  })

  it('should handle prerequisites check failure', async () => {
    const mockCheckPrerequisites = vi.mocked(checkPrerequisites)
    const mockMenu = vi.mocked(menu)
    const prerequisitesError = new Error('Prerequisites check failed')
    mockCheckPrerequisites.mockRejectedValue(prerequisitesError)

    await expect(main()).rejects.toThrow('Prerequisites check failed')
    expect(mockMenu).not.toHaveBeenCalled()
  })

  it('should handle menu function failure', async () => {
    const mockCheckPrerequisites = vi.mocked(checkPrerequisites)
    const mockMenu = vi.mocked(menu)
    mockCheckPrerequisites.mockResolvedValue({ hasGit: true, hasDocker: true })
    const menuError = new Error('Menu failed')
    mockMenu.mockRejectedValue(menuError)

    await expect(main()).rejects.toThrow('Menu failed')
    expect(mockCheckPrerequisites).toHaveBeenCalledOnce()
  })

  it('should display welcome messages', async () => {
    const mockCheckPrerequisites = vi.mocked(checkPrerequisites)
    const mockMenu = vi.mocked(menu)
    mockCheckPrerequisites.mockResolvedValue({ hasGit: true, hasDocker: true })
    mockMenu.mockResolvedValue(undefined)
    await main()

    expect(mockConsoleLog).toHaveBeenCalledWith(
      '🧠 GitTutor - Checking environment...'
    )
    expect(mockConsoleLog).toHaveBeenCalledWith('🎓 Welcome to GitTutor CLI ')
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'You are about to learn Git in a fun and interactive way'
    )
  })
})
