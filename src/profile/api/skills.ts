export async function getAllTags(): Promise<string[]> {
  return await fetch("http://localhost:8080/skills/tags/all", {
    method: "GET",
    headers: {
      'Accept': '*/*',
    },
  }
  ).then(res => res.json())
    .then(response => {
      return response
    })
    .catch(er => {
      console.log(er.message)
    })
}

export async function getAllSkillTypes(): Promise<string[]> {
  return await fetch("http://localhost:8080/skills/skillTypes/all", {
    method: "GET",
    headers: {
      'Accept': '*/*',
    },
  }
  ).then(res => res.json())
    .then(response => {
      return response
    })
    .catch(er => {
      console.log(er.message)
    })
}

export async function getAllUnitTypes(): Promise<string[]> {
  return await fetch("http://localhost:8080/skills/unitTypes/all", {
    method: "GET",
    headers: {
      'Accept': '*/*',
    },
  }
  ).then(res => res.json())
    .then(response => {
      return response
    })
    .catch(er => {
      console.log(er.message)
    })
}