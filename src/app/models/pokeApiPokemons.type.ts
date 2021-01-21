export interface RootObject {
  count: number,
  next: string,
  previous: string,
  results: NameAndUrl[]
}

interface NameAndUrl {
  "name": string,
  "url": string
}
