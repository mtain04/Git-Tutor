import { execSync } from 'child_process'
import simpleGit from 'simple-git'

export async function checkPrerequisites() {
  console.log('')
  await checkGit()
  await checkDocker()
}

async function checkGit() {
  try {
    const git = simpleGit()
    await git.version()
    console.log('✅ Git detected')
  } catch {
    console.log('❌ Git is required !')
    console.log('📥 Install Git: https://git-scm.com/downloads')
    process.exit(1)
  }
}

async function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'ignore' })
    console.log('✅ Docker detected')
  } catch {
    console.log('❌ Docker is required !')
    console.log('📥 Install Docker: https://docker.com/get-started')
    process.exit(1)
  }
}
