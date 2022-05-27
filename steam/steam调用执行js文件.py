# https://store.steampowered.com/login/?redir=&redirssl=1
import execjs
import requests
# 爬虫
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Referer": "https://store.steampowered.com/login/?redir=&redirssl=1"
}
data = {
    "donotcache": "1631277740771",
    "username": "20302030426"
}
url = 'https://store.steampowered.com/login/getrsakey/'
response = requests.post(url=url, headers=headers, data=data).json()
# 实例化一个node对象
node = execjs.get()
# js源文件编译
ctx = node.compile(open('steamgame.js', encoding="utf-8").read())
# 执行js函数
funcName = "getPWD('{0}','{1}','{2}')".format("123456", response['publickey_mod'], response['publickey_exp'])
pwd = ctx.eval(funcName)
print(pwd)
