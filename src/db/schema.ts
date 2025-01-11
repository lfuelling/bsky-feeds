export type DatabaseSchema = {
  post: Post
  sub_state: SubState
  post_count: PostCount
}

export type PostCount = {
  count: number | string
  created: number | string
  deleted: number | string
}

export type Post = {
  uri: string
  cid: string // primary key
  lang?: string
  has_image: boolean
  indexedAt: number | string
}

export type SubState = {
  service: string
  cursor: number | string
}
