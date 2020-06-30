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
        
        which gives 8.

    
    'this' Keyword

        If we have a method which uses the 'this' keyword, then the 'method call' will point the 'this' keyword to this object,

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype.draw = function() {
                console.log('draw', this)
            }
        
            const circle1 = new CreateCircle(1)
            circle1.draw()

        This will give output as 

            draw CreateCircle { radius: 1 }

        Thus, 'this' points the to 'circle1' object. However if we copy the reference of this method to another variable,

            let draw2 = circle1.draw
            draw2()

        We will see that 'this' now points to the 'global' or the 'window' object rather than the 'circle1' object.

            draw Object [global] {

                global: [Circular],
                clearInterval: [Function: clearInterval],
                clearTimeout: [Function: clearTimeout],
                setInterval: [Function: setInterval],
                setTimeout: [Function: setTimeout] {
                    [Symbol(nodejs.util.promisify.custom)]: [Function]
                },
                queueMicrotask: [Function: queueMicrotask],
                clearImmediate: [Function: clearImmediate],
                setImmediate: [Function: setImmediate] {
                    [Symbol(nodejs.util.promisify.custom)]: [Function]
                }
            }

        This is because we performed a 'function call' rather than a 'method call'. We called this function as a 'standalone function' in the memory and thus it didn't point to any object.

        In JavaScript, we have a mode called 'strict mode'. On enabling this mode, JavaScript Engine will be more sensitive, thus it will perform more error checking and turn them into exceptions.
        We can enable this in any JavaScript file by adding this string to the top (along with quotes),

            "use strict"

        The 'strict mode' also changes the behaviour of the 'this' keyword. Since we should always avoid changing the 'global' or the 'window' object, whenever the 'this' keyword points to the 
        'global' or the 'window' object, it returns 'undefined' to prevent accidental updates to these objects.

        In ES6 Classes, inside their code block, strict mode is enabled by default, so it will return 'undefined' if we accidentally modify the global or the window object. We don't need to use the
        strict mode explicitly.


    Private Members using Symbols

        There are two ways to add private members in ES6 Classes i.e. using,

            ES6 Symbols,

            WeakMaps

        We follow a convention of prefixing the private properties with an 'underscore'. Like '_radius'

        Symbols are new primitives that were added in ES6, they return a unique identifier everytime they are called,

            let a = Symbol()

        Note, these are not constructor functions and shouldn't be called with 'new' keyword. These identifiers are not visible to user if we log it on console

            console.log(a)
        
        This will return 'Symbol()'. These Symbols are unique and we can confirm this by,

            console.log(Symbol() === Symbol());
        
        which will return 'false'. Since these return an unique identifier, we can use these identifiers as member names and it will just show up on console as Symbol() making it somewhat private,

            const _defaultLocation = Symbol()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    this[_defaultLocation] = { x: 1, y: 1}
                }

                draw() {
                    console.log('draw')
                }
            }

            let circle1 = new Circle(1);
        
        Now the 'circle1' object won't show any 'defaultLocation' property when using 'dot notation', thus we can't access it. However on the console it will show up with a key name of 'Symbol()'
        but it won't be writable.

            {
                radius: 1
                Symbol(): {x: 1, y: 1}
                __proto__: Object
            }

        There is still a workaround to get the value, by using Object.getOwnPropertySymbols() which returns an array of symbols, which we can use as a key name,

            const key = Object.getOwnPropertySymbols(circle1)[0]
            console.log(circle1[key])

        which gives the object, but this is not used commonly,

            {x: 1, y: 1}
        
        Similarly we can also define methods with symbol identifiers as their names, there is a new feature called 'Computed Property Names', in which we can pass anb expression inside the square 
        brackets and JavaScript Engine will evaluate it and use it as the method name.

            const _defaultLocation = Symbol()
            const _changeLocation = Symbol()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    this[_defaultLocation] = { x: 1, y: 1}
                }

                draw() {
                    console.log('draw')
                }

                [_changeLocation]() {
                    ...
                }
            }

            let circle1 = new Circle(1);
            
    
    Private Members using WeakMap

        A 'WeakMap' is essentially a dictionary where 'keys' are 'objects' and 'values' can be anything. So we can define a constant called '_defaultLocation' and set it to a new WeakMap

            const _defaultLocation = new WeakMap()

        these WeakMaps have methods like set, get to work with the WeakMaps. The set method takes two arguments that is the key and value, since the key has to be object, we can give 'this' as 
        the key.

            const _defaultLocation = new WeakMap()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    console.log('draw')
                }
            }

        With this, we can now get the object using the get method and giving the key as argument, which is 'this' in this case.

            const _defaultLocation = new WeakMap()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                }
            }           
            
            let circle1 = new Circle(1)

        Thus we can define such properties that are not accessible on the objects created with classes. Similarly we can also define private methods using WeakMaps,

            const _defaultLocation = new WeakMap()
            const _changeLocation = new WeakMap()
            
            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                    _changeLocation.set(this, function() {
                        console.log('changed', this)
                    })
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                }

            }  

        and get it anywhere using,

            const _defaultLocation = new WeakMap()
            const _changeLocation = new WeakMap()
            
            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                    _changeLocation.set(this, function() {
                        console.log('changed', this)
                    })
                }

                draw() {
                    _changeLocation.get(this)()
                    let loc =  _defaultLocation.get(this)
                }

            } 

        However, there is an issue with this, we execute this private method, we will see that 'this' inside this function is 'undefined'. To solve this, we can use the arrow functions which 
        don't have their own 'this', they take the 'this' of the function in which they are enclosed in.

            const _defaultLocation = new WeakMap()
            const _changeLocation = new WeakMap()
            
            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                    _changeLocation.set(this, () => {
                        console.log('changed', this)
                    })
                }

                draw() {
                    _changeLocation.get(this)()
                    let loc =  _defaultLocation.get(this)
                }

            }             

        We can also use one WeakMap and pass all the private properties and method in it and later use with the dot notation,

            const _props = new WeakMap()

                    class Circle {

                constructor(radius) {
                    this.radius = radius
                    _props.set(this, {
                        defaultLocation: { x: 1, y: 1},
                        changeLocation: () => {console.log('changed', this)}
                    })

                }

                draw() {
                    _props.get(this)._changeLocation()
                    let loc =  _props.get(this).defaultLocation
                }

            }   


    Getters and Setters

        Earlier to define getters or setters for the private properties we used,

            Object.defineProperty(this, 'radius', { 
                get: function() {
                    ...
                }
            })

        With ES6 Classes, we can use the 'get' or 'set' keyword to define getters and setters,

            const _radius = new WeakMap()    

            class Circle {
                constructor(radius) {
                    _radius.set(this, radius)
                }

                draw() {
                    console.log('draw')
                }

                get radius() {
                    return _radius.get(this)
                }

            }   

            let circle1 = new Circle(1)
            
        And now we can simply call the circle1.radius to get the radius.

            circle1.radius >> 1

        Now, to define a setter, we can simply use the 'set' keyword,

            const _radius = new WeakMap()    

            class Circle {
                constructor(radius) {
                    _radius.set(this, radius)
                }

                draw() {
                    console.log('draw')
                }

                get radius() {
                    return _radius.get(this)
                }

                set radius(val) {
                    _radius.set(this, val)
                }

            }

        and can be used as,
            
            circle1.radius = 2

        Note that these setters are mostly used for applying validation logic to the property like,
               
            set radius(val) {
                if(val < 0) throw new Error('invalid radius')
                _radius.set(this, val)
            }

        Now if we add a negative integer, we will see an exception,

            circle1.radius = -2 >> Uncaught Error: invalid radius


    Inheritance

        Let's say we have a class 'Shape' with a method 'move',

            class Shape {
                move() {
                    console.log('move')
                }
            }

        Now for the 'Circle' class to inherit from the 'Shape' class, we just have to use the 'extends' keyword following with the name of parent class,

            class Circle extends Shape {
                constructor(radius) {
                    this.radius = radius
                }
                draw() {
                    console.log('draw')
                }
            }

            let circle1 = new Circle(1)

        and we can now simply access the 'draw' and 'move' methods.

            circle1.move() >> move

        Now, let's imagine the 'Shape' class has a constructor that takes the 'color',

            class Shape {
                constructor(color) {
                    this.color = color
                }
                move() {
                    console.log('move')
                }
            }

        However we need to call the constructor of the 'Shape' class inside the 'Circle' constructor to set the color, we can do this by calling the 'super' function and giving it the 
        arguments that the constructor function of 'Shape' needs,

            class Circle extends Shape {
                constructor(radius, color) {
                    super(color);
                    this.radius = radius
                }
                draw() {
                    console.log('draw')
                }
            }
            
            let circle1 = new Circle(1, 'red')

    
    Method Overriding

        Method overriding is a technique where we want to change the the method implementation in the child class or object that was earlier defined in the parent class or object, let's say
        we have a 'Shape' class with a move 'method',

            class Shape {
                move() {
                    console.log('move')
                }
            }

        Now we want to override this move method in the 'Circle' class which extends this 'Shape' object,

            class Circle extends Shape {
                move() {
                    console.log('move circle')
                }
            }

            let circle1 = new Circle()

        Now, when we call the 'move' method on the 'circle1' object, we will see the newer implementation,

            circle1.move() >> move circle

        If we also want to access the implementation of the move method that was defined in the parent class, we can do that by using 'super.move()',

            class Circle extends Shape {
                move() {
                    super.move()
                    console.log('move circle')
                }
            }
            
            let circle1 = new Circle()

        And now when we call the 'move' method on the 'circle1' object using 'circle1.move()', we can see both of the implementations,

            move
            move circle


*/

// class Circle {
// 	constructor(radius) {
// 		let a = 1;
// 		this.radius = radius;
// 		this.move = function () {
// 			console.log('move');
// 		};
// 	}

// 	draw() {
// 		console.log('draw', a);
// 	}
// }

//
// circle1.draw();

// const _defaultLocation = Symbol();

// class Circle {
// 	constructor(radius) {
// 		this.radius = radius;
// 		this[_defaultLocation] = { x: 1, y: 1 };
// 	}

// 	draw() {
// 		console.log('draw');
// 	}
// }

// let circle1 = new Circle(1);

// console.log(circle1[_defaultLocation]);

// const _defaultLocation = new WeakMap();
// const _changeLocation = new WeakMap();

// class Circle {
// 	constructor(radius) {
// 		this.radius = radius;
// 		_defaultLocation.set(this, { x: 1, y: 1 });
// 	}

// 	draw() {
// 		let loc = _defaultLocation.get(this);
// 	}
// }

const _radius = new WeakMap();

class Circle {
	constructor(radius) {
		_radius.set(this, radius);
	}

	draw() {
		console.log('draw');
	}

	get radius() {
		return _radius.get(this);
	}
}

let circle1 = new Circle(1);
