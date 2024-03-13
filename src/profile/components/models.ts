interface SkillReview {
  skillId: number,
  artifact: string,
  targetGrade: number,
  selfReviewGrade: number,
  isApprove: boolean,
  commentary: string,
}

interface ProfileGet {
  id: string,
  userLogin: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
    commentary: string,
  }[],
  commentary: string,
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
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
    commentary: string,
  }[],
  commentary: string,
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
  skills: {
    skillId: number,
    isApprove: boolean,
    commentary: string
  }[]
  commentary: string,
}