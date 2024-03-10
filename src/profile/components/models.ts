interface SkillProps {
  name: string;
  onClick: () => void;
  targetLevel: number;
  level: number;
}

interface SkillReviewWindowProps {
  initialData: InitialDataSkillReview;
  saveDataFunc: (data: InitialDataSkillReview) => void;
  cancelFunc: () => void;
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
  level: number;
}

interface PopupProps {
  cancelFunc: () => void;
  nextFunc?: (outputValues?: any) => void;
  inputValues?: any;
}