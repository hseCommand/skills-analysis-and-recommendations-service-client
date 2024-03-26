import { ProfileViewScenario } from "./ProfileView";

export interface SkillProps {
  name: string;
  onClick: () => void;
  targetLevel: number;
  level: number;
  approved?: boolean;
}

export interface SkillReviewWindowProps {
  initialData: SkillReview;
  saveDataFunc: (data: SkillReview) => void;
  prevFunc: () => void;
  nextFunc: () => void;
  approveFunc: (data: SkillReview) => void;
  declineFunc: (data: SkillReview) => void;
  scenario: ProfileViewScenario;
}

export interface PopupProps {
  cancelFunc: () => void;
  nextFunc?: (outputValues?: any) => void;
  inputValues?: any;
}