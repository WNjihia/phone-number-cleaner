let assert = chai.assert;


describe('Unit Tests', function(){
  it('successfully runs when punctuation is used', function(){
    assert.equal(validateNumber("+1 (613)-995-0253"), true);
  });

  it('should indicate failure when letters are included', function(){
    assert.equal(validateNumber("a34 745 8765"), false);
  });

  //NANP format (NXX-NXX-XXXX)
  it('should indicate failure when N is not between 2 and 9', function(){
    assert.equal(validateNumber("123 123 6754"), false);
  });

  it('successfully runs when country code included', function(){
    assert.equal(validateNumber("1 613 995 0253"), true);
  });

  it('successfully should format punctuation on valid numbers', function(){
    let result = formatNumber("613.995.0253");
    assert.equal(result, "6139950253");
  });

});


describe('Integration Test', function(){
  it('should display correctly formatted number', function(){

  });

  // excess digits - more than 10 digits excluding country code
  // it('should indicate failure when number has excess digits', function(){
  //   assert.equal(validateNumber("613 995 995 0253"), false);
  // });
});
