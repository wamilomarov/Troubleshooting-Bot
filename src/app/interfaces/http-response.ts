
export interface IHttpResponse<R> {
  data: R;
  links?: {
    first: string,
    last: string,
    prev: string,
    next: string
  },
  meta?: {
    current_page: number,
    per_page: number,
    total: number
  }
  errors?: Array<R>
}
