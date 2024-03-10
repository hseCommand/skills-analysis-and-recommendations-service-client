import React, { useEffect, useState } from 'react'
import ProfilePrestup from './components/ProfilePresetup'
import ProfileView from './components/ProfileView'
import ProfileCreationSuccess from './components/ProfileCreationSuccess'

enum Stage {
  Presetup,
  ProfileView,
  Success,
}

const GeneralProfileCreationComponent = ({ cancelFunc }: PopupProps) => {
  const [stage, setStage] = useState<Stage>(Stage.Presetup)
  const [passingValue, setPassingValue] = useState<any>()
  const cancelAllFunc = () => {
    cancelFunc()
    setStage(Stage.Presetup)
  }

  if (stage == Stage.Presetup) {
    return <ProfilePrestup cancelFunc={cancelAllFunc} nextFunc={(outputValues: any) => {
      setStage(Stage.ProfileView)
      setPassingValue(outputValues)
    }} />
  } else if (stage == Stage.ProfileView) {
    return <ProfileView cancelFunc={cancelAllFunc} inputValues={passingValue} 
    nextFunc={(outputValues: any) => {
      setStage(Stage.Success)
      setPassingValue(outputValues)
    }} />
  } else if (stage == Stage.Success) {
    return <ProfileCreationSuccess cancelFunc={cancelAllFunc} />
  }
}

export default GeneralProfileCreationComponent