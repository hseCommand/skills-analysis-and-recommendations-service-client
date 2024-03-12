interface SkillProps {
  name: string;
  onClick: () => void;
  targetLevel: number;
  level: number;
}

interface SkillReviewWindowProps {
  initialData: InitialDataSkillReview;
  saveDataFunc: (data: InitialDataSkillReview) => void;
  prevFunc: () => void;
  nextFunc: () => void;
  readOnly: boolean;
}

interface InitialDataSkillReview {
  id: number;
  targetLevel: number;
  level: number;
  artifact: string;
  commmentary: string;
}

interface ProfilePresetupReturn {
  skillType: string;
  unitType: string;
  tags: string[];
  targetGradeByDefault: number;
}

interface PopupProps {
  cancelFunc: () => void;
  nextFunc?: (outputValues?: any) => void;
  inputValues?: any;
}

interface ProfileGet {
  id: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
  }[]
}

interface ProfileCreate {
  status: string,
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
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number
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

interface ExistingProfileData {
  id: string,
  createdAt: string,
  status: string,
  skillType: string,
  unitType: string,
  targetGradeByDefault: number,
  skills: {
    skillId: number,
    artifact: string,
    targetGrade: number,
  }[]
}

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