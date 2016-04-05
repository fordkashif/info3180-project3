angular.module('MyApp').factory('APIService',['$http','$q',function($http,$q){
    return{
         getUsers : function(){
            var deferred = $q.defer();
            $http.get('/api/users')
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getUser : function(userid){
            var deferred = $q.defer();
            $http.get('/api/user/'+userid,{userid: userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        newWish : function(title,description,url,thumbnail,status){
            var deferred = $q.defer();
            $http.post('/api/user/'+userid+'/wishlist',{title:title,description:description,url:url,thumbnail:thumbnail,status:status})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getImages : function(url){
            console.log(url);
            var deferred = $q.defer();
            $http.get('/api/thumbnail/process?url='+encodeURI(url))
            .success(function(data){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getWishes : function(userid){
            var deferred = $q.defer();
            $http.get('/api/user/'+userid+'/wishlist',{userid:userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
                
            });
            return deferred.promise;
        }
    };
}]);