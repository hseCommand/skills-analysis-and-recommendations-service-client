import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllSkills } from '../../store/slice/skillSlice'
import { Description, Subtitle } from '../Texts/Texts'

import { PaddingWrapper } from '../PaddingWrapper/PaddingWrapper'
import Spinner from '../Spinner/Spinner'
import './skill.less'

// для отображения
const fakeSkillData = [
  {
    id: 1,
    skillType: 'EMPLOYEE',
    unitType: 'UNIT',
    tags: [
      { id: 101, tag: 'Leadership' },
      { id: 102, tag: 'Communication' },
    ],
    skillData: {
      id: 201,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 2,
    skillType: 'TEAM',
    unitType: 'UNIT_TYPE',
    tags: [
      { id: 103, tag: 'Teamwork' },
      { id: 104, tag: 'Problem-solving' },
    ],
    skillData: {
      id: 202,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 3,
    skillType: 'EMPLOYEE',
    unitType: 'UNIT',
    tags: [
      { id: 105, tag: 'Adaptability' },
      { id: 106, tag: 'Innovation' },
    ],
    skillData: {
      id: 203,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 4,
    skillType: 'TEAM',
    unitType: 'UNIT_TYPE',
    tags: [
      { id: 107, tag: 'Strategic Planning' },
      { id: 108, tag: 'Execution' },
    ],
    skillData: {
      id: 204,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 5,
    skillType: 'EMPLOYEE',
    unitType: 'UNIT',
    tags: [
      { id: 109, tag: 'Creativity' },
      { id: 110, tag: 'Efficiency' },
    ],
    skillData: {
      id: 205,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 6,
    skillType: 'TEAM',
    unitType: 'UNIT_TYPE',
    tags: [
      { id: 111, tag: 'Collaboration' },
      { id: 112, tag: 'Resource Management' },
    ],
    skillData: {
      id: 206,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 7,
    skillType: 'EMPLOYEE',
    unitType: 'UNIT',
    tags: [
      { id: 113, tag: 'Critical Thinking' },
      { id: 114, tag: 'Decision Making' },
    ],
    skillData: {
      id: 207,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 8,
    skillType: 'TEAM',
    unitType: 'UNIT_TYPE',
    tags: [
      { id: 115, tag: 'Agility' },
      { id: 116, tag: 'Focus' },
    ],
    skillData: {
      id: 208,
      skillGrades: {
        /* specific data here */
      },
    },
  },
  {
    id: 9,
    skillType: 'EMPLOYEE',
    unitType: 'UNIT',
    tags: [
      { id: 117, tag: 'Resilience' },
      { id: 118, tag: 'Determination' },
    ],
    skillData: {
      id: 209,
      skillGrades: {
        /* specific data here */
      },
    },
  },
]

export const Skill: React.FC = () => {
  const dispatch = useDispatch()
  const { skills, loading } = useSelector((state: any) => state.skills)
  useEffect(() => {
    dispatch(fetchAllSkills() as any)

    console.log(fakeSkillData)
  }, [dispatch])

  useEffect(() => {
    console.log(skills, loading)
  }, [skills, loading])

  return (
    <PaddingWrapper>
      <div className="skills">
        {loading ? (
          <Spinner />
        ) : (
          fakeSkillData.map((skill) => {
            const tags = skill.tags.map((tag) => (
              <Description key={tag.id}>{tag.tag}</Description>
            ))
            return (
              <div key={skill.id}>
                <Subtitle>{skill.skillType}</Subtitle>
                <ul>{tags}</ul>
              </div>
            )
          })
        )}
      </div>
    </PaddingWrapper>
  )
}
