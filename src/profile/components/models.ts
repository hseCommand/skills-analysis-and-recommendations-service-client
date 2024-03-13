interface SkillProps {
  name: string;
  onClick: () => void;
  targetLevel: number;
  level: number;
}

interface SkillReviewWindowProps {
  initialData: SkillReview;
  saveDataFunc: (data: SkillReview) => void;
  prevFunc: () => void;
  nextFunc: () => void;
  readOnly: boolean;
}

interface SkillReview {
  id: number,
  skillId: number,
  artifact: string,
  targetGrade: number,
  selfReviewGrade: number,
  isApprove: boolean,
}

interface PopupProps {
  cancelFunc: () => void;
  nextFunc?: (outputValues?: any) => void;
  inputValues?: any;
}

// interface ProfilePresetupProps {
//   cancelFunc: () => void;
//   nextFunc: (profileId: number) => void;
//   inputValues?: any;
// }

interface ProfileGet {
  id: string,
  userLogin: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    id: number,
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
  }[]
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
    id: number,
    skillId: number,
    artifact: string,
    targetGrade: number,
    selfReviewGrade: number,
    isApprove: boolean,
  }[]
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