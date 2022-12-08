
const axios = require('axios').default;
const BACKEND_URL = 'http://opticar-env.eba-arzsmdu7.us-east-1.elasticbeanstalk.com/api'
  
export async function uploadFile(bulkData) {

  const postInfo = bulkData;

  console.log(postInfo);
  const response = await axios.post(BACKEND_URL + '/bulk-upload', bulkData)
  console.log("121212")
  console.log(response);

}