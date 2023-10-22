// 1 加法 2 减法

const dataArr = [
  {
    id: '111',
    body: [
      {
        number: 1,
        method: 1
      },
      {
        number: 2,
        method: 1
      }
    ],
    answer: 3
  }
]

// const createQuestion = (max, length) => {
//   // max 为最大值，算式中的数字和结果，均不能超过最大值
//   // length 为算式的长度
//   // 算式不能出现负数，也不能重复
// }

const createQuestion = (max, length) => {
  let dataArr = []
  let usedNumbers = new Set()

  for (let i = 0; i < length; i++) {
    let number = Math.floor(Math.random() * max) + 1
    while (usedNumbers.has(number)) {
      number = Math.floor(Math.random() * max) + 1
    }
    usedNumbers.add(number)

    let method
    if (i === 0) {
      method = 1 // 第一个运算符为加法
    } else {
      method = Math.floor(Math.random() * 2) + 1
    }
    dataArr.push({ number: number, method: method })
  }

  let answer = dataArr[0].number
  for (let i = 1; i < dataArr.length; i++) {
    if (dataArr[i].method === 1) {
      answer += dataArr[i].number
    } else if (dataArr[i].method === 2) {
      answer -= dataArr[i].number
    }
  }

  if (answer < 0 || answer > max) {
    return createQuestion(max, length)
  }

  return { id: md5(JSON.stringify(dataArr)), body: dataArr, answer: answer }
}

// console.log(createQuestion(50, 3))

const start = () => {
  const length = document.querySelector('#length').value
  const max = document.querySelector('#max').value
  const number = document.querySelector('#number').value

  const ul = document.querySelector('ul')
  ul.innerHTML = ''
  for (let i = 0; i < number; i++) {
    const li = document.createElement('li')
    const question = createQuestion(max, length)

    // 使用模板字符串构建 HTML 字符串
    let htmlString = ''

    question.body.forEach((operand, index) => {
      const operator = index < question.body.length - 1 ? (operand.method === 1 ? '+' : '-') : '='
      htmlString += `${operand.number} ${operator} `
    })

    li.innerHTML = `${htmlString} <i>${question.answer}</i>`
    ul.appendChild(li)
  }
  document.querySelector('.setting').style.display = 'none'
  document.querySelector('.control').style.display = 'block'
  ul.style.display = 'grid'
}

const showanswer = () => {
  const i = document.querySelector('i')
  if (i.style.display == 'none') {
    document.querySelectorAll('i').forEach((item) => {
      item.style.display = 'inline'
    })
  } else {
    document.querySelectorAll('i').forEach((item) => {
      item.style.display = 'none'
    })
  }
}
