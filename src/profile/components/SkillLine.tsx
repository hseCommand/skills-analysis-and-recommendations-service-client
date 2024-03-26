import {
  Box,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SkillProps } from './props';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';

const SkillLine = ({ name, onClick, targetLevel, level, approved }: SkillProps) => {
  let color: string;
  if (level === null) {
    color = '#bbb'
  } else if (targetLevel - level <= 0) {
    color = '#87f5a5'
  } else if (targetLevel - level <= 2) {
    color = '#f3f587'
  } else {
    color = '#f59287'
  }

  const SelectIcon = () => {
    const iconSx = { fontSize: '1.1rem', color: '#545454' }
    if (approved === undefined) {
      return <div style={{ width: '1em', height: '1em' }} />
    } else if (approved === null) {
      return <EditNoteIcon sx={iconSx} />
    } else if (approved === true) {
      return <DoneIcon sx={iconSx} />
    } else if (approved === false) {
      return <CloseIcon sx={iconSx} />
    }
  }

  // const ColoredRightBorder = () => {
  //   let color: string = 'white';
  //   if (approved === true) {
  //     color = '#ffb8b3'
  //   } else if (approved === false) {
  //     color = '#b5ffb3'
  //   }
  //   return <div style={{ width: '1em', height: '1em', marginLeft: 'auto', backgroundColor: color }} />
  // }

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
        <span style={{
          height: "10px",
          width: "10px",
          backgroundColor: color,
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "12px"
        }}></span>
        {name}
      </Box>
      <Box sx={{ flexGrow: 2, width: 0 }}>
        {level === null ? targetLevel : level}
      </Box>
      <Box sx={{ flexGrow: 1, width: 0, display: 'flex', justifyContent: 'flex-end' }}>
        {SelectIcon()}
        {/* {ColoredRightBorder()} */}
      </Box>
    </Box>
  )
}

export default SkillLine