import { describe, expect, it, vi } from 'vitest'
import { checkPrerequisites } from '../../src/prerequisites.js'

describe('Prerequisites', () => {
  it('should detect Git installation', async () => {
    const mockGit = vi.fn().mockResolvedValue({ version: '2.40.0' })

    const result = await checkPrerequisites()
    expect(result.hasGit).toBe(true)
  })

  it('should detect Docker installation', async () => {
    const mockDocker = vi.fn().mockResolvedValue({ version: '2.40.0' })

    const result = await checkPrerequisites()
    expect(result.hasDocker).toBe(true)
  })
})
