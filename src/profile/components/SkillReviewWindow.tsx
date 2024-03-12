import {
  Box,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

// TODO: Нужно ли переключение между навыками, не выключая предыдущего навыка (интуитивно понятно)?
// Или сделать жесткое выполнение: не нажал cancel, save или next - не вышел (затемняя остальную область, чтобы не работала).
const SkillReviewWindow = ({ initialData, saveDataFunc, prevFunc, nextFunc, readOnly }: SkillReviewWindowProps) => {
  let currentData = initialData;
  const [skillInfo, setSkillInfo] = useState<any>()
  let getSkillInfo = () => {
    fetch("http://localhost:8080/skills/" + initialData.id, {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    }
    ).then(res => res.json())
      .then(response => {
        setSkillInfo(response)
        console.log(response)
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  useEffect(() => {
    getSkillInfo()
  }, [initialData.id])

  useEffect(() => {
    setLevel(initialData.level)
    setArtifact(initialData.artifact)
    setCommentary(initialData.commmentary)
  }, [initialData.id])

  const [level, setLevel] = useState<number>(initialData.level)
  const [artifact, setArtifact] = useState<string>(initialData.artifact)
  const [commentary, setCommentary] = useState<string>(initialData.commmentary)

  {/* TODO: Consider using Suspense component to wait until data is fetched. */ }
  if (!skillInfo) {
    return (
      <Stack spacing={1} sx={{ width: 0, minWidth: 300, minHeight: 300, flexGrow: 6, padding: 2, alignSelf: "flex-start" }}>
      </Stack>
    )
  }

  return (
    <Stack spacing={1} sx={{ width: 0, minWidth: 300, minHeight: 300, flexGrow: 6, outline: "0.05rem solid lightgrey", padding: 2, alignSelf: "flex-start" }}>
      <Box>
        {skillInfo.name}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
        <Stack spacing={1} sx={{ flexGrow: 1, width: 0 }}>
          {/* TODO: Целевой уровень - обработать ситуацию, когда у навыка нет такого уровня (взять лучший - ближайший) */}
          <TextField value={'Целевой уровень: ' + initialData.targetLevel} disabled></TextField>
          <TextField
            multiline
            disabled
            rows={4}
            sx={{ width: "100%" }}
            value={skillInfo.skillGrades[initialData.targetLevel - 1].requirements}
          />
        </Stack>
        <Stack spacing={1} sx={{ flexGrow: 1, width: 0 }}>
          <Autocomplete
            disablePortal
            options={skillInfo.skillGrades.map((grade: any) => grade.gradeNumber.toString())}
            renderInput={(params) => <TextField {...params} label="Выбери свой уровень" />}
            value={level == -1 ? '' : level.toString()}
            onChange={(e, newValue) => {
              setLevel(+newValue);
              currentData.level = +newValue;
              saveDataFunc(currentData);
            }}
            autoHighlight
            readOnly={readOnly}
          />
          <TextField
            multiline
            disabled
            rows={4}
            sx={{ width: "100%" }}
            value={level !== -1 ? skillInfo.skillGrades[level - 1].requirements : "..."}
          />
        </Stack>
      </Box>
      <TextField
        value={artifact}
        onChange={(e) => {
          currentData.artifact = e.target.value
          setArtifact(e.target.value)
        }}
        placeholder='Артефакты'
        multiline
        rows={4}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <TextField
        value={commentary}
        onChange={(e) => {
          currentData.commmentary = e.target.value
          setCommentary(e.target.value)
        }}
        placeholder='Комментарий'
        multiline
        rows={4}
        InputProps={{
          readOnly: readOnly,
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
        <Button sx={{ mr: "auto" }} onClick={prevFunc}>Назад</Button>
        {/* TODO: Fix saveDataFunc - retrieve data from input fields. */}
        {!readOnly &&
          <Button onClick={() => { saveDataFunc(currentData); }}>Сохранить</Button>
        }
        <Button onClick={nextFunc}>Далее</Button>
      </Box>
    </Stack>
  )
}

export default SkillReviewWindow