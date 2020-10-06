export default interface GtagState {
  registered: boolean,
  source: string | null,
  last_source: string | null,
  unsubscribers: any[]
}
