/*

    Object Literals

        An Object in JavaScript is a collection of key-value pairs. One way to define an object is to use 'Object Literal Syntax', that is

            const circle = {};
        
        Inside these braces, we can add different key value pairs, the value of keys can be anything, Number, String, another Object, or even 
        an function

            const circle = {
                radius: 5,
                location: {
                    x: 0,
                    y: 0,
                },
                draw: () => console.log('draw'),
            };

        We refer these functions inside the Object as a 'Methods' and the rest members of the object as 'Properties'. We can access these members
        using the 'Dot Notation'

            circle.radius;
            circle.location;

        and we can call the draw function using,

            circle.draw();


    Factories

        Suppose we want to create another circle object of name circle2.

            const circle2 = {
                radius: 2,
                location: {
                    x: 0,
                    y: 0,
                },
                draw: () => console.log('draw'),
            };
        
        With the current implementation, we can see that we have replicated our draw method in two different places, which means if ever there is a
        bug in this method, we need to fix it in multiple places. Thus Object Literal Syntax is not a good way of creating objects if these objects
        have atleast one method. The solution is to use a 'Factory' or a 'Constructor' function

        We can declare a function that takes the radius and location and returns a object of above type,

            const createCircle = (radius, xCord, yCord) => ({ 
                radius,
                location: {
                    x: xCord,
                    y: yCord,
                },
                draw: () => console.log('draw')
            })
        
        This is what we call a 'Factory Function'. We can simply call a function to create a new circle

            const circle = createCircle(1, 2, 0);


    Constructors 
        
        Another way of creating an object is a 'Constructor Function'. While defining a Constructor function, we follow a a different naming 
        convention. We follow 'Pascal Case', that is we keep first letter of every word as capital. for eg, PascalCase. We use the 'this' 
        keyword along with the 'new' keyword for the constructor functions.

        Note: We cannot use the arrow functions to define the constructor functions as they have there own reference to 'this', and the 'new' 
        keyword won't be able to bind the object to it

            const CreateCircle = function       (radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

        'this' initially points to the global object. We can create a new circle object using the 'new' keyword

            const circle = new CreateCircle(1, 2, 0);

        The 'new' keyword does three things, first it creates an empty object ( {} ), second it binds 'this' of the constructor function to this 
        object and third, it returns this object at the end. Thus we don't explicitly need to return 'this' in the constructor function.


    Constructor Property

        Every object in JavaScript has a property called 'constructor' and that references to the function that was used to construct or create that
        object. Let's declare a Constructor function and create an object using it,

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

            const circle = new CreateCircle(1, 2, 0);

        Now if we log circle.constructor, we can see that it refers to the 'CreateCircle' Constructor function.
        
            [Function: CreateCircle]
            
        Now, if we use the Factory Function and create an object using it, 

            const createCircle = (radius, xCord, yCord) => ({ 
                radius,
                location: {
                    x: xCord,
                    y: yCord,
                },
                draw: () => console.log('draw')
            })

            const circle = createCircle(0,1,1)
    
        Now if we log circle.constructor, we can see that it refers to a function named 'Object' with Pascal Case, that means it is a 'Constructor' function.

            [Function: Object]

        This is a built-in Constructor function in JavaScript. When we create an object using the Object Literal Syntax, the Object Constructor Function is 
        called internally, something like this

            const x = new Object();

        There are few other built-in Constructors like String(), Boolean(), Number(), but using the literals is way simpler and cleaner than using these 
        constructors

        
    Functions are Objects

        In JavaScript, every function is an 'object'. These functions have various properties and methods just like objects that can be used with the 'Dot Notation'.
        These include properties like 'arguments', 'caller', 'length', 'name', 'prototype' and methods like 'call', 'bind', 'apply', 'toString'. For eg, we have 
        a function 

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

        CreateCircle.name gives the name of the function,
        
        CreateCircle.length returns the number of arguments and so on.

        CreateCircle.call() is a method to call the function, with 'this' argument. It takes an empty object as first argument which the 'this' will be pointing to, and
        the rest arguments are the arguments that are needed for the function

            CreateCircle.call({}, 1, 0, 0)

        This is essentially same as 

            new CreateCircle(1, 0, 0)

        CreateCircle.apply() is same as call method but it takes the function arguments in an array. This is useful if we have an array already somewhere in the code.

            CreateCircle.apply({}, [1, 0, 0])


    Value vs Reference Types

        In JavaScript, we have two categories of data types, Value Types and Reference Types.
            
            Value Types (also called Primitives) includes data types such as 'Number', 'String', 'Boolean', 'Symbol' as well as 'undefined' and 'null'.
            
            Reference Types includes data types such as 'Objects', 'Functions' and 'Arrays'. Since 'Functions' and 'Arrays' are also 'Objects', thus Reference Types are 
            Objects
        
        Primitives and Reference types behave differently. For eg, if we have a variable x = 3, and we copy x to y

            let x = 3;
            y = x;
            x++;

        Now if we display these variables in the console, we can see that 'y' has a value of 3 and 'x' has a value of 4. This means these variables are independent of each
        other and the other won't get affected if we change one. Now if we take Reference Type,

            let x = {value: 3},
            y = x;
            x.value++;

        Now if we display the value of both these variables on the console, we will see that value property of both these are changed to 4. This is because Objects in Javascript
        are passed as a reference, when we create an object, it is created somewhere in memory and its address is stored in the variable. When we copy this object, the same 
        address is given to the other variable. Now both of these variables are pointing to the same object somewhere in the memory, and if we change one, both of them are
        updated.

        Thus, 'Primitives' are copied by their value and 'Reference Types' (or Objects) are copied by their reference.


    Adding and Removing Properties

        The Objects created in JavaScript are dynamic in nature. This means after creating an object (whether using let or const), properties can be added or removed from it.
        Since we don't have classes in JavaScript, we can create a new property easily using 'dot notation'.

            circle.borderColor: 'black'

        We can also use the 'bracket notation' to reference a property.

            circle['borderColor'] = 'black'

        We usually use the 'dot notation' as it is simpler, but the bracket notation is useful is certain scenarios for eg, when the property name is passed dynamically, for eg
        
            const property = 'borderColor';
            circle[property] = 'black'

        The 'bracket notation' can be also used when the name of the property isn't a valid identifier, for eg,

            circle['border-color'] = 'black'
        
        Or if it is capital or has spaces or any special characters

            circle['BORDER COLOR'] = 'black'

        We can also delete the properties from an object using the 'delete' keyword

            delete circle.borderColor

        Or using the 'bracket notation'

            delete circle['borderColor']

        
    Enumerating Properties

        Sometimes we need to iterate over the properties of an object, for that we can use the 'for-in' loop 

            const circle = new CreateCircle(0, 1, 1);

            for( let key in circle ) {
                console.log(key)
            }
        
        So, in every iteration, key will hold the name of one key in the object, thus we get output as

            radius
            location
            draw

        If we want to get values of these keys, we can use the bracket notation like,

            for( let key in circle ) {
                console.log(key, circle[key])
            }
        
        This will give the name of the key as well as its value on the console

            radius 0
            location { x: 1, y: 1 }
            draw [Function: draw]
        
        This lists all members (properties and methods) of the object, if we want only the properties, we can use the 'typeof' operator on the value of key
        
            for (let key in circle) {
                if (typeof circle[key] !== 'function')
                    console.log(key, circle[key]);
            }
        
        This will give only the properties and their values,

            radius 0
            location { x: 1, y: 1 }

        There is another approach to get all the keys from an object using Object.keys(), 
        
            let keys = Object.keys(circle)
            console.log(keys)
        
        this returns an array containing all the keys from the object

            [ 'radius', 'location', 'draw' ]

            
        Sometimes if we want to know if the object has certain property, for that we use the 'in' operator
        
            let isPresent = 'radius' in circle
            console.log(isPresent)

        This returns a Boolean, which can be used in if conditions.
            
        
    Abstraction

        Let's say we have a constructor function CreateCircle with a method called calculateLocation, which is called internally when the draw function is called.

            const CreateCircle = function (radius, xCord, yCord) {
                this.radius = radius;
                this.calculateLocation = () => {...};
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => {
                    this.calculateLocation();
                    console.log('draw');
                };
            };

        So now, when we create a circle object using the above constructor function, we can see that this shows the calculateLocation method as well 

            const circle = new CreateCircle(1, 0, 0)

        We don't want this function to be accessed by the client as it is only used as a helper function in the draw method. We don't want this function to be called by the
        client as it can mess up with the object, it might put the object in a bad state. 
        
        In OOP, we have a concept called 'Abstraction', which means we should hide all the details and only show the essentials. In this eg, we should hide the 'calculateLocation'
        method from the client and only expose the 'radius', 'location' and 'draw' method to the client

        
    Private Properties and Methods

        In order to make a method or a property private we simply don't use the this keyword and make the function or the variable local to the constructor function, and call it
        without using the this keyword. This makes this function inside the scope of the constructor function only and it won't be accessed outside. Similar thing can be used to 
        make the properties private as well, for eg

            const CreateCircle = function (radius, xCord, yCord) {
                this.radius = radius;

                >> const calculateLocation = () => {...};

                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => {

                    >> calculateLocation();
                    
                    console.log('draw');
                };
            };

        Now if we create a circle object using this constructor function, the calculateLocation method won't be available to the user.

        In factory functions, in order to make properties and method private, we can declare these functions and properties inside these factory functions but should not return them

            const createCircle = (radius, xCord, yCord) => {

                const calculateLocation = () => {...};

                return {                
                    radius,
                    location: {
                        x: xCord,
                        y: yCord,
                    },
                    draw: () => {
                        calculateLocation();
                        console.log('draw');
                    },
                }
            }


    Getters and Setters

        Let's say we have a private property called 'defaultLocation' in our Constructor Function 

            const CreateCircle = function (radius, xCord, yCord) {
                this.radius = radius;
                
                let defaultLocation = {
                    x: 0,
                    y: 0
                }

                this.location = {
                    x: xCord,
                    y: yCord,
                };

                this.draw = () => console.log('draw');        
            };

        Since this is a private property, we won't be able to access this property outside using 'Circle.defaultLocation'. So if we want to get this property, we can use a function like

            this.getDefaultLocation = () => defaultLocation

        and call this public method using,

            const loc = circle.getDefaultLocation()
            console.log(loc)

        Getters and Setters can be used to return these value without using a function and in a easier, understandable way like

            const loc = circle.defaultLocation
            console.log(loc)
        
        To create getter, we use a method on the Object called defineProperty(). The first argument is the object we want to add a new property to, that is 'this', second argument is the
        name of the property and the third argument is a object with a key-value pairs with key named 'get', and value being a function which is called when we get the defaultLocation

            const CreateCircle = function (radius, xCord, yCord) {
                this.radius = radius;
                
                let defaultLocation = {
                    x: 0,
                    y: 0
                }

                this.location = {
                    x: xCord,
                    y: yCord,
                };

                this.draw = () => console.log('draw');     
                
                Object.defineProperty(this, 'defaultLocation', {
                    get: () => defaultLocation
                })
            };
        
        Now we can simply use the dot notation to get the defaultLocation, which is a read-only property.

            const loc = circle.defaultLocation
            console.log(loc)

        We can also use a setter to change a private property by simply adding another key-value pair with key being 'set' this time in the third argument. This is helpful when we need to 
        perform validation on the property like
            
            const CreateCircle = function (radius, xCord, yCord) {
                this.radius = radius;

                let defaultLocation = {
                    x: 0,
                    y: 0,
                };

                this.location = {
                    x: xCord,
                    y: yCord,
                };

                this.draw = () => console.log('draw');

                Object.defineProperty(this, 'defaultLocation', {
                    get: () => defaultLocation,
                    set: (value) => {
                        if (!value.x || !value.y) throw new Error('Invalid Location Object');

                        defaultLocation = value;
                    },
                });
            };
            
        We can now set this using 

            circle.defaultLocation = {x: 1, y: 1}

        and we will get an error we don't send a valid object. We can also use 'Object.defineProperties' to define multiple getters at once.
        


*/
