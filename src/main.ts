#!/usr/bin/env node

import { menu } from './menu.js'
import { checkPrerequisites } from './prerequisites.js'

async function main() {
  console.log('🧠 GitTutor - Checking environment...')
  await checkPrerequisites()

  console.log('')

  console.log(
    `
.------------------------------------------------------------------------.
|                                                                        |
|      ____   ___   _             _____           _                      |
|     / ___| |_ _| | |_          |_   _|  _   _  | |_    ___    _ __     |
|    | |  _   | |  | __|  _____    | |   | | | | | __|  / _ \\  | '__|    |
|    | |_| |  | |  | |_  |_____|   | |   | |_| | | |_  | (_) | | |       |
|     \\____| |___|  \\__|           |_|    \\__,_|  \\__|  \\___/  |_|       |
|                                                                        |
|                                                                        |
'------------------------------------------------------------------------'
  `
  )

  console.log('🎓 Welcome to GitTutor CLI ')
  console.log('You are about to learn Git in a fun and interactive way')

  console.log('')

  menu()
}

main()
