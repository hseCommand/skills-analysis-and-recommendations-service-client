import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Modal, Button, Form, Container, Stack } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

import './style/App.css'
import ProfileDashboard from './profile/ProfileDashboard';

function Profiles() {
    const [fetched, fetchedSet] = useState(0)
    const [roles, rolesSet] = useState<any[]>([])

    const [allSkills, allSkillsSet] = useState<any[]>([])
    const [skills, skillsSet] = useState<any[]>([])
    const [email, emailSet] = useState("")
    const [name, nameSet] = useState("")
    const [myreviews, myreviewsSet] = useState<any[]>([])
    const [choosen, choosenSet] = useState("reviews")

    const [nameSkill, nameSkillSet] = useState("")
    const [skillTypes, skillTypesSet] = useState<any[]>(["EMPLOYEE", "TEAM"])
    const [unitTypes, sunitTypesSet] = useState<any[]>(["UNIT","DEVELOPER","TESTER","ANALYST"])
    const [currentSkillType, currentSkillTypeSet] = useState("")
    const [currentUnitType, currentUnitTypeSet] = useState("")
    const [tags, tagsSet] = useState<any[]>([{name: "tag 1", id: 1}, {name: "tag 2", id: 2}])
    const [tagsSelected, tagsSelectedSet] = useState<any[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!fetched) {
            console.log("FETCH!!!")
            fetch("http://localhost:8080/skills", {
              method: "GET",
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
              },
          }
          ).then(res=>res.json())
          .then(response=>{
            if(response) {
                skillsSet(response)
                allSkillsSet(response)
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
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
                response.map((e: any, i: number) => {data.push({name: e, id: i})})
                tagsSet(data)
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
        rolesSet(JSON.parse(localStorage.getItem("roles")))
        fetchedSet(1)
        }
        emailSet(localStorage.getItem("email") || "")
        nameSet(localStorage.getItem("name") || "name")
    })

    let changeTab = (id: string) => {
        let tabs = Array.from(document.querySelectorAll(".profileBtn"))
        tabs.map((tab: any, i: number) => {
          if (tab.id == id) {
            tab.className = "profileBtn selected"
          } else {
              tab.className = "profileBtn"
            }
          }
        )
        choosenSet(id)
    }

    // let skillsGet = () => {
    //     fetch("http://localhost:8081/skills", {
    //           method: "GET",
    //           headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json'
    //           }
    //       }
    //       ).then(res=>res.json())
    //       .then(response=>{
    //         console.log(response)
    //         skillsSet(response)
    //       })
    //       .catch(er=>{
    //         console.log(er.message)
    //     })
    // }

    // React.useEffect(skillsGet, [])
    
    let list = [{name: 'Option 1️', id: 1},{name: 'Option 2️', id: 2}]

    let onSelect = (selectedList: any, selectedItem: any) => {
        console.log(selectedList)
        console.log(selectedItem)
        tagsSelectedSet(selectedList)
    }

    let onRemove = (selectedList: any, removedItem: any) => {
        console.log(selectedList)
        console.log(removedItem)
        tagsSelectedSet(selectedList)
    }

    let openBtnClicked = (id: any) => {
        navigate("/skill/"+id)
    }

    let searchBtnClicked = (skillname: any, type: any, unit: any, tags: any[]) => {
        let searchTags: any[] = []
        tagsSelected.forEach(t => searchTags.push(t.name))
        let skillsFound: any[] = []
        fetch("http://localhost:8080/skills/filter", {
            method: "POST",
            body: JSON.stringify({
                "skillTypes": [type],
                "unitTypes": [unit],
                "tags": searchTags

            }),
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
        }).then(res=>res.json())
        .then(response=>{
            console.log(response)
          if(response) {
              skillsFound = response
              console.log(skillsFound);
              skillsSet(skillsFound)

          }
        })
        .catch(er=>{
          console.log(er.message)
      })
    //   let newskillsFound = skillsFound.filter(skill => skill.name.includes(skillname))
    //   console.log("found",newskillsFound);
      
    }

    return (
        <>

            

            <div
                className="profile"
                style={{ display: 'block', position: 'initial' }}
            >
            
            {/* <Button onClick={() => {
                localStorage.clear()
                navigate("/")
            }}>Выйти</Button>

            <div className="profileHeader">
                <div className="username">{name}</div>
            </div> */}

            <div className="profileHeader">
                <div className="headerItem">{name}</div>
                <div className="headerItem">/</div>
                <Button className="headerItem exitButtonHeader" onClick={() => {
                    localStorage.clear()
                    navigate("/")
                }}>Выйти</Button>
            </div>

            <div className="profileBtns">
                <div className="profileBtn selected" id="reviews" 
                    onClick={e => changeTab("reviews")}>Мои анкеты</div>
                <div className="profileBtn" id="skills" 
                onClick={e => changeTab("skills")}>Навыки</div>
            </div>

            {choosen == "skills" &&
            <div className="skillsProfile containerUnderTabs">
                <div className="skillSearch">
                    <input className='skillnameSearch' placeholder='Поиск по названию навыка'
                    value={nameSkill} onChange={e => nameSkillSet(e.target.value)}></input>
                    <div className="optionsRow">
                        <select className='selection skilltype' defaultValue="" 
                            onChange={e => currentSkillTypeSet(e.target.value)}>
                                <option hidden value="">Тип навыка</option>
                                {skillTypes.map((option: any, i: number) => {
                                    return(
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                )})}
                        </select>
                        <select className='selection unittype' defaultValue="" 
                            onChange={e => currentUnitTypeSet(e.target.value)}>
                                <option hidden value="">Тип юнита</option>
                                {unitTypes.map((option: any, i: number) => {
                                    return(
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                )})}
                        </select>
                        <Multiselect className='tagsMultiselect'
                            options={tags}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                        />
                    </div>
                    <button className='searchBtn' 
                    onClick={e => searchBtnClicked(nameSkill, currentSkillType, currentUnitType, tagsSelected)}>
                        Найти</button>
                </div>
                <div className="skillsList">
                    <div className="skillsListHead">
                        <div className="slhTitle">Название навыка</div>
                        <div className="slhTags">Теги</div>
                        <div></div>
                    </div>
                    {skills.map((skill: any, i: number) => {
                        let tagsStr = ""
                        if (skill.tags.length > 0) {
                        tagsStr = skill.tags.at(0)
                        if (skill.tags.length >= 2) {
                            tagsStr += ", " + skill.tags.at(1)
                        }
                        if (skill.tags.length > 2) {
                            tagsStr += " + " + (skill.tags.length - 2)
                        }
                        }
                        return(
                            <div className="skillInfo" key={i}>
                                <div className="skillTitle">{skill.name}</div>
                                <div className="skillTags">{tagsStr}</div>
                                <button className='openSkill' onClick={e => openBtnClicked(skill.id)}>открыть</button>
                            </div>
                        )
                    })}
                </div>
                {roles.includes("ADMIN") &&
                <button onClick={() => {
                navigate("/addskill")
                }}>добавить навык</button>}
            </div>
            }

            {choosen == "reviews" &&
            <div className="reviews">
                <ProfileDashboard />
            </div>
            }
            {/* <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>Profiles page</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={e => {
                                e.preventDefault()
                                // console.log(name, password, email)
                            }}>
                            <Form.Group className="mb-3" controlId="Name">
                                <Form.Label className="text-center">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name"
                                    onChange={a => {}}
                                />
                            </Form.Group>
                            
                            <Form.Label className="text-center">Unit type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">DEVELOPER</option>
                                <option value="2">UNIT</option>
                                <option value="3">TESTER</option>
                                <option value="4">ANALYST</option>
                            </Form.Select>
                            <p></p>
                            
                            <Form.Label className="text-center">Skill type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">EMPLOYEE</option>
                                <option value="2">TEAM</option>
                            </Form.Select>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{ navigate('/') }}>
                    Close
                </Button>
                {/* <Button variant="primary">Save changes</Button> *
                </Modal.Footer>
            </Modal.Dialog> */}
            </div>
            
        </>

    )
}

export default Profiles