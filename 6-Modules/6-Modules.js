/*

    Introduction

        In all the examples so far, we have written all the code in one file that is index.js, but this is not the way we build real world applications, we should split our code into multiple 
        files which we call 'modules'. These modules give a number of benefits,

            Modularity

                We can increase the maintainability of our code, as it is better organized

            Reuse 

                We can reuse these modules in different parts of the application, or even in different applications

            Abstract

                We can apply the abstraction to hide the complexity of a code and only expose the required code from the modules
            
        Before ES6, we didn't have the concept of modules, so different developers created different syntaxes to use modules, we refer these syntaxes as 'module formats'. Some popular module 
        formats are,

            Asynchronous Module Definition (AMD)

                This is primarily used for Browser applications,

            CommonJS

                This is used in Node.js

            Universal Module Definition (UMD)

                This can be used both in Browser as well as in Node

        UMD and AMD are no longer used in newer applications. In ES6, JavaScript natively supports modules with 'ES6 Modules' format. Thus, we will study about CommonJS and ES6 Modules only.


    CommonJS Modules

        Let's say we have an 'index.js' with this code,
        
            const _defaultLocation = new WeakMap()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                    console.log(loc)
                }
            }           
            
            let circle1 = new Circle(1)
            circle1.draw()

        We can extract the '_defaultLocation' and the 'Circle' class in another file called 'circle'. By default, everything is private and we need to export the code we need so that we can use 
        it in different files. We don't need to export the '_defaultLocation' as it an 'implementation detail' and it doesn't need to be part of the 'public interface'. Thus, we only need to
        export the Circle class and we can do this using the 'module.exports' object, we can add properties and methods to this object and it will be available outside this file,

            const _defaultLocation = new WeakMap()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                    console.log(loc)
                }
            }      
        
            module.exports.Circle = Circle;

        If We have multiple Classes, data types, functions to export, we can just add more to the 'module.exports' object,

            module.exports.Circle = Circle;
            module.exports.Square = Square;

        Alternatively, if we only have one thing to export, we can reset the 'module.exports' object to that thing,

            module.exports = Circle;

        Now, to use this module in another files, we can use the 'require' keyword , which returns the 'module.export', 

            const Circle = require('./path/to/module')

        If 'module.exports' is an object, we can use the 'object destructuring' to get the code,
        
            const { Circle } = require('./path/to/module')

        Now our 'index.js' file is way cleaner,

            const Circle = require('./path/to/module')
 
            let circle1 = new Circle(1)
            circle1.draw()


    ES6 Modules

        Again, we have the same 'index.js',

            const _defaultLocation = new WeakMap()

            class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                    console.log(loc)
                }
            }           
            
            let circle1 = new Circle(1)
            circle1.draw()

        We can extract the '_defaultLocation' and the 'Circle' class from here into another file called 'circle.js'. In the 'ES6 module format', we can use the 'export' keyword before the 
        'class' keyword to make it public,

            const _defaultLocation = new WeakMap()

            export class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                    console.log(loc)
                }
            } 

        Now, we can import this class in 'index.js' using the 'import' statement,

            import { Circle } from './path/to/module'

        The file returns an object containing all the public properties and methods that were exported. However if we have only one thing that is to be exported from module, we can use the 
        'default' keyword in front of the 'export' keyword,

            const _defaultLocation = new WeakMap()

            export default class Circle {

                constructor(radius) {
                    this.radius = radius
                    _defaultLocation.set(this, { x: 1, y: 1})
                }

                draw() {
                    let loc =  _defaultLocation.get(this)
                    console.log(loc)
                }
            } 

        This will return only this class which we can import simply by,

            import Circle from './path/to/module'


    ES6 Tooling

        When using modern JavaScript, we need two kinds of tools,

            Transpiler

                A 'Transpiler' is a combination of two words, 'translator' and 'compiler'. Basically its a tool to which we give our 'modern ES6 code' and it converts our JavaScript code into the
                code that all browsers understand, i.e 'ES5 code'.'Babel' is a great 'transpiler' which is used to do the same.

            Module Bundler

                A 'Module Bundler' is responsible for combining all the JavaScript files into a single file, which we call as 'bundle.js'. There are many module bundlers out there, but the most
                popular one is the 'Webpack'. It takes all the JavaScript files, combine them, minify ( which means removes all the spaces and indentation ) and then uglifies our code (which means
                it shortens the name of variables and functions, objects and so on.) to reduce the size of the 'bundle'.


    Babel

        For this project, we need NPM or (Node Package Manager), create a new project and write,

            npm init --yes
        
        This creates the 'package.json' file which contains all the info about the project and its dependencies. Now install 'Babel' using,

            npm i babel-cli babel-core babel-preset-env --save-dev

        This installs three packages as a development dependencies, first is 'babel-cli' which is a command line tool to convert our modern code to ES5 code. Second is the 'babel-core' which 
        contains all the core logic of transpiling the code. Third is the 'babel-preset-env', in 'Babel' we have a plugin for every Modern JavaScript feature, for eg, we want to use only the 
        arrow functions, we can install the 'arrow function plugin' to convert it to ES5 code, 'babel-preset-env' is the combination of all these plugins, so it can covert all the ES6 features.

        We can use the cli or add a script inside the 'package.json',

            { 
                "babel": "babel --presets env index.js --o build/index.js"
                
            }

        and can run this script using

            npm run babel

        This takes our code in 'index.js' and converts it into ES5 code and places it in 'build/index.js'. However if we use modules, we need to manually convert all our files using this command.
        Thus we don't use babel like this, our Module Bundler, Webpack uses babel internally and converts all our JavaScript files before bundling it.


    Webpack

        We can install Webpack using,

            npm i webpack-cli

        Now in our project, we need to initialize webpack with,

            webpack-cli init

        webpack-cli asks bunch of questions, and according to that, it will create the configuration file. We need to specify the starting file that is index.js, it also asks that whether or not
        code is based on ES6, which then will install babel automatically.

        Now we can add a script in our 'package.json' for webpack,

            {
                "build" : "webpack"
            }
        
        Now when we run,

            npm run build

        Webpack will take all the JavaScript files and make a bundle file. Alternatively if we want webpack to run whenever we make changes to the file we can pass -w in the script which means 
        'watch',

            {
                "build" : "webpack -w"
            }

        Now when we run,

            npm run build,

        It will watch for any changes and will regenerate the bundle file.
            


*/
