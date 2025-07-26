# Guide des Tests avec Vitest

## Table des matières

- [Configuration](#configuration)
- [Structure des tests](#structure-des-tests)
- [Fonctions essentielles](#fonctions-essentielles)
- [Mocking](#mocking)
- [Assertions](#assertions)
- [Bonnes pratiques](#bonnes-pratiques)
- [Commandes utiles](#commandes-utiles)

## Configuration

Vitest est configuré dans `vitest.config.ts` avec :

- Environnement Node.js
- Timeout de 30 secondes
- Couverture de code avec v8
- Exclusions automatiques des dossiers non-testables

## Structure des tests

### Fichier de test basique

```typescript
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { functionToTest } from '../src/module.js'

describe('Module name', () => {
  beforeEach(() => {
    // Setup avant chaque test
  })

  afterEach(() => {
    // Nettoyage après chaque test
  })

  it('should do something', async () => {
    // Test code here
  })
})
```

## Fonctions essentielles

### Organisation des tests

| Fonction       | Usage                          | Description                                |
| -------------- | ------------------------------ | ------------------------------------------ |
| `describe()`   | `describe('Module', () => {})` | Groupe les tests par module/fonctionnalité |
| `it()`         | `it('should work', () => {})`  | Définit un test individuel                 |
| `beforeEach()` | `beforeEach(() => {})`         | Exécuté avant chaque test                  |
| `afterEach()`  | `afterEach(() => {})`          | Exécuté après chaque test                  |

### Tests asynchrones

```typescript
// Fonction async
it('should handle async operation', async () => {
  const result = await asyncFunction()
  expect(result).toBe('expected')
})

// Test d'erreur async
it('should handle errors', async () => {
  await expect(asyncFunction()).rejects.toThrow('Error message')
})
```

## Mocking

### Mock de modules

```typescript
// Mock complet d'un module
vi.mock('../src/module.js', () => ({
  functionName: vi.fn(),
}))

// Utilisation du mock
const mockFunction = vi.mocked(functionName)
mockFunction.mockResolvedValue('result')
```

### Mock de fonctions spécifiques

```typescript
// Mock de console.log
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

// Vérification des appels
expect(mockConsoleLog).toHaveBeenCalledWith('message')
expect(mockConsoleLog).toHaveBeenCalledTimes(2)
```

### Configuration des mocks

```typescript
// Valeur de retour
mockFunction.mockReturnValue('value')
mockFunction.mockResolvedValue('async value')

// Erreur
mockFunction.mockRejectedValue(new Error('Failed'))

// Implementation personnalisée
mockFunction.mockImplementation(param => {
  return `processed: ${param}`
})
```

### Nettoyage des mocks

```typescript
beforeEach(() => {
  vi.clearAllMocks() // Efface l'historique des appels
})

afterEach(() => {
  vi.restoreAllMocks() // Restaure les fonctions originales
})
```

## Assertions

### Assertions basiques

```typescript
expect(value).toBe('exact match') // Égalité stricte
expect(value).toEqual({ key: 'value' }) // Égalité profonde
expect(value).toBeTruthy() // Valeur truthy
expect(value).toBeFalsy() // Valeur falsy
expect(value).toBeUndefined() // Undefined
expect(value).toBeNull() // Null
```

### Assertions de chaînes

```typescript
expect(string).toContain('substring') // Contient
expect(string).toMatch(/regex/) // Correspond au regex
expect(string).toHaveLength(5) // Longueur
```

### Assertions de tableaux

```typescript
expect(array).toHaveLength(3) // Longueur
expect(array).toContain('item') // Contient un élément
expect(array).toEqual(['a', 'b', 'c']) // Égalité complète
```

### Assertions de fonctions

```typescript
expect(mockFn).toHaveBeenCalled() // A été appelée
expect(mockFn).toHaveBeenCalledTimes(2) // Nombre d'appels
expect(mockFn).toHaveBeenCalledWith('arg') // Appelée avec des arguments
expect(mockFn).toHaveBeenCalledOnce() // Appelée une seule fois
expect(mockFn).not.toHaveBeenCalled() // N'a pas été appelée
```

### Assertions d'erreurs

```typescript
expect(() => throwingFunction()).toThrow() // Lance une erreur
expect(() => throwingFunction()).toThrow('message') // Message spécifique
await expect(asyncFunction()).rejects.toThrow() // Erreur async
```

## Bonnes pratiques

### 1. Structure claire

```typescript
it('should do something specific', async () => {
  // Setup
  const mockData = { id: 1, name: 'test' }
  mockFunction.mockResolvedValue(mockData)

  // Action
  const result = await functionToTest()

  // Verification
  expect(result).toEqual(mockData)
  expect(mockFunction).toHaveBeenCalledOnce()
})
```

### 2. Noms de tests descriptifs

```typescript
// ✅ Bon
it('should return user data when valid ID is provided')

// ❌ Mauvais
it('should work')
```

### 3. Tests isolés

```typescript
beforeEach(() => {
  vi.clearAllMocks() // Chaque test repart de zéro
})
```

### 4. Mock uniquement les dépendances

```typescript
// ✅ Mock des dépendances externes
vi.mock('./externalService.js')

// ❌ Ne pas mocker la fonction testée
// vi.mock('./functionToTest.js')
```

## Exemple complet

```typescript
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { processUser } from '../src/userService.js'
import { database } from '../src/database.js'

// Mock dependencies
vi.mock('../src/database.js', () => ({
  database: {
    findUser: vi.fn(),
    saveUser: vi.fn(),
  },
}))

describe('UserService', () => {
  let mockConsoleLog: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should process user successfully', async () => {
    const mockUser = { id: 1, name: 'John' }
    const mockDatabase = vi.mocked(database)
    mockDatabase.findUser.mockResolvedValue(mockUser)
    mockDatabase.saveUser.mockResolvedValue(true)

    const result = await processUser(1)

    expect(result).toEqual(mockUser)
    expect(mockDatabase.findUser).toHaveBeenCalledWith(1)
    expect(mockDatabase.saveUser).toHaveBeenCalledWith(mockUser)
    expect(mockConsoleLog).toHaveBeenCalledWith('User processed')
  })

  it('should handle user not found', async () => {
    const mockDatabase = vi.mocked(database)
    mockDatabase.findUser.mockResolvedValue(null)

    await expect(processUser(999)).rejects.toThrow('User not found')
    expect(mockDatabase.saveUser).not.toHaveBeenCalled()
  })
})
```

## Commandes utiles

```bash
# Lancer tous les tests
pnpm test

# Lancer un fichier spécifique
pnpm test tests/unit/main.test.ts

# Mode watch (relance automatiquement)
pnpm test --watch

# Avec couverture de code
pnpm test:coverage

# Interface graphique
pnpm test:ui
```

## Conseils rapides

- **Un test = une fonctionnalité** : Testez une seule chose par test
- **Noms explicites** : Le nom du test doit expliquer ce qui est testé
- **Mock minimal** : Ne moquez que ce qui est nécessaire
- **Setup/Teardown** : Utilisez `beforeEach`/`afterEach` pour la préparation
- **Tests d'erreurs** : N'oubliez pas de tester les cas d'échec
- **Async/Await** : Toujours utiliser `await` avec les fonctions asynchrones

Cette documentation couvre l'essentiel pour écrire des tests efficaces avec Vitest ! 🧪
