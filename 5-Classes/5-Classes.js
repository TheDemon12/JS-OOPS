/*

    ES6 Classes

        In ES6/ES2015 JavaScript, there is a new way to create objects and implement inheritance and that's using 'Classes'. But these classes are not like classes that we use in 'Java' or 'C#',
        they are just a syntactical sugar over 'prototypical inheritance'. This new syntax is way cleaner and simpler. Previously we had a constructor function

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype.draw = function() {
                console.log('draw')
            }

        Now let's look at the modern way, we start with the 'class' keyword and add the class name followed by the curly brackets,

            class Circle {

            }

        In this body of class, we can define all the properties and methods, one special method is the 'constructor' method, any properties or methods we define inside this constructor function
        will be inside the circle object. This function is called when we create a new object using the 'new' keyword (during initialization)

            class Circle {

                constructor(radius) {
                    this.radius = radius
                }
            }

        Any methods or properties we add outside the constructor function will be declared in the object's prototype,

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    this.move = function () { console.log('move') }
                }

                draw() {
                    console.log('draw')
                }
            }

        And objects can be created using this class simply like,

            let circle1 = new Circle(1)

        These classes in JavaScript have a type function, this is because these classes are just a syntactical sugar over constructor functions.

            typeof Circle >> function

        Also, classes in ES6 enforce the use of 'new' operator, it throws an error to the user if one forgets the 'new' operator


    Hoisting

        In JavaScript, there are two ways to define a function,

            Function Declaration

                function sayHello() {
                    ...
                }

            Function Expression

                const sayGoodBye() = function() {
                    ...
                }

        The main difference between these two function definition is that 'function declarations' are 'hoisted' whereas 'function expressions' are not.

        Hoisting means that during execution all the functions defined using 'function declaration' syntax are raised to the top automatically. This is useful as in our code we can call the 
        functions before declaring them,

            sayHello()
            
            function sayHello() {
                ...
            }

        In contrast functions defined using 'function expressions' are not hoisted. Thus, we can't call these functions before declaring them like' function declarations'

            sayGoodBye()

            const sayGoodBye() = function() {
                ...
            }

        This will thus result in an error saying, sayGoodBye is nor defined. Function expressions are declared just like variables and constants which are not hoisted and thus we get the same 
        error.
        

        Now for Classes, we have two ways to define them as well

            Class Declaration

                class Circle {

                }

            Class Expression

                const circle = class {

                }

        However in case of classes, none of them are hoisted and thus we can't use these before declaration. Thus, both of them are essentially same and 'Class Declaration' is usually preferred.
 

    Static Methods

        In Classes, we have two types of methods, 
        
            Instance Methods

                These methods are available on the instance of the class (which are objects) like,

                    const circle1 = new Circle(1)
                    circle1.draw()
                
                The 'draw' method is an 'Instance Method', as it is available on the 'circle1' object.
                
            Static Methods

                These methods are available on the Class itself,

                    Circle.parse()

                This 'parse' method is called a static method and can be called by directly calling with the class. These methods are often used to create utility functions that are not specific
                to the class objects.

        Static Methods can be defined using the static keyword before the method name. Let's say 'parse' is a static method that takes a valid JSON object and return a new Circle object by parsing 
        it.

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    this.move = function () { console.log('move') }
                }

                draw() {
                    console.log('draw')
                }

                static parse(str) {

                    const { radius } = JSON.parse(str)
                    return new Circle(radius)

                }
            }

        Now, we can directly use the parse method on Circle class and provide a valid JSON object containing the radius property to it and then it will return a Circle object.

            const circle2 = Circle.parse('{"radius" : 1}')


        Libraries like 'Math' in JavaScript also uses static methods like abs, pow, exp, etc which can be used like

           console.log(Math.pow(2,3))
        
        which gives 8

*/
