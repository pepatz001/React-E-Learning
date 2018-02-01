import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3001/',
  baseURL: 'https://web-elearning.herokuapp.com/',
  headers: { 'Content-Type': 'application/json' }
})

export const login = (username, password) => {
  const data = { 
    username: username,
    password: password
  }
  return axiosInstance.post('login', data)
    .then(data => data)
    .catch(error => error.response)
}

export const logout = () => {
  return axiosInstance.post('/logout')
    .then(response => response)
    .catch(error => { throw(error.response) })
}

export const publishPost = (title, content) => {
  const data = { 
    title: title,
    content: content,
    user: { username: localStorage.getItem('username')}
  }

  return axiosInstance.post('api/post/create/', data)
    .then(data => data)
    .catch(error => error.response)
}

export const getAllPosts = () => {
  return axiosInstance.get('/api/post/all/')
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}

export const getDepartment = () => {
  return axiosInstance.get('/api/department/getContent')
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}

export const getUserDepartment = () => {
  return axiosInstance.get('/api/user/getuser')
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}

export const signup = (data) => {
  return axiosInstance.post('/api/user/signup', data)
    .then(data => data)
    .catch(error => error.response)
}

export const deleteUser = (data) => {
  return axiosInstance.delete('/api/user/delete/' + data._id)
    .then(data => data)
    .catch(error => error.response)
}

export const updateUser = (data,_id) => {
  return axiosInstance.put('/api/user/edit/' + _id,data)
    .then(data => data)
    .catch(error => error.response)
}

export const deleteDepartment = (data) => {
  return axiosInstance.delete('/api/department/delete/' + data)
    .then(data => data)
    .catch(error => error.response)
}

export const updateDepartment = (data) => {
  return axiosInstance.put('/api/department/edit/',data)
    .then(data => data)
    .catch(error => error.response)
}

export const createDepartment = (data) => {
  return axiosInstance.post('/api/department/create', data)
    .then(data => data)
    .catch(error => error.response)
}

export const updateContent = (data) => {
  return axiosInstance.put('/api/department/editContent/',data)
    .then(data => data)
    .catch(error => error.response)
}

export const deleteContent = (data) => {
  return axiosInstance.delete('/api/department/deleteContent/' + data)
    .then(data => data)
    .catch(error => error.response)
}

export const createTopic = (data) => {
  return axiosInstance.post('/api/topic/create', data)
    .then(data => data)
    .catch(error => error.response)
}
export const getTopic = () => {
  return axiosInstance.get('/api/topic/all')
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}
export const getOneTopic = (_id) => {
  return axiosInstance.get('/api/topic/' + _id)
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}
export const comment = (_id,data) => {
  return axiosInstance.put('/api/topic/reply/' + _id,data)
    .then(data => data)
    .catch(error => error.response)
}
export const deleteComment = (_id,data) => {
  return axiosInstance.put('/api/topic/delete/' + _id,data)
    .then(data => data)
    .catch(error => error.response)
}
export const deleteTopic = (_id) => {
  return axiosInstance.delete('/api/topic/deleteTopic/' + _id)
    .then(data => data)
    .catch(error => error.response)
}
export const editDepartment = (data) => {
  return axiosInstance.put('/api/user/editDepartment/',data)
    .then(data => data)
    .catch(error => error.response)
}
export const updateTopic = (id,data) => {
  return axiosInstance.put('/api/topic/update/'+ id,data)
    .then(data => data)
    .catch(error => error.response)
}
