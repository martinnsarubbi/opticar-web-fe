
const axios = require('axios').default;
const BACKEND_URL = 'http://192.168.0.8:8080/api'
  
export async function uploadFile(bulkData) {

  const postInfo = bulkData;

  console.log(postInfo);
  const response = await axios.post(BACKEND_URL + '/bulk-upload', bulkData)
  console.log("121212")
  console.log(response);
  

}