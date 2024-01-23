export type Skill = {
  id: number
  skillType: SkillType
  unitType: UnitType
  tags: Tag[]
  skillData: SkillData
}

enum SkillType {
  EMPLOYEE,
  TEAM,
}

enum UnitType {
  UNIT,
  UNIT_TYPE,
}

export type Tag = {
  id: number
  tag: string
}

export type SkillData = {
  id: number
  skillGrades: SkillGrade[]
}

type SkillGrade = {
  id: number
  gradeNumber: number
  requirements: Requirement[]
  artifact: Artifact
  recommendation: Recommendation
}

interface Artifact {
  id: number
  artifact: string
}

interface Recommendation {
  id: number
  message: string
}

interface Requirement {
  id: number
  requirement: string
}
