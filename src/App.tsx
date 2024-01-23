import { Container } from '@mui/material'
import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './app.less'
import SkillView from './pages/SkillView/SkillVIew'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SkillView />,
    },
    {
      path: 'skill/:id',
      element: <SkillView />,
    },
  ])

  return (
    <Suspense fallback="loading">
      <Container>
        <RouterProvider router={router} />{' '}
      </Container>
    </Suspense>
  )
}
