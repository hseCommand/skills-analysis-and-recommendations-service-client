import { HOST_NAME, PORT } from "../utils/constants"

export default class ServiceRecommendationApi {
  constructor() {
    this._request = this._request.bind(this)
  }

  _request(method: string, params: string, body?: Object) {
    const requestInit: any = {
      method: method,
      mode: 'no-cors',
      headers: {
        "accept": "*/*",
        'Content-Type': 'application/json'
      }
    }
    if (body)
      requestInit['body'] = JSON.stringify(body)

    // const res = await fetch(`http://localhost:8081/swagger-ui/index.html`, { mode: 'no-cors' })
    const res = fetch(`http://${HOST_NAME}:${PORT}/${params}`, requestInit)

    return res
  }

  // test method
  hello() {
    return this._request('GET', '/hello')
  }
}