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
import { PopupProps } from './props'

export enum ProfileViewScenario {
  View,
  Edit,
  Approve,
}

export interface ProfileViewInputValues {
  // scenario: ProfileViewScenario,
  payload: ProfileGet,
}

const ProfileView = ({ cancelFunc, nextFunc, inputValues }: PopupProps) => {
  let inputValuesParsed: ProfileViewInputValues = inputValues as ProfileViewInputValues
  let scenario: ProfileViewScenario = undefined
  let presetupData = inputValuesParsed.payload

  const [availableSkills, setAvailableSkills] = useState<SkillGet[]>()
  const [skillReviewActive, setSkillReviewActive] = useState<boolean>(false)
  const [skillSelected, setSkillSelected] = useState<number>(-1)

  const [forceSkillsKey, setForceSkillsKey] = useState<number>(0)
  const [profileComment, setProfileComment] = useState<string>('')

  const getComment = () => {
    if (scenario === ProfileViewScenario.Approve) {
      return 'Комментарий'
    } else if (scenario === ProfileViewScenario.Edit) {
      return 'Будет доступно после оценки'
    } else {
      return 'Нет комментария'
    }
  }

  const forceSkillsRefresh = () => {
    setForceSkillsKey(forceSkillsKey + 1)
  }

  // TODO: How can I preserve the value of skillsData map after component reloading?
  const [skillsData, setSkillsData] = useState<Map<number, SkillReview>>(new Map<number, SkillReview>());
  const fillExistingSkillsData = () => {
    presetupData.skills.map((skill) => {
      skillsData.set(skill.skillId, skill)
    });
    // Two arrays with skills. Should filter the big one with ids from small one.
    // Practical solution: put ids into set (map) and check for the presence of each in O(1).
    // Overall complexity: O(n).
    (async () => {
      let allSkills = await loadAllSkills()
      let idSet = new Set<number>(presetupData.skills.map(skill => skill.skillId))
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

  const saveExistingProfile = () => {
    let profileData: ProfileEdit = {
      id: presetupData.id,
      userLogin: presetupData.userLogin,
      // It will automatically set the right date on backend.
      createdAt: new Date().toISOString().split('T')[0],
      status: presetupData.status,
      skillType: presetupData.skillType,
      unitType: presetupData.unitType,
      targetGradeByDefault: presetupData.targetGradeByDefault,
      skills: Array.from(skillsData.values()),
      profileComment: profileComment,
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

  const approveProfile = () => {
    let approveData: ApprovePost = {
      profileId: presetupData.id,
      profileComment: profileComment,
      reviewSkills: Array.from(skillsData.values()).map((v) => ({
        skillId: v.skillId,
        isApprove: v.isApprove,
        skillComment: v.skillComment,
      })),
    }

    fetch("http://localhost:8080/profiles/review", {
      method: "POST",
      body: JSON.stringify(approveData),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    }
    ).then(res => res.json())
      .then(response => {
        console.log('profile successfully reviewed')
        console.log(response)
        nextFunc()
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  const saveProfile = () => {
    if (scenario === ProfileViewScenario.Edit) {
      return saveExistingProfile()
    } else if (scenario === ProfileViewScenario.Approve) {
      return approveProfile()
    }
  }

  if (presetupData.status === "DONE" ||
    presetupData.status === "ARCHIVE") {
    scenario = ProfileViewScenario.View
  } else if (presetupData.userLogin === localStorage.getItem("name")) {
    scenario = ProfileViewScenario.Edit
  } else if (presetupData.userLogin !== localStorage.getItem("name")) {
    scenario = ProfileViewScenario.Approve
  }

  useEffect(() => {
    setProfileComment(presetupData.profileComment || '')
    fillExistingSkillsData()
  }, [])

  // TODO: Collapse all unnesessary boxes.
  return (
    <div className='background-popup' style={{ zIndex: 1 }}>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box className='popup' sx={{ flexGrow: 1, padding: 3, outline: "0.05rem solid lightgrey", rowGap: 2 }}>
          <Stack spacing={2}>
            <Box>{'Селф-ревью "' + presetupData.userLogin + ' / грейд ' + presetupData.targetGradeByDefault + '"'}</Box>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 6 }}>
              <Stack spacing={2} sx={{ minWidth: 400, flexGrow: 4, width: 0 }}>
                <Box sx={{ minHeight: 400, outline: "0.05rem solid lightgrey" }}>
                  <Stack key={forceSkillsKey}>
                    {availableSkills
                      ? availableSkills.map((skill) => {
                        return (
                          <SkillLine key={skill.id} name={skill.name}
                            onClick={() => {
                              setSkillSelected(skill.id);
                              setSkillReviewActive(true);
                            }}
                            targetLevel={skillsData.get(skill.id).targetGrade}
                            level={skillsData.get(skill.id).selfReviewGrade}
                            approved={
                              scenario === ProfileViewScenario.Approve &&
                                skillsData.get(skill.id).isApprove === null
                                ? undefined : skillsData.get(skill.id).isApprove
                            }
                          />
                        );
                      })
                      : ""
                    }
                  </Stack>
                </Box>
                <TextField
                  placeholder={getComment()}
                  multiline
                  minRows={4}
                  maxRows={8}
                  sx={{ width: "100%" }}
                  value={profileComment}
                  onChange={(e) => { setProfileComment(e.target.value) }}
                  InputProps={{
                    readOnly: scenario !== ProfileViewScenario.Approve,
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                  <Button onClick={cancelFunc}>Назад</Button>
                  {scenario !== ProfileViewScenario.View &&
                    <Button onClick={saveProfile}>{scenario === ProfileViewScenario.Approve ? 'Сохранить оценку' : 'Сохранить'}</Button>
                  }
                </Box>
              </Stack>
              {skillReviewActive ?
                <SkillReviewWindow
                  initialData={skillsData.get(skillSelected)}
                  saveDataFunc={(data) => {
                    skillsData.set(data.skillId, data);
                    forceSkillsRefresh()
                  }}
                  prevFunc={() => {
                    let i = availableSkills.findIndex((skill) => skill.id === skillSelected)
                    if (i == 0) {
                      setSkillReviewActive(false);
                    } else {
                      setSkillSelected(availableSkills[i - 1].id);
                    }
                  }}
                  nextFunc={() => {
                    let i = availableSkills.findIndex((skill) => skill.id === skillSelected)
                    if (i == availableSkills.length - 1) {
                      setSkillReviewActive(false);
                    } else {
                      setSkillSelected(availableSkills[i + 1].id);
                    }
                  }}
                  approveFunc={() => {
                    forceSkillsRefresh()
                  }}
                  declineFunc={() => {
                    forceSkillsRefresh()
                  }}
                  scenario={scenario}
                />
                :
                <Stack spacing={1} sx={{ width: 0, minWidth: 300, minHeight: 300, flexGrow: 6, padding: 2, alignSelf: "flex-start" }}>
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