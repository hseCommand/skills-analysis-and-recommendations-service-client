import {
  Box,
  Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './popup.css'

const ProfileCreationSuccess = ({ cancelFunc }: PopupProps) => {
  return (
    <div className='background-popup'>
      <Box className='popup' onClick={cancelFunc} sx={{ padding: 3, cursor: 'pointer' }}>
        <Button>Анкета успешно создана ✓</Button>
      </Box>
    </div>
  )
}

export default ProfileCreationSuccess