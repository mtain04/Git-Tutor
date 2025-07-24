import inquirer from 'inquirer'

export async function menu() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'exercise',
      message: 'Choose a GitTutor exercise:',
      choices: [
        {
          name: 'Initialize a Git repository (init-commit)',
          value: 'init-commit',
        },
        { name: 'Quit', value: 'exit' },
      ],
    },
  ])

  if (answer.exercise === 'init-commit') {
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
