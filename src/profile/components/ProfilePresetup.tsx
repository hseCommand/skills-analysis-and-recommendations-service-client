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
import { getAllSkillTypes, getAllUnitTypes, getAllTags } from '../api/skills'

const levelsSelectLabels: string[] = Array.from(Array(8).keys()).map((_, i) => (1 + i).toString())

// TODO: Add error handling (specifically - empty fields).
const ProfilePrestup = ({ cancelFunc, nextFunc }: PopupProps) => {
  const [skillTypesSelectLabels, setSkillTypesSelectLabels] = useState<string[]>([])
  const [unitTypesSelectLabels, setUnitTypesSelectLabels] = useState<string[]>([])
  const [tagsSelectLabels, setTagsSelectLabels] = useState<string[]>([])

  const [skillType, setSkillType] = useState<string>()
  const [unitType, setUnitType] = useState<string>()
  const [tags, setTags] = useState<string[]>()
  const [level, setLevel] = useState<string>()

  useEffect(() => {
    Promise.all([getAllSkillTypes(), getAllUnitTypes(), getAllTags()])
      .then(([skillTypes, unitTypes, tags]) => {
        setSkillTypesSelectLabels(skillTypes)
        setUnitTypesSelectLabels(unitTypes)
        setTagsSelectLabels(tags)
      })
  }, [])

  const aggregatePresetupData = () => {
    let data: ProfilePresetupReturn = {
      skillType: skillType,
      unitType: unitType,
      tags: tags,
      targetGradeByDefault: +level,
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
              {skillTypesSelectLabels.map((skillType) =>
                <MenuItem key={skillType} value={skillType}>{skillType}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Autocomplete
            disablePortal
            options={unitTypesSelectLabels}
            renderInput={(params) => <TextField {...params} label="Тип Юнита*" />}
            value={unitType}
            autoHighlight
            autoComplete
            onChange={(e, newValue) => { setUnitType(newValue) }}
          // getOptionLabel={option => option.label}
          />
          <Autocomplete
            disablePortal
            options={tagsSelectLabels}
            renderInput={(params) => <TextField {...params} label="Выбрать теги" />}
            autoHighlight
            multiple
            value={tags}
            onChange={(e, newValue) => { setTags(newValue) }}
          />
          <Autocomplete
            disablePortal
            options={levelsSelectLabels}
            renderInput={(params) => <TextField {...params} label="Уровень/грейд" />}
            value={level}
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