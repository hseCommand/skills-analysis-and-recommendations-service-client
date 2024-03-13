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
  Approve,
}

export interface ProfileViewInputValues {
  scenario: ProfileViewScenario,
  payload: ProfileGet,
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
  const [skillsData, setSkillsData] = useState<Map<number, SkillReview>>(new Map<number, SkillReview>());
  const fillExistingSkillsData = () => {
    presetupData.skills.map((skill) => {
      skillsData.set(skill.skillId, {
        // Warning! TODO: id is SkillInfo id, and skillId is Skill id (different classes from backend). Leave one.
        id: skill.skillId,
        skillId: skill.skillId,
        targetGrade: skill.targetGrade,
        selfReviewGrade: skill.selfReviewGrade,
        artifact: skill.artifact,
        isApprove: skill.isApprove,
      })
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
    presetupData.userLogin == localStorage.getItem("name") &&
    presetupData.status != 'DONE' &&
    presetupData.status != 'ARCHIVE') {
    scenario = ProfileViewScenario.Edit
  }

  useEffect(() => {
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
                          />
                        );
                      })
                      : ""
                    }
                  </Stack>
                </Box>
                <TextField
                  placeholder="Будет доступно позже"
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
                    <Button onClick={saveExistingProfile}>Сохранить</Button>
                  }
                </Box>
              </Stack>
              {skillReviewActive ?
                <SkillReviewWindow
                  initialData={skillsData.get(skillSelected)}
                  saveDataFunc={(data) => {
                    skillsData.set(data.id, data);
                    forceSkillsUpdate(forceSkillsKey + 1)
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