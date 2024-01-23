import {
  Box,
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'
import { TEMP_SKILL } from '../../utils/constants'
import { SkillsSearchForm } from './components/SkillsSearchForm'

const columns = [
  { id: 'name', label: 'Название навыка', minWidth: 270 },
  { id: 'tag', label: 'Тег', minWidth: 100 },
]

export const SkillsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [skillType, setSkillType] = useState('')

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handleSkillTypeChange = (event: any) => {
    setSkillType(event.target.value)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 12,
        paddingTop: 4,
      }}
    >
      <SkillsSearchForm
        searchTerm={searchTerm}
        skillType={skillType}
        onSearchChange={handleSearchChange}
        onSkillTypeChange={handleSkillTypeChange}
      />
      <Paper
        sx={{
          width: 'fit-content',
          overflow: 'hidden',
          marginTop: 8,
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TEMP_SKILL.filter((row: any) =>
              row.name.includes(searchTerm.replace(/\s/g, '')),
            ).map((row: any) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ alignItems: 'center' }}
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return <TableCell key={column.id}>{value}</TableCell>
                  })}
                  <Button sx={{ padding: 2 }}>Открыть</Button>
                </TableRow>
              )
            })}
          </TableBody>
        </TableContainer>
      </Paper>
    </Box>
  )
}
