import inquirer from 'inquirer'

export async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'exercise',
      message: 'Choisis un exercice GitTutor :',
      choices: [
        {
          name: 'Initialiser un dépôt Git (init-commit)',
          value: 'init-commit',
        },
        { name: 'Quitter', value: 'exit' },
      ],
    },
  ])

  if (answer.exercise === 'init-commit') {
    // await setup()

    console.log(
      '\n👉 Maintenant, effectue les actions Git demandées dans ce dossier.'
    )
    console.log('Quand tu as terminé, appuie sur Entrée pour valider.')

    await inquirer.prompt([
      {
        type: 'input',
        name: 'ready',
        message: 'Prêt à valider ?',
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
    console.log('À bientôt ! 👋')
    process.exit(0)
  }
}
