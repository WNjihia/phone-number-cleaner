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
