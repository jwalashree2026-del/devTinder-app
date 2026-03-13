-post/signup
-post/login
-get/profile
-Patch/profile
-post/logout

## profileRouter
--GET/profile/view
--Patch/profile/edit
patch/profile/password//forgot password API

## connectionRequestRouter
-Post/request/send/interested/:userId
-Post/request/send/ignore/:userid
<!-- -Post/request/review/accepted/:requested
-Post/request/review/review/rejected/:requested -->

## userRouter
-GET/user/connections
-GET/user/requests/received
-GET/user/feed - gets you the profiles of other users on platform

Status: ignore, interested,accepted, rejected