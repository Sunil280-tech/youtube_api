urls for this api
signup => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/signup =>fields(email,password,phone,channelName,logo(image))
login => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/login  =>fields(email,password)
getalluser => meathod(get) => https://sunil-youtube-api.onrender.com/api/user
subscribe => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/sub/{id} => id=user_id
unsubscribe => meathod(Post) => https://sunil-youtube-api.onrender.com/api/user/unsub/{id} => id=user_id

to post video
upload => meathod(Post) => https://sunil-youtube-api.onrender.com/api/video/upload => fields(video,thumbnail,title,description,category,tags)
update => meathod(Put) => https://sunil-youtube-api.onrender.com/api/video/update/{id} => field you want to update
delete => meathod(Delete) => https://sunil-youtube-api.onrender.com/api/video/{id} =>id=video_id
all video => method(get) => https://sunil-youtube-api.onrender.com/api/video/all
user video => method(get) => https://sunil-youtube-api.onrender.com/api/video
view video => method(get) => https://sunil-youtube-api.onrender.com/api/video/{id} => id=video_id
like video => method(get) => https://sunil-youtube-api.onrender.com/api/video/like/{id}
dislike video => method(get) => https://sunil-youtube-api.onrender.com/api/video/dislike/{id} =>(currently not working)

comment on video
comment => method(post) => https://sunil-youtube-api.onrender.com/api/comment =>id=video_id fields(commentText,video_id)
get all comment => method(get) => https://sunil-youtube-api.onrender.com/api/comment 
delete comment => method(delete) => https://sunil-youtube-api.onrender.com/api/comment/{id} =>id=comment_id 
update comment => method(put) => https://sunil-youtube-api.onrender.com/api/comment/{id} =>id=video_id fields(you want to update)
get comment => method(get) => https://sunil-youtube-api.onrender.com/api/comment/{id} 
