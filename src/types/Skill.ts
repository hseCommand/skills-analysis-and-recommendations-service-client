export type Skill = {
  id: number
  skillType: SkillType
  unitType: UnitType
  tags: Tag[]
  skillData: SkillData
}

enum SkillType {
  EMPLOYEE = 'EMPLOYEE',
  TEAM = 'TEAM',
}

enum UnitType {
  UNIT = 'UNIT',
  UNIT_TYPE = 'UNIT_TYPE',
}

export type Tag = {
  id: number
  tag: string
}

export type SkillData = {
  id: number
  skillGrades: any
}
