import { Skill, Tag } from '../types/Skill'

// It's better to use environment variables for host and port
const API_HOST_NAME = 'localhost'
const API_PORT = '8081'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default class ServiceRecommendationApi {
  private static instance: ServiceRecommendationApi

  private constructor() {}

  // Singleton pattern
  public static getInstance(): ServiceRecommendationApi {
    if (!ServiceRecommendationApi.instance) {
      ServiceRecommendationApi.instance = new ServiceRecommendationApi()
    }
    return ServiceRecommendationApi.instance
  }

  private async _request(
    method: RequestMethod,
    params: string,
    body?: object,
  ): Promise<Response> {
    const requestInit: RequestInit = {
      method: method,
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    if (body) {
      requestInit.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(
        `http://${API_HOST_NAME}:${API_PORT}/${params}`,
        requestInit,
      )
      console.log('response', response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response
    } catch (error) {
      console.error('Fetch error: ', error)
      throw error
    }
  }

  public getAllSkills(): Promise<Response> {
    return this._request('GET', 'skills')
  }

  // Get skill by ID
  public getSkillById(id: number): Promise<Response> {
    return this._request('GET', `skills/${id}`)
  }

  // Get skills by tags
  public getSkillsByTags(tags: Tag[]): Promise<Response> {
    return this._request('POST', 'skills/tag', tags)
  }

  // Add a new skill
  public addSkill(skill: Skill): Promise<Response> {
    return this._request('POST', 'skills', skill)
  }

  // Update an existing skill
  public updateSkill(skill: Skill): Promise<Response> {
    return this._request('PUT', 'skills', skill)
  }

  // Delete skill by ID
  public deleteSkillById(id: number): Promise<Response> {
    return this._request('DELETE', `skills/${id}`)
  }

  // Example method
  public hello(): Promise<Response> {
    return this._request('GET', 'hello')
  }

  public getSwagger(): Promise<Response> {
    return this._request('GET', 'swagger-ui.html')
  }
}

// Usage
// const api = ServiceRecommendationApi.getInstance();
// api.hello().then(response => {
//   // Handle response
// }).catch(error => {
//   // Handle error
// });
