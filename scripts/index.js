window.onload = function() {
  let input = document.getElementById("phoneNumber");
  let errorSpan = document.getElementById("error");
  let formattedNumber = document.getElementById("formattedNumber");
  const PHONE_REGEX = /^([+]?1[\s]?)?[(]?[2-9]{1}[0-9]{2}?[)]?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}|[2-9]{1}[0-9]{2}?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}|(1)?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}/
  const TO_REPLACE = /[.,\/#!$%\^&\*;:{}\+=\-_\s`~()]/g;let filter = [];

  //adding keycodes to filter - numeric keys/numpad
  const keypadZero = 48;
  const numpadZero = 96;

  for(let i = 0; i <= 9; i++){
    filter.push(i + keypadZero);
    filter.push(i + numpadZero);
  }

  filter.push(8);     //backspace
  filter.push(9);     //tab
  filter.push(46);    //delete
  filter.push(37);    //left arrow
  filter.push(187);   //+
  filter.push(39);    //right arrow
  filter.push(32);    //space
  filter.push(189);   //-
  filter.push(190);   //.
  filter.push(48);    //)
  filter.push(57);    //(

    // check if format is valid
    function validateNumber(number){
      return PHONE_REGEX.test(number);
    }

    // clean up punctuation and 1
    function formatNumber(number){
      let num = number.replace(TO_REPLACE, "");
      let firstDigit = num.match(/\d/);
      if (firstDigit[0] == "1"){
          return num.substring(1);
      }
      return num;
    }

    function setError(msg){
      errorSpan.innerHTML = msg ? "Please enter a valid NANP number" : "";
      errorSpan.style.visibility = "";
      formattedNumber.innerHTML = "";
    }

  input.addEventListener("keyup", function(event){
    let value = event.currentTarget.value;
    valid = validateNumber(value);
    if (valid){
      let newValue = formatNumber(value);
      if (newValue.length > 10){
        setError(true);
      } else {
        formattedNumber.innerHTML = newValue;
        errorSpan.style.visibility = "hidden";
      }
    } else if (!value) {
      setError();
    } else {
      setError(true);
    }
  });

  input.addEventListener("keydown", function(event){
    // ensure phone number contains only 0-9
    if (filter.indexOf(event.keyCode) < 0){
      event.preventDefault();
      return false;
    }
  });

}
