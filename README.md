# luhn_modulo_assignment

I chose to approach this task with JavaScript and HTML. The reason being that JavaScript can be used as either functional
or as a Object Oriented and HTML provided a quick "client side" and didn't need extensive programming.

The first problem I faced was the algorithm I was supposed to implement into the code. Before this assignment I had never heard of
Luhns modulo 10, so I needed help from google and someone had infact made a tutorial on how to implement luhns modulo 10
on JavaScript which I desided to use because figuring out how to implement the algorithm on my own would have taken too long.

The second problem I faced was the class that was supposed to transform the short code format (looks like this: 123456-785)
into the machine readable format (looks like this: 12345600000785). I solved this problem by removing the "-" character and then
splitting the string into an array, after which I used a for loop to splice in enough zeros until there were 13 numbers in total in the
full code. I used the number 13 because the final number which is the check number is added later in the program into to the machine
readable code. After this I joined the array back into string format because of presentation in the client side. Part of this problem 
was also the fact that two of the banks used seven numbers in the first part of the machine readable code
instead of six which the rest of the banks used but this was a relative easy to solve using a if statement checking if the first number
of the code corresponded with the parameters in the if statement and then used the correct for loop to splice in zeros.

The third problem were the identifying numbers for the banks. There were single digit identifiers and two digit identifiers.
This problem I solved by using a switch case statement for the sake of readablity, the class receives the same number that was input
into the input field and then splits and slices it so that only the first two numbers remain of the original code. This is then used to
check if the number matches any of the cases and if not it produces a message saying the bank identifier was incorrect. The bank identifiers which used two numbers instead of one have their own switch case statement inside the main switch case statement. This is because in the main switch case statement we only need to check the first number and if that number is "3" then and only then does the
program go through the switch case that determines which of the two digit banks is in question.

I think that this program could be improved by using a some type of loop instead of the switch case that I ended up using. Also the if
statement I used in adding the zeros could probably have a different solution. Also I had to compromise in the object oriented part quite
a lot since I have been doing mostly functional programming and these compromises can be seen in the code as pure functions. This just means I need more practise in the object oriented side of programming.

Feedback is appreciated.
