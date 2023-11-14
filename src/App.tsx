import React, { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ServiceRecommendationApi from './api/ServiceRecommendationApi'
import { Button } from './components/Button/Button'

import './app.less'

export default function App() {
  const { t } = useTranslation()

  const [dataFromApi, setDataFromApi] = useState<any>()
  const apiService = ServiceRecommendationApi.getInstance()

  const fetchGreeting = async () => {
    try {
      const response = await apiService.getSwagger()

      const data = await response.json()
      setDataFromApi(data.message) // Assuming the response has a message property
    } catch (error) {
      console.error("There was an error fetching the greeting', error")
    }
  }
  const handleClick = () => {
    // api.hello().then((d: Response) => {
    //   setDataFromApi(d.status)
    // }).catch(console.log)
    fetchGreeting()
  }

  return (
    <Suspense fallback="loading">
      <div>
        <h1>React {dataFromApi}</h1>

        <Button onClick={handleClick}>{t(`example-of-i18next-usage`)}</Button>
      </div>
    </Suspense>
  )
}
