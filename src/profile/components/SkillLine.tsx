import {
  Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

const SkillLine = ({ name, onClick, targetLevel, level }: SkillProps) => {
  let color: string;
  if (level == -1) {
    color = '#bbb'
  } else if (targetLevel - level <= 0) {
    color = '#87f5a5'
  } else if (targetLevel - level <= 2) {
    color = '#f3f587'
  } else {
    color = '#f59287'
  }

  console.log('SkillLine level: ' + level)

  return (
    <Box onClick={onClick} sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center", // Just in case.
      borderBottom: "0.05rem solid lightgrey",
      paddingY: 1.2,
      paddingX: 2.3,
      columnGap: 1,
      cursor: "pointer",
      '&:hover': {
        background: "#f7f7f7",
      }
    }}>
      <Box sx={{ flexGrow: 8, width: 0 }}>
        <span style={{ "height": "10px", "width": "10px", "backgroundColor": color, "borderRadius": "50%", "display": "inline-block", "marginRight": "12px" }}></span>
        {name}
      </Box>
      <Box sx={{ flexGrow: 2, width: 0 }}>
        {level == -1 ? '?' : level}
      </Box>
      <Box sx={{ ml: "auto", width: 0 }}>
        e
      </Box>
    </Box>
  )
}

export default SkillLine