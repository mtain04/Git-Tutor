import { describe, expect, it } from 'vitest'
import { checkPrerequisites } from '../../src/prerequisites.js'

describe('Prerequisites', () => {
  it('should detect Git installation', async () => {
    const result = await checkPrerequisites()
    expect(result.hasGit).toBe(true)
  })

  it('should detect Docker installation', async () => {
    const result = await checkPrerequisites()
    expect(result.hasDocker).toBe(true)
  })
})
