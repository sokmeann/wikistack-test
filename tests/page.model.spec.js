var expect = require('chai').expect;
var chai = require('chai');
var models = require('../models');
var Page = models.Page;
var User = models.User;

describe('Page model', function () {

  describe('Virtuals', function () {
    describe('route', function () {
      // beforeEach(function(done){
      //   Page.sync({force:true});
      //   .then(function(){
      //     done();
      //   })
      //   .catch(done);
      // });

      beforeEach(function(done){
        var page1 = Page.create({
          title: 'Hello Today is Tuesday',
          content: 'This is a test!',
          status: 'open',
          tags: 'test'
        }).then(function(){
          done();
        }).catch(done);
      //   let page2 = Page.create({
      //     title: 'Test 2++',
      //     urlTitle: 'Test_2',
      //     content: 'This is a test!',
      //     status: 'Open',
      //     tags: 'test'
      //   });
      //   Promise.all([page1, page2]);
      });

      it('returns the url_name prepended by "/wiki/"', function(){
        // page1.title = 'Hello Today is Tuesday';
        // page1.urlTitle = 'Hello Today is Tuesday';
        expect(page1.route).to.be.equal('/wiki/Hello_Today_is_Tuesday');
      });

    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
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
