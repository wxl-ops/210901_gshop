import axios from 'axios'
export default function ajax(url,data={},type='GET') {
  return new Promise((resolve, reject) => {
    let promise;
    if(type === 'GET'){
      let stringData = ''
      Object.keys(data).forEach(item => {
        stringData += `${item}=${data[item]}&`
      })
      if (stringData){
        url += '?'+stringData.substring(0,stringData.length-1)
      }
      promise = axios.get(url)
    }else {
      promise = axios.post(url,data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
