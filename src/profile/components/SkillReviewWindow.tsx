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

// Function saveDataFunc is now useless since initialData is passed by ref, 
// so all data is saved automatically.
// The only purpose it has now - refreshing outer skill list.
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
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  useEffect(() => {
    getSkillInfo()
  }, [initialData.skillId])

  useEffect(() => {
    setLevel(initialData.selfReviewGrade ? initialData.selfReviewGrade.toString() : null)
    setArtifact(initialData.artifact)
    setSkillComment(initialData.skillComment || '')
  }, [initialData.skillId])

  const [level, setLevel] = useState<string>(null)
  const [artifact, setArtifact] = useState<string>('')
  const [skillComment, setSkillComment] = useState<string>('')

  // TODO: Consider using Suspense component to wait until data is fetched.
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
            value={level}
            onChange={(e, newValue) => {
              setLevel(newValue);
              currentData.selfReviewGrade = newValue ? +newValue : null;
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
            value={level === null ? '...' : skillInfo.skillGrades[+level - 1].requirements}
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
        value={skillComment}
        onChange={(e) => {
          currentData.skillComment = e.target.value
          setSkillComment(e.target.value)
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
              onClick={() => { currentData.isApprove = false; declineFunc(currentData); }}>
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