import requests
import execjs
import time
import random

# 创建node对象
node = execjs.get()
# js源文件编译
ctx = node.compile(open('有道翻译.js', 'r', encoding="utf-8").read())
# 执行js函数
e = input('输入你要翻译的语句')
r = str(int(time.time() * 1000))
i = r + str(int(random.random() * 10))
funcName = "translation_encryption('{0}','{1}')".format(e, i)
sign = ctx.eval(funcName)

# 爬虫
url = 'https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
                  " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Cookie": "OUTFOX_SEARCH_USER_ID=1539105272@10.108.160.101; "
              "JSESSIONID=aaa9FAx5hssN_92ynReVx; "
              "OUTFOX_SEARCH_USER_ID_NCOO=1296896436.1168578; "
              "___rl__test__cookies=1631431261094",
    "Referer": "https://fanyi.youdao.com/"
}
data = {
    "i": e,
    "from": "AUTO",
    "to": "AUTO",
    "smartresult": "dict",
    "client": "fanyideskweb",
    "salt": i,
    "sign": sign,
    "lts": r,
    "bv": "2269d5603709e65f667af23032808f1a",
    "doctype": "json",
    "version": "2.1",
    "keyfrom": "fanyi.web",
    "action": "FY_BY_REALTlME",
}
response = requests.post(url=url, headers=headers,data=data)
if response.status_code == 200:
    response.encoding = response.apparent_encoding
    response = response.json()
    print (response)
