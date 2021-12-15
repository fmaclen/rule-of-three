document.addEventListener("DOMContentLoaded",function() {
  const valueA = document.getElementById("valueA")
  const valueB = document.getElementById("valueB")
  const valueY = document.getElementById("valueY")
  const valueX = document.getElementById("valueX")
  
  valueA.addEventListener("keyup", calculate)
  valueB.addEventListener("keyup", calculate)
  valueY.addEventListener("keyup", calculate)

  const buttonReset = document.getElementById("calculator__button--reset");
  const buttonReverse = document.getElementById("calculator__button--reverse");

  buttonReset.addEventListener("click", resetValues);
  buttonReverse.addEventListener("click", reverseValues);
  
  function calculate() {
    if (valueA.value != 0 && valueB.value.value != 0 && valueY.value != 0) {
      let result = (valueY.value * valueB.value) / valueA.value
      valueX.value = (result).toFixed(2)
    } else {
      valueX.value = "X"
    }
    toggleButtons();
  }

  function toggleButtons() {
    if (valueA.value != 0 || valueB.value != 0 || valueY.value != 0) {
      buttonReset.removeAttribute("disabled");
    } else {
      buttonReset.setAttribute("disabled", "true");
    }

    if (valueA.value != 0 && valueB.value != 0 && valueY.value != 0) {
      buttonReverse.removeAttribute("disabled");
    } else {
      buttonReverse.setAttribute("disabled", "true");
    }
  }

  function reverseValues() {
    const tempValueA = valueA.value
    valueA.value = valueB.value
    valueB.value = tempValueA
    valueY.value = valueX.value
    calculate();
  };

  function resetValues() {
    const emptyValue = "";
    valueA.value = emptyValue;
    valueB.value = emptyValue;
    valueY.value = emptyValue;
    calculate();
  };
});
