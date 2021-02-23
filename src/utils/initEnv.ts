// 通过环境变量动态获取api_url

var api_url = 'https://myapi.com/'
 
var env = process.env.REACT_APP_SECRET_ENV;

switch(env) {
    case 'development': 
        api_url = '**';        
        break;
    case 'production':        
        api_url = '**'
        break;
}

export default api_url