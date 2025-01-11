export type DatabaseSchema = {
  post: Post
  sub_state: SubState
  post_count: PostCount
}

export type PostCount = {
  total: number | string
  created_image: number | string
  created_no_image: number | string
  deleted_user: number | string
  deleted_feed_generator: number | string
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
