import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ISkillsSearchFormProps {
  searchTerm: unknown
  skillType: unknown
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSkillTypeChange: (event: SelectChangeEvent<{ value: unknown }>) => void
}

export const SkillsSearchForm: React.FC<ISkillsSearchFormProps> = ({
  searchTerm,
  skillType,
  onSearchChange,
  onSkillTypeChange,
}) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <TextField
        fullWidth
        label={t('search-by-value')}
        value={searchTerm}
        type={'search'}
        onChange={onSearchChange}
      />
      <Grid display={'flex'} gap={2} item xs={6}>
        <FormControl fullWidth>
          <InputLabel>{t('skill-type')}</InputLabel>
          <Select
            value={skillType}
            label={t('skill-type')}
            onChange={onSkillTypeChange}
          ></Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>{t('unit-type')}</InputLabel>
          <Select
            value={skillType}
            label={t('unit-type')}
            // onChange={handleSkillTypeChange}
          ></Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>{t('tags')}</InputLabel>
          <Select value={skillType} label={t('tags')}>
            <MenuItem value={10}>
              <Checkbox />
              QA
            </MenuItem>
            <MenuItem value={10}>
              <Checkbox />
              ML
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" type="submit">
          Найти
        </Button>
      </Grid>
    </Grid>
  )
}
