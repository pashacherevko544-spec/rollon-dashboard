import { createContext, useContext, useState, useCallback } from 'react'
import type { Lang } from '../i18n/translations'
import { t as translate } from '../i18n/translations'

const LS_KEY = 'rollon_lang'

function getSavedLang(): Lang {
  const saved = localStorage.getItem(LS_KEY) as Lang
  return ['uk', 'en', 'ru'].includes(saved) ? saved : 'uk'
}

type LangCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string>) => string
}

export const LangContext = createContext<LangCtx>({
  lang: 'uk',
  setLang: () => {},
  t: (k) => k,
})

export function useLangProvider() {
  const [lang, setLangState] = useState<Lang>(getSavedLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(LS_KEY, l)
  }, [])

  const t = useCallback((key: string, vars?: Record<string, string>) => {
    return translate(lang, key, vars)
  }, [lang])

  return { lang, setLang, t }
}

export function useLang() {
  return useContext(LangContext)
}
