import {
  Box,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SkillReviewWindowProps } from './props';
import { ProfileViewScenario } from './ProfileView';

// TODO: Нужно ли переключение между навыками, не выключая предыдущего навыка (интуитивно понятно)?
// Или сделать жесткое выполнение: не нажал cancel, save или next - не вышел (затемняя остальную область, чтобы не работала).
const SkillReviewWindow = ({ initialData, saveDataFunc, prevFunc, nextFunc, approveFunc, declineFunc, scenario }: SkillReviewWindowProps) => {
  let currentData = initialData;
  const [skillInfo, setSkillInfo] = useState<any>()
  let getSkillInfo = () => {
    fetch("http://localhost:8080/skills/" + initialData.skillId, {
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
  }, [initialData.skillId])

  useEffect(() => {
    setLevel(initialData.selfReviewGrade)
    setArtifact(initialData.artifact)
  }, [initialData.skillId])

  const [level, setLevel] = useState<number>(initialData.selfReviewGrade)
  const [artifact, setArtifact] = useState<string>(initialData.artifact)
  const [commentary, setCommentary] = useState<string>()

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
          <TextField value={'Целевой уровень: ' + initialData.targetGrade} disabled></TextField>
          <TextField
            multiline
            disabled
            rows={4}
            sx={{ width: "100%" }}
            value={skillInfo.skillGrades[initialData.targetGrade - 1].requirements}
          />
        </Stack>
        <Stack spacing={1} sx={{ flexGrow: 1, width: 0 }}>
          <Autocomplete
            disablePortal
            options={skillInfo.skillGrades.map((grade: any) => grade.gradeNumber.toString())}
            renderInput={(params) => <TextField {...params} label="Выбери свой уровень" />}
            value={level === null ? '' : level.toString()}
            onChange={(e, newValue) => {
              setLevel(+newValue);
              currentData.selfReviewGrade = +newValue;
              saveDataFunc(currentData);
            }}
            autoHighlight
            readOnly={scenario !== ProfileViewScenario.Edit}
          />
          <TextField
            multiline
            disabled
            rows={4}
            sx={{ width: "100%" }}
            value={level === null ? '...' : skillInfo.skillGrades[level - 1].requirements}
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
          readOnly: scenario !== ProfileViewScenario.Edit,
        }}
      />
      <TextField
        value={commentary}
        onChange={(e) => {
          currentData.commentary = e.target.value
          setCommentary(e.target.value)
        }}
        placeholder={scenario === ProfileViewScenario.Approve ? 'Комментарий' : 'Будет доступно после оценки'}
        multiline
        rows={4}
        InputProps={{
          readOnly: scenario !== ProfileViewScenario.Approve,
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
        <Button sx={{ mr: "auto" }} onClick={prevFunc}>Назад</Button>
        {/* TODO: Fix saveDataFunc - retrieve data from input fields. */}
        {scenario === ProfileViewScenario.Edit &&
          <Button onClick={() => { saveDataFunc(currentData); }}>Сохранить</Button>
        }
        {scenario === ProfileViewScenario.Approve &&
          <Box sx={{ mr: 'auto', display: 'flex', flexDirection: 'row', columnGap: 1 }}>
            <Button sx={{ bgcolor: '#f0fff0', borderRadius: 0 }}
              onClick={() => { currentData.isApprove = true; approveFunc(currentData); }}>
              Подтвердить
            </Button>
            <Button sx={{ bgcolor: '#fff0f0', borderRadius: 0 }}
              onClick={() => { currentData.isApprove = false; saveDataFunc(currentData); }}>
              Отклонить
            </Button>
          </Box>
        }
        <Button onClick={nextFunc}>Далее</Button>
      </Box>
    </Stack>
  )
}

export default SkillReviewWindow