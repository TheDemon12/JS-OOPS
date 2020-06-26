/*

    Inheritance

        Inheritance is one of the core concepts that enables an object to take on the properties and methods of another object. This makes it easy to reuse the code in the
        different parts of our application. For eg, we have a 'circle' object, which has a calculateLocation() method and we also have a 'square' object which also needs this 
        method, we don't want to repeat this implementation, because if we ever want to change its implementation, we will have to change it in multiple locations. That's when 
        'inheritance' comes into the picture. 
        
        There are two types of inheritances, 
        
            >> Classical Inheritance and

            >> Prototypical Inheritance
            

     Prototypical Inheritance

        Since, we don't have classes in JavaScript, we use 'Prototypical Inheritance'. So we can have an object called 'shape' that has calculateLocation() method and then we can 
        simply inherit such common methods from the 'shape' object to the 'square' and 'circle' objects. We refer the 'shape' object as 'Prototype', which means 'parent'. Every object 
        in JavaScript has a prototype ( except only one ), which inherits all the members from its prototype.

        Let's create an object called person,

            let person = {
                name: 'Kartik Bhalla',
                age: 20
            }

        To get the prototype of an object, we can either use its __proto___ property using
        
            person.__proto__
        
        but this is depreciated and we use getPrototypeOf() method of the Object like,

            Object.getPrototypeOf(person)

        we can see its prototype is an object with following properties and methods

            {
                constructor: ƒ Object()
                hasOwnProperty: ƒ hasOwnProperty()
                isPrototypeOf: ƒ isPrototypeOf()
                propertyIsEnumerable: ƒ propertyIsEnumerable()
                toLocaleString: ƒ toLocaleString()
                toString: ƒ toString()
                valueOf: ƒ valueOf()
                __defineGetter__: ƒ __defineGetter__()
                __defineSetter__: ƒ __defineSetter__()
                __lookupGetter__: ƒ __lookupGetter__()
                __lookupSetter__: ƒ __lookupSetter__()
                get __proto__: ƒ __proto__()
                set __proto__: ƒ __proto__()
            }

        let's call this object 'objectBase'. Every object we create in JavaScript directly or indirectly inherits from this 'objectBase'. 'objectBase' is the root object of all objects
        in JavaScript and doesn't have a prototype ( or parent ) as we can see there is no __proto__ property. All the objects created in JavaScript reference to a common prototype 
        in the memory, this means there is only one instance of 'objectBase'.
        
        We have bunch of above methods that are inherited by our 'person' object from this 'objectBase' which we can simply call using

            person.toString()

        When we access a property or a method, JavaScript Engine firsts looks for that property or method in the object itself and if it can't find it, the engine looks for the 
        method/property in the prototype of the object and continues like this all the way upto the root object which is 'objectBase'

        
    Multi-Level Inheritance

        let's take another example, let's create an empty array 

            let myArray = []

        now, when we see the prototype of this array using

            Object.getPrototypeOf(myArray)

        we can see bunch of methods which we might have already used for performing operations on array. Let's call this object as 'arrayBase'. This is the prototype of the array

            {
                concat: ƒ concat()
                constructor: ƒ Array()
                filter: ƒ filter()
                find: ƒ find()
                findIndex: ƒ findIndex()
                indexOf: ƒ indexOf()
                join: ƒ join()
                keys: ƒ keys()
                length: 0
                map: ƒ map()
                pop: ƒ pop()
                push: ƒ push()
                shift: ƒ shift()
                slice: ƒ slice()
                sort: ƒ sort()
                splice: ƒ splice()

                and so on...
                __proto__: Object
            }
        
        'arrayBase' has a prototype property as we can see the __proto__ property, so we can get its prototype by clicking the __proto__ property or by using

            let objectBase = Object.getPrototypeOf(myArray)
            Object.getPrototypeOf(objectBase)

            {
                constructor: ƒ Object()
                hasOwnProperty: ƒ hasOwnProperty()
                isPrototypeOf: ƒ isPrototypeOf()
                propertyIsEnumerable: ƒ propertyIsEnumerable()
                toLocaleString: ƒ toLocaleString()
                toString: ƒ toString()
                valueOf: ƒ valueOf()
                __defineGetter__: ƒ __defineGetter__()
                __defineSetter__: ƒ __defineSetter__()
                __lookupGetter__: ƒ __lookupGetter__()
                __lookupSetter__: ƒ __lookupSetter__()
                get __proto__: ƒ __proto__()
                set __proto__: ƒ __proto__()
            }

        We can see that the 'arrayBase' has a prototype of 'objectBase'. This is called 'Multi-Level Inheritance' as in this case, 'myArray' inherits from 'arrayBase' which in turn 
        inherits from 'objectBase'

        'Objects created with same constructor will have a same prototype'. Since 'myArray' is created using a built-in constructor function that is used to create arrays ( new Array() ), 
        it has an 'arrayBase' object prior to the 'objectBase'. 
        
        Similarly for the 'CreateCircle' constructor function, any object creates using this constructor function will have a prototype which in turn inherits from the 'objectBase'

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

            const circle1 = new CreateCircle(1, 0, 0)
            console.log(circle1)

        When we log it onto the console, we can see this has a __proto__ property and we can check it using

            Object.getPrototypeOf(circle1)

        and we can see this is an object with a constructor property that is referring to the CreateCircle constructor. Let's call this object as 'circleBase'

            {
                constructor: ƒ (radius, xCord, yCord)
                __proto__: Object
            }

        We can see that this object too has a __proto__ property which is none other than our 'objectBase'. Since circle1 was created using CreateCircle constructor, it inherits from the 
        'circleBase' which in turn inherits from the 'objectBase'

    
    Property Descriptors

        since we have our person object that we created above. 

            let person = {
                name: 'Kartik Bhalla',
                age: 20
            }

        Since we know that this object inherits from 'objectBase', we can use methods like toString which are defined in objectBase directly

            person.toString()

        But if we try to iterate over the properties and methods of this person object, we won't find the methods and properties that are defined in the 'objectBase'.

            for (let key in person)
                console.log(key);

        We will get output as

            name
            age

        We can also use Object.keys() to verify the above statement

            console.log(Object.keys(person));

        and we will get an array containing the keys of person object only

            [ 'name', 'age' ]

        The reason behind these properties and methods of objectBase not been shows is because these 'methods and properties have attributes attached to them'. These attributes prevent 
        some of these methods and properties from being iterated ( or enumerated ). In order to view the property attributes, we can use the 'Object.getOwnPropertyDescriptor()' method
        It takes two arguments, first is the 'object' and second is the 'property name'.

            const objectBase = Object.getPrototypeOf(person)    
            const descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString')
            console.log(descriptor)

        This attributes object is called 'property descriptor'
            
            {
                value: [Function: toString],
                writable: true,
                enumerable: false,
                configurable: true
            }

        It has above properties and methods which defines the behaviour of the method or the property,

            >> 'value' method contains the default implementation (or value ) of the property or the method.

            >> 'writable' defines the property can be overwritten or not.

            >> 'enumerable' tells us whether the property or method can be iterated.

            >> 'configurable' defines whether this property or method can be deleted or not.

        When we create our own objects, we can set these attributes ourself. In the last section we used 'Object.defineProperty()' method, we can use the same method to define our property
        descriptors. Just like we used 'get' and 'set' as key name in third argument inside the object, we can use these descriptor properties to set their values.

            Object.defineProperty(person, 'name', {
                writable: false,
                enumerable: false,
                configurable: true,
            })

        Now this will make our 'name' property read-only ( as writable is set to false ) and it won't show up when iterated ( as enumerable is also false ). However we can delete this property
        ( since configurable is set to true )


    Constructor Prototype

        We've learned that all the objects created in JavaScript has a prototype expect only one object which is 'objectBase' and we can access it using

            Object.getPrototypeOf(person)

        This gives the prototype( or parent ) of the object, which is created using its constructor function.

        These constructor functions also have a property called 'prototype', which points to the same parent object ( 'objectBase' in this case ). The constructor function used to create person
        object is the built-in constructor function i.e. Object(), we can access the 'objectBase' object using this constructor by,

            Object.prototype

            {
                constructor: ƒ Object()
                hasOwnProperty: ƒ hasOwnProperty()
                isPrototypeOf: ƒ isPrototypeOf()
                propertyIsEnumerable: ƒ propertyIsEnumerable()
                toLocaleString: ƒ toLocaleString()
                toString: ƒ toString()
                valueOf: ƒ valueOf()
                __defineGetter__: ƒ __defineGetter__()
                __defineSetter__: ƒ __defineSetter__()
                __lookupGetter__: ƒ __lookupGetter__()
                __lookupSetter__: ƒ __lookupSetter__()
                get __proto__: ƒ __proto__()
                set __proto__: ƒ __proto__()
            }

        Lets take another example, since we have a constructor function 'CreateCircle' which is used to create the circle objects,

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

            const circle = new CreateCircle(1, 0, 0);

        Since this circle object has a prototype which we named as 'circleBase', which we can access using
            
            Object.getPrototypeOf(circle)

        As mentioned above the constructor CreateCircle also has a property called 'prototype', which we can access using,

            CreateCircle.prototype

            {
                constructor: ƒ (radius, xCord, yCord)
                __proto__: Object
            }

        We can see that these both point to the same object which is 'circleBase'.


    Prototype vs Instance Members

        Now let's take a look at our CreateCircle constructor function

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.draw = () => console.log('draw');
            }

        and we can create new objects like

            const circle1 = CreateCircle(1, 0, 0)
            const circle2 = CreateCircle(5, 2, 2)

        In the current implementation, if we have thousand objects in the memory, we will have thousand copies of the 'draw' method in memory. In real world, we are going to have multiple 
        methods and thus we will waste a lot of memory. A better approach is to use 'Prototypical Inheritance', with this we can add this draw method in the prototype of the circle objects
        which we call 'circleBase' and thus we will have only one instance of this draw method which will be inherited by these circle objects.

        We know that every constructor has a prototype property which is exactly same as the object's prototype. Since, objects are dynamic in nature, we can add or delete properties and 
        methods. With this we can extract the 'draw' method from the 'CreateCircle' and add it to its prototype

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
            }
            CreateCircle.prototype.draw = () => console.log('draw');
            
            const circle = CreateCircle(1, 0, 0)

        and we can still access this method using

            circle.draw()

        We can also overwrite the existing methods of 'objectBase' in our 'circleBase' like toString() given that it is 'writable',
    
            CreateCircle.prototype.toString = function() {
                console.log(`A Circle with radius ${this.radius}`)
            }

        Note we can't use arrow functions where 'this' is used. Since in 'prototypical inheritance'.
        
        JavaScript Engine firsts looks for that property or method in the object itself and if it can't find it, the engine looks for the method/property in the prototype of the object 
        and continues like this all the way upto the root object which is 'objectBase'. Thus as soon it finds the toString method in the 'circleBase' it will use this implementation

        We can get or call all the methods and properties inside the prototype that are defined in the 'circle' object, like,

            CreateCircle.prototype.draw = function() {
                console.log('draw', `x-cord: ${this.location.x}`, `y-cord: ${this.location.y}`);
            }    

        We can also call the methods and properties implemented in the prototype inside the constructor function. Since 'draw' is defined in the prototype of CreateCircle constructor,
             
            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.sketch = function() {
                    this.draw();
                    console.log('sketch')
                }
            }

            
    Iterating Instance and Prototype Members

        Let's say we have a constructor function 'CreateCircle',

            const CreateCircle = function(radius, xCord, yCord) {
                this.radius = radius;
                this.location = {
                    x: xCord,
                    y: yCord,
                };
                this.move = () => console.log('move')      
            }

        and a 'draw' method in its prototype,

            CreateCircle.prototype.draw = () =>  console.log('draw');

        Let's create an object using this constructor function,

            const circle = new CreateCircle(3, 1, 1)

        In order to get keys of the object, we have two options, first

            const keys = Object.keys(circle)
            console.log(keys)

        However this only results an array containing only the keys that are inside the 'circle' object, and excludes the one in its prototype, i.e.

            ["radius", "location", "move"]

        The other option to get the keys is the 'for-in' loop

            for(let key in circle) 
                console.log(key)

        This results in all the methods and properties that are defined in the object as well as in its prototype.
        
            radius
            location
            move
            draw

        Thus, 'Object.keys()' returns only the 'instance' members whereas 'for-in' returns all the 'instance' as well as it 'prototype' members. In JavaScript, 'Instance' is often 
        referred to as 'Own'. We have a method called 'hasOwnProperty' that checks if a property is its 'own' or of its 'prototype'

            const isOwn = circle.hasOwnProperty('radius')
            console.log(isOwn)
            
        which results into a boolean either true or false depending upon the result.


    Avoid Extending the built-in Objects

        Since it is very easy to add methods to prototype, we should avoid adding our custom methods in the built-in constructors like

            Array.prototype.shuffle = function() {
                ...
            }

            let myArr = []
        
            myArray.shuffle()
            
        We should avoid modifying built-in objects that we don't own. This is because if we ever use a library that extends the array prototype and has a method called 'shuffle' for shuffling the 
        arrays with different implementation. This might override our implementation and can cause bugs. There is a solid possibility that JavaScript might add a method named 'shuffle' in the
        future versions which will again cause issues. Thus we should avoid modifying, adding or deleting the built-in objects.


*/
