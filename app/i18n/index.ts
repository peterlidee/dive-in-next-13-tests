import { headers, cookies } from 'next/headers';
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
import { fallbackLng, languages, cookieName } from './settings';
import acceptLanguage from 'accept-language';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// acceptLanguage.languages(['de-DE, en-US']);

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

const getLngFromReq = ({ cookies, headers }: { cookies: ReadonlyRequestCookies, headers: ReadonlyHeaders }) => {
  let lng
  console.log(headers.get('Accept-Language'))
  console.log(acceptLanguage.get(headers.get('Accept-Language')), acceptLanguage.get(cookies.get(cookieName)?.value ?? ''))
  if (cookies.has(cookieName)) lng = acceptLanguage.get(cookies.get(cookieName)?.value ?? '')
  if (!lng) lng = acceptLanguage.get(headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  return lng;
}

export async function useTranslation(ns, options = {}) {

  const lng = getLngFromReq({ cookies: cookies(), headers: headers() })
  const i18nextInstance = await initI18next(lng, ns)
  return {
    // @ts-ignore
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance
  }
}