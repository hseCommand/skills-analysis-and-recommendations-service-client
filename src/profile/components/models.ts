interface SkillReview {
  skillId: number,
  artifact: string,
  targetGrade: number,
  selfReviewGrade: number,
  isApprove: boolean,
  skillComment: string,
}

interface ProfileGet {
  id: string,
  userLogin: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  profileComment: string,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
    skillComment: string,
  }[],
}

interface ProfileCreate {
  status: string,
  userLogin: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number
  }[]
}

interface ProfileEdit {
  id: string,
  userLogin: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  profileComment: string,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
    skillComment: string,
  }[],
}

interface ProfileMenuListActions {
  deleteAction: () => void,
  archiveAction: () => void,
}

// enum ProfileStatus {
//   NEW,
//   DONE,
//   IN_PROGRESS,
//   ARCHIVE,
// }

interface SkillGet {
  id: number,
  skillType: string,
  unitType: string,
  tags: [
    string
  ],
  name: string,
  skillGrades: [
    {
      gradeNumber: number,
      requirements: string,
      recommendation: string,
    }
  ]
}

interface ApprovePost {
  profileId: string,
  profileComment: string,
  reviewSkills: {
    skillId: number,
    isApprove: boolean,
    skillComment: string
  }[]
}