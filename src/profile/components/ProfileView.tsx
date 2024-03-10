import {
  Box,
  Stack,
  Button,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SkillLine from './SkillLine'
import SkillReviewWindow from './SkillReviewWindow'
import './popup.css'

const ProfileView = ({ cancelFunc, nextFunc, inputValues }: PopupProps) => {
  let presetupData = inputValues as ProfilePresetupReturn

  const [availableSkills, setAvailableSkills] = useState<any[]>()
  const [skillReviewActive, setSkillReviewActive] = useState<boolean>(false)
  const [skillSelected, setSkillSelected] = useState<number>(-1)

  // TODO: How can I preserve the value of skillsData map after component reloading?
  const [skillsData, setSkillsData] = useState<Map<number, InitialDataSkillReview>>(new Map<number, InitialDataSkillReview>());
  const getSkillData = (id: number) => {
    if (!skillsData.has(id)) {
      skillsData.set(id, {
        id: id,
        targetLevel: presetupData.level,
        level: -1,
        artifact: '',
        commmentary: '',
      })
    }
    return skillsData.get(id)
  }
  const saveSkillData = (data: InitialDataSkillReview) => {
    skillsData.set(data.id, {
      id: data.id,
      targetLevel: presetupData.level,
      level: data.level,
      artifact: data.artifact,
      commmentary: data.commmentary,
    })
  }

  let loadFilteredSkills = () => {
    fetch("http://localhost:8080/skills/filter", {
      method: "POST",
      body: JSON.stringify({
        "skillTypes": [presetupData.skillType],
        "unitTypes": [presetupData.unitType],
        "tags": presetupData.tags,
      }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    }
    ).then(res => res.json())
      .then(response => {
        setAvailableSkills(response)
        console.log(response)
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  useEffect(() => {
    loadFilteredSkills()
  }, [])

  const [forceSkillsKey, forceSkillsUpdate] = useState<number>(0)
  const [commentary, setCommentary] = useState<string>('')

  const saveNewPofile = () => {
    let skillsArray = Array.from(skillsData.values(), (skill) => {
      return {
        skillId: skill.id,
        currentGrade: skill.level,
        artifact: skill.artifact,
        commentary: skill.commmentary,
      }
    })

    fetch("http://localhost:8080/profiles", {
      method: "POST",
      body: JSON.stringify({
        "userId": 0,
        "status": "NEW",
        "skillType": presetupData.skillType,
        "unitType": presetupData.unitType,
        "skillGrade": presetupData.level,
        "skills": skillsArray
      }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    }
    ).then(res => res.json())
      .then(response => {
        console.log('new profile successfully stored')
        console.log(response)
        nextFunc()
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  // TODO: Collapse all unnesessary boxes.
  return (
    <div className='background-popup'>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box className='popup' sx={{ flexGrow: 1, padding: 3, outline: "0.05rem solid lightgrey", rowGap: 2 }}>
          <Stack spacing={2}>
            <Box>Селф-ревью "Название команды/ФИО/Грейд/Уровень"</Box>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 6 }}>
              <Stack spacing={2} sx={{ minWidth: 400, flexGrow: 4, width: 0 }}>
                <Box sx={{ minHeight: 400, outline: "0.05rem solid lightgrey" }}>
                  <Stack key={forceSkillsKey}>
                    {availableSkills
                      ? availableSkills.map((skill: any) => {
                        return (
                          <SkillLine key={skill.id} name={skill.name}
                            onClick={() => {
                              setSkillSelected(skill.id);
                              setSkillReviewActive(true);
                            }}
                            targetLevel={presetupData.level}
                            level={getSkillData(skill.id).level}
                          />
                        );
                      })
                      : ""
                    }
                  </Stack>
                </Box>
                <TextField
                  placeholder="Комментарий"
                  multiline
                  minRows={4}
                  maxRows={8}
                  sx={{ width: "100%" }}
                  value={commentary}
                  onChange={(e) => { setCommentary(e.target.value) }}
                />
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                  <Button onClick={cancelFunc}>Назад</Button>
                  <Button onClick={saveNewPofile}>Сохранить</Button>
                </Box>
              </Stack>
              {skillReviewActive ?
                <SkillReviewWindow
                  initialData={getSkillData(skillSelected)}
                  saveDataFunc={(data) => {
                    saveSkillData(data);
                    forceSkillsUpdate(forceSkillsKey + 1)
                    console.log('forceSkillsUpdate(forceSkillsKey + 1)')
                  }}
                  cancelFunc={() => { setSkillReviewActive(false); }}
                />
                :
                <Stack spacing={1} sx={{ minWidth: 200, minHeight: 300, flexGrow: 6, width: 0 }}>
                </Stack>
              }
            </Box>
          </Stack>
        </Box>
      </Box>
    </div>
  )
}

export default ProfileView