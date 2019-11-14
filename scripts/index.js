window.onload = function() {
  var input = document.getElementById("phoneNumber");
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
  filter.push(39);    //right arrow

  input.addEventListener("keyup", function(event){
    var value = event.currentTarget.value;
  })

  // ensure phone number contains only 0-9
  input.addEventListener("keydown", function(event){
    if (filter.indexOf(event.keyCode) < 0){
      event.preventDefault();
      return false;
    }
  })
}
