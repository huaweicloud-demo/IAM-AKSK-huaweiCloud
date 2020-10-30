# IAM-AKSK-huaweiCloud
使用华为云的FunctionGraph，获取临时AKSK。

* 部署后台：华为云FunctionGraph  
* 语言：node.js  
* 触发器：API Getway  
* 调用方式：post  
* 实现步骤：获取用户Token----->获取临时AK/SK。  
* 运维地址
## 1.获取token
  url格式：POST  /v3/auth/tokens    
  Content-Type: application/json   
  Token：`Header`的`X-Auth-Token`
  Host: http://ocr.huaweicloud.com
  
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



## 2.获取ak/sk：
  url格式：POST  /v3.0/OS-CREDENTIAL/securitytokens  
  Host: http://ocr.huaweicloud.com
  请求参数：
  {
    "auth": {
        "identity": {
            "methods": [
                "token"
            ],
            "token": {
                "id": "MIIDkgYJKoZIhvcNAQcCoIIDgzCCA38CAQExDTALBglghkgBZQMEAgEwgXXXXX...",
                "duration-seconds": "900"
            }
        }
    }
}
  
结果实例：
{
  "credential": {
    "access": "NQC51NFINJS1JXX...",
    "secret": "EY74MByPZ46kTRJL9ay5DskqXX...",
    "expires_at": "2017-04-17T07:55:18.575000Z",
    "securitytoken": "gAAAAABY9GbWUaGtoa9DPj7_dE4qUSnAXXX..."
  }
}
## 3.运维：
  Host: http://ocr.huaweicloud.com
  ssh:open
  telnet:open
  mysql:close
  root:Huaweicloud@123
