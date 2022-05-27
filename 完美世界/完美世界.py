# https://passport.wanmei.com/login?
import execjs
import requests
from lxml import etree
url = 'https://passport.wanmei.com/sso/login?service=passport&isiframe=1&location=2f736166652f'
headers = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
}
response = requests.get(headers=headers, url=url)
if response.status_code == 200:
    response.encoding = response.apparent_encoding
    response = response.text
    tree = etree.HTML(response)
    key = tree.xpath('//input[@id="e"]/@value')[0]
    # 实例化一个node对象
    node = execjs.get()
    # js源文件的编译
    ctx = node.compile(open('./完美世界js.js', encoding='utf-8').read())
    # 执行js函数
    funcName = 'getPwd("{0}","{1}")'.format('123456', key)
    pwd = ctx.eval(funcName)
    print(pwd)

