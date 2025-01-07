export type Config = {
  port: number
  listenAddress: string
  hostname: string
  dbConnectionString: string
  subscriptionEndpoint: string
  serviceDid: string
  publisherDid: string
  subscriptionReconnectDelay: number
}
