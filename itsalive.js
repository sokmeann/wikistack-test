var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('Testing suite capabilities', function () {
  it('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  });
});

describe('Testing async function', function(){
  it('confirms setTimeout\'s timer accuracy', function (done) {
    var start = new Date();
    setTimeout(function () {
      var duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });
});

describe('Number of times a function in forEach is called', function(){
  it('The function passed is only called once per each element', function(){
    var randomArr = [0,1,2,3,4,5];
    var testFn = function(a){
      console.log(a);
    };
    testFn = chai.spy(testFn);
    randomArr.forEach(testFn);
    expect(testFn).to.have.been.called.exactly(randomArr.length);
  });
});
