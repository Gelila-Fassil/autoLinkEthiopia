import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

export const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
}

export const client = createClient(clientConfig)
