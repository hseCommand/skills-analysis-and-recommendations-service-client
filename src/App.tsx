import React, { useState } from 'react'

import ServiceRecommendationApi from './api/ServiceRecommendationApi';
import { Button } from './components/Button/Button';

import './app.less'

export default function App() {
  const [dataFromApi, setDataFromApi] = useState<any>()

  const handleClick = () => {
    const api = new ServiceRecommendationApi()
    api.hello().then((d: Response) => {
      setDataFromApi(d.status)
    }).catch(console.log)
  }

  return (
    <div>
      <h1>React {dataFromApi}</h1>

      <Button title='test' onClick={handleClick}>
        {'get hello world from API'}
      </Button>
    </div>
  );
}