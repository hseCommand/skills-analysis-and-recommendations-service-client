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

export enum ProfileViewScenario {
  Create,
  View,
  Edit,
}

export interface ProfileViewInputValues {
  scenario: ProfileViewScenario,
  payload: ProfilePresetupReturn | ExistingProfileData,
}

const ProfileView = ({ cancelFunc, nextFunc, inputValues }: PopupProps) => {
  let inputValuesParsed: ProfileViewInputValues = inputValues as ProfileViewInputValues
  let scenario: ProfileViewScenario = inputValuesParsed.scenario
  let presetupData = inputValuesParsed.payload

  const [availableSkills, setAvailableSkills] = useState<SkillGet[]>()
  const [skillReviewActive, setSkillReviewActive] = useState<boolean>(false)
  const [skillSelected, setSkillSelected] = useState<number>(-1)

  const [forceSkillsKey, forceSkillsUpdate] = useState<number>(0)
  const [commentary, setCommentary] = useState<string>('')

  // TODO: How can I preserve the value of skillsData map after component reloading?
  const [skillsData, setSkillsData] = useState<Map<number, InitialDataSkillReview>>(new Map<number, InitialDataSkillReview>());
  const getSkillData = (id: number) => {
    if (!skillsData.has(id)) {
      skillsData.set(id, {
        id: id,
        targetLevel: presetupData.targetGradeByDefault,
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
      targetLevel: presetupData.targetGradeByDefault,
      level: data.level,
      artifact: data.artifact,
      commmentary: data.commmentary,
    })
  }
  const fillExistingSkillsData = (data: ExistingProfileData) => {
    data.skills.map((skill) => {
      skillsData.set(skill.skillId, {
        id: skill.skillId,
        targetLevel: data.targetGradeByDefault,
        level: skill.targetGrade,
        artifact: skill.artifact,
        commmentary: skill.artifact,
      })
    });
    // Two arrays with skills. Should filter the big one with ids from small one.
    // Practical solution: put ids into set (map) and check for the presence of each in O(1).
    // Overall complexity: O(n).
    (async () => {
      let allSkills = await loadAllSkills()
      let idSet = new Set<number>(data.skills.map(skill => skill.skillId))
      let filteredSkills = allSkills.filter(skill => idSet.has(skill.id))
      setAvailableSkills(filteredSkills)
    })()
  }

  async function loadAllSkills(): Promise<SkillGet[]> {
    return fetch("http://localhost:8080/skills", {
      method: "GET",
      headers: {
        'Accept': '*/*',
      },
    }
    ).then(res => res.json())
      .then(response => {
        return response
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  const loadFilteredSkills = (data: ProfilePresetupReturn) => {
    fetch("http://localhost:8080/skills/filter", {
      method: "POST",
      body: JSON.stringify({
        "skillTypes": [data.skillType],
        "unitTypes": [data.unitType],
        "tags": data.tags,
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

  const formatSkillsArray = () => {
    return Array.from(skillsData.values(), (skill) => {
      return {
        skillId: skill.id,
        targetGrade: skill.level,
        artifact: skill.artifact,
        commentary: skill.commmentary,
      }
    })
  }

  const saveNewProfile = () => {
    let profileData: ProfileCreate = {
      status: "NEW",
      skillType: presetupData.skillType,
      unitType: presetupData.unitType,
      targetGradeByDefault: presetupData.targetGradeByDefault,
      skills: formatSkillsArray(),
    }

    fetch("http://localhost:8080/profiles", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
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

  const saveExistingProfile = () => {
    let curr = presetupData as ExistingProfileData
    console.log(formatSkillsArray())

    let profileData: ProfileEdit = {
      id: curr.id,
      // It will automatically set the right date on backend.
      createdAt: new Date().toISOString().split('T')[0],
      status: curr.status,
      skillType: curr.skillType,
      unitType: curr.unitType,
      targetGradeByDefault: curr.targetGradeByDefault,
      skills: formatSkillsArray(),
    }

    fetch("http://localhost:8080/profiles", {
      method: "PUT",
      body: JSON.stringify(profileData),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    }
    ).then(res => res.json())
      .then(response => {
        console.log('existing profile successfully edited')
        console.log(response)
        nextFunc()
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  const saveProfile = () => {
    if (scenario === ProfileViewScenario.Create) {
      saveNewProfile()
    } else if (scenario === ProfileViewScenario.Edit) {
      saveExistingProfile()
    }
  }

  const isReadOnly = () => {
    return scenario === ProfileViewScenario.View
  }

  // TODO: After implementing ownership of profile and retrieving id of user from client,
  // there will be some more option to allow Edit Scenario.
  //   if (scenario == Scenario.View && 
  //     profile.ownerId == (localStorage.getItem("name") || "name") &&
  //     profile.status != 'READY' && profile.status != 'ARCHIVE') {
  //     scenario = Scenario.Edit
  //   }
  // }, [])
  if (scenario === ProfileViewScenario.View &&
    (presetupData as ExistingProfileData).status != 'READY' &&
    (presetupData as ExistingProfileData).status != 'ARCHIVE') {
    scenario = ProfileViewScenario.Edit
  }

  if (scenario === ProfileViewScenario.View || scenario === ProfileViewScenario.Edit) {
    useEffect(() => {
      fillExistingSkillsData(presetupData as ExistingProfileData)
    }, [])
  } else if (scenario === ProfileViewScenario.Create) {
    useEffect(() => {
      loadFilteredSkills(presetupData as ProfilePresetupReturn)
    }, [])
  }

  // TODO: Collapse all unnesessary boxes.
  return (
    <div className='background-popup' style={{ zIndex: 1 }}>
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
                            targetLevel={presetupData.targetGradeByDefault}
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
                  InputProps={{
                    readOnly: isReadOnly(),
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                  <Button onClick={cancelFunc}>Назад</Button>
                  {scenario !== ProfileViewScenario.View &&
                    <Button onClick={saveProfile}>Сохранить</Button>
                  }
                </Box>
              </Stack>
              {skillReviewActive ?
                <SkillReviewWindow
                  initialData={getSkillData(skillSelected)}
                  saveDataFunc={(data) => {
                    saveSkillData(data);
                    forceSkillsUpdate(forceSkillsKey + 1)
                  }}
                  prevFunc={() => {
                    let i = availableSkills.findIndex((skill, i, obj) => skill.id === skillSelected)
                    if (i == 0) {
                      setSkillReviewActive(false);
                    } else {
                      setSkillSelected(availableSkills[i - 1].id);
                    }
                  }}
                  nextFunc={() => {
                    let i = availableSkills.findIndex((skill, i, obj) => skill.id === skillSelected)
                    if (i == availableSkills.length - 1) {
                      setSkillReviewActive(false);
                    } else {
                      setSkillSelected(availableSkills[i + 1].id);
                    }
                  }}
                  readOnly={isReadOnly()}
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