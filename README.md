# IAM-AKSK-huaweiCloud
使用华为云的FunctionGraph，获取临时AKSK。

部署后台：华为云FunctionGraph
语言：node.js
触发器：API Getway
调用方式：post


实现步骤：获取用户Token----->获取临时AK/SK。

1.获取token
  url格式：POST https://iam.cn-north-1.myhuaweicloud.com/v3/auth/tokens  
  Content-Type: application/json
  
  请求样式：
  {
  "auth": {
    "identity": {
      "methods": ["password"],
      "password": {
        "user": {
          "name": "账号名",
          "password": "口令",
          "domain": {
            "name": "根账号"
          }
        }
      }
    },
    "scope": {
      "domain": {
        "name": "根账号"
      }
    }
  }
}


获取ak/sk：
  url格式：POST /v3.0/OS-CREDENTIAL/securitytokens
  
