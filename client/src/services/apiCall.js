import axiosInstance from './axios'


export function getMetaData(){
    return axiosInstance.get('/metadata')
    .then(res=> res.data.tables)
    .catch(error => {
        console.error('Error loading dat', error);
      })
}

export function getTableData(tableValue){
    return axiosInstance.get(`/${tableValue}`)
    .then(res=>res.data)
    .catch(error => {
        console.error('Error loading dat', error);
      })
}