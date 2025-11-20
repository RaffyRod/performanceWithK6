import http from 'k6/http';
import { check } from 'k6';

export const options = {
     vus: 10,
     duration: '10s',
     thresholds: {
          http_req_duration: ['p(90)<100'],
          http_req_failed: ['rate<0.01']
     }
}

export default function(){
   const res = http.get('http://test.k6.io/');
   check(res, {
        'status is 200: ': (r) => r.status === 200
   } );
   //console.log('the status is =====> ' + res.body);

   check(res, {
        'Page is StartPage: ': (r) => r.body.includes('./images/pizza.png')
   } );
}