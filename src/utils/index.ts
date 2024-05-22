import { BotModule } from 'bot'

export const processModules = <T>(modules: Record<string, BotModule<T>>, callback: (item: T) => void) => {
    Object
        .values(modules)
        .map(module => module.default)
        .forEach(callback)
}