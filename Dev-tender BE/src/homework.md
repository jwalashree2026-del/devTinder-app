-create a repository
-Initilize the repository
-node_modules, package.json, package-lock.json
-intstall express
-create a server
-listen to port ???
-Make request handlers for /test, /hello
-install nodemon and update script inside package.json
-diff between carat and tilda
-what are depedencies
-what is the use of "-g" while npm install
-created dummy API's

-initilize git
-gitignore
-create a remote repo on github.com
-push all code to local to remote origin
-play with the routes and route extension ex. /hello,  /  , /hello/2, /xyx
-order of routes matter a lot
-install postamn app and make a workspace/collectiom >test  API call
-write logic to handle GET, POST, Patch, Delete API calls and test them on postman
--explore routing and use of ?, +, (), * in the routes
-- use of regex in routes  /a/ , /.*fly$/
---reading the query params in the routes
---reading the dynamic routes

--Multiple route handlers--paly with code
--next()
--next function and errors along wuth res.send
-- Middleware define
--how express js handles requests behind the scenes
app.use and app.all diff
--write a dummy auth m iddleware for admin
--write a dummy auth m iddleware for all user routes except /user/login
---error handling using app.use("/", (err,req,res,next)={});

--create a free cluster on mongodb official website (Mongo Atlas)
--install Mongoose library
--connect your application to database <connection-url>/devTinder
--call the connectionDB function and connect to database before starting application on 4444
---create a userSchema and user Model
---create Post/signup API to add data to database
---push some documents using API calls form postman
-- error handling in try catch block

--js object vs json(diff)---
---Add the express.json middleware to your app
---make your signup API dynamic to recieve data from the end user(postman, browser, outside server hitting API)
---User.findOne with dulpicate emails ids ,which object returned
--API - get user by email
---API- Fedd API - get all users
--create a delete user API
--diif b/w PATCH and PUT
--create an API to update
--explore th documemtation of mongoose for models specially
---options in a model.findOneAndUpdate method --explore more about it
--API -update the user with email id
--explore schematype options from the documentation
--add required, unique, lowercase,min, minlength, trim
--add default
--Create a custom validate function for gender
--improve the db schema- PUT all appropriate validations on each field in schema
--Add timestamps to userSchema
--Add API level validation on patch request and signup post api
--Data sanitizing - Add API validation for each field
--install validator
---explore validator library function and use validator fumction for password, email,url
Never trust req.body

--validate data in signUp API
-- install bycrypt package
--create a passwordHash using bcrypthash and save the user in encrypted password
--create login API
-- Compare passwords and throw error if email or password is invalid
--install cookie-parse
--just send a dummy cookie to user
---create GET/profile API and check if you get the cookie back
--install jsonwebtoken
--in login API after email and password validation, craete a jwt token send it back to user in cookies
--read the cookies inside your profile API and find the logged in user
--userAuth middleware 
--Add the userAuth middleware in profile API and a new sendConnectionRequest API
--set the expire of the jwt token and cookies to 7 days
--create user Schema method to getJWT()
--create UserSchema method to comparepassword(passwordInputByuser)

--explore tinder API's
--create a list of all api you think of in DEV tinder
--explore read documentation for express.Router
create routes folder for managing auth, profile,request routers
--create authrouter,profilerouter, requestrouter
--import these routers in app.js
--create POST?logout API's
create PATCH/profile/edit
--create PATCH/profile/password API => forgot password api
--make you validate all adta in every post,patch apis

--create connection Request schema
--send connection request API
--proper validation of data
-- think about all corner cases
--$or query $and query in mongoose
--schema .pre("save")function
--read more about indexes in MongoDb
--why do we need index in Db
--what is the advantages and disadvantaged of creating
-- read this article about compund indexes in mondodb.com

--write code with proper validations for POST/request/review/:status/:requestId
--Thought process - POST vs GET
--Read about ref and populate in website
--create GET /user/trequest/recieved with all the checks
---create GET /user/connections

--logic for GET/feed API
---explore the $nin, $and and $ne and other query operator
--Pagination

/feed?page=1&limit =10 => first 10 users 1-10  => .skip(0) & .limit(10)
/feed?page=2&limit =10 => first 11-20   => .skip(10) & .limit(10)
/feed?page=3&limit =10 => first 21-30   => .skip(20) & .limit(10)

skip = (page-1)* limit;

