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
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('defined URL', function () { //use a for...of loop to loop through each feed and check that it has URL
             for(let feed of allFeeds) {
                 expect(feed.url).toBeDefined(); //checks that URL defined in each object inside array
                 expect(feed.url.length).not.toBe(0); //checks that URL is not empty
             } //similar syntax as above test that checks allFeeds array in app.js
         });

         it('defined name', function () { //same syntax as above test but instead of url property, replace with name property
             for(let feed of allFeeds) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             }
         });
    });

    describe('The Menu', function() { //second test suite tests that menu is hiddne by default and changes upon click event handler 
        const body = document.querySelector('body'); //store body div in variable, place in outer scope so it's accessible by all cb functions

        it('hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true); //checks that body contains a classList 'menu-hidden' class in html
        }); //no period in front of 'menu-hidden' since not using querySelector

        it('changes visibility', function() {
            const menu = document.querySelector('.menu-icon-link'); //this is the class that the click event is called on
            
            menu.click(); //triggers event handler without actually clicking on menu, menu will now be showing as soon as we run code
            expect(body.classList.contains('menu-hidden')).toBe(false); //upon click, the classList 'menu-hidden' should now be changed to false 

            menu.click(); //triggers event handler again and hides menu
            expect(body.classList.contains('menu-hidden')).toBe(true); //once menu hidden, 'menu-hidden' should be changed to true again 
        });
    });

    describe('Initial Entries', function() { //ensures loadFeed function called and completes function
        beforeEach(function(done) { //use 'done' to inform test that beforeEach function has finished running 
            loadFeed(0, done); // this is async function, call loadFeed for first feed item referenced by index, remember in app.js loadFeed takes in 2 parameters (id, cb)
        }); 
        
        it('contains at least single entry', function() {
            const entry = document.querySelectorAll('.feed .entry')
            expect(entry.length > 0).toBe(true); // return lengh of entry and ensure at least one .entry element is within the .feed container
        });
    });
    
    describe('New Feed Selection', function() { //tests that content changes when new feed is loaded
        const entry = document.querySelectorAll('.feed .entry') //store parent feed and its child .entry nodes in variable
        const firstLoadedFeed = []; // will store entries in array when loadFeed(0); runs
        const secondLoadedFeed = []; // will store entries in array when loadFeed(1); runs

        beforeEach(function(done) { 
            loadFeed(0); //will need to call loadFeed twice to compare them and determine if content changed 
            Array.from(entry).forEach(function(singleFeed){ //use Array.from to convert NodeList into array and then use forEach to loop through each item
                console.log(firstLoadedFeed.push(singleFeed.innerText)); //each  item will be pushed into the firstLoadedFeed array w/the innerText
            });
            loadFeed(1, done); //remember in app.js loadFeed takes in 2 parameters (id, cb), can call 'done' only once so do it in last loadFeed() call 
            Array.from(entry).forEach(function(singleFeed){ //use Array.from to convert NodeList into array and then use forEach to loop through each item
                console.log(secondLoadedFeed.push(singleFeed.innerText)); //each  item will be pushed into the secondLoadedFeed array w/the innerText
            });
        });

        it('content changes', function() {
            expect(firstLoadedFeed === secondLoadedFeed).toBe(false); //compares the two arrays and ensures they are different 
        });
    });

});
