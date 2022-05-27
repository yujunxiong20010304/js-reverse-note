import execjs

# 实例化一个node对象
node = execjs.get()
# js源文件编译
ctx = node.compile(open('逆向解析js.js',encoding="utf-8").read())
# 执行js函数
funcName = 'md5("{0}")'.format('123456')
pwd = ctx.eval(funcName)
print(pwd)
