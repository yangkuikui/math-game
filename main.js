const problem = document.querySelector(".problem")
const form = document.querySelector(".form")
const field = document.querySelector(".field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")

let state = {
  score: 0,
  mistake: 0
}

function undateProblem() {
  state.currentProblem = generateProblem()
  console.log(state)
  problem.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
}

undateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)]
  }
}

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(field.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
  } else {
    state.mistake++
    mistakesAllowed.textContent = 10 - state.mistake
  }

  undateProblem()
  field.value = ""
  field.focus()
  checkLogic()
}

function checkLogic() {
  if (state.score == 10) {
    resetGame()
  }
  if (state.mistake == 2) {
    resetGame()
  }
}

function resetGame() {
  undateProblem()
  state.score = 0
  state.mistake = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
}
