import { execSync } from 'child_process'

export async function checkPrerequisites() {
  console.log('')
  const hasGit = await checkGit()
  const hasDocker = await checkDocker()

  return { hasGit, hasDocker }
}

async function checkGit() {
  try {
    execSync('git --version', { stdio: 'ignore' })
    console.log('✅ Git detected')
    return true
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
    return true
  } catch {
    console.log('❌ Docker is required !')
    console.log('📥 Install Docker: https://docker.com/get-started')
    process.exit(1)
  }
}
