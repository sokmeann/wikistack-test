var expect = require('chai').expect;
var chai = require('chai');
var models = require('../models');
var Page = models.Page;
var User = models.User;
chai.should();
chai.use(require('chai-things'));

describe('Page model', function () {

  let page1, page3, testTag, page2, page4, error1, error2, error3, hookPage;

    beforeEach(function(done){
        Page.sync({force:true})
        .then(function(){
          done();
        })
        .catch(done);
      });

      beforeEach(function(done){
        page1 = Page.create({
          title: 'Hello Today is Tuesday',
          content: 'This is a test!',
          status: 'open',
          tags: ['test', 'fullstack', 'isAwesome', 'NYC']
        });

        page2 = Page.create({
          title: 'Test 2++',
          urlTitle: 'Test_2',
          content: 'This is a test!',
          status: 'open',
          tags: ['not shared']
        });

        page3 = Page.create({
          title: 'Test3',
          content: 'This is the 3rd test!',
          status: 'open',
          tags: ['test', 'fullstack', 'isCool']
        });

        page4 = Page.create({
          title: 'Test4',
          content: 'This is the 4th test!',
          status: 'open',
          tags: ['isCool', 'almost done', 'this is cray']
        });

        Promise.all([page1, page2, page3, page4])
        .then(function(pageCreated) {
          page1 = pageCreated[0];
          page2 = pageCreated[1];
          page3 = pageCreated[2];
          page4 = pageCreated[3];
          // error1 = pageCreated[4];
          // error2 = pageCreated[5];
          // error3 = pageCreated[6];
          done();
        }).catch(done);

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

      it('gets other pages with any common tags', function(done){
        page3.findSimilar()
        .then(function(pageCreated){
          expect(pageCreated).to.have.lengthOf(2);
          done();
        }).catch(done);
      });

      it('does not get other pages without any common tags', function(done){
        page2.findSimilar()
        .then(function(pageCreated){
          expect(pageCreated).to.have.lengthOf(0);
          done();
        }).catch(done);
      });

    });

  });

  describe('Validations', function () {

        error1 = Page.build({
          title: null,
          content: 'This is the first error, no title',
          status: 'open',
          tags: ['error1']
        });

        error2 = Page.build({
          title: 'Error2',
          urlTitle: 'Error2',
          content: null,
          status: 'open',
          tags: ['error2']
        });

        error3 = Page.build({
          title: 'Error3',
          urlTitle: 'Error3',
          content: 'This is the third error, invalid status',
          status: 'hello',
          tags: ['error3']
        });

    it('errors without title', function(done){
      error1.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal('title');
        done();
      }).catch(done);

    });
    it('errors without content', function(done){
      error2.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal('content');
        done();
      }).catch(done);
    });
    it('errors given an invalid status');
       // , function(done){
      // error3.validate()
      // .then(function(err){
      //   expect(err).to.exist;
      //   expect(err.errors).to.exist;
      //   expect(err.errors[0].path).to.equal('status');
      //   done();
      // }).catch(done);
    // });
  });

  describe('Hooks', function () {
        hookPage = Page.build({
          title: 'Hook Page',
          content: 'This is the hookPage',
          status: 'open',
          tags: ['hookpage']
        });
    it('it sets urlTitle based on title before validating');
  });

});
