# Comicvine Character Search

- A web application using Node.js and Angular.js that allows a user to search for a Comic Character by name using the Comicvine Developer's API 
- A server is implemented with Node.js using the express framework 
- Client side is implemented using Angular.js and Jade.
- IF the search is successful - user will see details (name and description) about the character searched
- IF the search is NOT successful - user will see a message indicating no results found 
- The response from the ComicVine API is an array of character objects. So the first object in the array is returned as the main character searched and other additional characters contain in the array are displayed as similar matches.
- When the user clicks on the character's name, the selected character's name and description will be displayed and replace the area where the main character was displayed.
- A 'details' button is provided to this page (character search page).
- When the user clicks the details button - they are taken to a new page which shows the full details of the character including - name, deck, origin, publisher, powers, friends, and enemies.
- When a user clicks on a friend or enemy in the list - they are taken to the details page about that character
- A 'versus' button is provided for each enemy listed on the character detail page.
- When the user clicks the versus button - they are taken to a new page which shows basic info (name, origin, deck, publisher) and the stats (listed below) between the two characters. Both the character and the enemy have 'details' buttons.
