// 通过环境变量动态获取api_url

var api_url = 'https://partner-api-staging.2ccm.net/'
 
var env = process.env.REACT_APP_SECRET_ENV;

switch(env) {
    case 'development': 
        api_url = 'https://partner-api-staging.2ccm.net/';        
        break;
    case 'production':        
        api_url = 'https://partner-api.2ccm.net/'
        break;
}

export default api_url