import fs from 'fs'
import chalk from 'chalk'
//设置chalk等级 解决颜色无效问题
chalk.level = 1
// 引入node控制台输出盒子插件
import boxen from 'boxen'

// 挂载boxen
console.boxen = (text) => {
  const options = {
    margin: { top: 1, bottom: 1 },
    padding: { left: 1, right: 1 },
    borderColor: 'yellow',
    borderStyle: 'classic',
    title: 'Vite-demo'
  }
  console.log(`\n${boxen(text, options)}`)
}

const TYPE_MAP = new Map([
  ['feat', { emoji: '✨', title: 'feat', description: '新的特性' }],
  ['fix', { emoji: '🐛', title: 'fix', description: '修复Bug' }],
  ['merge', { emoji: '🔀', title: 'merge', description: '分支合并' }],
  ['style', { emoji: '🎨', title: 'style', description: '代码格式的更改' }],
  ['perf', { emoji: '🚀', title: 'perf', description: '提升性能' }],
  ['test', { emoji: '✅', title: 'test', description: '添加或更新测试用例' }],
  ['revert', { emoji: '⏪️', title: 'revert', description: '版本回退' }],
  ['build', { emoji: '📦', title: 'build', description: '打包工具的更改' }],
  ['chore', { emoji: '🔧', title: 'chore', description: '更改配置文件' }],
  ['ci', { emoji: '👷', title: 'ci', description: '对CI配置和脚本的更改' }],
  ['refactor', { emoji: '💻', title: 'refactor', description: '代码进行重构' }],
  ['docs', { emoji: '📝', title: 'docs', description: '添加或更新文档' }],
  ['release', { emoji: '🔖', title: 'release', description: '发布/版本标签' }]
])

// commit regexp
const commitRE = new RegExp(
  `^(${[...TYPE_MAP.values()]
    .map(({ title, emoji }) => `${title}|${emoji} ${title}`)
    .join('|')})(\\(.+\\))?: .{1,100}`
)

try {
  const msgPath = process.argv.slice(2, 3)[0]
  const msg = fs.readFileSync(msgPath, 'utf-8').replace(/\n#.*/g, '').trim()
  if (/Merge.+branch \'.+\'/.test(msg)) {
    fs.writeFileSync(msgPath, `🔀 ${msg.replace('Merge', 'merge:')}`)

    process.exit(0)
  }
  if (msg.length > 100) {
    throw `commit信息内容不得超出100个字符串长度`
  }
  if (commitRE.test(msg)) {
    // 添加emoji
    for (const [key, { emoji }] of TYPE_MAP) {
      if (msg.startsWith(key)) {
        fs.writeFileSync(msgPath, `${emoji} ${msg}`)
        break
      }
    }
  } else {
    // show error feedback
    console.log(
      `${chalk.hex('#fbb957')('✨feat: 新的特性')}\n${chalk.hex('#41ae3c')(
        '🐛fix: 修复Bug'
      )}\n${chalk.hex('#51c4d3')('🔀merge: 分支合并')}\n${chalk.hex('#813c85')(
        '🎨style: 代码格式的更改'
      )}\n${chalk.hex('#ef475d')('🚀perf: 提升性能')}\n${chalk.hex('#40a070')(
        '✅test: 提升性能添加或更新测试用例'
      )}\n${chalk.hex('#63bbd0')('⏪️revert: 版本回退')}\n${chalk.hex(
        '#f8df70'
      )('📦build: 打包工具的更改')}\n${chalk.hex('#158bb8')(
        '🔧chore: 更改配置文件'
      )}\n${chalk.hex('#f9d367')('👷ci: 对CI配置和脚本的更改')}\n${chalk.hex(
        '#f86b1d'
      )('💻refactor: 代码进行重构')}\n${chalk.hex('#d2568c')(
        '📝docs: 添加或更新文档'
      )}\n${chalk.hex('#f9d367')('🔖release: 发布/版本标签')}`
    )
    console.boxen(
      `commit信息不符合规范\n正确示例: "feat: 新增xxx功能..."\n正确示例: "feat(moduleName): 新增xxx功能..." `
    )
    // process quit
    process.exit(1)
  }
} catch (err) {
  console.error(err)
  console.boxen('commit 提交异常')
  process.exit(1)
}
