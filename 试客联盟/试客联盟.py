# http://login.shikee.com/
import requests
import execjs
import re

url = 'http://login.shikee.com/getkey?v=17cfa9a15e618871b781aa3b144745af'
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Referer": "http://login.shikee.com/"
}
response = requests.get(url=url, headers=headers)
if response.status_code == 200:
    response.encoding = response.apparent_encoding
    response = response.text
    response = re.split('["]', response)
    public_key = response[1]
    # 实例化一个node对象
    node = execjs.get()
    # js源文件的编译
    ctx = node.compile(open('./试客联盟.js', 'r', encoding="utf-8").read())
    # 执行js函数
    funcName = "getPwd('{0}','{1}')".format("123456", public_key)
    pwd = ctx.eval(funcName)
    print(pwd)
