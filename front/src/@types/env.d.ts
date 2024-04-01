/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API: 'http://81.200.152.89/api/'
    readonly YMAPS_API: 'https://geocode-maps.yandex.ru/1.x/'
    readonly YMAPS_API_KEY: ''
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
