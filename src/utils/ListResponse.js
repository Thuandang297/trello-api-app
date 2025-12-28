class ListResponse {
  constructor(items = [], count = 0, page = 1, pageSize = 10) {
    this.items = items
    this.count = count
    this.page = page
    this.pageSize = pageSize
  }
}

export default ListResponse
