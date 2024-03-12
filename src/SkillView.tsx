import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Modal, Button, Form, Container } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

function SkillView() {

    const navigate = useNavigate()
    let { skillId } = useParams();

    const [name, nameSet] = useState("")
    const [fetched, fetchedSet] = useState(0)
    const [roles, rolesSet] = useState<any[]>([])


    const [skillTypes, skillTypesSet] = useState<any[]>(["EMPLOYEE", "TEAM"])
    const [currentSkillType, currentSkillTypeSet] = useState("")
    const [unitTypes, sunitTypesSet] = useState<any[]>(["UNIT","DEVELOPER","TESTER","ANALYST"])
    const [currentunitTypes, currentUnitTypesSet] = useState("")
    const [tags, tagsSet] = useState<any[]>([{name: "tag1", id: 1}, {name: "tag2", id: 2}])
    const [tagsSelect, tagsSelectSet] = useState<any[]>([])

    const [levels, levelsSet] = useState<any[]>([1, 2])
    const [currLevel, currLevelSet] = useState(0)
    const [requirements, requirementsSet] = useState<any[]>(["",""])
    const [artefacts, artefactsSet] = useState<any[]>(["",""])
    const [recommends, recommendsSet] = useState<any[]>(["",""])

    useEffect(() => {
        if (!fetched) {
            fetch("http://localhost:8080/skills/tags/all", {
              method: "GET",
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
              },
          }).then(res=>res.json())
          .then(response=>{
            if(response) {
                let data: any[] = []
                response.map((e: any, i: number) => {
                    data.push({name: e, id: i})
                    
                })
                tagsSet(data)
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
        fetch(`http://localhost:8080/skills/${skillId}`, {
              method: "GET",
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
              },
          }).then(res=>res.json())
          .then(response=>{
            if(response) {
                let tagsGet: any[] = []
                response.tags.map((tag: any, i: number) => {
                    tagsGet.push({name: tag, id: i})
                })
                let levelsGet: any[] = []
                let reqGet: any[] = []
                let recGet: any[] = []
                response.skillGrades.map((grade: any, i: number) => {
                    levelsGet.push(grade.gradeNumber)
                    reqGet.push(grade.requirements)
                    recGet.push(grade.recommendation)
                })
                console.log(response);
                nameSet(response.name)
                currentSkillTypeSet(response.skillType)
                currentUnitTypesSet(response.unitType)
                tagsSelectSet(tagsGet)
                levelsSet(levelsGet)
                requirementsSet(reqGet)
                recommendsSet(recGet)
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
        rolesSet(JSON.parse(localStorage.getItem("roles")))
        fetchedSet(1)
    }
})

    let onSelect = (selectedList: any, selectedItem: any) => {
        tagsSelectSet(selectedList)
    }

    let onRemove = (selectedList: any, removedItem: any) => {
        tagsSelectSet(selectedList)
    }

    let changeTab = (i: number) => {
        currLevelSet(i)
    }

    let addLevel = () => {
        let arr = [...levels]
        let new_entry = arr.length
        arr.push((new_entry + 1))
        levelsSet(arr)

        arr = [...requirements]
        arr.push("")
        requirementsSet(arr)
        arr = [...recommends]
        arr.push("")
        recommendsSet(arr)
        arr = [...artefacts]
        arr.push("")
        artefactsSet(arr)

        currLevelSet(new_entry)
    }

    let requirementChanged = (value: any) => {
        let arr = [...requirements]
        arr[currLevel] = value
        requirementsSet(arr)
    }

    let artefactChanged = (value: any) => {
        let arr = [...artefacts]
        arr[currLevel] = value
        artefactsSet(arr)
    }

    let recommendChanged = (value: any) => {
        let arr = [...recommends]
        arr[currLevel] = value
        recommendsSet(arr)
    }

    let backClicked = () => {
        navigate('/profiles')
    }

    let saveClicked = () => {
        let skillGrades : any = []
        levels.forEach(level => {
            skillGrades.push({
                gradeNumber: level - 1,
                requirements: requirements[level - 1],
                recommendation: recommends[level - 1]
            })
        })
        fetch("http://localhost:8080/skills", {
              method: "POST",
              body: JSON.stringify({
                "skillType": currentSkillType,
                "unitType": currentunitTypes,
                "tags": tagsSelect,
                "name": name,
                "skillGrades": skillGrades,

              }),
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
              },
          }
          ).then(response=>{
            if(response) {

            }
          })
          .catch(er=>{
            console.log(er.message)
        })

        navigate('/profiles')
    }

    return(
    <div className="AddSkillWindow">
        <input className='skillnameInput' placeholder='Название навыка'
        value={name} onChange={e => nameSet(e.target.value)} disabled={!roles.includes("ADMIN")}></input>
        <div className="selectsBlock">
            <select className='selection skilltype' defaultValue={currentSkillType || "Тип навыка"} 
                onChange={e => currentSkillTypeSet(e.target.value)} disabled={!roles.includes("ADMIN")}>
                    {skillTypes.map((option: any, i: number) => {
                        return(
                        <option key={i} value={option}>
                            {option}
                        </option>
                    )})}
            </select>
            <select className='selection unittype' defaultValue={currentunitTypes || "Тип юнита"}
                onChange={e => currentUnitTypesSet(e.target.value)} disabled={!roles.includes("ADMIN")}>
                    {unitTypes.map((option: any, i: number) => {
                        return(
                        <option key={i} value={option}>
                            {option}
                        </option>
                    )})}
            </select>
            <Multiselect
                placeholder='Теги'
                options={tags} 
                selectedValues={tagsSelect}
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name"
                // disabled={!roles.includes("ADMIN")}
            />
        </div>
        <div className="levelsBlockAdd">
            <div className="addSkillBtns">
            {levels.map((level: any, i: number) => {
                let id = i.toString()
                let cn = i == currLevel ? "addSkillBtn selected" : "addSkillBtn"
                return(
                    <div className={cn} id={id} key={id}
                    onClick={e => changeTab(i)}>Уровень {i+1}</div>
                )
            })}
                <button className='addSkillLevel'
                onClick={addLevel}>+</button>
            </div>
            <input className='reqLevel' placeholder='Требования к уровню' 
            value={requirements.at(currLevel)} onChange={e => requirementChanged(e.target.value)} />
            <input className='artefactLevel' placeholder='Возможные артефакты' 
            value={artefacts[currLevel]} onChange={e => artefactChanged(e.target.value)} />
            <input className='recomLevel' placeholder='Рекомендации' 
            value={recommends.at(currLevel)} onChange={e => recommendChanged(e.target.value)} />
        </div>
        <div className="resultBtnsAS">
            <button className='resultBtn' onClick={backClicked}>Назад</button>
            <button className='resultBtn' onClick={saveClicked}>Сохранить</button>
        </div>
    </div>
    )
}

export default SkillView