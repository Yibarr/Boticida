import { BotModules } from 'bot'

export const processModules = <T>(
    modules: Record<string, BotModules<T>>,
    callback: (item: T) => void
) => {
    Object
        .values(modules)
        .map(module => module.default)
        .forEach(callback)
}