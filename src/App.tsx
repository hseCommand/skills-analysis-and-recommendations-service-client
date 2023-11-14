import React, { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ServiceRecommendationApi from './api/ServiceRecommendationApi'
import { Button } from './components/Button/Button'
import { Header } from './components/Texts/Texts'

import './app.less'
import { Skill } from './components/Skill/Skill'

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
    fetchGreeting()
  }

  return (
    <Suspense fallback="loading">
      <div>
        <Header>
          {t('title')} {dataFromApi}
        </Header>
        <Skill />
        <Button onClick={handleClick}>{t(`example-of-i18next-usage`)}</Button>
      </div>
    </Suspense>
  )
}
