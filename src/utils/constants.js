import { env } from '~/config/environment'

export const WHITE_LIST_DOMAINS = ['https://vite-trello-web-base-project.vercel.app']
export const TYPE_BOARDS={
  PUBLIC:'public',
  PRIVATE:'private'
}

export const WEBSITE_DOMAIN = env.BUILD_MODE === 'development' ? env.DOMAIN_DEV : env.DOMAIN_PROD