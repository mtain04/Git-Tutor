import inquirer from 'inquirer'
import { choices } from './constants/choices.const.js'

export async function menu() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'exercise',
      message: 'Choose a GitTutor exercise:',
      choices,
    },
  ])

  if (answer.exercise === 'basic-commands') {
    // await setup()

    console.log('\n👉 Now, perform the required Git actions in this folder.')
    console.log('When you are done, press Enter to validate.')

    await inquirer.prompt([
      {
        type: 'input',
        name: 'ready',
        message: 'Ready to validate?',
      },
    ])

    // const success = await validate()
    // if (success) {
    //   console.log('🎉 Bravo, tu as réussi cet exercice !')
    // } else {
    //   console.log('🔄 Essaie encore, tu peux le faire !')
    // }
  }

  if (answer.exercise === 'exit') {
    console.log('See you soon! 👋')
    process.exit(0)
  }
}
