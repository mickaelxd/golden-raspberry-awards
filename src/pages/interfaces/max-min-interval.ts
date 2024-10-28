export interface Interval {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export interface MinMaxIntervalProducersResponse {
  min: Interval[]
  max: Interval[]
}
