import React, { useState, useEffect } from 'react'
import {
  Autocomplete,
  Box,
  Stack as MStack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button as MButton,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import ProfileMenuList from './components/ProfileMenuList';
import ProfileView, { ProfileViewInputValues, ProfileViewScenario } from './components/ProfileView';
import { getAllSkillTypes } from './api/skills';
import ProfilePresetup from './components/ProfilePresetup';
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {

  const navigate = useNavigate()
  // TODO: Wouldn't filtering inside table headers be better?
  const [skillTypesSelectLabels, setSkillTypesSelectLabels] = useState<string[]>([])
  const [profilesSkillTypeFilter, setProfilesSkillTypeFilter] = useState<string>(null)
  const [profiles, setProfiles] = useState<ProfileGet[]>()

  // TODO: Consider looking at Context way of changing state in a parent-child components.
  const [profileCreationActive, setProfileCreationActive] = useState<boolean>(false)
  const [profileViewActive, setProfileViewActive] = useState<boolean>(false)

  const [forceTableKey, setForceTableKey] = useState<number>(0)

  const [profileViewInputValues, setProfileViewInputValues] = useState<ProfileViewInputValues>();

  const forceTableRefresh = () => {
    setForceTableKey(forceTableKey + 1)
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = useState<string>('desc')

  const handleRequestSort = (event: React.MouseEvent<unknown>) => {
    const isAsc = order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllSkillTypes().then((skillTypes) => { setSkillTypesSelectLabels(skillTypes) })
  }, [])

  useEffect(() => {

    fetch("http://localhost:8080/profiles/all", {
      method: "GET",
      headers: {
        'Accept': '*/*',
        'Authorization': localStorage.getItem('token')
      },
    }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Not signed in');
    })
      .then(response => {
        setProfiles(response)
        console.log(response)
      }).catch(er => {
        console.log(er.message)
        localStorage.clear()
        navigate('/')
      })
  }, [forceTableKey])

  async function deleteProfile(id: string): Promise<void> {
    return await fetch("http://localhost:8080/profiles/" + id, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        'Authorization': localStorage.getItem('token')
      },
    }
    ).then(res => {
      console.log('profile successfully deleted')
      console.log(res)
    }).catch(er => {
      console.log(er.message)
    })
  }

  async function archiveProfile(profile: ProfileEdit): Promise<void> {
    profile.status = "ARCHIVE"

    return await fetch("http://localhost:8080/profiles", {
      method: "PUT",
      body: JSON.stringify(profile),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    }
    ).then(res => res.json())
      .then(response => {
        console.log('existing profile successfully edited')
        console.log(response)
      })
      .catch(er => {
        console.log(er.message)
      })
  }

  async function getProfileData(id: string): Promise<ProfileGet> {
    return await fetch("http://localhost:8080/profiles/" + id, {
      method: "GET",
      headers: {
        'Accept': '*/*',
      },
    }
    ).then(res => res.json())
      .then(response => {
        console.log('retrieved profile:')
        console.log(response)
        return response
      }).catch(er => {
        console.log(er.message)
      })
  }

  function descendingComparator(a: ProfileGet, b: ProfileGet) {
    let aDate = Date.parse(a.createdAt)
    let bDate = Date.parse(b.createdAt)
    if (bDate < aDate) {
      return -1;
    }
    if (bDate > aDate) {
      return 1;
    }
    return 0;
  }

  const getFilteredRows = () => {
    return profiles.slice().filter((p) => profilesSkillTypeFilter === null || p.skillType === profilesSkillTypeFilter)
  }

  const emptyRows = profiles ? Math.max(0, (1 + page) * rowsPerPage - getFilteredRows().length) : rowsPerPage

  const visibleRows = React.useMemo(
    () => {
      return (
        profiles
          ? getFilteredRows()
            .sort((a, b) => (order === 'desc' ? 1 : -1) * descendingComparator(a, b))
            .slice(page * rowsPerPage, Math.min((page + 1) * rowsPerPage, profiles.length))
          : []
      )
    },
    [order, profiles, page, rowsPerPage, profilesSkillTypeFilter],
  )

  return (
    <div>
      <MStack key={forceTableKey} spacing={2} sx={{ paddingY: 4, paddingX: 2 }} className="containerUnderTabs">
        <Autocomplete
          sx={{ paddingLeft: 2, maxWidth: 350 }}
          disablePortal
          options={skillTypesSelectLabels}
          renderInput={(params) => <TextField {...params} label="Тип навыка" />}
          value={profilesSkillTypeFilter}
          onChange={(e, newValue) => { setProfilesSkillTypeFilter(newValue) }}
          autoHighlight
          autoComplete
          size='small'
        />
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <EnhancedTableHead
              order={order}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows && visibleRows.map((profile: ProfileGet) => {
                // if (profilesSkillTypeFilter !== null &&
                //   profile.skillType !== profilesSkillTypeFilter) {
                //   return ''
                // }
                return (
                  <TableRow
                    key={profile.id}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{profile.userLogin}</TableCell>
                    <TableCell align="right">{profile.skillType}</TableCell>
                    <TableCell align="right">{profile.unitType}</TableCell>
                    <TableCell align="right">{profile.createdAt}</TableCell>
                    <TableCell align="right">{profile.targetGradeByDefault}</TableCell>
                    <TableCell align="right">{profile.status}</TableCell>
                    <TableCell align="right">
                      {/* The presense of this button and menu is somehow making a weird little margin on the right. */}
                      {/* So I made padding of cells equal to 0 */}
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: 0 }}>
                        <MButton onClick={async () => {
                          setProfileViewInputValues({
                            payload: await getProfileData(profile.id)
                          })
                          setProfileViewActive(true)
                        }}>Открыть</MButton>
                        <ProfileMenuList
                          deleteAction={async () => {
                            deleteProfile(profile.id).then(forceTableRefresh)
                          }}
                          archiveAction={async () => {
                            archiveProfile(profile).then(forceTableRefresh)
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                // sx={{ 'td, th': { border: 0 } }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={profiles ? getFilteredRows().length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <Box sx={{ alignSelf: 'flex-end', paddingRight: 4 }}>
          <MButton onClick={() => { setProfileCreationActive(true); }}>Создать селф-ревью</MButton>
        </Box>
      </MStack>
      {profileCreationActive &&
        <ProfilePresetup
          cancelFunc={() => {
            setProfileCreationActive(false)
          }}
          nextFunc={async (profileId: string) => {
            setProfileViewInputValues({
              payload: await getProfileData(profileId)
            })
            forceTableRefresh()
            setProfileCreationActive(false)
            setProfileViewActive(true)
          }}
        />}
      {profileViewActive &&
        <ProfileView
          cancelFunc={() => { setProfileViewActive(false); }}
          nextFunc={() => {
            setProfileViewActive(false)
            forceTableRefresh()
          }}
          inputValues={profileViewInputValues}
        />}
    </div>
  )
}

interface EnhancedTableHeadProps {
  order: any,
  onRequestSort: any,
}

const EnhancedTableHead = ({ order, onRequestSort }: EnhancedTableHeadProps) => {
  const createSortHandler = () => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Название команды / ФИО</TableCell>
        <TableCell align="right">Тип навыка</TableCell>
        <TableCell align="right">Тип Юнита</TableCell>
        <TableCell
          align="right"
          sortDirection={order}
        >
          <TableSortLabel
            active={true}
            direction={order}
            onClick={createSortHandler()}
          >
            Дата заполнения
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">Уровень</TableCell>
        <TableCell align="right">Статус</TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ProfileDashboard