/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* RSS feed test suite */
    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * you can expect the feed to have a url
         * and the feed to have a name
         */
        it('has a url', function() {
            var feedCount = allFeeds.length;
            for (var i = 0; i < feedCount; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* The menu test */
    describe('The menu', function() {
        var hiddenMenu = $('body').hasClass('menu-hidden');
        var menuIcon = $('.menu-icon-link');
        /* This test checks the menu element is
         * hidden by default.
         */
        it('has a hidden menu by default', function() {
            expect(hiddenMenu).toBe(true);
        });

        /* This test checks the menu changes
         * visibility when the menu icon is clicked.
         * The first expectation monitors a click and then expects the menu-display css to be false
         * The second expection monitors a click and then expects the menu-display to be true
         */
        it('has visibility cloak by click', function() {
            //when clicked, menu-hidden is no longer there
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //when clicked again, menu-hidden class returns
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });
    /* Test Suite called "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test checks when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //beforeEach
        beforeEach(function(done) {
            //thisshould load the first feed?
            //
            loadFeed(0, done);
        });
        //after it's done
        it('has one entry', function(done) {
            entries = $('.feed').find('.entry').length;
            expect(entries).toBeGreaterThan(0);
            //it's not clear if done() should be here up up in loadFeed before each area
            done();
        });
    });
    /* suite "New Feed Selection"*/
    describe('New Feed Selection', function() {
        //they should not equal each other but first let's declare them up here so we can jump in and out
        var firstFeed, nextFeed;
        //Psuedo code
        /* Attempting to check if the loadFeed is loading different content
        * A few ways to do this is to check content like the headlines, the feed cycle itself
        * Let's run two loadFeed functions. The first is using id 0, then assign it to firstFeed
        * I tried using Jquery to select headlines at first but I kept running into some issues
        * so instead I'm just going to run a doc.innerHTML
        * The docs suggests I could use .feed or entry.
        * since I was using entry last time and it wasn't really working. I'm going to use .feed
        * Then let's run another loadFeed using id 1 and assigne secondFeed the same way as the firstFeed
        */

    beforeEach(function(done){
      loadFeed(0, function(){
        //doc pull using query selector???
        firstFeed = document.querySelector('.feed').innerHTML;

        loadFeed(1, function(){
            secondFeed = document.querySelector('.feed').innerHTML;
            done(); //don't forget the done! -.-
        });
      });
    });

    it('has different content loaded', function(done){
      console.log(document.querySelector('.feed').innerHTML);

      expect(firstFeed).not.toBe(secondFeed);
      done();
    });
  });








    });