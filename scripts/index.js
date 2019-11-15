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
    console.log(value);
    valid = validateNumber(value);
    if (valid){
      formattedNumber.innerHTML = value;
      errorSpan.style.visibility = 'hidden';
    } else {
      errorSpan.innerHTML = "Invalid format";
    }
  })

  // ensure phone number contains only 0-9
  input.addEventListener("keydown", function(event){
    if (filter.indexOf(event.keyCode) < 0){
      event.preventDefault();
      return false;
    }
  })

  // check if format is valid
  function validateNumber(number){
    var phoneRegex = /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;
    return phoneRegex.test(number)
  }

  // function formatNumber(number){
  //   var reg = /
  // }
}
