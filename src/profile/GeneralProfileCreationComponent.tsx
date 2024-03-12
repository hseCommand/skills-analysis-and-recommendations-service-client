import React, { useEffect, useState } from 'react'
import ProfilePrestup from './components/ProfilePresetup'
import ProfileView, { ProfileViewInputValues, ProfileViewScenario } from './components/ProfileView'
import ProfileCreationSuccess from './components/ProfileCreationSuccess'

enum Stage {
  Presetup,
  ProfileView,
  Success,
}

const GeneralProfileCreationComponent = ({ cancelFunc }: PopupProps) => {
  const [stage, setStage] = useState<Stage>(Stage.Presetup)
  const [passingValue, setPassingValue] = useState<ProfilePresetupReturn>()
  const cancelAllFunc = () => {
    cancelFunc()
    setStage(Stage.Presetup)
  }

  if (stage == Stage.Presetup) {
    return <ProfilePrestup cancelFunc={cancelAllFunc} nextFunc={(outputValues: ProfilePresetupReturn) => {
      setStage(Stage.ProfileView)
      setPassingValue(outputValues)
    }} />
  } else if (stage == Stage.ProfileView) {
    let inputValues: ProfileViewInputValues = {
      scenario: ProfileViewScenario.Create,
      payload: passingValue
    }
    return <ProfileView cancelFunc={cancelAllFunc} inputValues={inputValues}
      nextFunc={(outputValues: any) => {
        setStage(Stage.Success)
      }} />
  } else if (stage == Stage.Success) {
    return <ProfileCreationSuccess cancelFunc={cancelAllFunc} />
  }
}

export default GeneralProfileCreationComponent