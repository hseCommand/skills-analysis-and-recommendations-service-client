import {
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './popup.css'

const unitTypesSelectLabels = [
  { label: "Unit", value: "UNIT" },
  { label: "Developer", value: "DEVELOPER" },
  { label: "Tester", value: "TESTER" },
  { label: "Analyst", value: "ANALYST" },
]

const tagsSelectLabels = [
  "Java",
  "Программирование",
  "Базы данных",
  "Управление проектами",
]

const levelsSelectLabels: string[] = Array.from(Array(8).keys()).map((_, i) => (1 + i).toString())

// TODO: Add tags handling.
// TODO: Add error handling (specifically - empty fields).
const ProfilePrestup = ({ cancelFunc, nextFunc }: PopupProps) => {
  const [skillType, setSkillType] = useState<string>()
  const [unitType, setUnitType] = useState<{ label: string, value: string }>()
  const [tags, setTags] = useState<string[]>()
  const [level, setLevel] = useState<string>()

  const aggregatePresetupData = () => {
    let data: ProfilePresetupReturn = {
      skillType: skillType,
      unitType: unitType.value,
      tags: tags,
      level: +level,
    }
    return data
  }

  return (
    <Box className='background-popup' sx={{ flexGrow: 1, padding: 3 }}>
      <Box className='popup' sx={{ maxWidth: 400, flexGrow: 1, padding: 3, outline: "0.05rem solid lightgrey", rowGap: 2 }}>
        <Stack spacing={3}>
          <Box sx={{ marginBottom: 1 }}>Заполните характеристики</Box>
          <FormControl fullWidth>
            <InputLabel>Тип навыка*</InputLabel>
            <Select
              label="Тип навыка*"
              value={skillType}
              onChange={(e) => { setSkillType(e.target.value) }}
            >
              <MenuItem value="EMPLOYEE">Сотрудник</MenuItem>
              <MenuItem value="TEAM">Команда</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            disablePortal
            options={unitTypesSelectLabels}
            renderInput={(params) => <TextField {...params} label="Тип Юнита*" />}
            value={unitType}
            autoSelect
            autoHighlight
            autoComplete
            onChange={(e, newValue) => { setUnitType(newValue) }}
            getOptionLabel={option => option.label}
          />
          <Autocomplete
            disablePortal
            options={tagsSelectLabels}
            renderInput={(params) => <TextField {...params} label="Выбрать теги" />}
            multiple
            value={tags}
            onChange={(e, newValue) => { setTags(newValue) }}
          />
          <Autocomplete
            disablePortal
            options={levelsSelectLabels}
            renderInput={(params) => <TextField {...params} label="Уровень/грейд" />}
            value={level}
            autoSelect
            autoHighlight
            onChange={(e, newValue) => { setLevel(newValue) }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={cancelFunc}>Назад</Button>
            <Button onClick={() => nextFunc(aggregatePresetupData())}>Далее</Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default ProfilePrestup