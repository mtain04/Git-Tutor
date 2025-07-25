import fs from 'fs-extra'
import path from 'node:path'
import { DockerManager } from '../../src/manager/docker.js'

export async function setup(workspacePath: string) {
  try {
    // Create the workspace directory
    console.log(`Setting up workspace... ${workspacePath}`)
    await fs.ensureDir(workspacePath)

    // Create the README.md file
    await fs.writeFile(path.join(workspacePath, 'README.md'), 'Hello, world!')

    // Read the meta.json file
    const meta = await fs.readFile(
      path.join(process.cwd(), 'exercises/basic-commands/meta.json')
    )
    const { steps, title, description, objectives } = JSON.parse(
      meta.toString()
    )

    // Build Docker image if needed
    console.log('🐳 Preparing Docker environment...')
    await DockerManager.buildImageIfNeeded()

    // Create Docker container for this exercise
    const containerName = await DockerManager.createContainer({
      exerciseId: 'basic-commands',
      workspacePath: path.resolve(workspacePath),
    })

    console.log('✅ Workspace setup complete!')

    DockerManager.showAccessInstructions(containerName)

    return {
      title,
      description,
      objectives,
      steps,
      containerName, // Return container name for cleanup
    }
  } catch (error) {
    console.error(`❌ Error setting up workspace: ${error}`)
    throw error
  }
}
