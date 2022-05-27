# http://eip.chanfine.com/login.jsp?login_error=1
import execjs
# 创建node对象
node = execjs.get()
# js源文件编译
ctx = node.compile(open('长房网.js', 'r', encoding='utf-8').read())
# 执行js函数
funcName = "desEncrypt('{0}')".format("123456")
pwd = ctx.eval(funcName)
print(pwd)
