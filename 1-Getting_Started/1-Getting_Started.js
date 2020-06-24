/*

What is Object Oriented Programming

    Object Oriented Programming is a programming paradigm or style of programming, centered around objects rather than functions. 

    It's not a programming language or a tool, it's just a style of programming. Some common languages that support OOP are C#, 
    Java, Ruby, Python, JavaScript.

    Most popular frameworks like Angular is designed keeping OOP in mind.


Four Pillars of Object Oriented Programming

    The four core concepts of Object Oriented Programming are:

        Encapsulation

            Before OOP, we had 'Procedural Programming' that divides the program in bunch of functions, we had data stored 
            in one place as variables and functions on the data. This is a simple way of programming but as our code grows, we will 
            find copying and pasting lines of code over and over, we might make a change in one function and some other functions 
            dependent on it will break due to their interdependencies, which is often referred to as 'Spaghetti Code.'

            In OOP, we combine a group of related variables and functions in a unit called as 'Object'. These variables inside an
            object is referred to as 'properties' and functions as 'methods'

            Procedural programming approach : 

                let baseSalary = 30000;
                let overtime = 10;
                let rate = 20;

                function getWage(baseSalary, overtime, rate) {
                    return baseSalary + (overtime * rate);
                }

                getWage(baseSalary, overtime, rate)


            OOP approach

                let employee = {

                    baseSalary: 30000,
                    overtime: 10,
                    rate: 20,

                    getWage() {
                        return this.baseSalary + (this.overtime * this.rate);
                    }
                }

                employee.getWage()


            In this approach, we can see that our function don't have any parameters in contrast to Procedural approach. This is because this method
            has all the variables needed as properties inside the object. The fewer the number of parameters, easier it is to maintain and use the 
            function

            
        Abstraction
                
            In real world scenarios, most of the complex mechanism is hidden from the client. Think of a DVD player as an example, it has a complex logic
            board inside and a few buttons outside, with which a user can interact with. This is 'Abstraction', similarly we can make certain methods 
            and properties inside an object 'private'. These methods include functions that are called while executing different functions and don't require
            any interaction with the user. Some benefits of using abstraction are: 

                We will make the interface of the object 'simpler', using and understanding an object with fewer methods and properties is simpler.

                It also helps us reduce the impact of change, it means that if ever in future we decide to change or delete these inner methods, it will not
                affect any outside code as they are only used inside the object itself.


        Inheritance

            Inheritance is a mechanism that allows us to eliminate the redundant code, For example we have different elements like 'CheckBox', 'TextBox', 'Select'.
            They all have some properties like, innerHTML, hidden etc and methods like click(), focus(), etc. We don't wanna repeat all these methods and 
            functions while defining these elements. We can define them once in a generic element called 'HTMLElement' and make all the elements 'inherit' from this
            generic element.


        Polymorphism

            Poly means 'many', Morph means 'form', thus Polymorphism stands for 'many forms'. It is a technique that helps us to get rid of long if-else or 
            switch-case statements. For eg, the above elements 'CheckBox', 'TextBox', 'Select' should have render methods that are different from each others,
            If we declare a render method in the 'parent' element (i.e. 'HTMLElement') we need to use switch-case to check for the element type. 
            
                switch(...) {
                    case 'Select' : renderSelect()
                    case 'TextBox' : renderTextBox()
                    case 'CheckBox': renderCheckBox()
                    case ...
                    case ...
                    case ...
                }
            
            With polymorphism, we can define these render methods in the 'child' elements ( i.e. 'CheckBox', 'TextBox', 'Select') and the render method will behave 
            differently depending on the type of object we are referencing. Thus we can use one line code like

                'element'.render()

                
    Benefits of Object Oriented Programming

        To summarize, the benefits of OOP are :
        
            Encapsulation: Reduce complexity and Increase reusability.

            Abstraction: Reduce complexity and Isolate impact of changes.

            Inheritance: Eliminate redundant code.

            Polymorphism: Refractor ugly switch-case statements.

                



*/
