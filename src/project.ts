import * as fs from 'node:fs'
import * as YAML from 'yaml'

export const acquireProjectType = (): {
  readonly vars: { readonly REPOSITORY_SUBTYPE: string; readonly REPOSITORY_TYPE: string }
} => {
  if (fs.existsSync('./Taskfile.yml')) {
    return YAML.parse(fs.readFileSync('./Taskfile.yml', 'utf8'))
  }

  return {
    vars: {
      REPOSITORY_SUBTYPE: 'generic',
      REPOSITORY_TYPE: 'generic'
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const acquireVariables = (): any => {
  if (fs.existsSync('./.variables.json')) {
    return JSON.parse(fs.readFileSync('./.variables.json').toString())
  }

  return new Error('package.json must be present in the project!')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const acquirePackage = (): any => {
  if (fs.existsSync('./package.json')) {
    return JSON.parse(fs.readFileSync('package.json').toString())
  }

  return new Error('package.json must be present in the project!')
}
