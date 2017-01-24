var expect = require('chai').expect;
var chai = require('chai');
var models = require('../models');
var Page = models.Page;
var User = models.User;
chai.should();
chai.use(require('chai-things'));

describe('Page model', function () {

  let page1, page2, page, testTag;

    beforeEach(function(done){
        Page.sync({force:true})
        .then(function(){
          done();
        })
        .catch(done);
      });

      beforeEach(function(done){
        Page.create({
          title: 'Hello Today is Tuesday',
          content: 'This is a test!',
          status: 'open',
          tags: ['test', 'fullstack', 'isAwesome', 'NYC']
        }).then(function(pageCreated){
          page1 = pageCreated;
          done();
        }).catch(done);

        Page.create({
          title: 'Test 2++',
          urlTitle: 'Test_2',
          content: 'This is a test!',
          status: 'open',
          tags: ['not shared']
        }).then(function(pageCreated){
          page2 = pageCreated;
          done();
        })
        .catch(done);

        //  Page.create({
        //   title: 'Test3',
        //   content: 'This is the 3rd test!',
        //   status: 'open',
        //   tags: ['test', 'fullstack', 'isCool', 'NYC']
        // }).then(function(pageCreated){
        //   page3 = pageCreated;
        //   done();
        // }).catch(done);
      });

      beforeEach(function(done) {
        Page.findByTag('NYC')
        .then(function(pageCreated) {
          testTag = pageCreated;
          done();
        }).catch(done);
      });

  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        expect(page1.route).to.be.equal('/wiki/Hello_Today_is_Tuesday');
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function() {
        console.log('test', page1.renderedContent);
        expect(page1.renderedContent).to.be.equal('<p>This is a test!</p>\n');
        });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', function() {
        expect(testTag).to.have.lengthOf(1);
      });
      it('does not get pages without the search tag', function(done) {
        Page.findByTag('nonses')
        .then(function(pageCreated) {
          expect(pageCreated).to.have.lengthOf(0);
          done();
        }).catch(done);
      });
    });
  });


  describe('Instance methods', function () {

    describe('findSimilar', function () {
      it('never gets itself', function(done) {
        page1.findSimilar()
        .then(function(pageCreated) {
          expect(pageCreated).to.have.lengthOf(1);
          done();
        }).catch(done);
      });

      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });

  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
