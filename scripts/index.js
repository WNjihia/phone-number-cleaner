window.onload = function() {
  var input = document.getElementById("phoneNumber");
  var errorSpan = document.getElementById("error");
  var formattedNumber = document.getElementById("formattedNumber");
  var filter = [];

  //adding keycodes to filter - numeric keys/numpad
  const keypadZero = 48;
  const numpadZero = 96;

  for(var i = 0; i <= 9; i++){
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

  input.addEventListener("keyup", function(event){
    var value = event.currentTarget.value;
    valid = validateNumber(value);
    if (valid){
      console.log("before", value);
      var newValue = formatNumber(value);
      console.log("after", value);
      console.log("new value", newValue);
      formattedNumber.innerHTML = newValue;
      errorSpan.style.visibility = "hidden";
    } else {
      errorSpan.innerHTML = "Please enter a valid NANP number";
    }
  })

  // ensure phone number contains only 0-9
  input.addEventListener("keydown", function(event){

  })

  // check if format is valid
  function validateNumber(number){
    var phoneRegex = /^([+]?1[\s]?)?[(]?[2-9]{1}[0-9]{2}?[)]?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}|[2-9]{1}[0-9]{2}?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}|(1)?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[2-9]{1}[0-9]{2}?([\s.-])?[0-9]{4}/
    return phoneRegex.test(number);
  }

  // clean up punctuation and + 1
  function formatNumber(number){
    var toReplace = /[.,\/#!$%\^&\*;:{}\+=\-_\s`~()]/g;
    var num = number.replace(toReplace, "");
    var firstDigit = num.match(/\d/);
    if (firstDigit[0] == "1"){
        // console.log(num);
        return num.substring(1);
    }
    // console.log(num);
    return num;
  }
}
