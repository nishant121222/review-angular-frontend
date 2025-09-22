/*export const environment = {
  production: false,
  apiUrl: 'http://miramata.tech/api/',   // Django backend
  businessId: 1,
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ9Yw2ruq_wjsRjcPfsQ6gNS8'
};

*/
// Production Build

export const environment = {
  production: false,
 //apiUrl: 'http://lemiroir.miramata.tech/api/',   // Use HTTPS in production
 apiUrl: 'https://api.lemiroir.miramata.tech/api/',
// apiUrl: 'http://192.168.243.5:8000/api/',
//apiUrl : 'http://127.0.0.1:8000/swagger/',
//apiUrl : 'https://api.lemiroir.miramata.tech/',
 businessId: 1,
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ9Yw2ruq_wjsRjcPfsQ6gNS8'
};



