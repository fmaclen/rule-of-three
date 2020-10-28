document.addEventListener("DOMContentLoaded",function() {
  const valueA = document.getElementById("valueA")
  const valueB = document.getElementById("valueB")
  const valueY = document.getElementById("valueY")
  const valueX = document.getElementById("valueX")

  valueA.addEventListener("keyup", calculate)
  valueB.addEventListener("keyup", calculate)
  valueY.addEventListener("keyup", calculate)

  function calculate() {
    if (valueA.value != 0 && valueB.value.value != 0 && valueY.value != 0) {
      let result = (valueY.value * valueB.value) / valueA.value
      console.log(result)
      valueX.innerHTML = Math.round(result)
    } else {
      valueX.innerHTML = "X"
    }
  }
})
