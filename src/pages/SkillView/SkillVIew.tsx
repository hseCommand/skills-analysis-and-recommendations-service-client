import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TEMP_SKILL } from '../../utils/constants'

interface Grade {
  grade: number
  requirements: string
}

interface Unit {
  grade: number
  unitType: unknown
  required: boolean
}

const SkillView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [isEditable, setIsEditable] = useState<boolean>(true)

  // Assume we're editing the first skill for this example
  const skillToEdit = TEMP_SKILL[1]

  const [skillName, setSkillName] = useState<string>(skillToEdit.name)
  const [selectedTag, setSelectedTag] = useState<unknown>(skillToEdit.tag)
  const [selectedUnits] = useState<Unit[]>(skillToEdit.units || [])
  console.log(skillToEdit)

  const [grades] = useState<Grade[]>(skillToEdit.grades || [])

  useEffect(() => {
    // Check the URL slug to determine if the form should be editable
    if (slug === 'view') {
      setIsEditable(false)
    }
  }, [slug])

  const handleTagChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setSelectedTag(event.target.value as string)
  }

  // const handleUnitTypeChange =
  //   (grade: number) => (event: SelectChangeEvent<{ value: unknown }>) => {
  //     const newUnits = selectedUnits.map((unit) =>
  //       unit.grade === grade
  //         ? { ...unit, unitType: event.target.value as string }
  //         : unit,
  //     )
  //     setSelectedUnits(newUnits)
  //   }

  const handleSave = () => {
    // Implement save logic
    console.log(skillName, selectedTag, selectedUnits)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 12,
        paddingTop: 4,
      }}
    >
      <TextField
        label="Skill Name"
        variant="outlined"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        disabled={!isEditable}
      />

      <FormControl variant="outlined" disabled={!isEditable}>
        <InputLabel>Tag</InputLabel>
        <Select value={selectedTag} onChange={handleTagChange}>
          {/* You would populate these options based on available tags in your data */}
          <MenuItem value="ML">ML</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} pt={2}>
        {selectedUnits.map((unit, index) => (
          <Grid key={index} item>
            <Chip label={unit.unitType as string} />
          </Grid>
        ))}
      </Grid>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        pt={4}
        overflow={'scroll'}
      >
        {grades?.map((grade, index) => (
          <TextField
            id="outlined-multiline-static"
            label={grade.grade}
            multiline
            disabled
            rows={14}
            key={index}
            defaultValue={grade.requirements as string}
          />

          // <div key={index}>
          //   <h3>Grade: {grade.grade}</h3>
          //   <p>{grade.requirements}</p>
          // </div>
        ))}
      </Box>

      <Button onClick={handleSave} disabled={!isEditable}>
        Save
      </Button>
    </Box>
  )
}

export default SkillView
