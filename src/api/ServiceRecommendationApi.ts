// // It's better to use environment variables for host and port
// const API_HOST_NAME = 'localhost';
// const API_PORT = '8081';

// type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// export default class ServiceRecommendationApi {
//   private static instance: ServiceRecommendationApi;

//   private constructor() { }

  
//   fetch("https://restapp.onrender.com/login", {
//     method: "POST",
//     body: JSON.stringify({
//           email: username,
//           password: password
//       }),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
// }
// ).then(res=>res.json())
// .then(response=>{

// })
// .catch(er=>{
//   console.log(er.message)
// })



//   // Singleton pattern
//   public static getInstance(): ServiceRecommendationApi {
//     if (!ServiceRecommendationApi.instance) {
//       ServiceRecommendationApi.instance = new ServiceRecommendationApi();
//     }
//     return ServiceRecommendationApi.instance;
//   }

//   private async _request(method: RequestMethod, params: string, body?: Object): Promise<Response> {
//     const requestInit: RequestInit = {
//       method: method,
//       // mode: 'no-cors',
//       headers: {
//         "Accept": "*/*",
//         'Content-Type': 'application/json'
//       }
//     };

//     if (body) {
//       requestInit.body = JSON.stringify(body);
//     }

//     try {
//       const response = await fetch(`http://${API_HOST_NAME}:${API_PORT}/${params}`, requestInit);
//       console.log('response', response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response;
//     } catch (error) {
//       console.error("Fetch error: ", error);
//       throw error;
//     }
//   }

  
//   public register(): Promise<Response> {
//     return this._request('POST', 'auth/register', {
//       name: "misha",
//       email: "misha",
//       password: "misha"
//     });
//   }

//   public skills(): Promise<Response> {
//     return this._request('GET', 'skills');
//   }

//   public getSwagger(): Promise<Response> {
//     return this._request('GET', 'swagger-ui.html')
//   }
// }

// // Usage
// // const api = ServiceRecommendationApi.getInstance();
// // api.hello().then(response => {
// //   // Handle response
// // }).catch(error => {
// //   // Handle error
// // });
