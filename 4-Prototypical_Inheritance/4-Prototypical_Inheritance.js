/*

    Creating Your Own Prototypical Inheritance

        Here we have a 'CreateCircle' Constructor Function with two methods 'draw' and 'duplicate' defined in its prototype

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype.draw = () => console.log('draw');
            CreateCircle.prototype.duplicate = () => console.log('duplicate')

        Now imagine if we ever wanna create a 'Square' object which has the exact same definition of 'duplicate' method, for eg,

            function CreateSquare(size) {
                this.size = size
            }

            CreateCircle.prototype.duplicate = () => console.log('duplicate')

        We don't want to repeat the implementation of the 'duplicate' method, instead we can use 'inheritance' and create a 'shape' object and define the duplicate function in it and later 
        inherit 'circle' and 'square' objects from the 'shape' object. Let's create a 'CreateShape' constructor function,

            function CreateShape() {

            }

            CreateShape.prototype.duplicate = () => console.log('duplicate')

        As of now, the objects created with 'CreateCircle' have a prototype (let's say 'circleBase') which contains the 'duplicate' and 'draw' methods and 'circleBase' has a prototype of 
        'objectBase'. Same is with objects created with 'CreateShape', they have a prototype, let's say 'shapeBase' which also has a method called 'duplicate' which has a prototype of 'objectBase'.

        We want our 'circleBase' to inherit from 'ShapeBase'. In JavaScript we have a method 'Object.create()' for creating an object with a given prototype. It takes only one argument which is
        the prototype to be assigned to that object. This returns an empty object with a prototype specified, we can assign this object to the CreateCircle.prototype,

            CreateCircle.prototype = Object.create(CreateShape.prototype)

        Now, if we want to add any methods inside the CreateCircle's prototype, we should add them after this statement, as it essentially resets the prototype of the 'CreateCircle',

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype = Object.create(CreateShape.prototype)

            CreateCircle.prototype.draw = () => console.log('draw');

        Now, let's create a 'circle' and 'shape' objects

            let circle = new CreateCircle(1)
            let shape = new CreateShape()

        Now, if we see the 'shape' object, it has a prototype of what we called 'shapeBase' which has a 'duplicate' method and this 'shapeBase' inherits from the 'ObjectBase'. Now, let's see the 
        'circle' object, the circle object should have a property called 'radius' and a prototype we termed 'circleBase' which contains the 'draw' method, and this should have a prototype of 
        'shapeBase' instead of the 'objectBase' and contains the 'duplicate' method which then inherits from the 'objectBase'. Thus we can access both the 'draw' as well as the 'duplicate' method 
        on the 'circle' object.

    
    Resetting the Constructor

        There's a tiny issue in our implementation, every object created with the 'CreateCircle' constructor function has a prototype called 'circleBase', earlier it had a method called 
        'constructor' which pointed to the 'CreateCircle' constructor function. This is required in some cases when we have to dynamically call the constructor function of an object like,

            new CreateCircle.prototype.constructor(1)

        This is usually not required as we can simply call,

            new CreateCircle(1)

        In our implementation, while using the Object.create() method, we overwrote the 'CreateCircle.prototype' object and we don't have this constructor method in 'circleBase' anymore.
        So when we call the 'constructor' method, we will see that this is calling the 'CreateShape' constructor method due to the way JavaScript engine behaves, it checks the function up in 
        the hierarchy and as soon as it finds the 'constructor' method in 'shapeBase', it calls that method.

        In order to solve this issue, we need to redefine the constructor method after resetting the prototype,

            CreateCircle.prototype = Object.create(CreateShape.prototype)
            
            CreateCircle.prototype.constructor = CreateCircle

        This will add the 'constructor' method back in the prototype of the CreateCircle. So whenever we reset the prototype, as a best practice we should also reset the constructor as well.

    
    Calling the Super Constructor

        Let's say we have a 'color' property for every shape object,

            function CreateShape(color) {
                this.color = color
            }

        Since 'CreateCircle' inherits from 'CreateShape',

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype = Object.create(CreateShape.prototype)
            CreateCircle.prototype.constructor = CreateCircle

        Now, in the current implementation, when we create an object using CreateCircle, we only pass the 'radius' in the constructor function. From the inheritance point of view, we also need 
        this to have the 'color' property, that should be initialized at the time of creating the circle. We can do this by simply call the 'CreateShape' constructor inside the 'CreateCircle' 
        constructor.

            function CreateCircle(radius, color) {
                CreateShape(color)
                this.radius = radius
            }

        However when we call this function using,

            let circle = new CreateCircle(1, 'red')

        the 'color' property won't be visible inside the 'circle' object. This is because we are calling the CreateShape function and by default 'this' is referencing to the global object and 
        not the object created using 'new',

            function CreateCircle(radius, color) {
                new CreateShape(color)
                this.radius = radius
            }

        we can't use the 'new' operator for 'CreateShape' as it will point to a new empty object somewhere else and not the the 'circle' object.

        Thus, we can use the call method to call the CreateShape with the 'this' operator,

            function CreateCircle(radius, color) {
                CreateShape.call(this, color)
                this.radius = radius
            }

        So, this is how we call the 'Super' constructor in JavaScript.

    
    Intermediate Function Inheritance

        Now, let's say we have the 'CreateShape' constructor function,
        
            function CreateShape() {
            }

            CreateShape.prototype.duplicate = () => console.log('duplicate')

        and the 'CreateCircle' constructor function,

            function CreateCircle(radius) {
                this.radius = radius
            }

            CreateCircle.prototype = Object.create(CreateShape.prototype)
            CreateCircle.prototype.constructor = CreateCircle

        Now, let's say we want to add a new constructor function for creating 'square' objects,
            
            function CreateSquare(size) {
                this.size = size
            }

            CreateSquare.prototype = Object.create(CreateShape.prototype)
            CreateSquare.prototype.constructor = CreateSquare
        
        We can see that we have to repeat above two lines again, and there's a chance that we might end up doing mistakes in these lines. Thus, we can create a function to execute these lines,

            function extend(Child, Parent) {

                Child.prototype = Object.create(Parent.prototype)
                Child.prototype.constructor = Child
            }
        
        and call this function whenever needed,

            function CreateCircle(radius) {
                this.radius = radius
            }
            extend(CreateCircle, CreateShape)

            function CreateSquare(size) {
                this.size = size
            }
            extend(CreateSquare, CreateShape)

        This 'extend' function is what we call 'Intermediate Function Inheritance'.


    Method Overriding

        Let's say, we have a constructor function, CreateShape with a 'duplicate' method in its prototype and a 'CreateCircle' constructor function, which extends 'CreateShape'

            function CreateShape() {
            }
            CreateShape.prototype.duplicate = () => console.log('duplicate')

            function CreateCircle(radius) {
                this.radius = radius
            }
            extend(CreateCircle, CreateShape)

        Now suppose we want to override the 'duplicate' method, we can simply declare the method inside the prototype of 'CreateCircle' that is the 'circleBase',

            CreateCircle.prototype.duplicate = () => console.log('duplicate circle')
        
        This will work simply because of the way JavaScript engine behaves, if it finds the duplicate method in the prototype of the object itself, it will use that instead of it's parent's 
        prototype. We should define this after the extend function as it resets the prototype.

        If we also want to call the original 'duplicate' method, we can simply call using,

            CreateCircle.prototype.duplicate = () => {
                
                CreateShape.prototype.duplicate()
                console.log('duplicate circle')
            }
        
        Note if we are using 'this' operator in the methods, we should call it using the 'call' method,

            CreateCircle.prototype.duplicate = () => {
                
                CreateShape.prototype.duplicate.call(this)
                console.log('duplicate circle')
            }
    
        
    Polymorphism

        'Poly' means 'many' and 'Morph' means 'forms, which transforms to 'many forms'. Let's define a new constructor 'CreateSquare', and extend it with 'CreateShape',

            function CreateSquare(size) {
                this.size = size
            }
            extend(CreateSquare, CreateShape)

        Now, let's override the 'duplicate' method for 'CreateSquare',

            CreateSquare.prototype.duplicate = () => console.log('duplicate square')

        We now multiple definitions of of the duplicate method, one inside the parent CreateShape, one in CreateCircle and one in CreateSquare. This is called as 'polymorphism'.
        This is very powerful as it self aware of the duplicate method that is to be used, for eg,

            let circle = new CreateCircle(1)
            let square = new CreateSquare(2)

        Now when we call the duplicate method on these methods, they will output different strings,

            circle.duplicate() gives 'duplicate circle'

            square.duplicate() gives 'duplicate square'

        If OOP was not there, we would have to use if-else or switch-case statements to execute these functions like,

            let circle = new CreateCircle(1)

            function duplicate(shape) {
                
                if(shape.type === 'circle)
                    duplicateCircle();

                else if(shape.type === 'square')
                    duplicateSquare();
            
                ....

                else duplicate();
            }

            duplicate(circle);

        We need to define the above functions like duplicateCircle(), duplicateSquare() separately. Thus polymorphism makes this code one line and in an Object Oriented way.

    
    When to use Inheritance ?

        While inheritance is a great tool in solving the problems of code reuse, we have to very careful while using it because it makes our source code complex and fragile. We should always 
        start with simple objects and later if we find these objects sharing similar features, then we can think of implementing 'inheritance'. Inheritance is not the only solution to this, 
        we also have another technique called 'composition', but first let's look at the problem with inheritance,

        Let's say we have an object 'animal' with two methods, 'eat()' and 'walk()'. We also have two objects 'person' and 'dog' which derives from this 'animal' object. Now if ever we want to 
        add a new object like 'goldfish' that should be derived from 'animal', but this breaks our hierarchy as goldfish can't walk, it swims. 
        
        To fix this, we need to change our hierarchy. On top we wil have an 'animal' object which has a method 'eat()' then we will have two objects 'mammal' and 'fish' that derive from 'animal' 
        object. 'mammal' should have a method 'walk()' and 'fish' should have a method 'swim()'. Then the 'person' and 'dog' should derive from 'mammal' and 'goldfish' should derive from 'fish'.

        By fixing this, we have added another level in the hierarchy and made it complex. This will become more and more complex as we add more objects. We should always avoid creating inheritance
        hierarchies, we should keep it to one level only.

        
    Compositions

        With compositions, instead of having a complex hierarchy like above, we can compose few objects together to create a new object, this gives great flexibility. In our example, we can have 
        three objects 'canEat', 'canWalk', 'canSwim' with the functions as methods. Now when creating a person object, we can compose 'canEat' and 'canWalk' together to create a person object, 
        and now if we want to create a goldfish object, we can compose the 'canEat' and 'canSwim' together to create one.

        With this we can mix any objects to create a new object. In JavaScript, we achieve composition with 'Mixins'.


    Mixins

        let's define objects 'canEat', 'canWalk',

            let canEat = {
                eat: () => console.log('eating')
            }
            
            let canWalk = {
                walk: () => console.log('walking')
            }
        
        Now we can compose these objects together to create a 'person' object, we have a method called Object.assign() and we can use this to copy properties and methods from one object to 
        another, so we can pass an empty object as the first argument and pass the objects whose properties we need to copy

            const person = Object.assign( {}, canEat, canWalk )

        and then the person will have both the methods, 'eat' and 'walk'. We can also use 'mixins' with the constructor functions, 

            function CreatePerson() {

            }

           Object.assign( CreatePerson.prototype, canEat, canWalk )
            
        Since objects are passed by their reference, Object.assign will add these two methods to the prototype of the 'CreatePerson' object.

        Now, if we want to add the goldfish object, we can simply create a new object 'canSwim' and use it with the constructor function of 'goldfish'

            let canSwim = {
                swim: () => console.log('swimming')
            }
            
            function CreateGoldFish() {

            }

            Object.assign( CreateGoldFish.prototype, canEat, canSwim )

        Using 'mixins', gives a great flexibility than inheritance. To make this code bit more readable, we can extract the Object.assign into a function called 'mixin', since this function can
        have multiple parameters, we can use the rest and spread operator

            function mixin(target, ...source) {
                
                Object.assign(target, ...source)
            }

        and now we can simply use

            mixin( CreateGoldFish.prototype, canEat, canSwim )


*/
