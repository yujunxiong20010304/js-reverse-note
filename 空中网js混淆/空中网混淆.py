# https://passport.kongzhong.com/
import requests
import execjs
import re
# 爬虫
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Cookie": "kztraceuid=rBcK4GE80ACS2hURLG2QAg==; cpaid=10662378; "
              "KZLBS=fce67f196d1fcd79; SSO-KGZLT=6f000a88-89d6-42b6-8341-cdeca520ffd5; "
              "SSO-KGZIT=96984de1-04c7-4a9d-b3e5-37e37db9854e; "
              "Hm_lvt_1287c2225a527abe3386233dd9316f99=1631375377,1631377267,1631377321; "
              "SSO-KGZQRT=17FC83487C10043635B6FD280BE134F4; "
              "Hm_lpvt_1287c2225a527abe3386233dd9316f99=1631404605",
    "Referer": "https://passport.kongzhong.com/"
}

url = 'https://sso.kongzhong.com/ajaxLogin?j=j&jsonp=j&service=https://passport.kongzhong.com/&_=1631404604935'

response = requests.get(url=url, headers=headers)
if response.status_code == 200:
    response.encoding = response.apparent_encoding
    response = response.text
    public_key = re.split('[:,"]', response)[4]
    # 实例化一个node对象
    node = execjs.get()
    # js源文件编译
    ctx = node.compile(open('空中网混淆.js', 'r', encoding="utf-8").read())
    # 执行js函数
    funcName = "getPwd('{0}','{1}')".format("123456", public_key)
    pwd = ctx.eval(funcName)
    print(pwd)
