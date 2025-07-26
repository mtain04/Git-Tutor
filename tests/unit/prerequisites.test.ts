import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { checkPrerequisites } from '../../src/prerequisites.js'

// Mock child_process pour simuler les échecs de commandes
vi.mock('child_process', () => ({
  execSync: vi.fn(),
}))

describe('Prerequisites', () => {
  let mockExecSync: ReturnType<typeof vi.fn>
  let mockConsoleLog: ReturnType<typeof vi.spyOn>
  let mockProcessExit: any

  beforeEach(async () => {
    vi.clearAllMocks()
    const { execSync } = await import('child_process')
    mockExecSync = vi.mocked(execSync)
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    mockProcessExit = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit called')
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should detect Git installation', async () => {
    mockExecSync.mockReturnValue('')
    const result = await checkPrerequisites()
    expect(result.hasGit).toBe(true)
  })

  it('should detect Docker installation', async () => {
    mockExecSync.mockReturnValue('')
    const result = await checkPrerequisites()
    expect(result.hasDocker).toBe(true)
  })

  it('should handle Git not installed', async () => {
    mockExecSync.mockImplementationOnce(() => {
      throw new Error('git: command not found')
    })

    await expect(checkPrerequisites()).rejects.toThrow('process.exit called')
    expect(mockConsoleLog).toHaveBeenCalledWith('❌ Git is required !')
    expect(mockConsoleLog).toHaveBeenCalledWith('📥 Install Git: https://git-scm.com/downloads')
    expect(mockProcessExit).toHaveBeenCalledWith(1)
  })

  it('should handle Docker not installed', async () => {
    mockExecSync
      .mockReturnValueOnce('')
      .mockImplementationOnce(() => {
        throw new Error('docker: command not found')
      })

    await expect(checkPrerequisites()).rejects.toThrow('process.exit called')
    expect(mockConsoleLog).toHaveBeenCalledWith('✅ Git detected')
    expect(mockConsoleLog).toHaveBeenCalledWith('❌ Docker is required !')
    expect(mockConsoleLog).toHaveBeenCalledWith('📥 Install Docker: https://docker.com/get-started')
    expect(mockProcessExit).toHaveBeenCalledWith(1)
  })
})
