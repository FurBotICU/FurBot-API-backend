/**
 * 初始化前的预处理
 */

// 初始化环境变量
if (process.env.NODE_ENV == 'development') process.env.dev = 1;

// console.log(`

//       Author: 玖叁 @colour93
//       GitHub: https://github.com/colour93
// `)
if (process.env.dev) {
      console.log("当前为开发环境");
}