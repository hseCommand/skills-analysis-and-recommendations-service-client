import React, { useEffect, useState } from 'react'
import ServiceRecommendationApi from './api/ServiceRecommendationApi';

export default function App() {
  const [dataFromApi, setDataFromApi] = useState<any>()

  useEffect(() => {
    const api = new ServiceRecommendationApi()
    api.hello().then((d: Response) => {
      console.log(d);

      setDataFromApi(d.status)
    })
  }, [])

  return (
    <div>
      <h1>React {dataFromApi}</h1>
    </div>
  );
}