export type DatabaseSchema = {
  post: Post
  sub_state: SubState
  post_count: PostCount
}

export type PostCount = {
  count: number
}

export type Post = {
  uri: string
  cid: string
  indexedAt: number
}

export type SubState = {
  service: string
  cursor: number
}
