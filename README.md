urls for this api<br><br>
signup => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/signup =>fields(email,password,phone,channelName,logo(image))<br><br>
login => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/login  =>fields(email,password)<br><br>
getalluser => meathod(get) => https://sunil-youtube-api.onrender.com/api/user<br><br>
subscribe => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/sub/{id} => id=user_id<br><br>
unsubscribe => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/unsub/{id} => id=user_id<br><br><br><br>

to post video<br><br>
upload => meathod(Post) => https://sunil-youtube-api.onrender.com/api/video/upload => fields(video,thumbnail,title,description,category,tags)<br><br>
update => meathod(Put) => https://sunil-youtube-api.onrender.com/api/video/update/{id} => field you want to update<br><br>
delete => meathod(Delete) => https://sunil-youtube-api.onrender.com/api/video/{id} =>id=video_id<br><br>
all video => method(get) => https://sunil-youtube-api.onrender.com/api/video/all<br><br>
user video => method(get) => https://sunil-youtube-api.onrender.com/api/video<br><br>
view video => method(get) => https://sunil-youtube-api.onrender.com/api/video/{id} => id=video_id<br><br>
like video => method(get) => https://sunil-youtube-api.onrender.com/api/video/like/{id}<br><br>
dislike video => method(get) => https://sunil-youtube-api.onrender.com/api/video/dislike/{id} =>(currently not working)<br><br>
<br><br>
comment on video<br><br>
comment => method(post) => https://sunil-youtube-api.onrender.com/api/comment =>id=video_id fields(commentText,video_id)<br><br>
get all comment => method(get) => https://sunil-youtube-api.onrender.com/api/comment <br><br>
delete comment => method(delete) => https://sunil-youtube-api.onrender.com/api/comment/{id} =>id=comment_id<br><br> 
update comment => method(put) => https://sunil-youtube-api.onrender.com/api/comment/{id} =>id=video_id fields(you want to update)<br><br>
get comment => method(get) => https://sunil-youtube-api.onrender.com/api/comment/{id} <br><br>
